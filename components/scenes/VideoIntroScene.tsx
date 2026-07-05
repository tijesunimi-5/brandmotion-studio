import { gsap } from 'gsap';
import { VideoIntroConfig } from '@/types/scene';

export function VideoIntroScene({ config }: { config: VideoIntroConfig }) {
  const textColor = config.textColor ?? '#FFFFFF';

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-10 text-center">
      <h2
        data-anim="headline"
        className="font-serif text-3xl font-medium leading-snug opacity-0"
        style={{ color: textColor }}
      >
        {config.headline}
      </h2>

      {config.subline && (
        <p
          data-anim="subline"
          className="mt-4 text-sm opacity-0"
          style={{ color: textColor, opacity: 0.75 }}
        >
          {config.subline}
        </p>
      )}
    </div>
  );
}

export function animateInVideoIntro(
  container: HTMLElement,
  tl: gsap.core.Timeline,
  startTime: number
) {
  const headline = container.querySelector('[data-anim="headline"]');
  const subline = container.querySelector('[data-anim="subline"]');

  if (headline) {
    tl.fromTo(
      headline,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      startTime + 0.1
    );
  }
  if (subline) {
    tl.fromTo(
      subline,
      { opacity: 0 },
      { opacity: 0.75, duration: 0.5 },
      startTime + 0.7
    );
  }
}
