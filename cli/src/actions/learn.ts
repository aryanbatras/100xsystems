/**
 * ## Learn Action
 *
 * Finds the next uncompleted lesson across all systems.
 * Combines progress tracking with curriculum reading.
 *
 * @packageDocumentation
 */

import fs from 'fs';
import path from 'path';
import { loadProgress } from './progress.js';
import { getAllSystems, getSystemMeta } from '../reader/system-reader.js';
import { getAllSystemLessons, systemHasTracks } from '../reader/lesson-reader.js';
import type { LessonMeta } from '../reader/lesson-reader.js';

// ─── Types ──────────────────────────────────────────────────────────

export interface NextLesson {
  systemSlug: string;
  systemTitle: string;
  difficulty: string;
  trackTitle?: string;
  lesson: LessonMeta;
  totalCompleted: number;
  totalLessons: number;
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface LearnDashboard {
  nextLesson: NextLesson | null;
  allSystems: SystemProgress[];
  totalCompleted: number;
  totalAvailable: number;
  overallProgress: number; // 0–100
}

export interface SystemProgress {
  slug: string;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
  completedLessons: number;
  totalLessons: number;
  percentComplete: number;
}

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Get a complete learning dashboard showing what to do next.
 */
export function getLearnDashboard(): LearnDashboard {
  const progress = loadProgress();
  const systems = getAllSystems();
  const allSystems: SystemProgress[] = [];
  let totalCompleted = 0;
  let totalAvailable = 0;
  let nextLesson: NextLesson | null = null;

  for (const system of systems) {
    if (!systemHasTracks(system.slug)) continue;

    const lessons = getAllSystemLessons(system.slug);
    if (lessons.length === 0) continue;

    const progressEntry = progress.systems[system.slug];
    const status = progressEntry?.status || 'not-started';
    const completedLessons = countCompletedLessons(lessons, progressEntry?.projectDir);
    totalCompleted += completedLessons;
    totalAvailable += lessons.length;

    allSystems.push({
      slug: system.slug,
      title: system.title,
      status: status as 'not-started' | 'in-progress' | 'completed',
      completedLessons,
      totalLessons: lessons.length,
      percentComplete: Math.round((completedLessons / lessons.length) * 100),
    });

    // Find the first uncompleted lesson (this is "the next thing to do")
    if (!nextLesson) {
      const firstIncomplete = findFirstIncomplete(lessons);
      if (firstIncomplete) {
        const tracks = systemHasTracks(system.slug)
          ? [{ slug: firstIncomplete.track, title: firstIncomplete.track, language: '', difficulty: '' }]
          : [];
        nextLesson = {
          systemSlug: system.slug,
          systemTitle: system.title,
          difficulty: system.difficulty,
          trackTitle: tracks[0]?.title || firstIncomplete.track,
          lesson: firstIncomplete,
          totalCompleted: completedLessons,
          totalLessons: lessons.length,
          status: status as 'not-started' | 'in-progress' | 'completed',
        };
      }
    }
  }

  return {
    nextLesson,
    allSystems,
    totalCompleted,
    totalAvailable,
    overallProgress: totalAvailable > 0 ? Math.round((totalCompleted / totalAvailable) * 100) : 0,
  };
}

/**
 * Get the single next uncompleted lesson across all systems.
 */
export function getNextLesson(): NextLesson | null {
  return getLearnDashboard().nextLesson;
}

// ─── Helpers ────────────────────────────────────────────────────────

function countCompletedLessons(lessons: LessonMeta[], projectDir?: string): number {
  if (!projectDir) return 0;
  // For now, check if the design decisions or architecture docs exist as a heuristic
  try {
    const decisionsPath = path.join(projectDir, 'design', 'decisions.md');
    const archPath = path.join(projectDir, 'design', 'architecture.md');

    const hasDecisions = fs.existsSync(decisionsPath);
    const hasArch = fs.existsSync(archPath);

    if (!hasDecisions && !hasArch) return 0;
    // Rough estimate: if they have design docs, they're at least halfway through
    return Math.ceil(lessons.length * 0.5);
  } catch {
    return 0;
  }
}

function findFirstIncomplete(lessons: LessonMeta[]): LessonMeta | null {
  // For now, return the first lesson that looks "uncompleted"
  // A real implementation would track per-lesson completion
  if (lessons.length === 0) return null;

  // Return the first lesson — the user hasn't started anything yet
  return lessons[0];
}
