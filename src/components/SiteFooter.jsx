import Link from "next/link";
import { inquiryEmail } from "../data/brand";

function FooterIcon({ type }) {
  if (type === "facebook") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3a5 5 0 0 0-5 5v2H6v4h3v5h4v-5h3l1-4h-4V9a1 1 0 0 1 1-1Z" /></svg>;
  }
  if (type === "whatsapp") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" /><path d="M9 8.5c.5 2.5 2 4 4.5 5l1-1 2 1c-.3 1.6-1.3 2.2-2.4 2-3.5-.6-6.6-3.7-7.2-7.2-.2-1.1.4-2.1 2-2.4l1 2-1 1Z" /></svg>;
  }
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
      ["About us", "/#about"],
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
            <Link className="footer-wordmark" href="/#top" aria-label="Horin Life - Home">HORIN<span>LIFE</span></Link>
            <p>Engineering thoughtful digital products and dependable software for growing businesses.</p>
            <div className="footer-socials" aria-label="Contact and explore Horin Life">
              <a href="https://www.facebook.com/share/1EcxgWUJpj/" target="_blank" rel="noreferrer" aria-label="Visit Horin Life on Facebook"><FooterIcon type="facebook" /></a>
              <a href="https://wa.me/601133161582" target="_blank" rel="noreferrer" aria-label="Message Horin Life on WhatsApp"><FooterIcon type="whatsapp" /></a>
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
            <a href="/privacy">Privacy policy</a>
            <a href="/terms">Terms of service</a>
            <a href="/cookies">Cookie policy</a>
            <Link href="/careers">Join our team</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
