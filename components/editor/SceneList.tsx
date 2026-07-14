'use client';

import { SceneConfig, SceneType } from '@/types/scene';
import { SCENE_TYPE_LABELS, createDefaultScene } from '@/lib/sceneDefaults';
import { SCENE_COLORS } from '@/lib/sceneColors';

interface Props {
  scenes: SceneConfig[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onReorder: (scenes: SceneConfig[]) => void;
  onAdd: (scene: SceneConfig) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

const ADDABLE_TYPES: SceneType[] = ['brandIntro', 'videoIntro', 'productView', 'cta', 'chat'];

export function SceneList({
  scenes,
  selectedId,
  onSelect,
  onReorder,
  onAdd,
  onDelete,
  onDuplicate,
}: Props) {
  function move(index: number, dir: -1 | 1) {
    const next = [...scenes];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onReorder(next);
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-neutral-900 bg-neutral-950 p-5 shadow-2xl backdrop-blur-md">
      <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
        Scenes (in play order)
      </span>

      {scenes.length === 0 && (
        <p className="py-4 text-center border border-dashed border-neutral-900 rounded-xl text-xs text-neutral-500 italic">
          No scenes yet — add one below to get started.
        </p>
      )}

      <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-1">
        {scenes.map((scene, i) => {
          const color = SCENE_COLORS[scene.type] || { accent: '#a855f7', soft: 'rgba(168, 85, 247, 0.1)', text: '#ffffff' };
          const isSelected = selectedId === scene.id;
          return (
            <div
              key={scene.id}
              onClick={() => onSelect(scene.id)}
              className="flex cursor-pointer items-center justify-between rounded-xl border-l-[4px] px-4 py-3 text-sm transition-all duration-200 bg-neutral-900/30 border border-neutral-900/60 hover:bg-neutral-900/60"
              style={{
                borderLeftColor: color.accent,
                backgroundColor: isSelected ? color.soft : undefined,
                borderColor: isSelected ? `${color.accent}44` : undefined,
                boxShadow: isSelected ? `0 0 15px ${color.accent}15` : 'none',
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white transition-transform"
                  style={{
                    backgroundColor: color.accent,
                    boxShadow: isSelected ? `0 0 8px ${color.accent}` : 'none'
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className="font-semibold tracking-wide transition-colors"
                  style={{ color: isSelected ? '#ffffff' : '#a3a3a3' }}
                >
                  {SCENE_TYPE_LABELS[scene.type]}
                </span>
              </div>

              {/* Control Actions Panel */}
              <div className="flex items-center gap-2 text-neutral-500">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    move(i, -1);
                  }}
                  className="p-1 rounded hover:bg-neutral-800 hover:text-neutral-200 transition-colors"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    move(i, 1);
                  }}
                  className="p-1 rounded hover:bg-neutral-800 hover:text-neutral-200 transition-colors"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate(scene.id);
                  }}
                  className="p-1 rounded hover:bg-neutral-800 hover:text-neutral-200 transition-colors"
                  title="Duplicate"
                >
                  ⧉
                </button>
                <div className="h-3 w-[1px] bg-neutral-800 mx-0.5" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(scene.id);
                  }}
                  className="p-1 rounded hover:bg-red-950/40 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <hr className="border-neutral-900 my-1" />

      {/* Modern Add Buttons Wrap */}
      <div className="flex flex-wrap gap-2">
        {ADDABLE_TYPES.map((t) => {
          const color = SCENE_COLORS[t] || { accent: '#a855f7', soft: 'rgba(168, 85, 247, 0.1)', text: '#ffffff' };
          return (
            <button
              key={t}
              onClick={() => onAdd(createDefaultScene(t))}
              className="rounded-xl border px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                borderColor: `${color.accent}33`,
                color: color.accent,
                backgroundColor: `${color.accent}0d`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = color.accent;
                e.currentTarget.style.backgroundColor = `${color.accent}22`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${color.accent}33`;
                e.currentTarget.style.backgroundColor = `${color.accent}0d`;
              }}
            >
              + {SCENE_TYPE_LABELS[t]}
            </button>
          );
        })}
      </div>
    </div>
  );
}