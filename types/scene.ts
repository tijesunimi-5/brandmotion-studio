// ---------------------------------------------------------
// Core types for the scene engine.
// Every scene type gets its own config interface so TypeScript
// will yell at you if you forget a required field for that scene.
// ---------------------------------------------------------

export type SceneType =
  | "brandIntro"
  | "videoIntro"
  | "productView"
  | "cta"
  | "chat"
  | "reviewStack";

export interface BaseSceneConfig {
  id: string; // unique id, e.g. "scene-1"
  type: SceneType;
  duration: number; // how long this scene plays, in seconds
  background?: string; // any valid CSS color/gradient
}

export interface BrandIntroConfig extends BaseSceneConfig {
  type: "brandIntro";
  brandName: string;
  tagline?: string;
  textColor?: string;
  accentColor?: string;
  logoUrl?: string; // leave empty to show a placeholder box
}

export interface VideoIntroConfig extends BaseSceneConfig {
  type: "videoIntro";
  headline: string;
  subline?: string;
  textColor?: string;
}

export interface ProductViewConfig extends BaseSceneConfig {
  type: "productView";
  productName: string;
  caption?: string;
  imageUrl?: string; // leave empty to show a swap placeholder
  accentColor?: string;
}

export interface CTAConfig extends BaseSceneConfig {
  type: "cta";
  headline: string;
  subline?: string;
  buttonText?: string;
  accentColor?: string;
}

export interface ChatMessage {
  sender: "them" | "me";
  text: string;
}

export interface ChatSceneConfig extends BaseSceneConfig {
  type: "chat";
  platform: "whatsapp" | "instagram";
  messages: ChatMessage[];
  contactName?: string;
}

export interface Review {
  stars: number; // 1-5
  quote: string;
  name: string;
}

export interface ReviewStackConfig extends BaseSceneConfig {
  type: "reviewStack";
  reviews: Review[];
  label?: string; // e.g. "Real Customers, Real Words"
  starColor?: string;
  accentDeep?: string; // color for the label text
}

// The union type — every scene in a project is one of these
export type SceneConfig =
  | BrandIntroConfig
  | VideoIntroConfig
  | ProductViewConfig
  | CTAConfig
  | ChatSceneConfig
  | ReviewStackConfig;

export type Viewport = "iphone" | "square" | "landscape";

export interface Project {
  id: string;
  brandName: string;
  viewport: Viewport;
  scenes: SceneConfig[];
}

// Pixel dimensions for each viewport preset.
// These are the actual stage size — this is what you'll screen record.
export const VIEWPORT_SIZES: Record<
  Viewport,
  { width: number; height: number }
> = {
  iphone: { width: 390, height: 844 }, // 9:16-ish, matches modern iPhone screens
  square: { width: 500, height: 500 }, // 1:1
  landscape: { width: 800, height: 450 }, // 16:9
};
