"use client";
import { about } from "../data/content";
import { Arrow, Eyebrow } from "./ui";
import Icon from "./Icon";
import { MotionGroup, MotionItem } from "./MotionGroup";
import ScrollReveal from "./ScrollReveal";
import { useCountUp } from "./AnimationController";

function AnimatedValue({ value }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const pad = match && match[1].length > 1 && match[1].startsWith("0") ? match[1].length : 0;
  const count = Math.round(useCountUp(target, 2200));
  const display = pad ? String(count).padStart(pad, "0") : count;
  return <>{display}{suffix}</>;
}

export default function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-intro">
          <ScrollReveal className="about-heading">
            <Eyebrow>ABOUT HORIN LIFE</Eyebrow>
            <h2>From Kuala Lumpur<br />to the <span className="about-accent">world.</span></h2>
            <p className="about-route">
              <span className="about-route-pin" aria-hidden="true"><i /></span>
              <span>Kuala Lumpur</span>
              <span className="about-route-line" aria-hidden="true" />
              <span className="about-route-year">EST. 2026</span>
              <span className="about-route-line" aria-hidden="true" />
              <span>Worldwide</span>
            </p>
          </ScrollReveal>
          <ScrollReveal className="about-copy">
            <p>{about.intro}</p>
            <p>{about.body}</p>
            <a className="button button-cta" href="#contact">Start a conversation <Arrow /></a>
          </ScrollReveal>
        </div>

        <MotionGroup className="about-stats">
          {about.stats.map((stat) => (
            <MotionItem className="about-stat-item" key={stat.label}>
              <article className="about-stat">
                <b><AnimatedValue value={stat.value} /></b>
                <span>{stat.label}</span>
                <small>{stat.note}</small>
              </article>
            </MotionItem>
          ))}
        </MotionGroup>

        <div className="about-principles">
          <ScrollReveal className="about-principles-heading">
            <Eyebrow>WHAT GUIDES US</Eyebrow>
            <h3>Small enough to care.<br />Built to think bigger.</h3>
            <p>Three commitments shape every project, from the first conversation to the final handover.</p>
          </ScrollReveal>
          <MotionGroup className="about-principle-list">
            {about.principles.map((principle) => (
              <MotionItem className="about-principle-row" key={principle.title}>
                <article className="about-principle">
                  <span className="about-principle-number">{principle.number}</span>
                  <span className="about-principle-icon"><Icon name={principle.icon} size={20} /></span>
                  <div>
                    <h4>{principle.title}</h4>
                    <p>{principle.copy}</p>
                  </div>
                </article>
              </MotionItem>
            ))}
          </MotionGroup>
        </div>
      </div>
    </section>
  );
}