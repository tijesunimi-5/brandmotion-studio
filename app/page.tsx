'use client';

import { useState } from 'react';
import { Space_Grotesk } from 'next/font/google';
import { Stage } from '@/components/Stage';
import { SceneList } from '@/components/editor/SceneList';
import { PropertyPanel } from '@/components/editor/PropertyPanel';
import { sampleProject } from '@/data/sampleProject';
import { chatDemoProject } from '@/data/chatDemoProject';
import { reviewDemoProject } from '@/data/reviewDemoProject';
import { Project, SceneConfig, Viewport } from '@/types/scene';

const heading = Space_Grotesk({ subsets: ['latin'], weight: ['600', '700'] });

const VIEWPORT_LABELS: Record<Viewport, string> = {
  iphone: 'iPhone (9:16)',
  square: 'Square (1:1)',
  landscape: 'Landscape (16:9)',
};

const DEMO_PROJECTS: Record<string, Project> = {
  perfume: sampleProject,
  chat: chatDemoProject,
  review: reviewDemoProject,
};

// Deep clone so editing doesn't mutate the original demo data objects
function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function PillButton({
  active,
  onClick,
  children,
  accent = '#7C5CFF',
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all"
      style={
        active
          ? { backgroundColor: accent, borderColor: accent, color: '#fff' }
          : { backgroundColor: '#fff', borderColor: '#E4E1F0', color: '#6B6B76' }
      }
    >
      {children}
    </button>
  );
}

export default function Home() {
  const [demoKey, setDemoKey] = useState<'perfume' | 'chat' | 'review'>('review');
  const [project, setProject] = useState<Project>(clone(DEMO_PROJECTS['review']));
  const [selectedId, setSelectedId] = useState<string | null>(project.scenes[0]?.id ?? null);

  function switchDemo(key: 'perfume' | 'chat' | 'review') {
    const fresh = clone(DEMO_PROJECTS[key]);
    setDemoKey(key);
    setProject(fresh);
    setSelectedId(fresh.scenes[0]?.id ?? null);
  }

  function updateScenes(scenes: SceneConfig[]) {
    setProject((p) => ({ ...p, scenes }));
  }

  function handleAdd(scene: SceneConfig) {
    setProject((p) => ({ ...p, scenes: [...p.scenes, scene] }));
    setSelectedId(scene.id);
  }

  function handleDelete(id: string) {
    setProject((p) => ({ ...p, scenes: p.scenes.filter((s) => s.id !== id) }));
    setSelectedId((current) => (current === id ? null : current));
  }

  function handleDuplicate(id: string) {
    setProject((p) => {
      const index = p.scenes.findIndex((s) => s.id === id);
      if (index === -1) return p;
      const copy = { ...clone(p.scenes[index]), id: `scene-${Date.now()}` };
      const scenes = [...p.scenes];
      scenes.splice(index + 1, 0, copy);
      return { ...p, scenes };
    });
  }

  function handleScenePropertyChange(updated: SceneConfig) {
    setProject((p) => ({
      ...p,
      scenes: p.scenes.map((s) => (s.id === updated.id ? updated : s)),
    }));
  }

  const selectedScene = project.scenes.find((s) => s.id === selectedId) ?? null;

  return (
    <main
      className="flex min-h-screen flex-col items-center gap-6 px-6 py-10 lg:flex-row lg:items-start lg:justify-center"
      style={{
        background: 'linear-gradient(160deg, #F6F5FC 0%, #FBF7F3 45%, #F2FAF8 100%)',
      }}
    >
      {/* LEFT: preview */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #7C5CFF, #FF6B6B)' }}
          >
            S
          </div>
          <div>
            <h1 className={`${heading.className} text-lg font-bold text-neutral-800`}>
              Scene Studio
            </h1>
            <p className="text-xs text-neutral-500">{project.brandName}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <PillButton active={demoKey === 'perfume'} onClick={() => switchDemo('perfume')} accent="#D98E3F">
            Perfume Demo
          </PillButton>
          <PillButton active={demoKey === 'chat'} onClick={() => switchDemo('chat')} accent="#3BA7E0">
            Chat Demo
          </PillButton>
          <PillButton active={demoKey === 'review'} onClick={() => switchDemo('review')} accent="#1F8A5F">
            Review Demo
          </PillButton>
        </div>

        <div className="flex gap-2">
          {(Object.keys(VIEWPORT_LABELS) as Viewport[]).map((vp) => (
            <PillButton
              key={vp}
              active={project.viewport === vp}
              onClick={() => setProject((p) => ({ ...p, viewport: vp }))}
              accent="#7C5CFF"
            >
              {VIEWPORT_LABELS[vp]}
            </PillButton>
          ))}
        </div>

        <Stage project={project} />
      </div>

      {/* RIGHT: editor panels */}
      <div className="flex w-full max-w-sm flex-col gap-4">
        <SceneList
          scenes={project.scenes}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onReorder={updateScenes}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />
        {selectedScene ? (
          <PropertyPanel scene={selectedScene} onChange={handleScenePropertyChange} />
        ) : (
          <p className="rounded-2xl border-2 border-dashed border-neutral-200 bg-white/60 p-4 text-center text-xs text-neutral-400">
            Select a scene above to edit its text, colors, and settings.
          </p>
        )}
      </div>
    </main>
  );
}
