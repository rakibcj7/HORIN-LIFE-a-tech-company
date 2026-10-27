import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import ProjectDashboard from "../../components/ProjectDashboard";
import { Eyebrow } from "../../components/ui";
import { projects } from "../../data/content";

export const metadata = {
  title: "Projects & Case Studies | Horin Life",
  description: "Explore the illustrative project concepts and case studies from Horin Life.",
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="project-archive section">
        <div className="container">
          <div className="project-archive-heading">
            <Eyebrow>CASE STUDIES &amp; PROOF</Eyebrow>
            <h1>Projects built around<br />real work.</h1>
            <p>Explore our project concepts across logistics, commerce, and field operations.</p>
            <small>These case studies are illustrative portfolio concepts. Project narratives, clients, and results are fictional examples.</small>
          </div>
          <div className="case-list">
            {projects.map((project) => (
              <Link className="case-card-link" href={`/projects/${project.slug}`} key={project.slug} aria-label={`View ${project.title} project details`}>
                <article className={`case-card${project.reverse ? " reverse" : ""}`}>
                  <div className="case-copy">
                    <div className="case-labels"><span>{project.tag}</span><b>{project.result}</b></div>
                    <h2>{project.title}</h2>
                    <p>{project.copy}</p>
                    <div className="case-stats">{project.stats.map(([number, label]) => <div key={label}><b>{number}</b><span>{label}</span></div>)}</div>
                    <small className="stack">Tech Stack: {project.stack}</small>
                    <span className="case-detail-cta">Read project details <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></span>
                  </div>
                  <ProjectDashboard kind={project.visual} />
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
