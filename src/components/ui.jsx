export function Eyebrow({ children, centered = false }) {
  return <div className={`eyebrow${centered ? " centered" : ""}`}><span />{children}</div>;
}

export function Check({ children }) {
  return <li className="check-item"><span className="check-icon">{"\u2713"}</span>{children}</li>;
}

export function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? "\u2197" : "\u2192"}</span>;
}
