import { gsap } from 'gsap';
import { ReviewStackConfig } from '@/types/scene';

// Alternating rotation per card gives the natural "pile of papers" look.
// Cycles through these if there are more reviews than rotation values.
const ROTATIONS = [-3, 2, -2, 3, -2.5, 2.5];
const CARD_OFFSET = 40; // px vertical offset between stacked cards
const FIRST_CARD_DELAY = 0.5; // seconds before the first card appears
const CARD_INTERVAL = 1.2; // seconds between each card appearing

export function ReviewStackScene({ config }: { config: ReviewStackConfig }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8">
      {config.label && (
        <div
          data-anim="stack-label"
          className="absolute left-0 right-0 top-11 text-center text-[11px] uppercase tracking-[0.28em] opacity-0"
          style={{ color: config.accentDeep ?? '#146345' }}
        >
          {config.label}
        </div>
      )}

      <div className="relative" style={{ width: 280, height: 340 }}>
        {config.reviews.map((review, i) => {
          const rotate = ROTATIONS[i % ROTATIONS.length];
          const fullStars = '★'.repeat(review.stars ?? 5);
          const emptyStars = '☆'.repeat(5 - (review.stars ?? 5));
          return (
            <div
              key={i}
              data-anim="review-card"
              className="absolute left-0 right-0 mx-auto rounded-2xl bg-white p-4 text-left opacity-0"
              style={{
                width: 260,
                top: i * CARD_OFFSET,
                boxShadow: '0 10px 30px rgba(20,99,69,.15)',
                transform: `translateY(20px) rotate(${rotate}deg) scale(0.9)`,
              }}
            >
              <div className="text-sm tracking-wide" style={{ color: config.starColor ?? '#F5B400' }}>
                {fullStars}
                <span className="text-neutral-300">{emptyStars}</span>
              </div>
              <p className="mt-2 text-[13px] leading-snug text-neutral-800">&ldquo;{review.quote}&rdquo;</p>
              <p className="mt-2 text-[11px] font-medium text-neutral-500">— {review.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function animateInReviewStack(
  container: HTMLElement,
  tl: gsap.core.Timeline,
  startTime: number,
  config: ReviewStackConfig
) {
  const label = container.querySelector('[data-anim="stack-label"]');
  const cards = Array.from(container.querySelectorAll('[data-anim="review-card"]'));

  if (label) {
    tl.fromTo(label, { opacity: 0 }, { opacity: 1, duration: 0.4 }, startTime + 0.1);
  }

  cards.forEach((card, i) => {
    const rotate = ROTATIONS[i % ROTATIONS.length];
    const cardTime = startTime + FIRST_CARD_DELAY + i * CARD_INTERVAL;
    tl.fromTo(
      card,
      { opacity: 0, y: 20, scale: 0.9, rotate },
      { opacity: 1, y: 0, scale: 1, rotate, duration: 0.5, ease: 'back.out(1.4)' },
      cardTime
    );
  });
}

// Total time this scene needs, given how many review cards it has —
// use this the same way you'd use computeChatSceneDuration for chat scenes.
export function computeReviewStackDuration(reviewCount: number) {
  return +(FIRST_CARD_DELAY + reviewCount * CARD_INTERVAL + 1).toFixed(2);
}
