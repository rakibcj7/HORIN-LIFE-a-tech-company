"use client";

import { motion } from "motion/react";

const groupVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0, staggerChildren: 0.03 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export function MotionGroup({ children, className, innerRef }) {
  return <motion.div ref={innerRef} className={className} variants={groupVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: "0px 0px -12px 0px" }}>{children}</motion.div>;
}

export function MotionItem({ children, className, hover = false }) {
  return <motion.div className={className} variants={itemVariants} whileHover={hover ? { y: -4 } : undefined} whileTap={{ scale: 0.99 }} transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
