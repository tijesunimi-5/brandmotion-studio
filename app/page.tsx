'use client';

import { useState } from 'react';
import { Stage } from '@/components/Stage';
import { sampleProject } from '@/data/sampleProject';
import { chatDemoProject } from '@/data/chatDemoProject';
import { Project, Viewport } from '@/types/scene';

const VIEWPORT_LABELS: Record<Viewport, string> = {
  iphone: 'iPhone (9:16)',
  square: 'Square (1:1)',
  landscape: 'Landscape (16:9)',
};

const DEMO_PROJECTS: Record<string, Project> = {
  perfume: sampleProject,
  chat: chatDemoProject,
};

export default function Home() {
  const [demoKey, setDemoKey] = useState<'perfume' | 'chat'>('chat');
  const [project, setProject] = useState<Project>(DEMO_PROJECTS['chat']);

  function switchDemo(key: 'perfume' | 'chat') {
    setDemoKey(key);
    setProject(DEMO_PROJECTS[key]);
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 bg-neutral-50 px-6 py-12">
      <div className="text-center">
        <h1 className="text-lg font-semibold text-neutral-800">Scene Studio — Proof of Concept</h1>
        <p className="mt-1 text-sm text-neutral-500">
          {project.brandName} · drag the seek bar, hit play, resize the viewport
        </p>
      </div>

      {/* Demo project switcher */}
      <div className="flex gap-2">
        <button
          onClick={() => switchDemo('perfume')}
          className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wide ${
            demoKey === 'perfume'
              ? 'border-neutral-900 bg-neutral-900 text-white'
              : 'border-neutral-300 text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          Perfume Demo
        </button>
        <button
          onClick={() => switchDemo('chat')}
          className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wide ${
            demoKey === 'chat'
              ? 'border-neutral-900 bg-neutral-900 text-white'
              : 'border-neutral-300 text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          Chat Scene Demo
        </button>
      </div>

      {/* Viewport switcher */}
      <div className="flex gap-2">
        {(Object.keys(VIEWPORT_LABELS) as Viewport[]).map((vp) => (
          <button
            key={vp}
            onClick={() => setProject((p) => ({ ...p, viewport: vp }))}
            className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wide ${
              project.viewport === vp
                ? 'border-neutral-900 bg-neutral-900 text-white'
                : 'border-neutral-300 text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            {VIEWPORT_LABELS[vp]}
          </button>
        ))}
      </div>

      <Stage project={project} />

      <p className="max-w-md text-center text-xs text-neutral-400">
        Chat scene messages live in <code>src/data/chatDemoProject.ts</code> — edit the
        messages array, change sender/text, or switch platform to &quot;instagram&quot; and
        refresh to see it update.
      </p>
    </main>
  );
}
