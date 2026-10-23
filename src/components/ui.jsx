import Icon from "./Icon";

export function Eyebrow({ children, centered = false }) {
  return <div className={`eyebrow${centered ? " centered" : ""}`}><span />{children}</div>;
}

export function Check({ children }) {
  return <li className="check-item"><span className="check-icon"><Icon name="check" size={12} strokeWidth={2.5} /></span>{children}</li>;
}

export function Arrow({ diagonal = false }) {
  return <Icon name={diagonal ? "diagonal" : "arrow"} size={18} className="arrow" />;
}
