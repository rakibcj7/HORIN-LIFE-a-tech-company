"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Arrow } from "./ui";
import Icon from "./Icon";
import { useCountUp } from "./AnimationController";

function AnimatedStat({ value }) {
  const m = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = m ? m[1] : "";
  const target = m ? parseFloat(m[2]) : 0;
  const suffix = m ? m[3] : "";
  const decimals = m && m[2].includes(".") ? m[2].split(".")[1].length : 0;
  const n = useCountUp(target, 1800);
  return <>{prefix}{decimals ? n.toFixed(decimals) : Math.round(n)}{suffix}</>;
}

const intro = { hidden: {}, visible: { transition: { delayChildren: 0.06, staggerChildren: 0.075 } } };
const reveal = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } } };

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const deerY = useTransform(scrollYProgress, [0, 1], [0, 78]);
  const deerScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-inner">
        <motion.div className="hero-copy-stack" variants={intro} initial="hidden" animate="visible">
          <motion.div variants={reveal}><div className="pill"><span />CUSTOM DIGITAL SOLUTIONS FOR YOUR BUSINESSES</div></motion.div>
          <motion.h1 variants={reveal}>Digital solutions that<br />help your business<br /><span className="underlined">grow.</span></motion.h1>
          <motion.p className="hero-copy" variants={reveal}>We engineer high-performance websites, streamlined web portals, and tailored standalone software tools. Designed specifically to eliminate repetitive manual friction and convert operational chaos into predictable revenue.</motion.p>
          <motion.div className="hero-actions" variants={reveal}><a className="button button-cta" href="#contact">Get a Free Consultation <Arrow /></a><a className="button button-quiet" href="#work">Explore Our Work <Arrow diagonal /></a></motion.div>
          <motion.div className="trust-row" variants={reveal}>
            <span><Icon name="business" /><b> Business Focus</b></span>
            <span><Icon name="engineers" /><b>Direct Senior Engineers</b></span>
            <span><Icon name="target" /><b>Fixed Scope Delivery</b></span>
          </motion.div>
          <motion.div className="hero-stats" variants={reveal} aria-label="What clients can expect"><div><b><AnimatedStat value="100%" /></b><span>Codebase Ownership</span></div><div><b><AnimatedStat value="3.2x" /></b><span>Avg. Client Efficiency Gain</span></div><div><b>&lt; <AnimatedStat value="30d" /></b><span>Typical Launch Turnaround</span></div><div><b><AnimatedStat value="0 hrs" /></b><span>Account Executive Overhead</span></div></motion.div>
        </motion.div>
        <motion.div className="deer-art-wrap" style={{ y: deerY, scale: deerScale }}>
          <Image className="deer-art" src="/hero-banner.jpg" alt="Deer moving through a quiet field" fill sizes="(max-width: 640px) 620px, 850px" priority />
        </motion.div>
      </div>
    </section>
  );
}
