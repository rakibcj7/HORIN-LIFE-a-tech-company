import { inquiryEmail } from "../data/brand";
import Link from "next/link";

function FooterIcon({ type }) {
  if (type === "share") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.5-4.4M8.2 13.2l7.5 4.4" /></svg>;
  }
  if (type === "work") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m7 10 2 2-2 2m5 0h4" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M16 8.5v5a2 2 0 0 0 4 0V12a8 8 0 1 0-3 6.2M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" /></svg>;
}

const linkGroups = [
  {
    title: "SOLUTIONS",
    links: [
      ["Websites that convert", "/#services"],
      ["Custom web applications", "/#services"],
      ["Offline-first software", "/#services"],
      ["Project investment", "/#pricing"],
      ["Our process", "/#process"],
    ],
  },
  {
    title: "STUDIO",
    links: [
      ["Case studies", "/#work"],
      ["Client impact", "/#testimonials"],
      ["How we work", "/#process"],
      ["Knowledge & FAQ", "/#faq"],
      ["Work inquiry", "/#contact"],
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-about">
            <Link className="footer-wordmark" href="/#top" aria-label="Horin Life home">HORIN<span>LIFE</span></Link>
            <p>Engineering thoughtful digital products and dependable software for growing businesses.</p>
            <div className="footer-socials" aria-label="Contact and explore Horin Life">
              <a href="mailto:?subject=Horin%20Life" aria-label="Share Horin Life by email"><FooterIcon type="share" /></a>
              <Link href="/#work" aria-label="Explore our work"><FooterIcon type="work" /></Link>
              <a href={`mailto:${inquiryEmail}`} aria-label="Email Horin Life"><FooterIcon type="email" /></a>
            </div>
          </div>
          {linkGroups.map((group) => (
            <nav className="footer-links" aria-label={group.title} key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}
            </nav>
          ))}
          <div className="footer-dispatches">
            <h2>DISPATCHES</h2>
            <p>Ideas on useful software, resilient operations, and the craft of building well.</p>
            <span className="availability"><i />Available for select 2026 projects</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Horin Life. Built with care.</p>
          <nav aria-label="Policies">
            <a href={`mailto:${inquiryEmail}?subject=Privacy%20Policy`}>Privacy policy</a>
            <a href={`mailto:${inquiryEmail}?subject=Terms%20of%20service`}>Terms of service</a>
            <a href={`mailto:${inquiryEmail}?subject=Security%20information`}>Security information</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
