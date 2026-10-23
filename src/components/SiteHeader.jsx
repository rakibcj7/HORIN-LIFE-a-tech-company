"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./ui";

const navigation = [
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
      </nav>
    </header>
  );
}
