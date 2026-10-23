"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { faqs } from "../data/content";
import { Eyebrow } from "./ui";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const reduceMotion = useReducedMotion();

  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <div className="center-heading">
          <Eyebrow centered>COMMON INQUIRIES</Eyebrow>
          <h2>Clear answers to<br />practical questions</h2>
          <p>What to expect when planning, building, and owning your software.</p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <article className="faq-item" key={question}>
                <button
                  className="faq-question"
                  id={`faq-trigger-${index}`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  {question}<span aria-hidden="true">⌄</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      className="faq-answer-wrap"
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: reduceMotion ? "auto" : 0, opacity: reduceMotion ? 1 : 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeInOut" }}
                    >
                      <p>{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
