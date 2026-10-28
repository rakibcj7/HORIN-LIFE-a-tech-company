"use client";

import { useState } from "react";
import { additionalServices, services } from "../data/content";

const maxCvBytes = 150 * 1024;
const positions = [...services, ...additionalServices];

export default function CandidateForm() {
  const [cv, setCv] = useState(null);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [showNotice, setShowNotice] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  function promptNotice() {
    if (!acknowledged) setShowNotice(true);
  }

  function dismissNotice() {
    setAcknowledged(true);
    setShowNotice(false);
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    setMessage("");
    setStatus("idle");
    if (!file) {
      setCv(null);
      setFileError("");
      return;
    }

    const hasPdfExtension = file.name.toLowerCase().endsWith(".pdf");
    const hasPdfType = !file.type || file.type === "application/pdf";
    if (!hasPdfExtension || !hasPdfType) {
      setCv(null);
      setFileError("Please choose a PDF file.");
      event.target.value = "";
      return;
    }
    if (file.size > maxCvBytes) {
      setCv(null);
      setFileError("The PDF must be 150 KB or smaller.");
      event.target.value = "";
      return;
    }

    setCv(file);
    setFileError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (fileError || !cv) return;
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/applications", { method: "POST", body: new FormData(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Please check the form and try again.");

      form.reset();
      setCv(null);
      setFileError("");
      setStatus("sent");
      setMessage("Thank you. Your application and CV have been received.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "We could not send your application. Please try again.");
    }
  }

  return (
    <form className="candidate-form" onSubmit={handleSubmit}>
      <h2>Introduce yourself</h2>
      <p className="candidate-form-lead">Share your details and attach your CV as a PDF.</p>
      <label>FULL NAME *<input required name="name" maxLength={100} autoComplete="name" placeholder="Your name" onFocus={promptNotice} /></label>
      <label>EMAIL ADDRESS *<input required type="email" name="email" maxLength={254} autoComplete="email" placeholder="you@example.com" onFocus={promptNotice} /></label>
      <label>DESIRED POSITION *
        <select required name="position" defaultValue="" onFocus={promptNotice}>
          <option value="" disabled>Select a service area</option>
          {positions.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}
        </select>
      </label>
      <label>CV (PDF, MAX 150 KB) *
        <input required name="cv" type="file" accept=".pdf,application/pdf" onChange={handleFileChange} onFocus={promptNotice} aria-describedby="cv-help cv-error" />
      </label>
      <p className="candidate-file-help" id="cv-help">{cv ? `${cv.name} · ${(cv.size / 1024).toFixed(1)} KB` : "PDF files only. Maximum file size: 150 KB."}</p>
      {fileError && <p className="candidate-file-error" id="cv-error" role="alert">{fileError}</p>}
      <div className="form-honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <button className="submit-button" type="submit" disabled={!cv || Boolean(fileError) || status === "sending"}>{status === "sending" ? "Sending application…" : status === "sent" ? "Application received" : "Submit application"}</button>
      <p className={`candidate-form-notice${status === "error" ? " is-error" : ""}`} role="status" aria-live="polite">{message}</p>
      {showNotice && (
        <div className="candidate-notice-overlay" role="dialog" aria-modal="true" aria-labelledby="candidate-notice-title">
          <div className="candidate-notice">
            <h3 id="candidate-notice-title">Before You Apply</h3>
            <p>Please note that our current opportunities are <strong>project-based, not fixed-salary positions</strong>. There are no fixed clock-in or clock-out hours. You’ll work flexibly while meeting agreed deadlines and project deliverables.</p>
            <p>If you’re comfortable with this arrangement, you may proceed with your application.</p>
            <button type="button" className="submit-button" onClick={dismissNotice}>I understand</button>
          </div>
        </div>
      )}
    </form>
  );
}
