import { gsap } from 'gsap';
import { SceneConfig } from '@/types/scene';
import { BrandIntroScene, animateInBrandIntro } from './scenes/BrandIntroScene';
import { VideoIntroScene, animateInVideoIntro } from './scenes/VideoIntroScene';
import { ProductViewScene, animateInProductView } from './scenes/ProductViewScene';
import { CTAScene, animateInCTA } from './scenes/CTAScene';
import { ChatScene, animateInChat } from './scenes/ChatScene';
import { ReviewStackScene, animateInReviewStack } from './scenes/ReviewStackScene';

// This is the ONE file to touch when you add a brand-new scene type later.
// 1. Build the component + animateIn function (copy an existing scene file as a starting point)
// 2. Add the type to types/scene.ts
// 3. Register both here

export function renderScene(config: SceneConfig) {
  switch (config.type) {
    case 'brandIntro':
      return <BrandIntroScene config={config} />;
    case 'videoIntro':
      return <VideoIntroScene config={config} />;
    case 'productView':
      return <ProductViewScene config={config} />;
    case 'cta':
      return <CTAScene config={config} />;
    case 'chat':
      return <ChatScene config={config} />;
    case 'reviewStack':
      return <ReviewStackScene config={config} />;
  }
}

export function animateScene(
  config: SceneConfig,
  container: HTMLElement,
  tl: gsap.core.Timeline,
  startTime: number
) {
  switch (config.type) {
    case 'brandIntro':
      return animateInBrandIntro(container, tl, startTime);
    case 'videoIntro':
      return animateInVideoIntro(container, tl, startTime);
    case 'productView':
      return animateInProductView(container, tl, startTime);
    case 'cta':
      return animateInCTA(container, tl, startTime);
    case 'chat':
      return animateInChat(container, tl, startTime, config);
    case 'reviewStack':
      return animateInReviewStack(container, tl, startTime, config);
  }
}
