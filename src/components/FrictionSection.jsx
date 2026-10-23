import { frictions } from "../data/content";
import { Eyebrow } from "./ui";

export default function FrictionSection() {
  return (
<section className="section friction-section"><div className="container"><div className="center-heading"><Eyebrow centered>DIRECT SOLUTIONS</Eyebrow><h2>Stop Letting Disorganized<br />Tools Limit Your Growth</h2><p>We specifically cure the operational headaches that keep founders and teams working<br className="desktop-only" /> late on things computers should do automatically.</p></div><div className="friction-grid">{frictions.map(item => <article className="friction-card" key={item[0]}><div className="friction-top"><span>{item[0]}</span><b>⚠</b></div><h3>{item[1]}</h3><p>{item[2]}</p><div className="cure"><b><span>✺</span> HORINLIFE CURE:</b><p>{item[3]}</p></div></article>)}</div></div></section>
  );
}
