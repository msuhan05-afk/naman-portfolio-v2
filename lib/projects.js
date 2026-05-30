export const projects = [
  {
    slug: "metalane",
    title: "Metalane Health",
    subtitle: "End-to-end digital health platform",
    category: "Product Design",
    year: "2023",
    color: "#1a1f2e",
    accent: "#4a7fa5",
    tags: ["UX Research", "Design Systems", "Health-tech"],
    summary: "Designed an end-to-end digital health platform — service discovery, appointment scheduling, family health records, and insurance workflows.",
    role: "Lead Product Designer",
    duration: "8 months",
    outcome: "Shipped to beta with 200+ early users. Multi-profile family dashboard serving dependants under one account.",
    sections: [
      {
        type: "overview",
        heading: "The Problem",
        body: "Families in urban India lacked a single platform to discover, book, and manage healthcare for all members. Existing apps served individuals, not households.",
      },
      {
        type: "research",
        heading: "Research & Discovery",
        body: "Conducted 14 user interviews and 3 diary studies across family structures. Key insight: one person — usually a parent — manages health decisions for 3–5 dependants.",
      },
      {
        type: "design",
        heading: "Design System",
        body: "Built a component library covering 60+ elements. Accessibility-first: WCAG AA contrast, plain language, and scalable type system for varying health literacy levels.",
      },
      {
        type: "outcome",
        heading: "Outcome",
        body: "Beta launched with core flows: doctor search, appointment scheduling, health record upload, and insurance case builder.",
      },
    ],
  },
  {
    slug: "wild-wisdom",
    title: "Wild Wisdom",
    subtitle: "Educational platform for young wildlife learners",
    category: "UX / UI",
    year: "2023",
    color: "#0f1a0e",
    accent: "#5a8a3c",
    tags: ["Ed-tech", "Motion", "Accessibility"],
    summary: "UI/UX design for a wildlife-education platform aimed at ages 6–14. Clear age-appropriate flows, animated lesson content, and an engaging visual language.",
    role: "UX/UI Designer",
    duration: "3 months",
    outcome: "Delivered full design system and prototype. Motion graphics produced to bring lessons to life.",
    sections: [
      {
        type: "overview",
        heading: "Brief",
        body: "Create an educational digital experience about wildlife that feels adventurous, not academic — for children who learn best through stories and motion.",
      },
      {
        type: "design",
        heading: "Visual Language",
        body: "Warm earth tones, hand-drawn illustration style, large touch targets, and chunked content to match short attention spans. Every screen tested with children aged 7–12.",
      },
      {
        type: "outcome",
        heading: "Motion & Engagement",
        body: "Animated sequences designed in After Effects reinforced comprehension at key moments — concept introduction and post-quiz celebration states.",
      },
    ],
  },
  {
    slug: "wwf-earth-hour",
    title: "WWF Earth Hour",
    subtitle: "Campaign visuals & motion for Gen-Z audiences",
    category: "Motion / Brand",
    year: "2022",
    color: "#0e1612",
    accent: "#2d7a4f",
    tags: ["Motion Design", "Brand", "Social"],
    summary: "Led campaign visuals and motion design for WWF India's Earth Hour initiative — social reels, storyboards, and brand content across Instagram, YouTube Shorts, and TikTok.",
    role: "Visual Communicator",
    duration: "6 months",
    outcome: "Content maintained brand consistency against WWF global identity guidelines while driving Gen-Z engagement across three platforms.",
    sections: [
      {
        type: "overview",
        heading: "Challenge",
        body: "Translate a globally recognised environmental campaign into native social content that resonates with Indian Gen-Z audiences without diluting the WWF brand.",
      },
      {
        type: "design",
        heading: "Motion & Format Strategy",
        body: "Produced 9:16 vertical reels optimised per platform — punchier cuts for TikTok, more narrative for YouTube Shorts, grid-aware compositions for Instagram.",
      },
    ],
  },
  {
    slug: "cheesecake-studios",
    title: "Cheesecake Studios",
    subtitle: "Boutique design studio — brand identity & animated invitations",
    category: "Creative Direction",
    year: "2021–2022",
    color: "#1a1508",
    accent: "#c9a227",
    tags: ["Brand Identity", "Animation", "Studio"],
    summary: "Founded a boutique studio specialising in animated invitations and brand identity. Grew Instagram audience organically. Managed end-to-end production on retainer model.",
    role: "Founder & Creative Director",
    duration: "Ongoing",
    outcome: "Recurring retainer clients. Bilingual content (English + Dogri) reaching local J&K youth communities.",
    sections: [
      {
        type: "overview",
        heading: "The Studio",
        body: "A solo creative practice built around the belief that celebration design — invitations, brand moments, announcements — deserves the same rigour as product design.",
      },
      {
        type: "design",
        heading: "Bilingual Content Strategy",
        body: "Produced reels in Dogri to engage local youth communities in J&K — an underserved audience for high-quality digital content in their native language.",
      },
    ],
  },
];

export function getProject(slug) {
  return projects.find(p => p.slug === slug) ?? null;
}
