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

function rateLimited(address) {
  const now = Date.now();
  const history = (recentSubmissions.get(address) || []).filter((time) => now - time < WINDOW_MS);
  if (history.length >= MAX_REQUESTS) {
    recentSubmissions.set(address, history);
    return true;
  }
  history.push(now);
  recentSubmissions.set(address, history);
  return false;
}

export async function POST(request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ message: "The CV must be a PDF no larger than 150 KB." }, { status: 413 });
  }

  if (rateLimited(getAddress(request))) {
    return NextResponse.json({ message: "Too many attempts. Please try again in a few minutes." }, { status: 429 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: "Please submit the application again." }, { status: 400 });
  }

  // Quietly accept honeypot submissions so automated bots do not retry.
  if (String(formData.get("website") || "").trim()) return NextResponse.json({ ok: true }, { status: 201 });

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const position = String(formData.get("position") || "").trim();
  const cv = formData.get("cv");
  if (
    name.length < 2 || name.length > 100 ||
    email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !allowedPositions.has(position) ||
    !(cv instanceof File) || cv.size === 0 || cv.size > MAX_CV_BYTES ||
    !cv.name.toLowerCase().endsWith(".pdf") ||
    (cv.type && cv.type !== "application/pdf")
  ) {
    return NextResponse.json({ message: "Check the application fields and upload a PDF no larger than 150 KB." }, { status: 400 });
  }

  let cvBytes;
  try {
    cvBytes = Buffer.from(await cv.arrayBuffer());
  } catch {
    return NextResponse.json({ message: "We could not read that CV. Please choose it again." }, { status: 400 });
  }
  if (cvBytes.length > MAX_CV_BYTES || cvBytes.subarray(0, 5).toString("ascii") !== "%PDF-") {
    return NextResponse.json({ message: "The uploaded file must be a valid PDF no larger than 150 KB." }, { status: 400 });
  }

  const createdAt = new Date();
  try {
    const collection = await getApplicationsCollection();
    await collection.insertOne({
      name,
      email,
      position,
      cv: {
        filename: cv.name.slice(0, 255),
        contentType: "application/pdf",
        size: cvBytes.length,
        data: cvBytes,
      },
      status: "new",
      createdAt,
    });

    if (process.env.RESEND_API_KEY && process.env.CAREER_NOTIFICATION_EMAIL && process.env.RESEND_FROM_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        const result = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: process.env.CAREER_NOTIFICATION_EMAIL,
          replyTo: email,
          subject: `Job application: ${position} — ${name}`,
          text: [`Name: ${name}`, `Email: ${email}`, `Desired position: ${position}`, `Received: ${createdAt.toISOString()}`].join("\n"),
          attachments: [{ filename: cv.name.slice(0, 255), content: cvBytes.toString("base64") }],
        });
        if (result.error) console.error("Career application notification could not be sent.");
      } catch {
        console.error("Career application notification could not be sent.");
      }
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "We could not save your application just now. Please try again later." }, { status: 503 });
  }
}
