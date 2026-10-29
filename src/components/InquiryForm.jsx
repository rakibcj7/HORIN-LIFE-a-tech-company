"use client";

import { useState } from "react";
import { Arrow } from "./ui";
import { inquiryEmail } from "../data/brand";

export default function InquiryForm() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Please try again.");

      form.reset();
      setStatus("sent");
      setMessage("Thanks, your inquiry was received. We will be in touch within 24 business hours.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "We could not receive your inquiry. Please email us directly.");
    }
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="form-row"><label>FULL NAME *<input required name="name" maxLength={100} autoComplete="name" placeholder="Elena Lindqvist" /></label><label>BUSINESS EMAIL *<input required type="email" name="email" maxLength={254} autoComplete="email" placeholder="elena@company.com" /></label></div>
      <label>SERVICE NEEDED<select name="service" defaultValue="Custom Website Overhaul"><option>Custom Website Overhaul</option><option>Custom Web Application</option><option>Desktop or Offline Tool</option><option>Not sure yet</option></select></label>
      <label>ESTIMATED INVESTMENT BUDGET<select name="budget" defaultValue="RM 1,500 (Website Sprint)"><option>RM 1,500 (Website Sprint)</option><option>RM 2,500 (Custom Web Application)</option><option>Let&apos;s discuss</option></select></label>
      <label>PROJECT SUMMARY &amp; CURRENT BOTTLENECK<textarea name="summary" maxLength={3000} placeholder="Tell us what process is currently manual, or what system you need built..." rows={3} /></label>
      <div className="form-honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <button className="submit-button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending inquiry..." : status === "sent" ? "Inquiry sent" : "Send Inquiry & Schedule Call"} <Arrow /></button>
      <p className={`form-status${status === "error" ? " is-error" : ""}`} role="status" aria-live="polite">{message}{status === "error" && <> <a href={`mailto:${inquiryEmail}`}>{inquiryEmail}</a></>}</p>
      <p className="privacy-note">We use your details to manage this inquiry and respond to you. We do not sell your information.</p>
    </form>
  );
}
