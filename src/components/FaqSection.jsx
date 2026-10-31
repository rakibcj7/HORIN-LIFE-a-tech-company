"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faqs } from "../data/content";
import { Eyebrow } from "./ui";
import Icon from "./Icon";
import ScrollReveal from "./ScrollReveal";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <ScrollReveal className="center-heading">
          <Eyebrow centered>COMMON INQUIRIES</Eyebrow>
          <h2 className='text-center'>Clear answers to<br />practical questions</h2>
          <div className=" flex justify-center"><p className='text-center'>What to expect when planning, building, and owning your software.</p> </div>
        </ScrollReveal>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            return (
              <motion.article className="faq-item" key={question} whileTap={{ scale: 0.99 }} layout>
                <button className="faq-question" id={`faq-trigger-${index}`} type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenIndex(isOpen ? null : index)}>
                  {question}
                  <motion.span animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 1.1 : 1 }} transition={{ duration: 0.3, type: "spring", stiffness: 260 }} aria-hidden="true"><Icon name="plus" size={20} /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={answerId} className="faq-answer-wrap" role="region" aria-labelledby={`faq-trigger-${index}`} initial={{ height: 0, opacity: 0, y: 6 }} animate={{ height: "auto", opacity: 1, y: 0 }} exit={{ height: 0, opacity: 0, y: -4 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
                      <p>{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
