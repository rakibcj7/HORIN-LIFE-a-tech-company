import InquiryForm from "./InquiryForm";
import Icon from "./Icon";
import { inquiryEmail } from "../data/brand";
import ScrollReveal from "./ScrollReveal";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="container contact-grid">
        <ScrollReveal className="contact-copy">
          <div className="pill"><span />ACCEPTING 2026 PROJECTS</div>
          <h2>Have a project<br />in mind? Let&apos;s<br />build it right.</h2>
          <p>Tell us about the bottleneck you are solving or the system you need built. We will review your requirements and respond within 24 business hours.</p>
          <ul>
            <li><Icon name="mail" /><a href={`mailto:${inquiryEmail}`}>{inquiryEmail}</a></li>
            <li><Icon name="engineers" />Direct consultation with lead systems engineers</li>
            <li><Icon name="shield" />NDA protected by default</li>
          </ul>
        </ScrollReveal>
        <ScrollReveal><InquiryForm /></ScrollReveal>
      </div>
    </section>
  );
}
