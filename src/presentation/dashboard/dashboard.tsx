/**
 * ## Presentation: Dashboard Page
 *
 * User dashboard showing achievements, progress,
 * learning streaks, and profile overview.
 *
 * @packageDocumentation
 */

'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import InteractiveButton from '../../presentation/components/animated/InteractiveButton';
import AnimatedSection from '../../presentation/components/animated/AnimatedSection';
import AnimatedTitle from '../../presentation/components/animated/AnimatedTitle';
import styles from '../../presentation/_styles/pages/dashboard.module.css';

/** @public */
interface SystemModule {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

/**
 * Dashboard page — learning overview with modules, stats, and coming-soon features.
 *
 * @remarks
 * Renders the user's learning dashboard including hero stats, module progress cards,
 * and a coming-soon section. Currently uses mocked data; will be connected to
 * user progress services in a future iteration.
 */
export default function DashboardPage() {
  const router = useRouter();
  const [user] = useState({ name: '100x Engineer', level: 'Senior Systems Architect' });
  const [modules] = useState<SystemModule[]>([
    {
      id: 'system-fundamentals', title: 'System Fundamentals',
      description: 'Master the core principles of systems thinking and software architecture',
      progress: 75, totalLessons: 12, completedLessons: 9,
      difficulty: 'Intermediate', estimatedTime: '8 hours', status: 'in-progress'
    },
    {
      id: 'scalability-patterns', title: 'Scalability Patterns',
      description: 'Learn patterns and strategies for building scalable distributed systems',
      progress: 30, totalLessons: 15, completedLessons: 4,
      difficulty: 'Advanced', estimatedTime: '12 hours', status: 'in-progress'
    },
    {
      id: 'performance-optimization', title: 'Performance Optimization',
      description: 'Techniques for optimizing system performance and resource utilization',
      progress: 0, totalLessons: 10, completedLessons: 0,
      difficulty: 'Advanced', estimatedTime: '10 hours', status: 'not-started'
    },
    {
      id: 'microservices-architecture', title: 'Microservices Architecture',
      description: 'Design and implement microservices-based systems',
      progress: 60, totalLessons: 14, completedLessons: 8,
      difficulty: 'Intermediate', estimatedTime: '15 hours', status: 'in-progress'
    },
    {
      id: 'database-design', title: 'Database Design & Optimization',
      description: 'Master database design patterns and optimization techniques',
      progress: 90, totalLessons: 8, completedLessons: 7,
      difficulty: 'Intermediate', estimatedTime: '6 hours', status: 'in-progress'
    },
    {
      id: 'security-patterns', title: 'Security Patterns',
      description: 'Implement security best practices and patterns in system design',
      progress: 0, totalLessons: 11, completedLessons: 0,
      difficulty: 'Advanced', estimatedTime: '9 hours', status: 'not-started'
    }
  ]);

  const [stats] = useState({
    totalModulesCompleted: 2, totalLessonsCompleted: 28,
    totalHoursSpent: 45, currentStreak: 7, longestStreak: 14
  });

  const handleModuleClick = (moduleId: string) => {
    router.push(`/modules/${moduleId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return styles.beginner;
      case 'Intermediate': return styles.intermediate;
      case 'Advanced': return styles.advanced;
      default: return styles.beginner;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return styles.completed;
      case 'in-progress': return styles.inProgress;
      case 'not-started': return styles.notStarted;
      default: return styles.notStarted;
    }
  };

  return (
    <>
      <Head>
        <title>100x Systems Dashboard</title>
        <meta name="description" content="Your learning dashboard for mastering systems thinking" />
      </Head>

      <div className={styles.page}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <AnimatedTitle variant="hero" delay={0.1} className={styles.heroTitle}>
                Welcome Back, {user.name.split(' ')[0]}
              </AnimatedTitle>
              <p className={styles.heroSubtitle}>
                Continue your journey to becoming a {user.level}
              </p>
              <div className={styles.heroActions}>
                <InteractiveButton
                  variant="cta"
                  href="/modules/continue"
                  scrambleText={{ hover: "CONTINUE JOURNEY", speed: 2, chars: "upperCase", revealDelay: 0.1 }}
                >
                  Continue Learning
                </InteractiveButton>
                <InteractiveButton
                  variant="secondary"
                  href="/paths"
                  scrambleText={{ hover: "EXPLORE PATHS", speed: 2, chars: "upperCase", revealDelay: 0.1 }}
                >
                  Explore Paths
                </InteractiveButton>
              </div>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>{stats.currentStreak}</span>
                <span className={styles.heroStatLabel}>Day Streak</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>{stats.totalHoursSpent}h</span>
                <span className={styles.heroStatLabel}>Hours Learned</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>{stats.totalModulesCompleted}</span>
                <span className={styles.heroStatLabel}>Modules Done</span>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Modules */}
        <AnimatedSection animationType="fadeInUp" delay={0.4}>
          <section className={styles.modulesSection}>
            <div className={styles.modulesContainer}>
              <AnimatedTitle variant="section" delay={0.1} className={styles.sectionTitle}>
                Your Learning Modules
              </AnimatedTitle>
              <div className={styles.modulesGrid}>
                {modules.map((module) => (
                  <div key={module.id} className={styles.moduleCard} onClick={() => handleModuleClick(module.id)}>
                    <div className={styles.moduleHeader}>
                      <h3 className={styles.moduleTitle}>{module.title}</h3>
                      <span className={`${styles.difficulty} ${getDifficultyColor(module.difficulty)}`}>
                        {module.difficulty}
                      </span>
                    </div>
                    <p className={styles.moduleDescription}>{module.description}</p>
                    <div className={styles.moduleProgress}>
                      <div className={styles.progressInfo}>
                        <span>{module.completedLessons}/{module.totalLessons} lessons</span>
                        <span>{module.progress}%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${module.progress}%` }} />
                      </div>
                    </div>
                    <div className={styles.moduleFooter}>
                      <span className={styles.estimatedTime}>⏱️ {module.estimatedTime}</span>
                      <span className={`${styles.status} ${getStatusColor(module.status)}`}>
                        {module.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Coming Soon Section */}
        <AnimatedSection animationType="fadeInUp" delay={0.6}>
          <section className={styles.comingSoonSection}>
            <div className={styles.comingSoonContainer}>
              <AnimatedTitle variant="section" delay={0.1} className={styles.sectionTitle}>
                Coming Soon
              </AnimatedTitle>
              <div className={styles.comingSoonGrid}>
                {[
                  { icon: '🏆', title: 'Achievements System', desc: 'Track your progress and unlock special badges as you master new concepts' },
                  { icon: '📊', title: 'Progress Reports', desc: 'Detailed analytics and insights about your learning journey' },
                  { icon: '🎮', title: 'Practice Challenges', desc: 'Test your skills with real-world system design challenges' },
                  { icon: '👥', title: 'Community Features', desc: 'Connect with other learners and share your insights' },
                ].map((item, i) => (
                  <div key={i} className={styles.comingSoonCard}>
                    <div className={styles.comingSoonIcon}>{item.icon}</div>
                    <h3 className={styles.comingSoonTitle}>{item.title}</h3>
                    <p className={styles.comingSoonDescription}>{item.desc}</p>
                    <div className={styles.comingSoonBadge}>Coming Soon</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </>
  );
}
