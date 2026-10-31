"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Eyebrow } from "./ui";
import Icon from "./Icon";
import ScrollReveal from "./ScrollReveal";

const reviewData = {
  review: "I have been working with HORIN LIFE. They provided a great service by creating a custom app for me. I am very happy with the way they helped me. They are very skilled at their work. They created a custom app called BD Business which is helping me a lot.",
  rating: 5,
  name: "Abid Hassan",
  role: "Owner",
  company: "Love fore Care page",
  location: "Bangladesh",
  imageSrc: "/reviews/abid-hassan.jpg",
};

function ReviewCard() {
  return (
    <motion.div
      className="review-card-new"
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="review-card-new-header">
        <span className="review-badge">Customer Review</span>
        <div className="review-stars-new">
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              name="star"
              size={16}
              className={i < reviewData.rating ? "star-filled" : "star-empty"}
            />
          ))}
        </div>
      </div>

      <blockquote className="review-quote-new">&ldquo;{reviewData.review}&rdquo;</blockquote>

      <div className="review-author-new">
        <div className="review-avatar-wrap">
          <Image src={reviewData.imageSrc} alt={reviewData.name} fill className="review-avatar-img" />
        </div>
        <div className="review-author-info">
          <h3>{reviewData.name}</h3>
          <p>
            {reviewData.role} of <span>{reviewData.company}</span>
          </p>
          <span className="review-location">{reviewData.location}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="container">
        <ScrollReveal className="center-heading">
          <Eyebrow centered>FEEDBACK</Eyebrow>
          <h2>Small changes.<br />More room to grow.</h2>
          <p>See what our customers have to say.</p>
        </ScrollReveal>
        <div className="testimonial-single-wrap">
          <ReviewCard />
        </div>
      </div>
    </section>
  );
}
