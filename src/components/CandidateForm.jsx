"use client";

import { useState } from "react";
import { additionalServices, services } from "../data/content";

const maxCvBytes = 150 * 1024;
const positions = [...services, ...additionalServices];

export default function CandidateForm() {
  const [cv, setCv] = useState(null);
  const [fileError, setFileError] = useState("");
  const [notice, setNotice] = useState("");

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    setNotice("");
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

  function handleSubmit(event) {
    event.preventDefault();
    setNotice("This application form is not connected yet. Your details and CV have not been sent or saved.");
  }

  return (
    <form className="candidate-form" onSubmit={handleSubmit}>
      <h2>Introduce yourself</h2>
      <p className="candidate-form-lead">Share your details and attach your CV as a PDF.</p>
      <label>FULL NAME *<input required name="name" maxLength={100} autoComplete="name" placeholder="Your name" /></label>
      <label>EMAIL ADDRESS *<input required type="email" name="email" maxLength={254} autoComplete="email" placeholder="you@example.com" /></label>
      <label>DESIRED POSITION *
        <select required name="position" defaultValue="">
          <option value="" disabled>Select a service area</option>
          {positions.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}
        </select>
      </label>
      <label>CV (PDF, MAX 150 KB) *
        <input required name="cv" type="file" accept=".pdf,application/pdf" onChange={handleFileChange} aria-describedby="cv-help cv-error" />
      </label>
      <p className="candidate-file-help" id="cv-help">{cv ? `${cv.name} · ${(cv.size / 1024).toFixed(1)} KB` : "PDF files only. Maximum file size: 150 KB."}</p>
      {fileError && <p className="candidate-file-error" id="cv-error" role="alert">{fileError}</p>}
      <button className="submit-button" type="submit" disabled={!cv}>Review application</button>
      <p className="candidate-form-notice" role="status" aria-live="polite">{notice}</p>
    </form>
  );
}
