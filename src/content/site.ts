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
    logoColor: "/assets/home/brand/adam-logo-color.svg",
    logoSign: "/assets/home/brand/adam-sign.svg",
    logoWhite: "/assets/home/brand/adam-logo-white.svg",
    logoSignLight: "/assets/home/brand/adam-sign-light.svg",
    linkedin: "https://www.linkedin.com/",
  },

  nav: {
    /* Hrefs are root-relative so they resolve from both `/` and `/solutions`. */
    links: [
      { label: "Problem", href: "/#problem" },
      { label: "Technology", href: "/technology" },
      { label: "Why ADAM", href: "/#why" },
      { label: "Solutions", href: "/solutions" },
      { label: "See It in Action", href: "/#demo" },
      { label: "Who we are", href: "/#company" },
      { label: "News", href: "/#news" },
    ] as NavLink[],
    /** Opens the shared contact mailto — see components/ui/ContactCta. */
    cta: { label: "Start a conversation" },
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
    image: "/assets/home/hero-moving-lab.webp",
    imageAlt: "ADAM sensor on a partner vehicle tracing a measurement route through a city",
  },

  problem: {
    eyebrow: "The problem",
    /** Sector 2 of the brief is the stat wall itself — the lead figure carries the heading weight. */
    label: "Air pollution in Europe, in numbers",
    backdrop: "/assets/home/polluted-city.webp",
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
      image: "/assets/home/adam-hardware-closed.webp",
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
        icon: "/assets/home/icons/process/01-partner-fleet.webp",
      },
      {
        num: "02",
        title: "Mobile sensing",
        body: "Sensors read CO, CO₂, NO, NO₂, NOₓ, NH₃, O₃, SO₂, H₂S and TRS, plus PM1–PM10 and total suspended particulates — continuously as the vehicle moves, and while parked.",
        icon: "/assets/home/icons/process/02-mobile-sensing.webp",
      },
      {
        num: "03",
        title: "AI validation",
        body: "Models cross-check every measurement against context data: location, speed, traffic, weather.",
        icon: "/assets/home/icons/process/03-data-quality.webp",
      },
      {
        num: "04",
        title: "City map",
        body: "Validated data resolves into a street-level air quality layer covering the whole city.",
        icon: "/assets/home/icons/process/04-city-map.webp",
      },
      {
        num: "05",
        title: "Reporting",
        body: "Quality-checked data feeds planning, public health and regulatory reporting workflows.",
        icon: "/assets/home/icons/process/05-reporting.webp",
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
        icon: "/assets/home/icons/capabilities/broader-spatial-context.webp",
      },
      {
        num: "02",
        title: "AI-validated data",
        body: "Up to 96% accuracy on validated direct measurements. Over 100,000 measurements per vehicle per year continuously improve our models.",
        icon: "/assets/home/icons/capabilities/visible-data-quality.webp",
      },
      {
        num: "03",
        title: "CSRD-ready reports",
        body: "Auto-generated ESRS E1/E2 compliant reports accepted by EU regulators, auditors and banks. One click — the report is ready.",
        icon: "/assets/home/icons/capabilities/reporting-ready-evidence.svg",
      },
      {
        num: "04",
        title: "10× more affordable",
        body: "One stationary station costs €50,000–€150,000. ADAM covers an entire city via partner fleets at a fraction of that cost.",
        icon: "/assets/home/icons/capabilities/faster-insight.webp",
      },
      {
        num: "05",
        title: "EN 15267-4 certification",
        body: "Targeting the only standard that makes mobile air quality data legally recognised for regulatory reporting and ESG audits.",
        icon: "/assets/home/icons/capabilities/recognized-quality-path.svg",
      },
      {
        num: "06",
        title: "Asset-light model",
        body: "No proprietary fleet required. We partner with existing taxi and logistics operators — rapid deployment, low capital cost.",
        icon: "/assets/home/icons/capabilities/practical-deployment.webp",
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
    image: "/assets/home/adam-kyiv-illustrative-demo.webp",
    imageAlt: "ADAM Kyiv demo interface — simulated air quality heat layer over a city map",
  },

  network: {
    eyebrow: "Build the first network with us",
    title: "Existing routes can become shared environmental infrastructure.",
    /** Opens the shared contact mailto — see components/ui/ContactCta. */
    cta: { label: "Discuss a pilot →" },
    /** Teaser link on each card; targets the matching sector on /solutions. */
    explore: "Full solution →",
    audiences: [
      {
        id: "cities",
        sector: "B2G",
        accent: "cyan",
        icon: "/assets/home/icons/audiences/cities-public-agencies-clean.webp",
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
        icon: "/assets/home/icons/audiences/industry-logistics-clean.webp",
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
        icon: "/assets/home/icons/audiences/people-communities-clean.svg",
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
    },
  },

  /**
   * /technology — the three layers of the system, in brief revision 2 order:
   * Hardware, Software, AI engine. Bullet wording follows the brief; the
   * EN 15267-4 line stays at *targeting*.
   */
  technology: {
    eyebrow: "Technology",
    title: ["One measurement chain.", "Three layers."],
    lede: "Instruments on the roof of a partner vehicle, a platform that makes every reading usable, and an AI engine that turns a year of measurements into decisions.",

    hardware: {
      title: "Hardware",
      lede: "Modular plug-and-play design — compact, lightweight, easy rooftop installation on partner vehicles.",
      methodsLabel: "Measurement methods",
      methods: [
        { method: "NDIR", body: "CO/CO₂ concentration measurements." },
        { method: "Chemiluminescence", body: "NO/NO₂/NOx/NH₃/O₃ measurements." },
        { method: "UV-fluorescence", body: "SO₂/H₂S/TRS measurements." },
        { method: "Optical counter", body: "PM1/PM2.5/PM5/PM10 and TSP dust monitoring." },
        { method: "Electrochemical sensors", body: "Additional pollutant measurement." },
      ],
      systemsLabel: "Supporting systems",
      systems: [
        {
          title: "Li-Ion accumulator",
          body: "24/7 uninterrupted operation when vehicle power is unavailable.",
        },
        { title: "Thermoelectric coolers", body: "High-precision temperature stabilisation." },
        { title: "EHD-based air amplifier", body: "Continuous high-volume air sampling." },
      ],
      operation:
        "During operation, air is continuously sampled from outside, heated to evaporate moisture and stabilise temperature, then measured simultaneously across all modules.",
      certification:
        "Targeting EN 15267-4 certification — data legally recognised for EU regulatory reporting and ESG audits.",
      figure: {
        src: "/assets/technology/adam-sensing-unit-render.webp",
        alt: "Engineering render of the ADAM sensing unit carried on a vehicle roof",
        caption: "Engineering render — hardware in development.",
      },
    },

    software: {
      title: "Software",
      lede: "One platform for the city that regulates the air, the fleet that measures it and the people who breathe it.",
      features: [
        {
          icon: "map",
          title: "Real-time city dashboard",
          body: "Street-level heatmap updated every 5–15 minutes.",
        },
        {
          icon: "fleet",
          title: "Fleet tracking",
          body: "Live positions of all monitoring vehicles.",
        },
        {
          icon: "alert",
          title: "Automated alerts",
          body: "Notifications when pollutant norms are exceeded.",
        },
        {
          icon: "report",
          title: "Compliance reporting",
          body: "Automated CSRD/ESRS E1/E2 report generation with PDF and Excel export.",
        },
        {
          icon: "passport",
          title: "ESG building passport",
          body: "Location evidence for BREEAM, LEED, EU Taxonomy and green financing.",
        },
        {
          icon: "api",
          title: "API access",
          body: "Integration into client systems, navigation platforms and insurance tools.",
        },
        {
          icon: "mobile",
          title: "Mobile app",
          body: "Personal air quality alerts, clean air route planning and pollution exposure insights.",
        },
      ],
      disclaimer: "Interface previews are illustrative and use simulated data.",
    },

    ai: {
      title: "AI engine",
      lede: "Over 100,000 measurements per vehicle per year — processed through algorithmic validation combined with AI-assisted analysis and forecasting in real time.",
      steps: [
        {
          num: "01",
          title: "Data validation",
          body: "Filters dirty readings from tunnels, parking and heavy traffic. Cross-checks with nearby certified stations. Labels data by validity level.",
        },
        {
          num: "02",
          title: "City analysis",
          body: "Identifies pollution hotspots and recurring patterns. Correlates data with wind, humidity and temperature. Detects morning peaks, seasonality and day/night cycles.",
        },
        {
          num: "03",
          title: "Forecasting",
          body: "24–72h air quality forecasts per location. Predicts norm exceedances before they occur. District-level exposure analysis and mapping of anomalous pollution events.",
        },
        {
          num: "04",
          title: "Recommendations & optimization",
          body: "Where to place stationary sensors. Traffic rerouting that reduces pollution. Urban planning inputs for schools, parks and offices. Auto-generated CSRD/ESRS reports.",
        },
      ],
      note: "Forecasting and street-level simulation are development goals, planned after the first large-scale deployment.",
    },

    cta: {
      title: "Want ADAM measuring your streets?",
      body: "Join the first pilot network — as a city, a fleet operator or a data partner.",
      label: "Discuss a pilot",
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
      logo: "/assets/home/eu-funded-light.webp",
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
    skyline: "/assets/home/footer-skyline.webp",
    groups: [
      {
        title: "Explore",
        links: [
          { label: "Technology", href: "/technology" },
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
