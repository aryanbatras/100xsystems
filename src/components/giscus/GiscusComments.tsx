import { useEffect, useState } from 'react';
import Giscus from '@giscus/react';
import styles from './giscus.module.css';

interface GiscusCommentsProps {
  groupId: string;
  groupName: string;
  category: 'discussion' | 'announcement' | 'question' | 'resource' | 'achievement';
  readOnly?: boolean;
}

const CATEGORY_MAPPING = {
  discussion: {
    name: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_DISCUSSIONS || 'StudyGroupDiscussions',
    id: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID_DISCUSSIONS || 'DIC_kwDORewCZ84C326H'
  },
  announcement: {
    name: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ANNOUNCEMENTS || 'StudyGroupAnnouncement',
    id: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID_ANNOUNCEMENTS || 'DIC_kwDORewCZ84C325c'
  },
  question: {
    name: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_QUESTIONS || 'StudyGroupQuestions',
    id: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID_QUESTIONS || 'DIC_kwDORewCZ84C326O'
  },
  resource: {
    name: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_RESOURCES || 'StudyGroupResources',
    id: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID_RESOURCES || 'DIC_kwDORewCZ84C326P'
  },
  achievement: {
    name: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ACHIEVEMENTS || 'StudyGroupAchievements',
    id: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID_ACHIEVEMENTS || 'DIC_kwDORewCZ84C326c'
  }
};

export const GiscusComments: React.FC<GiscusCommentsProps> = ({ 
  groupId, 
  groupName,
  category, 
  readOnly = false 
}) => {

  if (!process.env.NEXT_PUBLIC_GISCUS_REPO || !process.env.NEXT_PUBLIC_GISCUS_REPO_ID) {
    return (
      <div className={styles.giscusContainer}>
        <div className={styles.error}>
          Discussions are not available at this time.
        </div>
      </div>
    );
  }

  const categoryConfig = CATEGORY_MAPPING[category];

  return (
    <div className={styles.giscusContainer}>
      <Giscus
        repo={process.env.NEXT_PUBLIC_GISCUS_REPO}
        repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID}
        category={categoryConfig.name}
        categoryId={categoryConfig.id}
        mapping="specific"
        term={`${groupName.toLowerCase().replace(/\s+/g, '-')}-${category}` as any}
        reactionsEnabled="1"
        emitMetadata="0"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  );
};
