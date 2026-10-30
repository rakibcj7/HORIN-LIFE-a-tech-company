import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata = { title: "Cookie Policy | Horin Life" };

export default function CookiePolicyPage() {
  return (
    <main>
      <SiteHeader />
      <section className="section" style={{paddingTop:120}}><div className="container" style={{maxWidth:800}}>
        <h1>Cookie Policy</h1>
        <p>Last updated: January 2026</p>
        <h2>1. What Are Cookies</h2>
        <p>Cookies are small text files stored on your device when you visit our website. They help us provide a better experience and understand how our site is used.</p>
        <h2>2. How We Use Cookies</h2>
        <p>We use cookies for essential site functionality, analytics, and to remember your preferences. We do not use cookies to collect personally identifiable information without your consent.</p>
        <h2>3. Third-Party Cookies</h2>
        <p>We may use third-party services such as analytics providers that set their own cookies. These are governed by their respective privacy policies.</p>
        <h2>4. Managing Cookies</h2>
        <p>You can control or disable cookies through your browser settings. Disabling cookies may affect some site functionality.</p>
        <h2>5. Contact Us</h2>
        <p>For questions about this policy, contact us at info.horinlife@gmail.com</p>
      </div></section>
      <SiteFooter />
    </main>
  );
}
