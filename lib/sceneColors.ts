export const SCENE_COLOR_PALETTES = {
  cyberpunk: {
    background: "#0c0a0f" /* Deep midnight purple */,
    text: "#ffffff",
    primary: "#a855f7" /* Neon Purple */,
    secondary: "#00f5ff" /* High-glow Cyan */,
    accent: "#ff007f" /* Cyber Pink */,
  },
  darkVibrant: {
    background: "#0d1117" /* Dark slate */,
    text: "#f0f6fc",
    primary: "#58a6ff" /* Bright Blue */,
    secondary: "#7ee787" /* Electric Mint Green */,
    accent: "#aff5b4",
  },
};

// lib/sceneColors.ts

// Make sure SCENE_COLORS is exported and maps your scene types to glowing accents
export const SCENE_COLORS: Record<string, { accent: string; soft: string; text: string }> = {
  brandIntro: { accent: '#a855f7', soft: 'rgba(168, 85, 247, 0.1)', text: '#ffffff' },  // Neon Purple
  videoIntro: { accent: '#06b6d4', soft: 'rgba(6, 182, 212, 0.1)', text: '#ffffff' },  // Electric Cyan
  productView: { accent: '#ec4899', soft: 'rgba(236, 72, 153, 0.1)', text: '#ffffff' }, // Hot Pink
  cta: { accent: '#10b981', soft: 'rgba(16, 185, 129, 0.1)', text: '#ffffff' },         // Vibrant Emerald
  chat: { accent: '#f59e0b', soft: 'rgba(245, 158, 11, 0.1)', text: '#ffffff' },        // Bright Amber
  reviewStack: { accent: '#3b82f6', soft: 'rgba(59, 130, 246, 0.1)', text: '#ffffff' }, // Intense Blue
};
// Update your default export or baseline scene colors to use the cyberpunk preset
export const DEFAULT_SCENE_BACKGROUND = "#0c0a0f";
