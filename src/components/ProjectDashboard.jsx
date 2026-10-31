import Icon from "./Icon";

export default function ProjectDashboard({ kind }) {
  if (kind === "logistics") {
    return (
      <div className="mock-window logistics-window">
        <div className="mock-top"><span className="window-dots"><i /><i /><i /></span><span>timberline / dispatch</span><b><i className="online-dot" /> 38 online</b></div>
        <div className="mock-metrics">
          <div><small>ACTIVE LOADS</small><b>142 Units</b><em>+18% vs last week</em></div>
          <div><small>FLEET EFFICIENCY</small><b>97.8%</b><em>Optimal routing</em></div>
          <div><small>FUEL SAVINGS</small><b>$8,420</b><em>This cycle</em></div>
        </div>
        <div className="route-chart"><svg viewBox="0 0 520 110" preserveAspectRatio="none" role="img" aria-label="Rising route performance chart"><path className="chart-line chart-line-primary" d="M0 92 C65 90 67 18 135 42 S220 79 283 42 S366 70 423 27 S489 43 520 12" fill="none" stroke="#75aa3d" strokeWidth="4" /><path d="M283 42 C330 29 340 58 393 34 S465 31 520 12" fill="none" stroke="#92a49a" strokeWidth="3" strokeDasharray="4 5" /></svg><b>+42% faster dispatch</b><small>Depot A <span>Truck 12 en route</span></small></div>
      </div>
    );
  }

  if (kind === "booking") {
    return (
      <div className="booking-window">
        <div className="booking-head"><span>arborartisans.com / workshops</span><b><i className="online-dot" /> Booking live</b></div>
        <small>SIGNATURE WORKSHOP</small>
        <div className="booking-grid">
          <div><h4>Joinery &amp; Timber Framing</h4><p>Capacity, instructor calendars, payments, and waivers in one place.</p><strong>$385 <small>per seat · 3 left</small></strong></div>
          <div className="slot-box"><small>AVAILABLE SESSIONS</small><b>Saturday <span>9:00 AM</span></b><b>Sunday <span>1:00 PM</span></b><p><Icon name="check" size={15} /> Calendar synced</p></div>
        </div>
        <div className="booking-foot"><Icon name="shield" size={14} /> Secure checkout <span>Live capacity updates</span></div>
      </div>
    );
  }

  if (kind === "dashboard") {
    return (
      <div className="project-image-preview">
        <img src="/projects/online-business-dashboard.jpg" alt="Online Business Dashboard" loading="lazy" />
      </div>
    );
  }
}
