'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Project, VIEWPORT_SIZES } from '@/types/scene';
import { renderScene, animateScene } from './sceneRegistry';

export function Stage({ project }: { project: Project }) {
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 - 1, drives the seek bar
  const [duration, setDuration] = useState(0);

  const { width, height } = VIEWPORT_SIZES[project.viewport];

  // Build the master timeline once when the project changes.
  useEffect(() => {
    const tl = gsap.timeline({
      paused: true,
      onUpdate: () => {
        // Keep the seek bar in sync while the timeline plays on its own
        setProgress(tl.progress());
      },
      onComplete: () => setIsPlaying(false),
    });

    let cursor = 0;

    project.scenes.forEach((scene, i) => {
      const el = sceneRefs.current[i];
      if (!el) return;

      // Show this scene, hide the previous one, right at `cursor`
      if (i > 0) {
        const prevEl = sceneRefs.current[i - 1];
        if (prevEl) tl.set(prevEl, { autoAlpha: 0 }, cursor);
      }
      tl.set(el, { autoAlpha: 1 }, cursor);

      // Let the scene animate its own internals starting at `cursor`
      animateScene(scene, el, tl, cursor);

      cursor += scene.duration;
    });

    timelineRef.current = tl;
    setDuration(cursor);
    setProgress(0);

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  function togglePlay() {
    const tl = timelineRef.current;
    if (!tl) return;

    if (tl.progress() >= 1) {
      tl.restart();
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      tl.pause();
      setIsPlaying(false);
    } else {
      tl.play();
      setIsPlaying(true);
    }
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const tl = timelineRef.current;
    if (!tl) return;
    const value = parseFloat(e.target.value);
    tl.pause();
    setIsPlaying(false);
    tl.progress(value);
    setProgress(value);
  }

  function restart() {
    const tl = timelineRef.current;
    if (!tl) return;
    tl.restart();
    setIsPlaying(true);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* The actual "recordable" area — screen record just this box */}
      <div
        className="relative overflow-hidden rounded-2xl bg-black shadow-2xl"
        style={{ width, height }}
      >
        {project.scenes.map((scene, i) => (
          <div
            key={scene.id}
            ref={(el) => {
              sceneRefs.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ background: scene.background ?? '#111', opacity: 0 }}
          >
            {renderScene(scene)}
          </div>
        ))}
      </div>

      {/* Controls — this row is NOT part of the recording, keep it below the stage */}
      <div className="flex w-full max-w-[420px] flex-col gap-2">
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={progress}
          onChange={handleSeek}
          className="w-full accent-neutral-800"
        />
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <span>{(progress * duration).toFixed(1)}s</span>
          <div className="flex gap-2">
            <button
              onClick={togglePlay}
              className="rounded-full border px-4 py-1.5 text-xs uppercase tracking-wide hover:bg-neutral-100"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={restart}
              className="rounded-full border px-4 py-1.5 text-xs uppercase tracking-wide hover:bg-neutral-100"
            >
              Restart
            </button>
          </div>
          <span>{duration.toFixed(1)}s</span>
        </div>
      </div>
    </div>
  );
}
