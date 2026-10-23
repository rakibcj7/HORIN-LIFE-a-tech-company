"use client";

import { motion, useReducedMotion } from "motion/react";
import { Eyebrow } from "./ui";

const sampleReviews = [
  {
    initials: "LL",
    quote: "Before the portal, our dispatch team copied updates into three different sheets. Now everyone sees the same live schedule, and we get our mornings back.",
    name: "Illustrative owner",
    business: "Regional logistics firm",
  },
  {
    initials: "CS",
    quote: "We wanted workshop bookings without another monthly tool. Customers can choose a session and pay their deposit in one simple flow.",
    name: "Illustrative founder",
    business: "Independent craft studio",
  },
  {
    initials: "FO",
    quote: "Our field crew can keep working when the signal drops. Their orders sync later, so nobody has to re-enter the same information.",
    name: "Illustrative operations lead",
    business: "Forestry services team",
  },
];

function ReviewCard({ review }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      className="review-card"
      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.015 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <span className="review-sample-label">SAMPLE REVIEW</span>
      <div className="review-stars" aria-label="Five illustrative stars">★★★★★</div>
      <blockquote>“{review.quote}”</blockquote>
      <div className="person">
        <b>{review.initials}</b>
        <span><strong>{review.name}</strong><small>{review.business}</small></span>
      </div>
    </motion.article>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="container">
        <div className="center-heading">
          <Eyebrow centered>ILLUSTRATIVE SAMPLE FEEDBACK</Eyebrow>
          <h2>Small changes.<br />More room to grow.</h2>
          <p>Example reviews show how customer stories can appear here. Replace them with verified feedback before publishing.</p>
        </div>
        <div className="testimonial-marquee" aria-label="Illustrative sample customer reviews">
          <div className="testimonial-track">
            <div className="testimonial-group">
              {sampleReviews.map((review) => <ReviewCard key={review.initials} review={review} />)}
            </div>
            <div className="testimonial-group" aria-hidden="true">
              {sampleReviews.map((review) => <ReviewCard key={`${review.initials}-repeat`} review={review} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
