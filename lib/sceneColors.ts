import { SceneType } from '@/types/scene';

// Every scene type gets a distinct color identity used consistently across
// the scene list, badges, and property panel — so you can recognize a
// scene's type by color alone, without reading the label.
export const SCENE_COLORS: Record<SceneType, { accent: string; soft: string; text: string }> = {
  brandIntro: { accent: '#D98E3F', soft: '#FBF1E1', text: '#8A5A1D' },  // amber — warmth, identity
  videoIntro: { accent: '#E1585A', soft: '#FCEAEA', text: '#A3393B' }, // rose — attention/hook
  productView: { accent: '#2D9C8F', soft: '#E4F5F3', text: '#1F6B62' }, // teal — product/showcase
  cta: { accent: '#7C5CFF', soft: '#EFEBFF', text: '#5B3FCB' },         // violet — action
  chat: { accent: '#3BA7E0', soft: '#E7F4FC', text: '#1F6E9C' },        // sky blue — conversation
};
