import { NextResponse } from "next/server";
import { Resend } from "resend";
import { additionalServices, services } from "@/data/content";
import { getApplicationsCollection } from "@/lib/mongodb";

const MAX_CV_BYTES = 150 * 1024;
const MAX_REQUEST_BYTES = 180 * 1024;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 3;
const recentSubmissions = new Map();
const allowedPositions = new Set([...services, ...additionalServices].map(({ title }) => title));

function getAddress(request) {
  return request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function pruneStale(address) {
  const now = Date.now();
  if (recentSubmissions.size > 1000) {
    for (const [key, times] of recentSubmissions) {
      if (!times.some((time) => now - time < WINDOW_MS)) recentSubmissions.delete(key);
    }
  }
  const history = (recentSubmissions.get(address) || []).filter((time) => now - time < WINDOW_MS);
  if (history.length >= MAX_REQUESTS) {
    recentSubmissions.set(address, history);
    return true;
  }
  return false;
}

function recordAttempt(address) {
  const now = Date.now();
  const history = (recentSubmissions.get(address) || []).filter((time) => now - time < WINDOW_MS);
  history.push(now);
  recentSubmissions.set(address, history);
}

export async function POST(request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ message: "The request is too large. Keep the CV under 150 KB." }, { status: 413 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: "Please submit the application again." }, { status: 400 });
  }

  // Quietly accept honeypot submissions so automated bots do not retry.
  if (String(formData.get("website") || "").trim()) return NextResponse.json({ ok: true }, { status: 201 });

  const address = getAddress(request);
  if (pruneStale(address)) {
    return NextResponse.json({ message: "Too many attempts. Please try again in a few minutes." }, { status: 429 });
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const position = String(formData.get("position") || "").trim();
  const cv = formData.get("cv");
  const portfolio = String(formData.get("portfolio") || "").trim();

  const hasCv = cv instanceof File;
  const validName = name.length >= 2 && name.length <= 100;
  const validEmail = email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validPosition = allowedPositions.has(position);
  const hasSomething = hasCv || portfolio.length > 0;

  if (!validName || !validEmail || !validPosition || !hasSomething) {
    return NextResponse.json({ message: "Check the application fields and provide a CV (PDF ≤ 150 KB) or a portfolio link." }, { status: 400 });
  }

  if (portfolio && !/^https?:\/\/.+$/i.test(portfolio)) {
    return NextResponse.json({ message: "The portfolio link must start with http:// or https://." }, { status: 400 });
  }

  let cvBytes;
  if (hasCv) {
    if (cv.size === 0 || cv.size > MAX_CV_BYTES ||
        !cv.name.toLowerCase().endsWith(".pdf") ||
        (cv.type && cv.type !== "application/pdf")) {
      return NextResponse.json({ message: "The CV must be a PDF no larger than 150 KB." }, { status: 400 });
    }
    try {
      cvBytes = Buffer.from(await cv.arrayBuffer());
    } catch {
      return NextResponse.json({ message: "We could not read that CV. Please choose it again." }, { status: 400 });
    }
    if (cvBytes.length > MAX_CV_BYTES || cvBytes.subarray(0, 5).toString("ascii") !== "%PDF-") {
      return NextResponse.json({ message: "The uploaded file must be a valid PDF no larger than 150 KB." }, { status: 400 });
    }
  }

  const createdAt = new Date();
  try {
    const collection = await getApplicationsCollection();
    const doc = {
      name,
      email,
      position,
      cv: null,
      portfolio: portfolio || null,
      status: "new",
      createdAt,
    };
    if (cvBytes) {
      doc.cv = {
        filename: cv.name.slice(0, 255),
        contentType: "application/pdf",
        size: cvBytes.length,
        data: cvBytes,
      };
    }
    await collection.insertOne(doc);
    recordAttempt(address);

    if (process.env.RESEND_API_KEY && process.env.CAREER_NOTIFICATION_EMAIL && process.env.RESEND_FROM_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const attachmentLine = cvBytes ? `\nCV: ${cv.name.slice(0, 255)} (${cvBytes.length} bytes)` : "\nCV: not provided";
      const portfolioLine = portfolio ? `\nPortfolio: ${portfolio}` : "";
      try {
        const result = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: process.env.CAREER_NOTIFICATION_EMAIL,
          replyTo: email,
          subject: `Job application: ${position} — ${name}`,
          text: [`Name: ${name}`, `Email: ${email}`, `Desired position: ${position}`, `Received: ${createdAt.toISOString()}`, attachmentLine, portfolioLine].join("\n"),
          ...(cvBytes ? { attachments: [{ filename: cv.name.slice(0, 255), content: cvBytes.toString("base64") }] } : {}),
        });
        if (result.error) console.error("Career application notification could not be sent.");
      } catch {
        console.error("Career application notification could not be sent.");
      }
      try {
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: email,
          subject: "We received your application — Horin Life",
          text: `Dear ${name}, Thank you for applying to Horin Life for the ${position} role. We have successfully received your application. Our team will review your submission and connect with you within 24 hours regarding next steps. If you need to update any details in the meantime, simply reply to this email.Warm regards,Horin Life Team`,
        }).catch(() => console.error("Career application confirmation email could not be sent."));
      } catch {
        console.error("Career application confirmation email could not be sent.");
      }
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "We could not save your application just now. Please try again later." }, { status: 503 });
  }
}
