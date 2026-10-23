import { Check, Eyebrow } from "./ui";
import { MotionGroup, MotionItem } from "./MotionGroup";
import ScrollReveal from "./ScrollReveal";

export default function PricingSection() {
  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <ScrollReveal><div className="section-heading">
          <Eyebrow>STRAIGHTFORWARD PRICING GUIDANCE</Eyebrow>
          <h2>Clear Fit &amp; Investment<br />Models</h2>
          <p>We work on transparent fixed-scope agreements so you never encounter unexpected<br className="desktop-only" /> billing surprises. Here is how we structure projects.</p>
        </div></ScrollReveal>
        <MotionGroup className="pricing-grid">
          <MotionItem hover>
            <article className="price-card">
              <div className="price-meta"><span>MODEL 01</span><b>Fast Track</b></div>
              <h3>Website Sprint</h3>
              <p>A focused website build for small businesses that need a clear, polished online presence and a simple path for customers to get in touch.</p>
              <div className="price">RM 1,500</div>
              <small className="price-caption">Fixed starting price · final scope agreed before work begins</small>
              <hr /><b className="included">WHAT IS INCLUDED:</b>
              <ul><Check>Responsive website design and build</Check><Check>Contact and inquiry form setup</Check><Check>Search-friendly page structure</Check><Check>Code and domain handover</Check></ul>
              <a className="price-action" href="#contact">Discuss Website Project</a>
            </article>
          </MotionItem>
          <MotionItem hover>
            <article className="price-card price-featured">
              <div className="price-meta"><span>MODEL 02</span><b>Expanded Build</b></div>
              <h3>Custom Web Application</h3>
              <p>A tailored application for businesses that need dedicated workflows, client portals, or integrations between the tools they already use.</p>
              <div className="price">RM 2,500</div>
              <small className="price-caption">Fixed starting price · final scope agreed before work begins</small>
              <hr /><b className="included">WHAT IS INCLUDED:</b>
              <ul><Check>Workflow and feature planning</Check><Check>Custom application interface</Check><Check>Core data and integration setup</Check><Check>Code handover and launch support</Check></ul>
              <a className="price-action" href="#contact">Discuss Application Project</a>
            </article>
          </MotionItem>
        </MotionGroup>
      </div>
    </section>
  );
}
