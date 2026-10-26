"use client";

import { motion } from "motion/react";

export default function ScrollReveal({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } }}
      viewport={{ once: false, amount: 0.18, margin: "0px 0px -24px 0px" }}
    >
      {children}
    </motion.div>
  );
}
