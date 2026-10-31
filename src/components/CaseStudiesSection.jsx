import { projects } from "../data/content";
import { Eyebrow } from "./ui";
import ProjectDashboard from "./ProjectDashboard";
import { MotionGroup, MotionItem } from "./MotionGroup";
import ScrollReveal from "./ScrollReveal";
import Link from "next/link";

function ProjectCard({ project }) {
  const hasLive = project.detail?.liveUrl;
  return (
    <MotionItem key={project.title}>
      <article className={`case-card${project.reverse ? " reverse" : ""}`}>
        <div className="case-copy">
          <div className="case-labels"><span>{project.tag}</span><b>{project.result}</b></div>
          <h3>{project.title}</h3>
          <p>{project.copy}</p>
          <div className="case-stats">{project.stats.map(([number, label]) => <div key={label}><b>{number}</b><span>{label}</span></div>)}</div>
          <small className="stack">Tech Stack: {project.stack}</small>
          <div className="case-card-actions">
            <Link className="case-detail-cta" href={`/projects/${project.slug}`} aria-label={`View ${project.title} project details`}>Read project details <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></Link>
            {hasLive ? <a className="case-detail-cta" href={hasLive} target="_blank" rel="noopener noreferrer">Visit Live Site <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7m0-7L10 14M5 5v14h14" /></svg></a> : null}
          </div>
        </div>
        <div className="case-card-visual-wrap">
          <ProjectDashboard kind={project.visual} />
        </div>
      </article>
    </MotionItem>
  );
}

export default function CaseStudiesSection() {
  return (
<section className="section cases-section" id="work"><div className="container">
      <ScrollReveal><div className="section-heading"><Eyebrow>CASE STUDIES &amp; PROOF</Eyebrow><h2>Selected<br />PROJECTS.</h2><p>Every line of code we write is accountable to one metric: tangible business return for the companies that trust us.</p></div></ScrollReveal>
      <MotionGroup className="case-list">{projects.slice(0, 2).map(project => <ProjectCard project={project} key={project.slug} />)}</MotionGroup>
      <div className="projects-more"><Link className="button button-dark" href="/projects">View more projects <span className="arrow" aria-hidden="true">→</span></Link></div>
    </div></section>
  );
}
