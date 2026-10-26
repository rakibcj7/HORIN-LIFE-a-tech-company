import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import Icon from "../../../components/Icon";
import { Arrow, Check, Eyebrow } from "../../../components/ui";
import { services, additionalServices } from "../../../data/content";

const allServices = [...services, ...additionalServices];

export function generateStaticParams() {
  return allServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = allServices.find((item) => item.slug === slug);
  return service ? { title: `${service.title} | Horin Life`, description: service.copy } : {};
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = allServices.find((item) => item.slug === slug);
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
            <Link className="button button-dark button-cta" href="/#contact">Talk to an Engineer <Arrow /></Link>
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
      <section className="service-detail-more">
        <div className="container service-detail-more-inner">
          <Eyebrow>THE DETAILS</Eyebrow>
          <h2>Designed around the way you work</h2>
          <p className="service-detail-intro">{service.detail.intro}</p>
          <div className="service-detail-includes">
            {service.detail.includes.map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
