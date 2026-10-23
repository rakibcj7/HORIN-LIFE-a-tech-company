export const services = [
  {
    number: "SERVICE 01",
    slug: "high-conversion-websites",
    icon: "▤",
    title: "High-Conversion Websites",
    copy: "Showcase your enterprise with surgical clarity. Lightning-fast load times, intuitive mobile responsiveness, SEO readiness, and conversion funnels mapped directly to booking appointments or taking inquiries.",
    points: ["Speed scores > 95 (Core Web Vitals)", "E-Commerce & Service Catalogs", "Self-hosted CMS or Headless setup"],
    action: "Start Web Build",
    timeline: "2-4 wks",
  },
  {
    number: "SERVICE 02",
    slug: "custom-web-applications",
    icon: "▣",
    title: "Custom Web Applications",
    copy: "When standard SaaS platforms constrain your operations, we build secure, dedicated web portals: client dashboards, interactive booking engines, scheduling dispatchers, and automated billing workflows.",
    points: ["Role-based access & Client Portals", "Stripe / custom API integrations", "Real-time dispatch & database sync"],
    action: "Scope Web App",
    timeline: "4-8 wks",
  },
  {
    number: "SERVICE 03",
    slug: "standalone-desktop-tools",
    icon: "▣",
    title: "Standalone & Desktop Tools",
    copy: "Tailored offline-first utilities, internal automation scripts, machine-interfacing software, and specialized operational suites designed to run locally on warehouse tablets, shop computers, or private servers.",
    points: ["Zero monthly licensing fees", "Local sqlite/encrypted data privacy", "Hardware & legacy barcode reader sync"],
    action: "Discuss Desktop App",
    timeline: "Custom",
  },
];

export const projects = [
  {
    tag: "LOGISTICS & SUPPLY",
    result: "+42% Dispatch Speed",
    title: "Timberline Logistics Portal",
    copy: "Replaced 14 disconnected spreadsheets and frantic SMS dispatch threads with a unified web management hub connecting 38 regional freight drivers with live depot manifests.",
    stats: [["0 min", "Manual double entry"], ["3.5 Weeks", "Discovery to deployment"]],
    stack: "Next.js  •  Node.js  •  Postgres  •  Mapbox",
    visual: "logistics",
    reverse: false,
  },
  {
    tag: "CRAFT MANUFACTURING",
    result: "+185% Online Sales",
    title: "Arbor Artisans E-Commerce & Workshop Booking",
    copy: "A bespoke direct-to-consumer store combined with a specialized workshop reservation engine that automated their payment processing, registration intake, and calendar coordination.",
    stats: [["< 1.2s", "Page Load on Mobile 4G"], ["Zero", "Missed registration emails"]],
    stack: "Remix  •  Shopify Headless  •  Resend  •  Tailwind",
    visual: "booking",
    reverse: true,
  },
  {
    tag: "FIELD SERVICES",
    result: "100% Offline Capable",
    title: "FieldFlow Operations Suite",
    copy: "A lightweight, local-first tablet application for forestry management teams working deep in mountainous zones without internet connectivity. Queues work orders and auto-reconciles once back in range.",
    stats: [["0 SaaS", "Zero recurring subscription"], ["12 crews", "Simultaneous field audits"]],
    stack: "Tauri  •  Rust  •  SQLite  •  CRDTs",
    visual: "field",
    reverse: false,
  },
];

export const frictions = [
  ["FRICTION 01", "Manual Booking & Phone Tag Chaos", "Losing leads because inquiries sit in an inbox for 24 hours while team members call back and forth to locate open time slots.", "Automated self-serve client scheduling synced in real-time with Google Calendar/Outlook, upfront deposit charging, and automated SMS reminders."],
  ["FRICTION 02", "Fragmented Systems & Double Entry", "Data trapped in one CRM, copied manually into QuickBooks, and re-typed into a dispatch spreadsheet, breeding costly mistakes.", "A bespoke web portal bridging your existing software stack or replacing it entirely with one unified source of operational truth."],
  ["FRICTION 03", "Outdated Website Failing to Convert", "An eight-year-old template website that takes 6 seconds to load on mobile and fails to convey the caliber of your craftsmanship.", "Ultra-clean modern aesthetics, sub-second load times, crisp storytelling, and high-impact lead inquiry funnels that win deals."],
  ["FRICTION 04", "Crippling SaaS Subscription Bloat", "Paying $1,200/month across 7 generic subscription tools where your team only uses 10% of the complex, confusing features.", "One custom, streamlined software asset that you own forever. No monthly user seat penalties, no surprise licensing increases."],
];

export const process = [
  ["01", "01 / ALIGNMENT", "Deep Discovery", "We audit your daily bottlenecks, examine current tools, and identify the highest ROI opportunity."],
  ["02", "02 / CLARITY", "Fixed Proposal", "A transparent scope blueprint with exact deliverables, firm delivery dates, and flat-fee pricing."],
  ["03", "03 / PROTOTYPE", "UI/UX Design", "Interactive Figma designs you can click through. We test user ergonomics before a single line of code is written."],
  ["04", "04 / BUILD", "Engineering", "Modern, modular code with rigorous automated edge-case validation and weekly progress demonstrations."],
  ["05", "05 / FREEDOM", "Launch & Handover", "Zero-downtime deployment, recorded video staff training, complete source code handover, and ongoing support."],
];

export const faqs = [
  ["Who owns the code after the project launches?", "You do. After the agreed project fees are paid, the finished code and project-specific design files are handed over to you. We document the hosting, domain, and third-party accounts used, and make clear which services have their own fees. You can maintain the software yourself or ask us for help later."],
  ["How long does a typical build take?", "A focused website sprint often takes two to four weeks. A custom application can take five to ten weeks or more, depending on integrations, data migration, and approval steps. Before work begins, we agree on milestones, review dates, and what you need to provide so the schedule is clear."],
  ["What happens if we need changes or maintenance after launch?", "We include a post-launch handover and a defined warranty period in the project proposal. The warranty covers issues where the delivered work does not match the agreed scope; new features and changes are estimated separately. After handover, you can make updates in-house or request support when you need it."],
  ["Do we need to buy expensive servers or software licenses?", "Usually not. We choose hosting and third-party services to fit your expected traffic and operational needs, then identify their ongoing costs before you approve the plan. Some projects can run on low-cost hosting or local devices, while others need paid infrastructure for reliability, payments, email, or data storage."],
];
