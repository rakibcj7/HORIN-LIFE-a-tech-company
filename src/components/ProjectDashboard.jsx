export default function ProjectDashboard({ kind }) {
  if (kind === "logistics") {
    return (
      <div className="mock-window logistics-window">
        <div className="mock-top"><span className="dots">● ● ●</span><span>app.timberlinelogistics.internal/dispatch</span><b>● 38 Online</b></div>
        <div className="mock-metrics"><div><small>ACTIVE LOADS</small><b>142 Units</b><em>↗ 18% vs last wk</em></div><div><small>FLEET EFFICIENCY</small><b>97.8%</b><em>Optimal routing</em></div><div><small>EST. FUEL SAVINGS</small><b>$8,420</b><em>Current cycle</em></div></div>
        <div className="route-chart"><span>●</span><svg viewBox="0 0 520 110" preserveAspectRatio="none" aria-label="Rising route performance chart"><path d="M0 92 C65 90 67 18 135 42 S220 79 283 42 S366 70 423 27 S489 43 520 12" fill="none" stroke="#75aa3d" strokeWidth="4"/><path d="M283 42 C330 29 340 58 393 34 S465 31 520 12" fill="none" stroke="#92a49a" strokeWidth="3" strokeDasharray="4 5"/></svg><b>●</b><small>Depot A (Origin) <i>Transit: Truck #12</i></small></div>
      </div>
    );
  }
  if (kind === "booking") {
    return (
      <div className="booking-window"><div className="booking-head"><span>arborartisans.com / workshops</span><b>Instant Booking Live</b></div><small>SIGNATURE WORKSHOP</small><div className="booking-grid"><div><h4>Joinery & Timber Framing Intensive</h4><p>Fully synced with workshop capacity, instructor calendars, and automated waiver collection.</p><strong>$385 <small>/ seat · 3 left</small></strong></div><div className="slot-box"><small>SELECT TIME SLOT</small><b>Sat, Nov 15 • 09:00 AM</b><p>Instructor: Marcus H. <span>●</span></p><b>Sun, Nov 16 • 01:00 PM</b><p>Instructor: Sarah L. <span>●</span></p></div></div><div className="booking-foot">Stripe Instant Checkout Connected <span>Zero Overbooking Protection</span></div></div>
    );
  }
  return <div className="field-window"><div className="field-head"><span>⌁ OFFLINE MODE ACTIVE • LOCAL CACHE SECURE</span><small>DB REVISION v3.12</small></div>{["Sector 7B - Soil Density Scan & Canopy Report", "Timber Harvest Permit #8929 - Stamp Verified", "Equipment Pre-Check: CAT Skidder #4 Engine Pressure"].map((x, i) => <div className="field-row" key={x}>{x}<b>{i === 1 ? "Pending Sync Queue: 1" : "Synced"}</b></div>)}<small className="field-foot">Automatic Conflict Resolution Ready <span>100% Encrypted at Rest</span></small></div>;
}
