import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import ProjectDashboard from "../../../components/ProjectDashboard";
import Icon from "../../../components/Icon";
import { Arrow, Eyebrow } from "../../../components/ui";
import { projects } from "../../../data/content";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: `${project.title} | Horin Life`, description: project.copy } : {};
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main>
      <SiteHeader />
      <section className="project-detail-hero">
        <div className="container">
          <Link className="back-link" href="/#work"><Icon name="back" size={16} /> All case studies</Link>
          <div className="project-detail-intro">
            <div className="project-detail-copy">
              <Eyebrow>{project.tag}</Eyebrow>
              <h1>{project.title}</h1>
              <p>{project.copy}</p>
              <div className="project-detail-meta"><span><small>DELIVERY</small><b>{project.detail.timeline}</b></span><span><small>OUR ROLE</small><b>{project.detail.role}</b></span></div>
            </div>
            <div className="project-detail-visual"><ProjectDashboard kind={project.visual} /></div>
          </div>
          <p className="project-disclosure">Illustrative portfolio concept. The project narrative, client, and results on this page are fictional examples.</p>
        </div>
      </section>

      <section className="section project-detail-body">
        <div className="container">
          <div className="project-metrics">
            {project.stats.map(([number, label]) => <div key={label}><b>{number}</b><span>{label}</span></div>)}
            <div><b>{project.detail.timeline}</b><span>Illustrative delivery window</span></div>
          </div>

          <div className="project-story-grid">
            <article className="project-story-card"><span className="project-story-index">01 / THE CHALLENGE</span><h2>Where the work got stuck</h2><p>{project.detail.challenge}</p></article>
            <article className="project-story-card"><span className="project-story-index">02 / THE APPROACH</span><h2>Designed around real work</h2><p>{project.detail.approach}</p></article>
          </div>

          <section className="project-delivery">
            <div><Eyebrow>WHAT WE DELIVERED</Eyebrow><h2>A focused system, built to fit.</h2><p>Each part supports the same goal: make the next step clear for the people doing the work.</p></div>
            <ul>{project.detail.delivery.map((item) => <li key={item}><Icon name="check" size={18} />{item}</li>)}</ul>
          </section>

          <aside className="project-outcome"><span>03 / THE OUTCOME</span><p>{project.detail.outcome}</p></aside>

          <div className="project-next"><div><Eyebrow>HAVE A SIMILAR CHALLENGE?</Eyebrow><h2>Let&apos;s map a better way to work.</h2></div><Link className="button button-dark" href="/#contact">Talk with our team <Arrow /></Link></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
