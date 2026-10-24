export const services = [
  {
    number: "SERVICE 01",
    slug: "high-conversion-websites",
    icon: "website",
    title: "High-Conversion Websites",
    copy: "Showcase your enterprise with surgical clarity. Lightning-fast load times, intuitive mobile responsiveness, SEO readiness, and conversion funnels mapped directly to booking appointments or taking inquiries.",
    points: ["Speed scores > 95 (Core Web Vitals)", "E-Commerce & Service Catalogs", "Self-hosted CMS or Headless setup"],
    action: "Start Web Build",
    timeline: "2-4 wks",
  },
  {
    number: "SERVICE 02",
    slug: "custom-web-applications",
    icon: "application",
    title: "Custom Web Applications",
    copy: "When standard SaaS platforms constrain your operations, we build secure, dedicated web portals: client dashboards, interactive booking engines, scheduling dispatchers, and automated billing workflows.",
    points: ["Role-based access & Client Portals", "Stripe / custom API integrations", "Real-time dispatch & database sync"],
    action: "Scope Web App",
    timeline: "4-8 wks",
  },
  {
    number: "SERVICE 03",
    slug: "standalone-desktop-tools",
    icon: "desktop",
    title: "Standalone & Desktop Tools",
    copy: "Tailored offline-first utilities, internal automation scripts, machine-interfacing software, and specialized operational suites designed to run locally on warehouse tablets, shop computers, or private servers.",
    points: ["Zero monthly licensing fees", "Local sqlite/encrypted data privacy", "Hardware & legacy barcode reader sync"],
    action: "Discuss Desktop App",
    timeline: "Custom",
  },
];

export const projects = [
  {
    slug: "timberline-logistics-portal",
    tag: "LOGISTICS & SUPPLY",
    result: "+42% Dispatch Speed",
    title: "Timberline Logistics Portal",
    copy: "Replaced 14 disconnected spreadsheets and frantic SMS dispatch threads with a unified web management hub connecting 38 regional freight drivers with live depot manifests.",
    stats: [["0 min", "Manual double entry"], ["3.5 Weeks", "Discovery to deployment"]],
    stack: "Next.js / Node.js / Postgres / Mapbox",
    visual: "logistics",
    reverse: false,
    detail: {
      challenge: "Dispatchers coordinated 38 drivers across depots using spreadsheets and long SMS threads. Manifest changes arrived late, duplicate entry was common, and managers had little visibility into daily fleet capacity.",
      approach: "We mapped the dispatch workflow with depot staff, then designed one shared operations portal around the three decisions they make most: what is ready, who is available, and which route should move next.",
      delivery: ["Live load and manifest board", "Driver and vehicle assignment", "Route status updates for depot teams", "Operational dashboard for daily review"],
      outcome: "The illustrative rollout reduced the time between a ready manifest and driver assignment, while giving the team one place to confirm the current plan.",
      timeline: "3.5 weeks",
      role: "Product strategy, UX, engineering, launch",
    },
  },
  {
    slug: "arbor-artisans-booking-store",
    tag: "CRAFT MANUFACTURING",
    result: "+185% Online Sales",
    title: "Arbor Artisans E-Commerce & Workshop Booking",
    copy: "A bespoke direct-to-consumer store combined with a specialized workshop reservation engine that automated their payment processing, registration intake, and calendar coordination.",
    stats: [["< 1.2s", "Page Load on Mobile 4G"], ["Zero", "Missed registration emails"]],
    stack: "Remix / Shopify Headless / Resend / Tailwind",
    visual: "booking",
    reverse: true,
    detail: {
      challenge: "The craft studio sold products online and ran paid workshops, but bookings, deposits, waivers, and instructor calendars lived in separate tools. Staff manually reconciled capacity and followed up on incomplete registrations.",
      approach: "We brought the store and workshop journey together, with clear session availability and a checkout flow that records the information the studio needs before each class.",
      delivery: ["Product catalog and streamlined checkout", "Workshop sessions with live seat counts", "Deposit collection and registration intake", "Calendar updates and confirmation emails"],
      outcome: "The illustrative studio gained a dependable view of each class roster and a smoother path from discovering a workshop to securing a seat.",
      timeline: "6 weeks",
      role: "Service design, commerce UX, integrations, engineering",
    },
  },
  {
    slug: "fieldflow-offline-operations",
    tag: "FIELD SERVICES",
    result: "100% Offline Capable",
    title: "FieldFlow Operations Suite",
    copy: "A lightweight, local-first tablet application for forestry management teams working deep in mountainous zones without internet connectivity. Queues work orders and auto-reconciles once back in range.",
    stats: [["0 SaaS", "Zero recurring subscription"], ["12 crews", "Simultaneous field audits"]],
    stack: "Tauri / Rust / SQLite / CRDTs",
    visual: "field",
    reverse: false,
    detail: {
      challenge: "Field crews worked beyond reliable mobile coverage. Paper notes and delayed re-entry made it hard to know which work orders were complete, and crews had to repeat updates after returning to signal.",
      approach: "We prioritized offline use from the start: work orders are stored locally, updates remain available without a connection, and the sync flow makes pending changes visible to the crew.",
      delivery: ["Offline-first tablet work orders", "Local records for inspections and notes", "Queued updates with sync status", "A simple supervisor view of crew progress"],
      outcome: "The illustrative field team could keep recording work in low-signal areas and reconcile updates when connectivity returned, with fewer details left to memory.",
      timeline: "8 weeks",
      role: "Workflow research, interface design, application engineering, handover",
    },
  },
];

export const frictions = [
  ["FRICTION 01", "Manual Booking & Phone Tag Chaos", "Losing leads because inquiries sit in an inbox for 24 hours while team members call back and forth to locate open time slots.", "Automated self-serve client scheduling synced in real-time with Google Calendar/Outlook, upfront deposit charging, and automated SMS reminders."],
  ["FRICTION 02", "Fragmented Systems & Double Entry", "Data trapped in one CRM, copied manually into QuickBooks, and re-typed into a dispatch spreadsheet, breeding costly mistakes.", "A bespoke web portal bridging your existing software stack or replacing it entirely with one unified source of operational truth."],
  ["FRICTION 03", "Outdated Website Failing to Convert", "An eight-year-old template website that takes 6 seconds to load on mobile and fails to convey the caliber of your craftsmanship.", "Ultra-clean modern aesthetics, sub-second load times, crisp storytelling, and high-impact lead inquiry funnels that win deals."],
  ["FRICTION 04", "Crippling SaaS Subscription Bloat", "Paying $1,200/month across 7 generic subscription tools where your team only uses 10% of the complex, confusing features.", "One custom, streamlined software asset that you own forever. No monthly user seat penalties, no surprise licensing increases."],
];

export const process = [
  ["01", "01 / ALIGNMENT", "Deep Discovery", "We start with a working session to understand your customers, goals, daily bottlenecks, and the tools your team already relies on. Together we rank the opportunities by impact, capture constraints, and agree what success should look like."],
  ["02", "02 / CLARITY", "Fixed Proposal", "You receive a written scope with user journeys, deliverables, assumptions, responsibilities, and acceptance criteria. We map milestones and review dates, explain any third-party costs, and confirm the fee and schedule before work begins."],
  ["03", "03 / PROTOTYPE", "UI/UX Design", "We map the key screens and shape them into a clickable prototype before engineering starts. You can review the content, layout, and user flows on desktop and mobile, then give feedback at planned checkpoints."],
  ["04", "04 / BUILD", "Engineering", "We build in small, reviewable stages and share progress against the agreed scope. Each stage includes functional checks, responsive review, and a demonstration so issues and decisions are visible while there is still time to adjust."],
  ["05", "05 / FREEDOM", "Launch & Handover", "Before release, we complete final checks, prepare the production environment, and coordinate a planned launch. We then hand over the source code, access details, setup notes, and recorded team training, with support arranged as agreed."],
];

export const faqs = [
  ["Who owns the code after the project launches?", "You do. After the agreed project fees are paid, the finished code and project-specific design files are handed over to you. We document the hosting, domain, and third-party accounts used, and make clear which services have their own fees. You can maintain the software yourself or ask us for help later."],
  ["How long does a typical build take?", "A focused website sprint often takes two to four weeks. A custom application can take five to ten weeks or more, depending on integrations, data migration, and approval steps. Before work begins, we agree on milestones, review dates, and what you need to provide so the schedule is clear."],
  ["What happens if we need changes or maintenance after launch?", "We include a post-launch handover and a defined warranty period in the project proposal. The warranty covers issues where the delivered work does not match the agreed scope; new features and changes are estimated separately. After handover, you can make updates in-house or request support when you need it."],
  ["Do we need to buy expensive servers or software licenses?", "Usually not. We choose hosting and third-party services to fit your expected traffic and operational needs, then identify their ongoing costs before you approve the plan. Some projects can run on low-cost hosting or local devices, while others need paid infrastructure for reliability, payments, email, or data storage."],
];
