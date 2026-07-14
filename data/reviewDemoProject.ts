import { Project } from "@/types/scene";
import { computeReviewStackDuration } from "@/components/scenes/ReviewStackScene";

const reviews = [
  {
    stars: 5,
    quote: "Best purchase I\u2019ve made all year, honestly.",
    name: "Amaka O.",
  },
  {
    stars: 5,
    quote: "Fast delivery and even better in person!",
    name: "David K.",
  },
  {
    stars: 5,
    quote: "I\u2019ve already told 3 friends about this.",
    name: "Zainab T.",
  },
  {
    stars: 5,
    quote: "Worth every naira. Ordering again soon.",
    name: "Chidi M.",
  },
];

export const reviewDemoProject: Project = {
  id: "demo-review",
  brandName: "Review Video Sample",
  viewport: "iphone",
  scenes: [
    {
      id: "scene-1",
      type: "videoIntro",
      duration: 2.8,
      background: "#EAF7F0",
      headline: "What if your reviews actually got noticed?",
      textColor: "#20242A",
    },
    {
      id: "scene-2",
      type: "reviewStack",
      duration: computeReviewStackDuration(reviews.length),
      background: "#EAF7F0",
      label: "Real Customers, Real Words",
      starColor: "#F5B400",
      accentDeep: "#146345",
      reviews,
    },
    // Ending #1 — the sample brand's own CTA (clearly fictional, for illustration)
    {
      id: "scene-3",
      type: "cta",
      duration: 3.5,
      background: "linear-gradient(180deg, #1F8A5F, #146345)",
      headline: "Bloom & Co",
      subline:
        "Loved by customers like you (sample brand — for illustration only)",
      buttonText: "Shop Now",
      accentColor: "#FFFFFF",
    },
    // Bridge — reveals this was a demo
    {
      id: "scene-4",
      type: "videoIntro",
      duration: 3.5,
      background: "#20242A",
      headline: "This was just a sample.",
      subline: "Imagine this, but filled with YOUR customers\u2019 words.",
      textColor: "#FFFFFF",
    },
    // Ending #2 — the real pitch, BrandMotion's own CTA
    {
      id: "scene-5",
      type: "cta",
      duration: 4.5,
      background: "#20242A",
      headline:
        "Let\u2019s help you craft your reviews into something this engaging.",
      subline: "DM me to get started",
      buttonText: "Start My Video",
      accentColor: "#F5B400",
    },
  ],
};
