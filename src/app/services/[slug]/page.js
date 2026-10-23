import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import Icon from "../../../components/Icon";
import { Arrow, Check, Eyebrow } from "../../../components/ui";
import { services } from "../../../data/content";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return service ? { title: `${service.title} | Horin Life`, description: service.copy } : {};
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <main>
      <SiteHeader />
      <section className="service-detail">
        <div className="container service-detail-grid">
          <div className="service-detail-copy">
            <Link className="back-link" href="/#services"><Icon name="back" size={16} /> All services</Link>
            <Eyebrow>{service.number}</Eyebrow>
            <h1>{service.title}</h1>
            <p>{service.copy}</p>
            <Link className="button button-dark" href="/#contact">Talk with an engineer <Arrow /></Link>
          </div>
          <aside className="service-detail-card">
            <span className="service-detail-icon"><Icon name={service.icon} size={30} /></span>
            <p className="detail-label">BUILT AROUND YOUR WORKFLOW</p>
            <h2>What you can expect</h2>
            <ul>{service.points.map((point) => <Check key={point}>{point}</Check>)}</ul>
            <div className="detail-timeline"><span>Typical timeline</span><strong>{service.timeline}</strong></div>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
