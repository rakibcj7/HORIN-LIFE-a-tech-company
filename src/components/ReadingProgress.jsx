"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  return <motion.div className="reading-progress" style={{ scaleX: reduceMotion ? 0 : scrollYProgress }} aria-hidden="true" />;
}
