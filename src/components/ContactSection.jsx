import InquiryForm from "./InquiryForm";
import { inquiryEmail } from "../data/brand";

export default function ContactSection() {
  return (
<section className="contact-section" id="contact"><div className="container contact-grid"><div className="contact-copy"><div className="pill"><span />ACCEPTING 2026 PROJECTS</div><h2>Have a project<br />in<br />mind? Let&apos;s<br />build it right.</h2><p>Tell us about the bottleneck you are solving or the system you need built. We will review your requirements and provide an honest assessment within 24 business hours.</p><ul><li><span>✉</span><a href={`mailto:${inquiryEmail}`}>{inquiryEmail}</a></li><li><span>◷</span>Direct consultation with lead systems engineers</li><li><span>⬟</span>NDA protected by default</li></ul></div><InquiryForm /></div></section>
  );
}
