import { frictions } from "../data/content";
import { Eyebrow } from "./ui";
import Icon from "./Icon";
import { MotionGroup, MotionItem } from "./MotionGroup";
import ScrollReveal from "./ScrollReveal";

export default function FrictionSection() {
  return (
    <section className="section friction-section">
      <div className="container">
        <ScrollReveal className="center-heading">
          <Eyebrow centered>DIRECT SOLUTIONS</Eyebrow>
          <h2>Annyoing Small Problem?<br />Say No More!</h2>
          <p>We cure operational headaches that keep founders working late on tasks computers should handle.</p>
        </ScrollReveal>
        <MotionGroup className="friction-grid">
          {frictions.map((item) => (
            <MotionItem key={item[0]} hover>
              <article className="friction-card">
                <div className="friction-top"><span>{item[0]}</span><Icon name="alert" size={20} /></div>
                <h3>{item[1]}</h3>
                <p>{item[2]}</p>
                <div className="cure"><b><Icon name="check" size={16} /> HORIN LIFE SOLUTION</b><p>{item[3]}</p></div>
              </article>
            </MotionItem>
          ))}
        </MotionGroup>
      </div>
    </section>
  );
}
