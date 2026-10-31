import { frictions } from "../data/content";
import { Eyebrow } from "./ui";
import Icon from "./Icon";
import { MotionGroup, MotionItem } from "./MotionGroup";
import ScrollReveal from "./ScrollReveal";

export default function FrictionSection() {
  return (
    <section className="section friction-section">
      <div className="container">
        <ScrollReveal className="center-heading friction-heading text-center flex flex-col items-center justify-center mx-auto">
          <Eyebrow centered>DIRECT SOLUTIONS</Eyebrow>
          <h2>Annyoing Small Problem?<br />Say No More!</h2>
          <p>Common business bottlenecks, paired with practical software solutions.</p>
        </ScrollReveal>
        <MotionGroup className="friction-grid">
          {frictions.map((item) => (
            <MotionItem key={item[0]} hover>
              <article className="friction-card">
                <div className="friction-top"><span>{item[0]}</span><Icon name="alert" size={20} /></div>
                <h3>{item[1]}</h3>
                <div className="friction-problem"><span className="friction-label">THE CHALLENGE</span><p>{item[2]}</p></div>
                <div className="cure"><b><Icon name="check" size={16} /> THE SOLUTION</b><p>{item[3]}</p></div>
              </article>
            </MotionItem>
          ))}
        </MotionGroup>
      </div>
    </section>
  );
}
