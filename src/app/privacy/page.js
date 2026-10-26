import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata = { title: "Privacy Policy | Horin Life" };

export default function PrivacyPage() {
  return (
    <main>
      <SiteHeader />
      <section className="section" style={{paddingTop:120}}><div className="container" style={{maxWidth:800}}>
        <h1>Privacy Policy</h1>
        <p>Last updated: January 2026</p>
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly, including name, email, phone number, and project details when you contact us or use our services.</p>
        <h2>2. How We Use Your Information</h2>
        <p>We use your information to provide services, communicate with you, improve our offerings, and comply with legal obligations.</p>
        <h2>3. Data Protection</h2>
        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or disclosure.</p>
        <h2>4. Third-Party Services</h2>
        <p>We may use third-party services for analytics, payment processing, and communication. These services have their own privacy policies.</p>
        <h2>5. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data. Contact us at contact@ashmatech.com for any requests.</p>
        <h2>6. Contact Us</h2>
        <p>For questions about this policy, contact us at rakibhassan215095@gmail.com</p>
      </div></section>
      <SiteFooter />
    </main>
  );
}