import { gsap } from 'gsap';
import { CTAConfig } from '@/types/scene';

export function CTAScene({ config }: { config: CTAConfig }) {
  const accent = config.accentColor ?? '#C9A24B';

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-10 text-center">
      <h2 data-anim="headline" className="font-serif text-3xl font-semibold opacity-0">
        {config.headline}
      </h2>

      {config.subline && (
        <p data-anim="subline" className="mt-3 text-sm opacity-0" style={{ opacity: 0.75 }}>
          {config.subline}
        </p>
      )}

      {config.buttonText && (
        <div
          data-anim="button"
          className="mt-6 rounded-sm border px-7 py-3 text-xs uppercase tracking-widest opacity-0"
          style={{ borderColor: accent, color: accent }}
        >
          {config.buttonText}
        </div>
      )}
    </div>
  );
}

export function animateInCTA(
  container: HTMLElement,
  tl: gsap.core.Timeline,
  startTime: number
) {
  const headline = container.querySelector('[data-anim="headline"]');
  const subline = container.querySelector('[data-anim="subline"]');
  const button = container.querySelector('[data-anim="button"]');

  if (headline) {
    tl.fromTo(
      headline,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6 },
      startTime + 0.1
    );
  }
  if (subline) {
    tl.fromTo(subline, { opacity: 0 }, { opacity: 0.75, duration: 0.5 }, startTime + 0.6);
  }
  if (button) {
    tl.fromTo(button, { opacity: 0 }, { opacity: 1, duration: 0.4 }, startTime + 1.1);
  }
}
