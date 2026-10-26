"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./ui";

const navigation = [
  ["About", "/#about"],
  ["Services", "/#services"],
  ["Our work", "/#work"],
  ["How we work", "/#process"],
  ["Investment", "/#pricing"],
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const previousScroll = useRef(0);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 640px)");
    previousScroll.current = window.scrollY;

    function updateVisibility() {
      const currentScroll = window.scrollY;
      if (!mobile.matches || menuOpen || currentScroll < 96) {
        setNavHidden(false);
      } else if (currentScroll > previousScroll.current + 4) {
        setNavHidden(true);
      } else if (currentScroll < previousScroll.current - 3) {
        setNavHidden(false);
      }
      previousScroll.current = currentScroll;
    }

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={`site-header${navHidden ? " nav-hidden" : ""}`}>
      <Link className="brand" href="/#top" aria-label="Horin Life home">
        <Image src="/horin-logo-updated.jpg" alt="Horin Life" width={1408} height={768} priority />
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span /><span /><span />
      </button>
      <nav className={menuOpen ? "nav-open" : ""} aria-label="Main navigation">
        {navigation.map(([label, href]) => (
          <Link href={href} key={label} onClick={closeMenu}>{label}</Link>
        ))}
        <Link className="nav-cta" href="/#contact" onClick={closeMenu}>Let&apos;s talk <Arrow /></Link>
        <div className="nav-socials" aria-label="Social and messaging links">
          <a href="https://www.facebook.com/share/1EcxgWUJpj/" target="_blank" rel="noreferrer" aria-label="Visit Horin Life on Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3a5 5 0 0 0-5 5v2H6v4h3v5h4v-5h3l1-4h-4V9a1 1 0 0 1 1-1Z" /></svg></a>
          <a href="https://wa.me/601133161582" target="_blank" rel="noreferrer" aria-label="Message Horin Life on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" /><path d="M9 8.5c.5 2.5 2 4 4.5 5l1-1 2 1c-.3 1.6-1.3 2.2-2.4 2-3.5-.6-6.6-3.7-7.2-7.2-.2-1.1.4-2.1 2-2.4l1 2-1 1Z" /></svg></a>
        </div>
      </nav>
    </header>
  );
}
