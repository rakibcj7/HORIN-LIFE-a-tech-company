"use client";

import { motion } from "motion/react";

export default function ScrollReveal({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -12px 0px" }}
    >
      {children}
    </motion.div>
  );
}
