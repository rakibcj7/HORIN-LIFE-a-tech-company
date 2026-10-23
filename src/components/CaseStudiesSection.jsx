import { projects } from "../data/content";
import { Eyebrow } from "./ui";
import ProjectDashboard from "./ProjectDashboard";
import { MotionGroup, MotionItem } from "./MotionGroup";
import ScrollReveal from "./ScrollReveal";

export default function CaseStudiesSection() {
  return (
<section className="section cases-section" id="work"><div className="container">
      <ScrollReveal><div className="section-heading"><Eyebrow>CASE STUDIES &amp; PROOF</Eyebrow><h2>Engineered for Measurable<br />Impact</h2><p>Every line of code we write is accountable to one metric: tangible business return for the companies that trust us.</p></div></ScrollReveal>
      <MotionGroup className="case-list">{projects.map(project => <MotionItem key={project.title}><article className={`case-card${project.reverse ? " reverse" : ""}`}><div className="case-copy"><div className="case-labels"><span>{project.tag}</span><b>{project.result}</b></div><h3>{project.title}</h3><p>{project.copy}</p><div className="case-stats">{project.stats.map(([number, label]) => <div key={label}><b>{number}</b><span>{label}</span></div>)}</div><small className="stack">Tech Stack: {project.stack}</small></div><ProjectDashboard kind={project.visual} /></article></MotionItem>)}</MotionGroup>
    </div></section>
  );
}
