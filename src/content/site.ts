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
  /** Large figure, e.g. "330K+". Rendered with tabular numerals. */
  value: string;
  /** Body copy. The `emphasis` substring is highlighted inside it. */
  text: string;
  emphasis: string;
  /** The first stat renders as the oversized lead row. */
  lead?: boolean;
};

export type ProcessStep = { num: string; title: string; body: string; icon: string };

export type Advantage = { num: string; title: string; body: string; icon: string };

export type Audience = {
  id: string;
  title: string;
  icon: string;
  iconAlt: string;
  /** `cyan` for cities, `green` for fleet operators — matches the route colours. */
  accent: "cyan" | "green";
  points: string[];
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
    logoWhite: "/assets/adam-logo-white.svg",
    linkedin: "https://www.linkedin.com/",
  },

  nav: {
    links: [
      { label: "Problem", href: "#problem" },
      { label: "Technology", href: "#solution" },
      { label: "Why ADAM", href: "#why" },
      { label: "Demo", href: "#demo" },
      { label: "Pilot", href: "#network" },
      { label: "Company", href: "#company" },
      { label: "News", href: "#news" },
    ] as NavLink[],
    cta: { label: "Start a conversation", href: "#contact" },
  },

  hero: {
    badge: "Grant-backed development program · Team and pilot network now forming",
    headline: ["Move.", "Measure.", "Change."],
    tagline: "Cities in motion. Air under control.",
    body: "We turned the city into a sensor. ADAM is a mobile, AI-driven air monitoring system in development by AerVigil — designed to ride on partner vehicles and read the air street by street.",
    primaryCta: { label: "See it in action", href: "#demo" },
    secondaryCta: { label: "How ADAM works", href: "#solution" },
    image: "/assets/illustrations/hero-moving-lab.png",
    imageAlt: "ADAM sensor on a partner vehicle tracing a measurement route through a city",
  },

  problem: {
    eyebrow: "The problem",
    title: "You can’t fix what you can’t measure.",
    backdrop: "/assets/polluted-city.jpg",
    stats: [
      {
        lead: true,
        value: "330K+",
        emphasis: "Premature deaths",
        text: "Premature deaths per year from air pollution in Europe — the single largest environmental health risk on the continent.",
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
        value: "5–10%",
        emphasis: "€50,000–€150,000 each",
        text: "Of city area covered by stationary stations — at €50,000–€150,000 each, dense networks are financially impossible",
      },
      {
        value: "Directive 2024",
        emphasis: "cities compliant yesterday are in violation today",
        text: "The new EU Air Quality Directive sets stricter limits — cities compliant yesterday are in violation today",
      },
    ] as ProblemStat[],
  },

  solution: {
    eyebrow: "The solution",
    title: ["ADAM — AI-Driven", "Air Monitoring"],
    body: "ADAM is a mobile AI-driven air quality monitoring system that turns partner vehicle fleets — taxis, delivery and logistics — into a network of street-level sensors, giving cities full real-time coverage at a fraction of the cost of stationary stations.",
    specs: [
      {
        accent: "cyan" as const,
        title: "Rooftop unit",
        body: "Standard roof-box mounting, powered by the vehicle, ~1 hour install",
      },
      {
        accent: "green" as const,
        title: "Modular sensing",
        body: "Particulate matter, NO₂ and O₃ first — new modules can be added later",
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
        body: "Sensors read particulates, NO₂ and O₃ continuously as the vehicle moves — and while parked.",
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
    title: "Six reasons this changes the map",
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
        title: "EN 15267-4 path",
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
    cta: { label: "Discuss a pilot →", href: "#contact" },
    audiences: [
      {
        id: "cities",
        title: "For cities",
        accent: "cyan",
        icon: "/assets/icons/audiences/cities-public-agencies-clean.png",
        iconAlt: "Line drawing of a civic building with a measurement route",
        points: [
          "Understand street-level patterns",
          "Improve planning and operations",
          "Support policies with better evidence",
          "Communicate with confidence",
        ],
      },
      {
        id: "fleets",
        title: "For fleet operators",
        accent: "green",
        icon: "/assets/icons/audiences/industry-logistics-clean.png",
        iconAlt: "Line drawing of a delivery van leaving a depot on a measurement route",
        points: [
          "Use routes you already run",
          "Low-disruption, easy installation",
          "Designed for passenger cars and vans",
          "Contribute to a cleaner, healthier city",
        ],
      },
    ] as Audience[],
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
    euLogo: "/assets/eu-funded-dark.png",
    euLogoAlt: "Funded by the European Union",
    groups: [
      {
        title: "Explore",
        links: [
          { label: "Technology", href: "#solution" },
          { label: "Why ADAM", href: "#why" },
          { label: "Demo", href: "#demo" },
          { label: "News", href: "#news" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "LinkedIn", href: "https://www.linkedin.com/" },
          { label: "Contact form", href: "#contact" },
        ],
      },
    ] as { title: string; links: NavLink[] }[],
    legal:
      "© 2026 AerVigil · aervigil.com — ADAM is a development program; demo content is illustrative. Funding acknowledgement wording pending final grant-agreement text.",
  },
} as const;
