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
    <div className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
        Scenes (in play order)
      </span>

      {scenes.length === 0 && (
        <p className="py-3 text-xs text-neutral-400">No scenes yet — add one below.</p>
      )}

      {scenes.map((scene, i) => {
        const color = SCENE_COLORS[scene.type];
        const isSelected = selectedId === scene.id;
        return (
          <div
            key={scene.id}
            onClick={() => onSelect(scene.id)}
            className="flex cursor-pointer items-center justify-between rounded-xl border-l-[5px] px-3 py-2.5 text-sm transition-all"
            style={{
              borderLeftColor: color.accent,
              backgroundColor: isSelected ? color.soft : '#FAFAFA',
              boxShadow: isSelected ? `0 0 0 1.5px ${color.accent}` : 'none',
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: color.accent }}
              >
                {i + 1}
              </span>
              <span className="font-medium" style={{ color: isSelected ? color.text : '#2A2A33' }}>
                {SCENE_TYPE_LABELS[scene.type]}
              </span>
            </div>
            <div className="flex gap-2 text-xs text-neutral-400">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  move(i, -1);
                }}
                className="hover:text-neutral-800"
                title="Move up"
              >
                ↑
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  move(i, 1);
                }}
                className="hover:text-neutral-800"
                title="Move down"
              >
                ↓
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate(scene.id);
                }}
                className="hover:text-neutral-800"
                title="Duplicate"
              >
                ⧉
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(scene.id);
                }}
                className="hover:text-red-500"
                title="Delete"
              >
                ✕
              </button>
            </div>
          </div>
        );
      })}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {ADDABLE_TYPES.map((t) => {
          const color = SCENE_COLORS[t];
          return (
            <button
              key={t}
              onClick={() => onAdd(createDefaultScene(t))}
              className="rounded-full border px-3 py-1 text-xs font-medium transition-transform hover:scale-105"
              style={{
                borderColor: color.accent,
                color: color.text,
                backgroundColor: color.soft,
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
