"use client";

import { motion } from "motion/react";
import { Eyebrow } from "./ui";
import Icon from "./Icon";
import ScrollReveal from "./ScrollReveal";

const sampleReviews = [
  { initials: "LL", quote: "Before the portal, our dispatch team copied updates into three different sheets. Now everyone sees the same live schedule, and we get our mornings back.", name: "Illustrative owner", business: "Regional logistics firm" },
  { initials: "CS", quote: "We wanted workshop bookings without another monthly tool. Customers can choose a session and pay their deposit in one simple flow.", name: "Illustrative founder", business: "Independent craft studio" },
  { initials: "FO", quote: "Our field crew can keep working when the signal drops. Their orders sync later, so nobody has to re-enter the same information.", name: "Illustrative operations lead", business: "Forestry services team" },
];

function ReviewCard({ review, tabIndex }) {
  return (
    <motion.article className="review-card" tabIndex={tabIndex} whileHover={{ y: -8, scale: 1.025 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <span className="review-sample-label">CUSTOMER REVIEW</span>
      <div className="review-stars" role="img" aria-label="Five illustrative stars">{Array.from({ length: 5 }, (_, index) => <Icon key={index} name="star" size={16} />)}</div>
      <blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
      <div className="person"><b>{review.initials}</b><span><strong>{review.name}</strong><small>{review.business}</small></span></div>
    </motion.article>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="container">
        <ScrollReveal className="center-heading">
          <Eyebrow centered>FEEDBACK</Eyebrow>
          <h2>Small changes.<br />More room to grow.</h2>
          <p>Take a look about what our customers has to say.</p>
        </ScrollReveal>
        <div className="testimonial-marquee" aria-label="Illustrative sample customer reviews">
          <motion.div className="testimonial-reveal" initial={{ x: 90, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <div className="testimonial-track">
              <div className="testimonial-group">{sampleReviews.map((review) => <ReviewCard key={review.initials} review={review} />)}</div>
              <div className="testimonial-group" aria-hidden="true">{sampleReviews.map((review) => <ReviewCard key={`${review.initials}-repeat`} review={review} tabIndex={-1} />)}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
