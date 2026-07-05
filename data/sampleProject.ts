import { Project } from '@/types/scene';

// This is what a "brand folder" looks like as data.
// Later, this is exactly the shape you'd save/load per client.
// For now it's just a hardcoded object — no backend needed to prove it works.

export const sampleProject: Project = {
  id: 'demo-perfume',
  brandName: 'Favourite Fragrance',
  viewport: 'iphone',
  scenes: [
    {
      id: 'scene-1',
      type: 'brandIntro',
      duration: 3,
      background: 'linear-gradient(180deg, #EDE6D6 0%, #E8D9C5 100%)',
      brandName: 'Favourite Fragrance',
      tagline: 'Discover your scent',
      textColor: '#3A322C',
      accentColor: '#C9A24B',
    },
    {
      id: 'scene-2',
      type: 'videoIntro',
      duration: 3.5,
      background: 'linear-gradient(180deg, #2B2723, #1E1B18)',
      headline: 'Smelling good shouldn\u2019t take much.',
      subline: 'Affordable luxury, bottled.',
      textColor: '#FBF9F4',
    },
    {
      id: 'scene-3',
      type: 'productView',
      duration: 4,
      background: '#EDE6D6',
      productName: 'Amber Noir',
      caption: 'A warm, confident signature scent',
      accentColor: '#C9A24B',
    },
    {
      id: 'scene-4',
      type: 'cta',
      duration: 3,
      background: 'radial-gradient(circle at 50% 40%, #E1D6BE, #EDE6D6 75%)',
      headline: 'Discover your scent here.',
      subline: 'Favourite Fragrance',
      buttonText: 'Shop the Collection',
      accentColor: '#C9A24B',
    },
  ],
};
