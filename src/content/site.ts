/**
 * Single source of truth for every string, link and asset path on the homepage.
 *
 * Copy is taken verbatim from the approved Claude design
 * (`aervigil-webpage-design/Aervigil Homepage.dc.html`). See `docs/content-map.md`
 * for the section-by-section mapping. Components read from here; copy is never inlined
 * in JSX.
 */

export type NavLink = { label: string; href: string };

export type ProblemStat = {
  /** First-column figure ("330K+") or, on note rows, the accented key phrase. */
  value?: string;
  /** Body copy. The `emphasis` substring is highlighted inside it (empty = none). */
  text: string;
  emphasis: string;
  /** The first stat renders as the oversized lead row. */
  lead?: boolean;
  /** Phrase-led row: the accent sits in the first column so the problem reads column-first. */
  note?: boolean;
};

export type ProcessStep = { num: string; title: string; body: string; icon: string };

export type Advantage = { num: string; title: string; body: string; icon: string };

/** One audience inside a sector card: the challenge it faces and what ADAM answers with. */
export type AudienceCase = { title: string; challenge: string; solution: string };

export type Audience = {
  id: string;
  /** Market sector the card addresses — rendered as a badge. */
  sector: "B2G" | "B2B" | "B2C";
  icon: string;
  iconAlt: string;
  /** `cyan` for cities, `green` for industry and real estate, `navy` for people. */
  accent: "cyan" | "green" | "navy";
  /** Sector heading on the solutions page and the homepage teaser card. */
  title: string;
  /** B2B carries two audiences; the others one. */
  cases: AudienceCase[];
};

export type NewsItem = {
  year: string;
  title: string;
  /** Placeholder entries render in mono type with a muted rule. */
  placeholder?: boolean;
};

export const site = {
  brand: {
    product: "ADAM",
    company: "AerVigil",
    lockup: "by AerVigil",
    logoColor: "/assets/adam-logo-color.svg",
    logoSign: "/assets/adam-sign.svg",
    logoWhite: "/assets/adam-logo-white.svg",
    logoSignLight: "/assets/adam-sign-light.svg",
    linkedin: "https://www.linkedin.com/",
  },

  nav: {
    /* Hrefs are root-relative so they resolve from both `/` and `/solutions`. */
    links: [
      { label: "Problem", href: "/#problem" },
      { label: "Technology", href: "/#solution" },
      { label: "Why ADAM", href: "/#why" },
      { label: "Solutions", href: "/solutions" },
      { label: "See It in Action", href: "/#demo" },
      { label: "Who we are", href: "/#company" },
      { label: "News", href: "/#news" },
    ] as NavLink[],
    cta: { label: "Start a conversation", href: "/#contact" },
    /* Downloadable product brochure, mirrored in the footer's Explore group. */
    brochure: { label: "Brochure", href: "/downloads/adam-brochure-2026.pdf" },
  },

  hero: {
    badge: "Grant-backed development program",
    headline: ["Move.", "Measure.", "Change."],
    /* The mission is one block: headline + tagline + sensor line, never separated. */
    tagline: "Cities in motion. Air under control.",
    sensor: "We turned the city into a sensor.",
    body: "ADAM is a mobile, AI-driven air monitoring system in development by AerVigil — designed to ride on partner vehicles and read the air street by street.",
    primaryCta: { label: "See it in action", href: "#demo" },
    secondaryCta: { label: "How ADAM works", href: "#solution" },
    image: "/assets/illustrations/hero-moving-lab.png",
    imageAlt: "ADAM sensor on a partner vehicle tracing a measurement route through a city",
  },

  problem: {
    eyebrow: "The problem",
    /** Sector 2 of the brief is the stat wall itself — the lead figure carries the heading weight. */
    label: "Air pollution in Europe, in numbers",
    backdrop: "/assets/polluted-city.jpg",
    stats: [
      {
        lead: true,
        value: "330K+",
        emphasis: "Premature deaths",
        text: "Premature deaths per year from air pollution in Europe",
      },
      {
        value: "95%",
        emphasis: "unsafe air pollutant levels",
        text: "Of urban Europeans exposed to unsafe air pollutant levels",
      },
      {
        value: "50K",
        emphasis: "verified air data under CSRD",
        text: "EU companies required to report verified air data under CSRD from 2025",
      },
      {
        note: true,
        value: "EU Air Quality Directive 2024",
        emphasis: "",
        text: "brings stricter EU air quality limits, pushing many cities out of compliance",
      },
      {
        value: "5–10%",
        emphasis: "stationary monitoring stations",
        text: "Of city area covered by stationary monitoring stations.",
      },
      {
        note: true,
        value: "€50,000–€150,000",
        emphasis: "",
        text: "is the cost of just one stationary monitoring station, making dense networks financially impossible",
      },
    ] as ProblemStat[],
  },

  solution: {
    eyebrow: "The solution",
    title: ["You can’t fix what you", "can’t measure."],
    body: "ADAM is a mobile AI-driven air quality monitoring system that turns partner vehicle fleets — taxis, delivery, and logistics — into a network of street-level sensors, giving cities full real-time coverage at a fraction of the cost of stationary stations.",
    specs: [
      {
        accent: "cyan" as const,
        title: "Rooftop unit",
        body: "Standard roof-box mounting, powered by the vehicle, ~1 hour install",
      },
      {
        accent: "green" as const,
        title: "Modular sensing",
        body: "Plug-and-play modules covering the full gas and dust suite — compact and lightweight",
      },
    ],
    figure: {
      image: "/assets/adam-hardware-closed.jpg",
      alt: "ADAM rooftop sensing unit — studio render of the closed enclosure",
      caption: "ADAM unit · enclosure prototype",
      status: "in development",
    },
  },

  how: {
    title: "How it works",
    lede: "One continuous route: from a partner vehicle to a decision a city can act on.",
    steps: [
      {
        num: "01",
        title: "Partner fleet",
        body: "ADAM units mount on the roofs of taxis, delivery and service vehicles already on the road.",
        icon: "/assets/icons/process/01-partner-fleet.png",
      },
      {
        num: "02",
        title: "Mobile sensing",
        body: "Sensors read CO, CO₂, NO, NO₂, NOₓ, NH₃, O₃, SO₂, H₂S and TRS, plus PM1–PM10 and total suspended particulates — continuously as the vehicle moves, and while parked.",
        icon: "/assets/icons/process/02-mobile-sensing.png",
      },
      {
        num: "03",
        title: "AI validation",
        body: "Models cross-check every measurement against context data: location, speed, traffic, weather.",
        icon: "/assets/icons/process/03-data-quality.png",
      },
      {
        num: "04",
        title: "City map",
        body: "Validated data resolves into a street-level air quality layer covering the whole city.",
        icon: "/assets/icons/process/04-city-map.png",
      },
      {
        num: "05",
        title: "Reporting",
        body: "Quality-checked data feeds planning, public health and regulatory reporting workflows.",
        icon: "/assets/icons/process/05-reporting.png",
      },
    ] as ProcessStep[],
  },

  why: {
    eyebrow: "Why ADAM",
    title: "Why this changes the map",
    advantages: [
      {
        num: "01",
        title: "Full city coverage",
        body: "Vehicles cover 100% of city streets — not just 10 fixed points. Every street, every neighborhood, every hour.",
        icon: "/assets/icons/capabilities/broader-spatial-context.png",
      },
      {
        num: "02",
        title: "AI-validated data",
        body: "Up to 96% accuracy on validated direct measurements. Over 100,000 measurements per vehicle per year continuously improve our models.",
        icon: "/assets/icons/capabilities/visible-data-quality.png",
      },
      {
        num: "03",
        title: "CSRD-ready reports",
        body: "Auto-generated ESRS E1/E2 compliant reports accepted by EU regulators, auditors and banks. One click — the report is ready.",
        icon: "/assets/icons/capabilities/reporting-ready-evidence.svg",
      },
      {
        num: "04",
        title: "10× more affordable",
        body: "One stationary station costs €50,000–€150,000. ADAM covers an entire city via partner fleets at a fraction of that cost.",
        icon: "/assets/icons/capabilities/faster-insight.png",
      },
      {
        num: "05",
        title: "EN 15267-4 certification",
        body: "Targeting the only standard that makes mobile air quality data legally recognised for regulatory reporting and ESG audits.",
        icon: "/assets/icons/capabilities/recognized-quality-path.svg",
      },
      {
        num: "06",
        title: "Asset-light model",
        body: "No proprietary fleet required. We partner with existing taxi and logistics operators — rapid deployment, low capital cost.",
        icon: "/assets/icons/capabilities/practical-deployment.png",
      },
    ] as Advantage[],
  },

  demo: {
    eyebrow: "See it in action",
    title: ["The whole city,", "one living map."],
    body: "Vehicles, routes and measurement points resolve into a street-level air quality layer — refreshed as the fleet moves, readable at a glance with the EU air quality index.",
    cta: { label: "Open the visual demo", href: "https://adam.aervigil.com" },
    disclaimer:
      "Illustrative demo with simulated data — not a live deployment or certified measurement result.",
    image: "/assets/adam-kyiv-illustrative-demo.png",
    imageAlt: "ADAM Kyiv demo interface — simulated air quality heat layer over a city map",
  },

  network: {
    eyebrow: "Build the first network with us",
    title: "Existing routes can become shared environmental infrastructure.",
    cta: { label: "Discuss a pilot →", href: "/#contact" },
    /** Teaser link on each card; targets the matching sector on /solutions. */
    explore: "Full solution →",
    audiences: [
      {
        id: "cities",
        sector: "B2G",
        accent: "cyan",
        icon: "/assets/icons/audiences/cities-public-agencies-clean.png",
        iconAlt: "Line drawing of a civic building with a measurement route",
        title: "Cities & public administrations",
        cases: [
          {
            title: "Municipalities & City Administrations",
            challenge:
              "Cities must monitor air quality across their entire territory — but stationary stations cover only 5–10% of urban areas and cost €50,000–€150,000 each.",
            solution:
              "Real-time air quality map of every street via partner fleets. Automated EU Air Quality Directive compliance reporting. Data for traffic management and urban planning.",
          },
        ],
      },
      {
        id: "industry",
        sector: "B2B",
        accent: "green",
        icon: "/assets/icons/audiences/industry-logistics-clean.png",
        iconAlt: "Line drawing of a delivery van leaving a depot on a measurement route",
        title: "Business, industry & real estate",
        cases: [
          {
            title: "Industrial Enterprises & Logistics",
            challenge:
              "Under EU CSRD (mandatory from 2025), 50,000 companies must submit verified air quality data — most have no way to collect it.",
            solution:
              "Continuous monitoring around facilities and along fleet routes. Auto-generated CSRD/ESRS E1/E2 compliant reports ready for regulators and auditors.",
          },
          {
            title: "Real Estate Developers",
            challenge:
              "ESG certification and green financing require verified environmental data for specific locations — often unavailable or expensive to obtain.",
            solution:
              "ESG building passport — a verified air quality profile for any location, supporting BREEAM, LEED and EU Taxonomy certification.",
          },
        ],
      },
      {
        id: "citizens",
        sector: "B2C",
        accent: "navy",
        icon: "/assets/icons/audiences/people-communities-clean.svg",
        iconAlt: "Line drawing of residents on a street with a measurement route",
        title: "People & communities",
        cases: [
          {
            title: "Citizens",
            challenge:
              "No reliable way to know real air quality on your street, running route or near your child’s school.",
            solution:
              "Mobile app with real-time alerts, clean air routes and personal pollution exposure insights.",
          },
        ],
      },
    ] as Audience[],
  },

  /** /solutions page chrome. Sector content comes from `network.audiences`. */
  solutions: {
    eyebrow: "Solutions",
    title: ["One route.", "Three destinations."],
    lede: "Every measurement ADAM takes travels the same route — from a partner vehicle to the people who act on it. Cities, companies and citizens read the same air, for different decisions.",
    challengeLabel: "Challenge",
    solutionLabel: "Solution",
    cta: {
      title: "Ready to put your city on the route?",
      body: "Join the first pilot network — as a city, a fleet operator or a data partner.",
      label: "Discuss a pilot",
      href: "/#contact",
    },
  },

  technology: {
    intro: {
      eyebrow: "The ADAM system",
      title: ["One measurement chain.", "Three layers of intelligence."],
      lede: "Hardware captures the street. Software makes the network visible. Data analytics turns every route into evidence a city can act on.",
      navLabel: "Technology sections",
      layers: [
        { label: "Hardware", href: "#hardware", phase: "Capture" },
        { label: "Software", href: "#software", phase: "See" },
        { label: "Data analytics", href: "#analytics", phase: "Understand" },
      ],
    },

    hardware: {
      phase: "01 · Capture",
      title: "Hardware",
      headline: "A mobile lab, built for the roofline.",
      body: "A compact, modular sensing platform designed for partner vehicles. Outside air moves through one conditioned sampling path, then reaches every measurement module at the same moment.",
      image: "/assets/illustrations/ADAM ass(1).JPG",
      imageAlt: "Engineering render of the modular ADAM rooftop air quality monitoring unit",
      caption: "ADAM modular rooftop unit · engineering render",
      status: "Hardware in development",
      methodLabel: "Measurement suite",
      methods: [
        { name: "NDIR", detail: "CO and CO₂ concentration" },
        { name: "Chemiluminescence", detail: "NO, NO₂, NOₓ, NH₃ and O₃" },
        { name: "UV fluorescence", detail: "SO₂, H₂S and TRS" },
        { name: "Optical counting", detail: "PM1, PM2.5, PM5, PM10 and TSP" },
        { name: "Electrochemical", detail: "Additional pollutant measurement" },
      ],
      engineeringLabel: "Engineered for motion",
      engineering: [
        { title: "Continuous sampling", body: "An EHD-based air amplifier maintains high-volume outside-air flow." },
        { title: "Stable readings", body: "Air is heated to remove moisture while thermoelectric coolers stabilise temperature." },
        { title: "Always on", body: "A Li-Ion accumulator supports uninterrupted operation when vehicle power is unavailable." },
        { title: "Plug-and-play", body: "Lightweight sensing blocks simplify rooftop installation, service and future upgrades." },
      ],
      disclosure: "Targeting EN 15267-4 certification. ADAM is in development and is not yet a certified measurement system.",
    },

    software: {
      phase: "02 · See",
      title: "Software",
      headline: "The moving network, made legible.",
      body: "One operational view connects routes, vehicles and measurement quality. Teams can see where the fleet has measured, inspect street-level conditions and move directly from an alert to a report.",
      featureLabel: "Operational tools",
      features: [
        { icon: "map", title: "Live city map", body: "Street-level heatmaps refreshed every 5–15 minutes." },
        { icon: "route", title: "Fleet tracking", body: "Live position and route coverage for every monitoring vehicle." },
        { icon: "alert", title: "Automated alerts", body: "Notifications when pollutant norms are exceeded." },
        { icon: "report", title: "Reporting", body: "CSRD and ESRS E1/E2 workflows with PDF and Excel export." },
        { icon: "passport", title: "ESG building passport", body: "Location evidence for BREEAM, LEED, EU Taxonomy and green finance." },
        { icon: "api", title: "API and mobile access", body: "Integration with client systems plus personal air-quality tools." },
      ],
      visual: {
        product: "ADAM City Console",
        status: "Network online",
        city: "Kyiv pilot view",
        timestamp: "Updated 09:42",
        filter: "AQI · EU",
        mapLabel: "Route coverage",
        mapValue: "84%",
        chartLabel: "NO₂ · route average",
        chartValue: "31 µg/m³",
        readings: [
          { label: "PM2.5", value: "18", unit: "µg/m³", tone: "good" },
          { label: "NO₂", value: "31", unit: "µg/m³", tone: "watch" },
          { label: "O₃", value: "46", unit: "µg/m³", tone: "good" },
        ],
        report: "Daily evidence pack ready",
      },
      disclosure: "Illustrative interface with simulated data — not a live deployment or certified measurement result.",
    },

    analytics: {
      phase: "03 · Understand",
      title: "Data analytics",
      headline: "From raw readings to a city-scale signal.",
      body: "Each vehicle can produce more than 100,000 measurements per year. The analytics layer is designed to clean, contextualise and model that stream so decision-makers can work with evidence rather than noise.",
      stagesLabel: "Analysis pipeline",
      stages: [
        {
          step: "01",
          title: "Validate",
          body: "Filter contaminated readings, compare nearby reference stations and label validity.",
        },
        {
          step: "02",
          title: "Model the city",
          body: "Find hotspots and recurring patterns across weather, traffic, time and place.",
        },
        {
          step: "03",
          title: "Forecast",
          body: "Develop 24–72 hour location forecasts and detect anomalous pollution events.",
        },
        {
          step: "04",
          title: "Recommend",
          body: "Support sensor placement, traffic decisions, urban planning and evidence workflows.",
        },
      ],
      metrics: [
        { value: "100K+", label: "measurements per vehicle / year" },
        { value: "5–15 min", label: "target heatmap refresh" },
        { value: "24–72h", label: "forecast horizon in development" },
      ],
      visual: {
        label: "Validated city signal",
        input: "Raw mobile readings",
        context: "Weather · traffic · location",
        output: "Decision-ready evidence",
      },
      note: "Street-level simulation and forecasting are long-term development goals following first large-scale deployment.",
      cta: { label: "Discuss a pilot", href: "/#contact" },
    },
  },
  company: {
    mission: {
      eyebrow: "Our mission",
      lead: "Make street-level air quality as visible — and as actionable — as traffic. Every street, every neighborhood, every hour.",
    },
    team: {
      eyebrow: "Team",
      body: "AerVigil is assembling a team across sensing hardware, machine learning and urban data — building ADAM through a funded development program with pilot conversations under way.",
      note: "Team and pilot network now forming →",
    },
    backing: {
      eyebrow: "Backed by",
      logo: "/assets/eu-funded-light.png",
      logoAlt: "Funded by the European Union",
      body: "ADAM received Horizon Europe / European Innovation Council support through a program for Ukrainian technology SMEs and startups.",
    },
  },

  news: {
    title: "News",
    allLink: { label: "All news →", href: "#news" },
    items: [
      {
        year: "2026",
        title: "ADAM receives Horizon Europe / EIC support for Ukrainian tech startups",
      },
      { year: "2026", title: "[ upcoming: pilot program announcement ]", placeholder: true },
      { year: "2026", title: "[ upcoming: hardware development update ]", placeholder: true },
    ] as NewsItem[],
  },

  contact: {
    title: "Put your city in motion.",
    body: "Cities, fleets, industry, researchers — if street-level air intelligence matters to you, let’s talk.",
    ctaLabel: "Start a conversation",
    /** Rendered as `mailto:?subject=…`, matching the design (recipient left blank). */
    mailSubject: "ADAM by AerVigil",
  },

  footer: {
    tagline: "Mobile AI-driven air quality monitoring, in development by AerVigil.",
    skyline: "/assets/illustrations/footer-skyline.png",
    groups: [
      {
        title: "Explore",
        links: [
          { label: "Technology", href: "/#solution" },
          { label: "Why ADAM", href: "/#why" },
          { label: "Solutions", href: "/solutions" },
          { label: "See It in Action", href: "/#demo" },
          { label: "News", href: "/#news" },
          { label: "Brochure (PDF)", href: "/downloads/adam-brochure-2026.pdf" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "LinkedIn", href: "https://www.linkedin.com/" },
          { label: "Contact form", href: "/#contact" },
        ],
      },
    ] as { title: string; links: NavLink[] }[],
    legal:
      "© 2026 AerVigil · aervigil.com — ADAM is a development program; demo content is illustrative. Funding acknowledgement wording pending final grant-agreement text.",
  },
} as const;
