import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import CandidateForm from "../../components/CandidateForm";

export const metadata = {
  title: "Join Our Team | Horin Life",
  description: "Explore opportunities to work with the Horin Life team.",
};

export default function CareersPage() {
  return (
    <>
      <SiteHeader />
      <main className="careers-page">
        <div className="container careers-layout">
          <section className="careers-intro">
            <span className="eyebrow"><span /> CAREERS AT HORIN LIFE</span>
            <h1>Build useful things.<br />Do work that matters.</h1>
            <p>We are interested in meeting thoughtful people across the areas we work in. Tell us about yourself and the kind of work you want to do.</p>
          </section>
          <CandidateForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
