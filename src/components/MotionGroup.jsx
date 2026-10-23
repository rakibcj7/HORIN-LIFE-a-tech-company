"use client";

import { motion, useReducedMotion } from "motion/react";

const groupVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.06, staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
};

export function MotionGroup({ children, className }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} variants={groupVariants} initial={reduceMotion ? false : "hidden"} whileInView={reduceMotion ? undefined : "visible"} viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}>{children}</motion.div>;
}

export function MotionItem({ children, className, hover = false }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} variants={itemVariants} whileHover={hover && !reduceMotion ? { y: -4 } : undefined} transition={{ duration: 0.22, ease: "easeOut" }}>{children}</motion.div>;
}
