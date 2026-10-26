"use client";

import { motion } from "motion/react";

const groupVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.16 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.985, filter: "blur(3px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
};

export function MotionGroup({ children, className }) {
  return <motion.div className={className} variants={groupVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.16, margin: "0px 0px -24px 0px" }}>{children}</motion.div>;
}

export function MotionItem({ children, className, hover = false }) {
  return <motion.div className={className} variants={itemVariants} whileHover={hover ? { y: -9, scale: 1.015, boxShadow: "0 22px 44px rgba(14, 34, 23, .2)" } : undefined} whileTap={{ scale: 0.975 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
