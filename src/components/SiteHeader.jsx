"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Arrow } from "./ui";

const navigation = [
  ["Services", "/#services"],
  ["Our work", "/#work"],
  ["How we work", "/#process"],
  ["Investment", "/#pricing"],
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <Link className="brand" href="/#top" aria-label="Horin Life home">
        <Image src="/horin-logo-updated.jpg" alt="Horin Life" width={1424} height={800} priority />
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
