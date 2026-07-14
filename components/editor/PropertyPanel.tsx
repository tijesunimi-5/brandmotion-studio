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

// Attractive Dark UI Input Styling
const inputClass =
  'rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:border-transparent focus:outline-none focus:ring-2 transition-all duration-200';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs text-neutral-400">
      <span className="font-semibold tracking-wide text-neutral-300">{label}</span>
      {children}
    </label>
  );
}

export function PropertyPanel({ scene, onChange }: Props) {
  // Safely fallback if a scene type isn't defined yet
  const color = SCENE_COLORS[scene.type] || { accent: '#a855f7', soft: 'rgba(168, 85, 247, 0.1)', text: '#ffffff' };
  const ringStyle = { '--tw-ring-color': color.accent } as React.CSSProperties;

  return (
    <div
      className="flex flex-col gap-4 overflow-hidden rounded-2xl border bg-neutral-950 shadow-2xl backdrop-blur-md"
      style={{ borderColor: `${color.accent}33` }} // Subtle colored border transparency
    >
      {/* Panel Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b border-neutral-900"
        style={{ backgroundColor: color.soft }}
      >
        <span
          className="h-2.5 w-2.5 rounded-full animate-pulse"
          style={{
            backgroundColor: color.accent,
            boxShadow: `0 0 10px ${color.accent}`
          }}
        />
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-200">
          Editing: {SCENE_TYPE_LABELS[scene.type]}
        </span>
      </div>

      {/* Editor Body */}
      <div className="flex flex-col gap-4 px-5 pb-5 max-h-[75vh] overflow-y-auto" style={ringStyle}>

        {/* Global properties shared by all scenes */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-neutral-900/30 border border-neutral-900">
          <Field label="Duration (s)">
            <input
              type="number"
              step={0.1}
              value={scene.duration}
              className={inputClass}
              onChange={(e) => onChange({ ...scene, duration: parseFloat(e.target.value) || 0 })}
            />
          </Field>
          <Field label="Background Canvas">
            <input
              type="text"
              value={scene.background ?? ''}
              className={inputClass}
              placeholder="#000000"
              onChange={(e) => onChange({ ...scene, background: e.target.value })}
            />
          </Field>
        </div>

        <hr className="border-neutral-900" />

        {/* Dynamic Fields Based on Scene Types */}
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
            <div className="grid grid-cols-2 gap-3">
              <Field label="Text Color">
                <div className="relative flex items-center">
                  <input
                    type="color"
                    value={scene.textColor ?? '#ffffff'}
                    className="absolute left-2 w-6 h-6 rounded-md bg-transparent border-none cursor-pointer"
                    onChange={(e) => onChange({ ...scene, textColor: e.target.value })}
                  />
                  <input
                    type="text"
                    value={scene.textColor ?? '#ffffff'}
                    className={`${inputClass} w-full pl-10`}
                    onChange={(e) => onChange({ ...scene, textColor: e.target.value })}
                  />
                </div>
              </Field>
              <Field label="Accent Color">
                <div className="relative flex items-center">
                  <input
                    type="color"
                    value={scene.accentColor ?? '#C9A24B'}
                    className="absolute left-2 w-6 h-6 rounded-md bg-transparent border-none cursor-pointer"
                    onChange={(e) => onChange({ ...scene, accentColor: e.target.value })}
                  />
                  <input
                    type="text"
                    value={scene.accentColor ?? '#C9A24B'}
                    className={`${inputClass} w-full pl-10`}
                    onChange={(e) => onChange({ ...scene, accentColor: e.target.value })}
                  />
                </div>
              </Field>
            </div>
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
                className={`${inputClass} h-9 w-full cursor-pointer p-1`}
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
                className={`${inputClass} h-9 w-full cursor-pointer p-1`}
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
                className={`${inputClass} h-9 w-full cursor-pointer p-1`}
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
  const color = SCENE_COLORS.chat;

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
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Platform">
          <select
            value={scene.platform}
            className={`${inputClass} w-full`}
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
      </div>

      <span className="mt-2 text-xs font-semibold tracking-wider text-neutral-400 uppercase">Messages</span>
      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
        {scene.messages.map((m, i) => (
          <div key={i} className="flex items-center gap-2 bg-neutral-900/40 p-2 rounded-xl border border-neutral-900">
            <select
              value={m.sender}
              className={`${inputClass} py-1 px-1.5 bg-neutral-950 border-neutral-800 text-xs w-20`}
              onChange={(e) => updateMessage(i, { sender: e.target.value as 'them' | 'me' })}
            >
              <option value="them">Them</option>
              <option value="me">Me</option>
            </select>
            <input
              type="text"
              value={m.text}
              className={`${inputClass} flex-1 py-1 text-xs bg-transparent border-none focus:ring-0`}
              onChange={(e) => updateMessage(i, { text: e.target.value })}
            />
            <button
              onClick={() => removeMessage(i)}
              className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addMessage}
        style={{ borderColor: `${color.accent}44`, color: color.accent }}
        className="mt-1 rounded-xl border border-dashed px-3 py-2 text-xs font-medium bg-neutral-900/20 hover:bg-neutral-900/60 transition-colors"
      >
        + Add message
      </button>
      <p className="text-[10px] text-neutral-500 italic">
        Duration auto-recalculates based on message threads.
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
  const color = SCENE_COLORS.reviewStack;

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
    <div className="flex flex-col gap-3">
      <Field label="Label (shown above the stack)">
        <input
          type="text"
          value={scene.label ?? ''}
          className={inputClass}
          onChange={(e) => onChange({ ...scene, label: e.target.value })}
        />
      </Field>

      <span className="mt-2 text-xs font-semibold tracking-wider text-neutral-400 uppercase">Reviews</span>
      <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
        {scene.reviews.map((r, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-xl border border-neutral-900 bg-neutral-900/30 p-3">
            <div className="flex items-center gap-2">
              <select
                value={r.stars}
                className={`${inputClass} py-1 px-1.5 bg-neutral-950 border-neutral-800 text-xs w-16 text-amber-400`}
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
                className={`${inputClass} flex-1 py-1 text-xs bg-neutral-950`}
                onChange={(e) => updateReview(i, { name: e.target.value })}
              />
              <button
                onClick={() => removeReview(i)}
                className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
              >
                ✕
              </button>
            </div>
            <textarea
              value={r.quote}
              placeholder="Review text"
              className={`${inputClass} text-xs py-1.5 bg-neutral-950`}
              rows={2}
              onChange={(e) => updateReview(i, { quote: e.target.value })}
            />
          </div>
        ))}
      </div>
      <button
        onClick={addReview}
        style={{ borderColor: `${color.accent}44`, color: color.accent }}
        className="mt-1 rounded-xl border border-dashed px-3 py-2 text-xs font-medium bg-neutral-900/20 hover:bg-neutral-900/60 transition-colors"
      >
        + Add review
      </button>
      <p className="text-[10px] text-neutral-500 italic">
        Duration auto-recalculates based on your stack size.
      </p>
    </div>
  );
}