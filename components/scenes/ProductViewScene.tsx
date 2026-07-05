import { gsap } from 'gsap';
import { ProductViewConfig } from '@/types/scene';

export function ProductViewScene({ config }: { config: ProductViewConfig }) {
  const accent = config.accentColor ?? '#C9A24B';

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center">
      <div
        data-anim="photo"
        className="mb-5 flex aspect-square w-[65%] items-center justify-center rounded-xl border-2 border-dashed text-[11px] opacity-0"
        style={{ borderColor: accent }}
      >
        {config.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={config.imageUrl}
            alt={config.productName}
            className="h-full w-full rounded-xl object-cover"
          />
        ) : (
          <span>SWAP PHOTO — {config.productName.toUpperCase()}</span>
        )}
      </div>

      <h3 data-anim="name" className="text-xl font-semibold opacity-0">
        {config.productName}
      </h3>

      {config.caption && (
        <p data-anim="caption" className="mt-1 text-sm opacity-0" style={{ color: accent }}>
          {config.caption}
        </p>
      )}
    </div>
  );
}

export function animateInProductView(
  container: HTMLElement,
  tl: gsap.core.Timeline,
  startTime: number
) {
  const photo = container.querySelector('[data-anim="photo"]');
  const name = container.querySelector('[data-anim="name"]');
  const caption = container.querySelector('[data-anim="caption"]');

  if (photo) {
    tl.fromTo(
      photo,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' },
      startTime + 0.1
    );
  }
  if (name) {
    tl.fromTo(
      name,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
      startTime + 0.6
    );
  }
  if (caption) {
    tl.fromTo(caption, { opacity: 0 }, { opacity: 1, duration: 0.4 }, startTime + 1.0);
  }
}
