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
  accent = '#a855f7',
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
      style={
        active
          ? {
            backgroundColor: accent,
            borderColor: accent,
            color: '#fff',
            boxShadow: `0 0 14px ${accent}44`
          }
          : {
            backgroundColor: '#141419',
            borderColor: '#27272a',
            color: '#a1a1aa'
          }
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
      className="flex min-h-screen flex-col items-center gap-8 px-6 py-10 lg:flex-row lg:items-start lg:justify-center transition-colors duration-300"
      style={{
        background: 'radial-gradient(circle at top left, #0e0e12 0%, #050507 100%)',
      }}
    >
      {/* LEFT COMPONENT: STAGE PREVIEW */}
      <div className="flex flex-col items-center gap-5 bg-neutral-950/40 p-6 rounded-3xl border border-neutral-900 shadow-2xl backdrop-blur-md">
        <div className="flex w-full items-center gap-3 border-b border-neutral-900 pb-4">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-base font-black text-white shadow-md animate-pulse"
            style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
          >
            M
          </div>
          <div>
            <h1 className={`${heading.className} text-lg font-bold tracking-wide text-neutral-100`}>
              brandMotion Studio
            </h1>
            <p className="text-xs font-medium tracking-wider text-neutral-500 uppercase">{project.brandName}</p>
          </div>
        </div>

        {/* Configuration Controllers */}
        <div className="flex flex-col gap-3 w-full border-b border-neutral-900 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-600">Select Demo Variant</span>
          <div className="flex flex-wrap gap-2">
            <PillButton active={demoKey === 'perfume'} onClick={() => switchDemo('perfume')} accent="#a855f7">
              Perfume Product
            </PillButton>
            <PillButton active={demoKey === 'chat'} onClick={() => switchDemo('chat')} accent="#06b6d4">
              Social Threads
            </PillButton>
            <PillButton active={demoKey === 'review'} onClick={() => switchDemo('review')} accent="#ec4899">
              Customer Stack
            </PillButton>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full pb-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-600">Canvas Dimension Layout</span>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(VIEWPORT_LABELS) as Viewport[]).map((vp) => (
              <PillButton
                key={vp}
                active={project.viewport === vp}
                onClick={() => setProject((p) => ({ ...p, viewport: vp }))}
                accent="#3b82f6"
              >
                {VIEWPORT_LABELS[vp]}
              </PillButton>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Stage project={project} />
        </div>
      </div>

      {/* RIGHT COMPONENT: INTERACTIVE EDITORS */}
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
          <div className="rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/50 p-6 text-center shadow-inner backdrop-blur-sm">
            <p className="text-xs text-neutral-500 font-medium tracking-wide">
              Select an active scene path from your timeline array configuration above to initialize the parameter editor properties.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}