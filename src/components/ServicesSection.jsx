import { services } from "../data/content";
import { Eyebrow, Check, Arrow } from "./ui";
import Link from "next/link";
import { MotionGroup, MotionItem } from "./MotionGroup";
import Icon from "./Icon";
import ScrollReveal from "./ScrollReveal";

export default function ServicesSection() {
  return (
<section className="section services-section" id="services"><div className="container">
      <ScrollReveal><div className="section-heading split-heading"><div><Eyebrow>SPECIALIZED CAPABILITIES</Eyebrow><h2>Purpose-Built Software<br />Services</h2><p>We don&apos;t pitch buzzwords. We build robust digital infrastructure that saves<br className="desktop-only" /> your team countless wasted hours and opens new revenue channels.</p></div><span className="section-count">03 DISTINCT DOMAINS</span></div></ScrollReveal>
      <MotionGroup className="service-grid">{services.map((service, i) => <MotionItem key={service.number} hover><article className={`service-card service-card-${i + 1}`}><div className="service-accent" /><div className="service-icon"><Icon name={service.icon} size={25} /></div><small className="card-kicker">{service.number}</small><h3>{service.title}</h3><p>{service.copy}</p><ul>{service.points.map(point => <Check key={point}>{point}</Check>)}</ul><Link href={`/services/${service.slug}`} className="card-link">{service.action} <Arrow /></Link><span className="timeline">{service.timeline}</span></article></MotionItem>)}</MotionGroup>
    </div></section>
  );
}
