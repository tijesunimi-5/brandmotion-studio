import { gsap } from 'gsap';
import { BrandIntroConfig } from '@/types/scene';

// Every scene component follows the same contract:
// 1. A React component that renders the markup (static, no animation logic here)
// 2. An `animateIn` function that GSAP calls to animate elements INSIDE this scene
//
// data-anim="xxx" attributes are just hooks so animateIn can find elements
// inside THIS scene's container only (each scene is scoped/isolated).

export function BrandIntroScene({ config }: { config: BrandIntroConfig }) {
  const accent = config.accentColor ?? '#C9A24B';
  const textColor = config.textColor ?? '#FFFFFF';

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-10 text-center">
      <div
        data-anim="logo"
        className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-dashed text-[9px] opacity-0"
        style={{ borderColor: accent, color: accent }}
      >
        {config.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={config.logoUrl} alt="logo" className="h-full w-full rounded-2xl object-cover" />
        ) : (
          <span>SWAP LOGO</span>
        )}
      </div>

      <h1
        data-anim="brand-name"
        className="font-serif text-3xl font-semibold opacity-0"
        style={{ color: textColor }}
      >
        {config.brandName}
      </h1>

      {config.tagline && (
        <p
          data-anim="tagline"
          className="mt-3 text-xs uppercase tracking-[0.3em] opacity-0"
          style={{ color: accent }}
        >
          {config.tagline}
        </p>
      )}
    </div>
  );
}

// Appends this scene's internal animations to the shared master timeline.
// `container` is THIS scene's root element (Stage.tsx passes it in).
// `startTime` is where on the master timeline this scene begins.
export function animateInBrandIntro(
  container: HTMLElement,
  tl: gsap.core.Timeline,
  startTime: number
) {
  const logo = container.querySelector('[data-anim="logo"]');
  const name = container.querySelector('[data-anim="brand-name"]');
  const tagline = container.querySelector('[data-anim="tagline"]');

  if (logo) {
    tl.fromTo(
      logo,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
      startTime + 0.1
    );
  }
  if (name) {
    tl.fromTo(
      name,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      startTime + 0.5
    );
  }
  if (tagline) {
    tl.fromTo(
      tagline,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      startTime + 1.0
    );
  }
}
