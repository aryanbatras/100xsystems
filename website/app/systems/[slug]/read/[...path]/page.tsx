import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getSystemMeta,
  getSystemFileAtPath,
  getAllSystemFiles,
  getLessonByPath,
  getLessonNavigation,
  getSystemTracks,
  getTrackModules,
  getKnowledgeItem,
} from '@/lib/mdx';
import type { KnowledgeItem } from '@/lib/mdx';
import { SystemFileReadingClient } from './SystemFileReadingClient';

interface Props {
  params: Promise<{ slug: string; path: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, path: pathSegments } = await params;
  const system = getSystemMeta(slug);
  const file = getSystemFileAtPath(slug, pathSegments);
  if (!system || !file) return { title: 'Not Found' };
  return { title: `${file.title} - ${system.title}` };
}

export default async function SystemFileReadingPage({ params }: Props) {
  const { slug, path: pathSegments } = await params;
  const system = getSystemMeta(slug);
  if (!system) notFound();

  const file = getSystemFileAtPath(slug, pathSegments);
  if (!file) notFound();

  // Try lesson-aware navigation first
  const lesson = getLessonByPath(slug, pathSegments);
  let prevFile: { slug: string; title: string } | null = null;
  let nextFile: { slug: string; title: string } | null = null;
  let allFiles: Array<{ slug: string; title: string; order: number; pathSegments: string[] }> = [];

  if (lesson) {
    // Use lesson-aware navigation
    const nav = getLessonNavigation(slug, lesson.slug);
    if (nav.prev) prevFile = { slug: nav.prev.slug, title: nav.prev.title };
    if (nav.next) nextFile = { slug: nav.next.slug, title: nav.next.title };
    allFiles = getAllSystemFiles(slug);
  } else {
    // Fallback to old file-based navigation
    allFiles = getAllSystemFiles(slug);
    const currentIndex = allFiles.findIndex((f) => f.slug === file.slug);
    if (currentIndex > 0) {
      const p = allFiles[currentIndex - 1];
      prevFile = { slug: p.slug, title: p.title };
    }
    if (currentIndex < allFiles.length - 1) {
      const n = allFiles[currentIndex + 1];
      nextFile = { slug: n.slug, title: n.title };
    }
  }

  // ─── Knowledge Base References ────────────────────────────────
  // Resolve knowledge_refs from the file's frontmatter into KB items
  const knowledgeRefs: string[] = file.knowledgeRefs || [];
  const kbItems: (KnowledgeItem & { domain: string })[] = [];
  const domains = ['principles', 'patterns', 'tools', 'technologies'] as const;
  for (const ref of knowledgeRefs) {
    for (const domain of domains) {
      const item = getKnowledgeItem(domain, ref);
      if (item) {
        kbItems.push({ ...item, domain });
        break;
      }
    }
  }
  // Also check file frontmatter for knowledge_refs directly
  const fmRefs: string[] = file.frontmatter?.knowledge_refs || [];
  if (fmRefs.length > 0) {
    for (const ref of fmRefs) {
      // Avoid duplicates
      if (kbItems.some((k) => k.slug === ref)) continue;
      for (const domain of domains) {
        const item = getKnowledgeItem(domain, ref);
        if (item) {
          kbItems.push({ ...item, domain });
          break;
        }
      }
    }
  }

  // Get tracks and modules for breadcrumb display
  const tracks = getSystemTracks(slug);
  const firstSegment = pathSegments.length > 0 ? pathSegments[0] : '';
  const track = firstSegment ? tracks.find(t => t.slug === firstSegment) : null;
  const secondSegment = track && pathSegments.length > 1 ? pathSegments[1] : '';
  const moduleInfo = secondSegment && track ? getTrackModules(slug, track.slug).find(m => m.slug === secondSegment) : null;

  // Determine folder/track display name for breadcrumb
  const sectionLabel = track ? track.title : firstSegment;

  // ─── Multi-Language Lesson Comparison ───────────────────────────
  // Find other tracks that have the same module with a matching lesson
  interface LanguageTrackOption {
    trackSlug: string;
    trackTitle: string;
    language: string;
    lessonSlug: string;
    lessonTitle: string;
    pathSegments: string[];
    isCurrent: boolean;
  }
  const languageTracks: LanguageTrackOption[] = [];
  const lessonSlug = pathSegments.length >= 3 ? pathSegments[pathSegments.length - 1] : '';
  if (track && secondSegment && lessonSlug && tracks.length > 1) {
    for (const otherTrack of tracks) {
      if (otherTrack.slug === track.slug) {
        // Current track — add as active option
        languageTracks.push({
          trackSlug: otherTrack.slug,
          trackTitle: otherTrack.title,
          language: otherTrack.language,
          lessonSlug: lessonSlug,
          lessonTitle: file.title,
          pathSegments: [...pathSegments],
          isCurrent: true,
        });
        continue;
      }

      // Check if the same module slug exists in this other track
      const otherModules = getTrackModules(slug, otherTrack.slug);
      const matchingModule = otherModules.find(m => m.slug === secondSegment);
      if (!matchingModule) continue;

      // Find the lesson with the same slug within the matching module
      const matchingLesson = matchingModule.lessons.find(l => l.slug === lessonSlug);
      if (!matchingLesson) continue;

      languageTracks.push({
        trackSlug: otherTrack.slug,
        trackTitle: otherTrack.title,
        language: otherTrack.language,
        lessonSlug: matchingLesson.slug,
        lessonTitle: matchingLesson.title,
        pathSegments: [otherTrack.slug, secondSegment, matchingLesson.slug],
        isCurrent: false,
      });
    }
  }

  return (
    <SystemFileReadingClient
      system={system}
      file={file}
      allFiles={allFiles}
      prevFile={prevFile}
      nextFile={nextFile}
      folderTag={sectionLabel}
      currentTrack={track || null}
      currentModule={moduleInfo || null}
      kbItems={kbItems}
      languageTracks={languageTracks}
    />
  );
}
