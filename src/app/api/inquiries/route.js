import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getInquiriesCollection } from "@/lib/mongodb";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const recentSubmissions = new Map();

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

function hasInquiryEmailConfig() {
  return Boolean(process.env.RESEND_API_KEY && process.env.INQUIRY_NOTIFICATION_EMAIL && process.env.RESEND_FROM_EMAIL);
}

async function sendTeamNotification(resend, inquiry) {
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
    ].join("\n"),
  });

  if (result.error) throw new Error("Resend rejected the inquiry notification");
}

function sendCustomerConfirmation(resend, inquiry) {
  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: inquiry.email,
    subject: "We received your request - Horin Life",
    text: [
      `Dear ${inquiry.name},`,
      "",
      `Thank you for reaching out to Horin Life. We received your inquiry regarding ${inquiry.service}.`,
      "Our team will review your request and connect with you within 24 hours to discuss next steps.",
      "",
      "Warm regards,",
      "Horin Life Team",
    ].join("\n"),
  }).catch(() => console.error("Inquiry confirmation email could not be sent."));
}

export async function POST(request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 10000) {
    return NextResponse.json({ message: "Please shorten your submission and try again." }, { status: 413 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Please submit the form again." }, { status: 400 });
  }

  // Quietly accept honeypot submissions so automated bots do not retry.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const address = getAddress(request);
  if (pruneStale(address)) {
    return NextResponse.json({ message: "Too many attempts. Please try again in a few minutes." }, { status: 429 });
  }

  const inquiry = normalize(body);
  if (!inquiry) {
    return NextResponse.json({ message: "Check the form fields and try again." }, { status: 400 });
  }

  let databaseSaved = false;
  try {
    const collection = await getInquiriesCollection();
    await collection.insertOne({ ...inquiry, status: "new", createdAt: new Date() });
    databaseSaved = true;
  } catch (error) {
    console.error("Inquiry MongoDB insert failed.", {
      name: error?.name || "Error",
      code: error?.code || error?.codeName || "unknown",
      message: error?.message || "No error message",
      hasMongoUri: Boolean(process.env.MONGODB_URI),
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    });
  }

  if (!databaseSaved) {
    if (!hasInquiryEmailConfig()) {
      console.error("Inquiry could not be delivered: Resend fallback is not fully configured.");
      return NextResponse.json({ message: "We could not receive your inquiry just now. Please email us directly." }, { status: 503 });
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await sendTeamNotification(resend, inquiry);
      recordAttempt(address);
      sendCustomerConfirmation(resend, inquiry);
      return NextResponse.json({ ok: true, delivery: "email" }, { status: 201 });
    } catch (error) {
      console.error("Inquiry email fallback failed.", {
        name: error?.name || "Error",
        code: error?.code || "unknown",
        message: error?.message || "No error message",
      });
      return NextResponse.json({ message: "We could not receive your inquiry just now. Please email us directly." }, { status: 503 });
    }
  }

  recordAttempt(address);
  if (hasInquiryEmailConfig()) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      await sendTeamNotification(resend, inquiry);
    } catch (error) {
      console.error("Inquiry email notification could not be sent.", {
        name: error?.name || "Error",
        code: error?.code || "unknown",
      });
    }
    sendCustomerConfirmation(resend, inquiry);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
