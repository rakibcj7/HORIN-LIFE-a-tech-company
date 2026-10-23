"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Arrow } from "./ui";

const intro = { hidden: {}, visible: { transition: { delayChildren: 0.12, staggerChildren: 0.1 } } };
const reveal = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } } };

export default function Hero() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const deerY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 34]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-inner">
        <motion.div className="hero-copy-stack" variants={intro} initial={reduceMotion ? false : "hidden"} animate={reduceMotion ? false : "visible"}>
          <motion.div variants={reveal}><div className="pill"><span />CUSTOM DIGITAL SOLUTIONS FOR SMALL BUSINESSES</div></motion.div>
          <motion.h1 variants={reveal}>Digital solutions that<br />help your business<br /><span className="underlined">grow.</span></motion.h1>
          <motion.p className="hero-copy" variants={reveal}>We engineer high-performance websites, streamlined web portals, and tailored standalone software tools. Designed specifically to eliminate repetitive manual friction and convert operational chaos into predictable revenue.</motion.p>
          <motion.div className="hero-actions" variants={reveal}><a className="button button-dark" href="#contact">Get a Free Consultation <Arrow /></a><a className="button button-quiet" href="#work">Explore Our Work <Arrow diagonal /></a></motion.div>
          <motion.div className="trust-row" variants={reveal}><span>â™§ <b>Small Business Focus</b></span><span>âŠž <b>Direct Senior Engineers</b></span><span>â—· <b>Transparent Fixed Scope Delivery</b></span></motion.div>
          <motion.div className="hero-stats" variants={reveal}><div><b>100%</b><span>Codebase Ownership</span></div><div><b>3.2x</b><span>Avg. Client Efficiency Gain</span></div><div><b>&lt; 30d</b><span>Typical Launch Turnaround</span></div><div><b>0 hrs</b><span>Account Executive Overhead</span></div></motion.div>
        </motion.div>
        <motion.div className="deer-art-wrap" style={{ y: deerY }}>
          <Image className="deer-art" src="/hero banner.jpg" alt="Deer moving through a quiet field" fill sizes="(max-width: 640px) 620px, 850px" priority />
        </motion.div>
      </div>
    </section>
  );
}
