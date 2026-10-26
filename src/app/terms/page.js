import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata = { title: "Terms & Conditions | Horin Life" };

export default function TermsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="section" style={{paddingTop:120}}><div className="container" style={{maxWidth:800}}>
        <h1>Terms &amp; Conditions</h1>
        <p>Last updated: January 2026</p>
        <h2>1. Services</h2>
        <p>Horin life provides web development, mobile app development, digital marketing, and related IT services as agreed upon in individual project contracts.</p>
        <h2>2. Payment Terms</h2>
        <p>Payment terms are specified in individual project proposals. Typically, we require 50% upfront and 50% upon completion.</p>
        <h2>3. Intellectual Property</h2>
        <p>Upon full payment, all project deliverables and intellectual property rights transfer to the client, unless otherwise specified.</p>
        <h2>4. Revisions</h2>
        <p>Projects include a specified number of revision rounds. Additional revisions may incur extra charges at our standard hourly rate.</p>
        <h2>5. Confidentiality</h2>
        <p>We maintain strict confidentiality of all client information and project details. NDAs are available upon request.</p>
        <h2>6. Limitation of Liability</h2>
        <p>Our liability is limited to the total amount paid for services. We are not liable for indirect or consequential damages.</p>
        <h2>7. Contact</h2>
        <p>For questions about these terms, contact us at rakibhassan215095@gmail.com</p>
      </div></section>
      <SiteFooter />
    </main>
  );
}