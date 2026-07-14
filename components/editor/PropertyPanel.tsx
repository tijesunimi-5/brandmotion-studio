'use client';

import { SceneConfig, ChatMessage, Review } from '@/types/scene';
import { computeChatSceneDuration } from '@/components/scenes/ChatScene';
import { computeReviewStackDuration } from '@/components/scenes/ReviewStackScene';
import { SCENE_TYPE_LABELS } from '@/lib/sceneDefaults';
import { SCENE_COLORS } from '@/lib/sceneColors';

interface Props {
  scene: SceneConfig;
  onChange: (updated: SceneConfig) => void;
}

const inputClass =
  'rounded-lg border border-neutral-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 transition-shadow';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-xs text-neutral-600">
      <span className="font-semibold">{label}</span>
      {children}
    </label>
  );
}

export function PropertyPanel({ scene, onChange }: Props) {
  const color = SCENE_COLORS[scene.type];
  const ringStyle = { '--tw-ring-color': color.accent } as React.CSSProperties;

  return (
    <div
      className="flex flex-col gap-3 overflow-hidden rounded-2xl border bg-white shadow-sm"
      style={{ borderColor: color.accent }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ backgroundColor: color.soft }}
      >
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: color.accent }}
        />
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: color.text }}>
          Editing: {SCENE_TYPE_LABELS[scene.type]}
        </span>
      </div>

      <div className="flex flex-col gap-3 px-4 pb-4" style={ringStyle}>

        {/* Fields shared by every scene type */}
        <Field label="Duration (seconds)">
          <input
            type="number"
            step={0.1}
            value={scene.duration}
            className={inputClass}
            onChange={(e) => onChange({ ...scene, duration: parseFloat(e.target.value) || 0 })}
          />
        </Field>
        <Field label="Background (hex or CSS gradient)">
          <input
            type="text"
            value={scene.background ?? ''}
            className={inputClass}
            onChange={(e) => onChange({ ...scene, background: e.target.value })}
          />
        </Field>

        {scene.type === 'brandIntro' && (
          <>
            <Field label="Brand Name">
              <input
                type="text"
                value={scene.brandName}
                className={inputClass}
                onChange={(e) => onChange({ ...scene, brandName: e.target.value })}
              />
            </Field>
            <Field label="Tagline">
              <input
                type="text"
                value={scene.tagline ?? ''}
                className={inputClass}
                onChange={(e) => onChange({ ...scene, tagline: e.target.value })}
              />
            </Field>
            <Field label="Text Color">
              <input
                type="color"
                value={scene.textColor ?? '#ffffff'}
                className={`${inputClass} h-9`}
                onChange={(e) => onChange({ ...scene, textColor: e.target.value })}
              />
            </Field>
            <Field label="Accent Color">
              <input
                type="color"
                value={scene.accentColor ?? '#C9A24B'}
                className={`${inputClass} h-9`}
                onChange={(e) => onChange({ ...scene, accentColor: e.target.value })}
              />
            </Field>
            <Field label="Logo URL (optional)">
              <input
                type="text"
                value={scene.logoUrl ?? ''}
                placeholder="https://..."
                className={inputClass}
                onChange={(e) => onChange({ ...scene, logoUrl: e.target.value })}
              />
            </Field>
          </>
        )}

        {scene.type === 'videoIntro' && (
          <>
            <Field label="Headline">
              <textarea
                value={scene.headline}
                className={inputClass}
                rows={2}
                onChange={(e) => onChange({ ...scene, headline: e.target.value })}
              />
            </Field>
            <Field label="Subline">
              <input
                type="text"
                value={scene.subline ?? ''}
                className={inputClass}
                onChange={(e) => onChange({ ...scene, subline: e.target.value })}
              />
            </Field>
            <Field label="Text Color">
              <input
                type="color"
                value={scene.textColor ?? '#ffffff'}
                className={`${inputClass} h-9`}
                onChange={(e) => onChange({ ...scene, textColor: e.target.value })}
              />
            </Field>
          </>
        )}

        {scene.type === 'productView' && (
          <>
            <Field label="Product Name">
              <input
                type="text"
                value={scene.productName}
                className={inputClass}
                onChange={(e) => onChange({ ...scene, productName: e.target.value })}
              />
            </Field>
            <Field label="Caption">
              <input
                type="text"
                value={scene.caption ?? ''}
                className={inputClass}
                onChange={(e) => onChange({ ...scene, caption: e.target.value })}
              />
            </Field>
            <Field label="Image URL">
              <input
                type="text"
                value={scene.imageUrl ?? ''}
                placeholder="https://..."
                className={inputClass}
                onChange={(e) => onChange({ ...scene, imageUrl: e.target.value })}
              />
            </Field>
            <Field label="Accent Color">
              <input
                type="color"
                value={scene.accentColor ?? '#C9A24B'}
                className={`${inputClass} h-9`}
                onChange={(e) => onChange({ ...scene, accentColor: e.target.value })}
              />
            </Field>
          </>
        )}

        {scene.type === 'cta' && (
          <>
            <Field label="Headline">
              <input
                type="text"
                value={scene.headline}
                className={inputClass}
                onChange={(e) => onChange({ ...scene, headline: e.target.value })}
              />
            </Field>
            <Field label="Subline">
              <input
                type="text"
                value={scene.subline ?? ''}
                className={inputClass}
                onChange={(e) => onChange({ ...scene, subline: e.target.value })}
              />
            </Field>
            <Field label="Button Text">
              <input
                type="text"
                value={scene.buttonText ?? ''}
                className={inputClass}
                onChange={(e) => onChange({ ...scene, buttonText: e.target.value })}
              />
            </Field>
            <Field label="Accent Color">
              <input
                type="color"
                value={scene.accentColor ?? '#C9A24B'}
                className={`${inputClass} h-9`}
                onChange={(e) => onChange({ ...scene, accentColor: e.target.value })}
              />
            </Field>
          </>
        )}

        {scene.type === 'chat' && <ChatMessageEditor scene={scene} onChange={onChange} />}

        {scene.type === 'reviewStack' && <ReviewListEditor scene={scene} onChange={onChange} />}
      </div>
    </div>
  );
}

function ChatMessageEditor({
  scene,
  onChange,
}: {
  scene: Extract<SceneConfig, { type: 'chat' }>;
  onChange: (s: SceneConfig) => void;
}) {
  function updateMessage(i: number, patch: Partial<ChatMessage>) {
    const messages = scene.messages.map((m, idx) => (idx === i ? { ...m, ...patch } : m));
    onChange({ ...scene, messages });
  }

  function addMessage() {
    const messages = [...scene.messages, { sender: 'them' as const, text: 'New message' }];
    onChange({ ...scene, messages, duration: computeChatSceneDuration(messages.length) });
  }

  function removeMessage(i: number) {
    const messages = scene.messages.filter((_, idx) => idx !== i);
    onChange({ ...scene, messages, duration: computeChatSceneDuration(messages.length) });
  }

  return (
    <div className="flex flex-col gap-2">
      <Field label="Platform">
        <select
          value={scene.platform}
          className={inputClass}
          onChange={(e) =>
            onChange({ ...scene, platform: e.target.value as 'whatsapp' | 'instagram' })
          }
        >
          <option value="whatsapp">WhatsApp</option>
          <option value="instagram">Instagram</option>
        </select>
      </Field>
      <Field label="Contact Name">
        <input
          type="text"
          value={scene.contactName ?? ''}
          className={inputClass}
          onChange={(e) => onChange({ ...scene, contactName: e.target.value })}
        />
      </Field>

      <span className="mt-2 text-xs font-medium text-neutral-600">Messages</span>
      {scene.messages.map((m, i) => (
        <div key={i} className="flex items-center gap-2">
          <select
            value={m.sender}
            className={`${inputClass} w-24`}
            onChange={(e) => updateMessage(i, { sender: e.target.value as 'them' | 'me' })}
          >
            <option value="them">Them</option>
            <option value="me">Me</option>
          </select>
          <input
            type="text"
            value={m.text}
            className={`${inputClass} flex-1`}
            onChange={(e) => updateMessage(i, { text: e.target.value })}
          />
          <button onClick={() => removeMessage(i)} className="text-xs text-red-500">
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={addMessage}
        className="mt-1 rounded-md border border-dashed border-neutral-300 px-2 py-1 text-xs text-neutral-500 hover:bg-neutral-50"
      >
        + Add message
      </button>
      <p className="mt-1 text-[10px] text-neutral-400">
        Duration auto-recalculates based on message count whenever you add or remove one.
      </p>
    </div>
  );
}

function ReviewListEditor({
  scene,
  onChange,
}: {
  scene: Extract<SceneConfig, { type: 'reviewStack' }>;
  onChange: (s: SceneConfig) => void;
}) {
  function updateReview(i: number, patch: Partial<Review>) {
    const reviews = scene.reviews.map((r, idx) => (idx === i ? { ...r, ...patch } : r));
    onChange({ ...scene, reviews });
  }

  function addReview() {
    const reviews = [...scene.reviews, { stars: 5, quote: 'New review text', name: 'Customer' }];
    onChange({ ...scene, reviews, duration: computeReviewStackDuration(reviews.length) });
  }

  function removeReview(i: number) {
    const reviews = scene.reviews.filter((_, idx) => idx !== i);
    onChange({ ...scene, reviews, duration: computeReviewStackDuration(reviews.length) });
  }

  return (
    <div className="flex flex-col gap-2">
      <Field label="Label (shown above the stack)">
        <input
          type="text"
          value={scene.label ?? ''}
          className={inputClass}
          onChange={(e) => onChange({ ...scene, label: e.target.value })}
        />
      </Field>

      <span className="mt-2 text-xs font-medium text-neutral-600">Reviews</span>
      {scene.reviews.map((r, i) => (
        <div key={i} className="flex flex-col gap-1 rounded-md border border-neutral-200 p-2">
          <div className="flex items-center gap-2">
            <select
              value={r.stars}
              className={`${inputClass} w-16`}
              onChange={(e) => updateReview(i, { stars: parseInt(e.target.value, 10) })}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n}★
                </option>
              ))}
            </select>
            <input
              type="text"
              value={r.name}
              placeholder="Customer name"
              className={`${inputClass} flex-1`}
              onChange={(e) => updateReview(i, { name: e.target.value })}
            />
            <button onClick={() => removeReview(i)} className="text-xs text-red-500">
              ✕
            </button>
          </div>
          <textarea
            value={r.quote}
            placeholder="Review text"
            className={inputClass}
            rows={2}
            onChange={(e) => updateReview(i, { quote: e.target.value })}
          />
        </div>
      ))}
      <button
        onClick={addReview}
        className="mt-1 rounded-md border border-dashed border-neutral-300 px-2 py-1 text-xs text-neutral-500 hover:bg-neutral-50"
      >
        + Add review
      </button>
      <p className="mt-1 text-[10px] text-neutral-400">
        Duration auto-recalculates based on review count whenever you add or remove one.
      </p>
    </div>
  );
}
