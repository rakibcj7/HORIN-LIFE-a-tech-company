"use client";

import { motion } from "motion/react";

export default function ScrollReveal({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } }}
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </motion.div>
  );
}
