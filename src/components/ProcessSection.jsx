import { process } from "../data/content";
import { Eyebrow } from "./ui";
import { MotionGroup, MotionItem } from "./MotionGroup";

export default function ProcessSection() {
  return (
<section className="section process-section" id="process"><div className="container"><div className="section-heading"><Eyebrow>OPERATING FRAMEWORK</Eyebrow><h2>How We Work: Transparent<br />&amp; Methodical</h2><p>No ghosting. No surprise scope explosions. A disciplined 5-stage progression from early<br className="desktop-only" /> insight to total code ownership.</p></div><MotionGroup className="process-grid">{process.map((item, i) => <MotionItem key={item[0]} hover><article className={`process-card${i === 4 ? " final-step" : ""}`}><span className="step-number">{item[0]}</span><small>{item[1]}</small><h3>{item[2]}</h3><p>{item[3]}</p></article></MotionItem>)}</MotionGroup></div></section>
  );
}
