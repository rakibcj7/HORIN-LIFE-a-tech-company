import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getInquiriesCollection } from "@/lib/mongodb";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const recentSubmissions = new Map();

function getAddress(request) {
  return request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function rateLimited(address) {
  const now = Date.now();
  if (recentSubmissions.size > 1000) {
    for (const [key, times] of recentSubmissions) {
      if (!times.some(time => now - time < WINDOW_MS)) recentSubmissions.delete(key);
    }
  }
  const history = (recentSubmissions.get(address) || []).filter(time => now - time < WINDOW_MS);
  if (history.length >= MAX_REQUESTS) {
    recentSubmissions.set(address, history);
    return true;
  }
  history.push(now);
  recentSubmissions.set(address, history);
  return false;
}

function normalize(data) {
  const fields = ["name", "email", "service", "budget", "summary"];
  if (!data || typeof data !== "object" || fields.some(field => typeof data[field] !== "string")) return null;

  const value = Object.fromEntries(fields.map(field => [field, data[field].trim()]));
  if (
    value.name.length < 2 || value.name.length > 100 ||
    value.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) ||
    value.service.length < 2 || value.service.length > 100 ||
    value.budget.length < 2 || value.budget.length > 100 ||
    value.summary.length > 3000
  ) return null;

  value.email = value.email.toLowerCase();
  return value;
}

export async function POST(request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 10000) {
    return NextResponse.json({ message: "Please shorten your submission and try again." }, { status: 413 });
  }

  const address = getAddress(request);
  if (rateLimited(address)) {
    return NextResponse.json({ message: "Too many attempts. Please try again in a few minutes." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Please submit the form again." }, { status: 400 });
  }

  // Quietly accept honeypot submissions so automated bots do not retry.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const inquiry = normalize(body);
  if (!inquiry) {
    return NextResponse.json({ message: "Check the form fields and try again." }, { status: 400 });
  }

  try {
    const collection = await getInquiriesCollection();
    const createdAt = new Date();
    await collection.insertOne({ ...inquiry, status: "new", createdAt });

    if (process.env.RESEND_API_KEY && process.env.INQUIRY_NOTIFICATION_EMAIL && process.env.RESEND_FROM_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        const result = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: process.env.INQUIRY_NOTIFICATION_EMAIL,
          replyTo: inquiry.email,
          subject: `New project inquiry from ${inquiry.name}`,
          text: [
            `Name: ${inquiry.name}`,
            `Email: ${inquiry.email}`,
            `Service: ${inquiry.service}`,
            `Budget: ${inquiry.budget}`,
            "",
            inquiry.summary || "No project summary provided.",
          ].join("\\n"),
        });
        if (result.error) console.error("Inquiry email notification could not be sent.");
      } catch {
        console.error("Inquiry email notification could not be sent.");
      }
      try {
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: inquiry.email,
          subject: "We received your request — Horin Life",
          text: `Dear ${inquiry.name},Thank you for reaching out to Horin Life. We have successfully received your inquiry regarding ${inquiry.service}.Our team will review your request and connect with you within 24 hours to discuss next steps.If you have any additional details to share in the meantime, simply reply to this email.Warm regards,Horin Life Team`,
        }).catch(() => console.error("Inquiry confirmation email could not be sent."));
      } catch {
        console.error("Inquiry confirmation email could not be sent.");
      }
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "We could not save your inquiry just now. Please email us directly." }, { status: 503 });
  }
}
