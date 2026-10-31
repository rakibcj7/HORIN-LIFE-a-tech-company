import { process } from "../data/content";
import { Eyebrow } from "./ui";
import { Arrow } from "./ui";
import { MotionGroup, MotionItem } from "./MotionGroup";
import ScrollReveal from "./ScrollReveal";

export default function ProcessSection() {
  return (
    <section className="section process-section" id="process">
      <div className="container">
        <ScrollReveal>
          <div className="section-heading">
            <Eyebrow>HOW WE WORK</Eyebrow>
            <h2>A disciplined process, from first call to long-term support.</h2>
            <p>Every project follows the same structured process — so you always know what's happening, what's next, and why.</p>
          </div>
        </ScrollReveal>
        <div className="process-timeline-wrap">
          <div className="process-timeline-line" aria-hidden="true" />
          <MotionGroup className="process-timeline-steps">
            {process.map((item, idx) => (
              <MotionItem key={item[0]} className="process-timeline-step">
                <div className="process-timeline-dot">{String(idx + 1).padStart(2, "0")}</div>
                <article className="process-timeline-card">
                  <h3>{item[2]}</h3>
                  <p>{item[3]}</p>
                  <div className="process-timeline-highlights">
                    <div className="process-timeline-highlight"><span className="process-check" />Stakeholder alignment</div>
                    <div className="process-timeline-highlight"><span className="process-check" />Clear deliverables</div>
                    <div className="process-timeline-highlight"><span className="process-check" />Review checkpoints</div>
                  </div>
                </article>
              </MotionItem>
            ))}
          </MotionGroup>
        </div>
        <div className="process-cta">
          <a className="button button-cta" href="#contact">Get a Free Consultation <Arrow /></a>
        </div>
      </div>
    </section>
  );
}
