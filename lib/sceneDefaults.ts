import { SceneConfig, SceneType, ChatMessage, Review } from "@/types/scene";
import { computeChatSceneDuration } from "@/components/scenes/ChatScene";
import { computeReviewStackDuration } from "@/components/scenes/ReviewStackScene";

let counter = 0;
function nextId() {
  counter += 1;
  return `scene-${Date.now()}-${counter}`;
}

export const SCENE_TYPE_LABELS: Record<SceneType, string> = {
  brandIntro: "Brand Intro",
  videoIntro: "Video Intro / Hook",
  productView: "Product View",
  cta: "Call To Action",
  chat: "Chat Scene",
  reviewStack: "Review Stack",
};

// Sensible starting defaults so a newly-added scene isn't blank/broken.
// Someone can just type over these values in the property panel.
export function createDefaultScene(type: SceneType): SceneConfig {
  switch (type) {
    case "brandIntro":
      return {
        id: nextId(),
        type,
        duration: 3,
        background: "#1E1B18",
        brandName: "Your Brand",
        tagline: "Your tagline here",
        textColor: "#FFFFFF",
        accentColor: "#C9A24B",
      };
    case "videoIntro":
      return {
        id: nextId(),
        type,
        duration: 3.5,
        background: "#1E1B18",
        headline: "Your hook line here",
        subline: "Supporting line",
        textColor: "#FFFFFF",
      };
    case "productView":
      return {
        id: nextId(),
        type,
        duration: 4,
        background: "#F6EEE1",
        productName: "Product Name",
        caption: "Short caption",
        accentColor: "#C9A24B",
      };
    case "cta":
      return {
        id: nextId(),
        type,
        duration: 3,
        background: "#EDE6D6",
        headline: "Your CTA headline",
        subline: "Supporting line",
        buttonText: "Order Now",
        accentColor: "#C9A24B",
      };
    case "chat": {
      const messages: ChatMessage[] = [
        { sender: "them", text: "Hey, question about your product" },
        { sender: "me", text: "Sure, happy to help!" },
      ];
      return {
        id: nextId(),
        type,
        duration: computeChatSceneDuration(messages.length),
        background: "#0B141A",
        platform: "whatsapp",
        contactName: "Chat",
        messages,
      };
    }
    case "reviewStack": {
      const reviews: Review[] = [
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
      ];
      return {
        id: nextId(),
        type,
        duration: computeReviewStackDuration(reviews.length),
        background: "#EAF7F0",
        label: "Real Customers, Real Words",
        starColor: "#F5B400",
        accentDeep: "#146345",
        reviews,
      };
    }
  }
}
