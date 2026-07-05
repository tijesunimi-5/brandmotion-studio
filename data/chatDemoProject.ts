import { Project } from '@/types/scene';
import { computeChatSceneDuration } from '@/components/scenes/ChatScene';

const chatMessages = [
  { sender: 'them' as const, text: 'this chips don soft, no crunch again 😩' },
  { sender: 'them' as const, text: 'why all chips taste the same sha' },
  { sender: 'me' as const, text: 'try Gifted Crunches, na real crunch 😌' },
  { sender: 'them' as const, text: 'omg where do I get this' },
];

export const chatDemoProject: Project = {
  id: 'demo-chat',
  brandName: 'Gifted Crunches (Chat Style)',
  viewport: 'iphone',
  scenes: [
    {
      id: 'scene-1',
      type: 'chat',
      duration: computeChatSceneDuration(chatMessages.length),
      background: '#0B141A',
      platform: 'whatsapp',
      contactName: 'Snack Group 🍿',
      messages: chatMessages,
    },
    {
      id: 'scene-2',
      type: 'brandIntro',
      duration: 3,
      background: 'linear-gradient(180deg, #F6EEE1 0%, #EFE2CC 100%)',
      brandName: 'Gifted Crunches',
      tagline: 'Crunchy · Affordable · For Everyone',
      textColor: '#3F2A1D',
      accentColor: '#D98E3F',
    },
    {
      id: 'scene-3',
      type: 'cta',
      duration: 3,
      background: 'radial-gradient(circle at 50% 40%, #EFE2CC, #F6EEE1 75%)',
      headline: 'Taste the crunch today.',
      subline: 'Gifted Crunches',
      buttonText: 'Order Now',
      accentColor: '#D98E3F',
    },
  ],
};
