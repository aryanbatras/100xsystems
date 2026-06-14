/**
 * ## Presentation: DSA Problems Page
 *
 * Displays Data Structures and Algorithms problems with
 * expandable sections, category grouping, and difficulty
 * indicators. Renders server-fetched DSA content.
 *
 * @packageDocumentation
 */

import { useState } from 'react';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { DSAContent, DSASection, DSACategory, DSAProblem } from '../../../infrastructure/staticSiteGenerator';
import styles from '../../_styles/pages/dsa.module.css';

export interface DSAProps {
  dsaContent: DSAContent;
}

export default function DSA({ dsaContent }: DSAProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedProblems, setExpandedProblems] = useState<Set<string>>(new Set());

  const toggleSection = (sectionName: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionName)) {
      newExpanded.delete(sectionName);
    } else {
      newExpanded.add(sectionName);
    }
    setExpandedSections(newExpanded);
  };

  const toggleProblem = (problemId: string) => {
    const newExpanded = new Set(expandedProblems);
    if (newExpanded.has(problemId)) {
      newExpanded.delete(problemId);
    } else {
      newExpanded.add(problemId);
    }
    setExpandedProblems(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#22c55e';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      case 'Theory': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <>
      <Head>
        <title>DSA Problems - 100x Systems</title>
        <meta name="description" content="Comprehensive DSA problem collection following structured curriculum for interview preparation." />
        <meta property="og:title" content="DSA Problems - 100x Systems" />
        <meta property="og:description" content="Comprehensive DSA problem collection following structured curriculum for interview preparation." />
        <meta property="og:type" content="website" />
      </Head>

      <div className={styles.dsaContainer}>
        <div className={styles.dsaWrapper}>
          <header className={styles.dsaHeader}>
            <h1>DSA Problems</h1>
            <p className={styles.dsaDescription}>
              Comprehensive collection of Data Structures and Algorithms problems following a structured curriculum
              designed for interview preparation. Problems are organized by categories and difficulty levels.
            </p>
            <div className={styles.stats}>
              <span className={styles.stat}>
                <span className={styles.statNumber}>{dsaContent.totalProblems}</span>
                <span className={styles.statLabel}>Total Problems</span>
              </span>
              <span className={styles.stat}>
                <span className={styles.statNumber}>{dsaContent.sections.length}</span>
                <span className={styles.statLabel}>Sections</span>
              </span>
            </div>
          </header>

          <main className={styles.dsaMain}>
            {dsaContent.sections.map((section) => (
              <div key={section.name} className={styles.section}>
                <div
                  className={styles.sectionHeader}
                  onClick={() => toggleSection(section.name)}
                >
                  <h2 className={styles.sectionTitle}>
                    {section.displayName}
                  </h2>
                  <div className={styles.sectionStats}>
                    {section.categories.reduce((sum, cat) => sum + cat.problems.length, 0)} problems
                  </div>
                </div>

                {expandedSections.has(section.name) && (
                  <div className={styles.sectionContent}>
                    {section.categories.map((category) => (
                      <div key={category.name} className={styles.category}>
                        <div className={styles.categoryHeader}>
                          <h3 className={styles.categoryTitle}>{category.displayName}</h3>
                          <span className={styles.categoryCount}>{category.problems.length} problems</span>
                        </div>

                        <div className={styles.problemsList}>
                          {category.problems.map((problem) => (
                            <div key={problem.id} className={styles.problemItem}>
                              <div
                                className={styles.problemHeader}
                                onClick={() => toggleProblem(problem.id)}
                              >
                                <div className={styles.problemInfo}>
                                  <span className={styles.problemNumber}>{problem.order.toString().padStart(3, '0')}</span>
                                  <h4 className={styles.problemTitle}>{problem.title}</h4>
                                  <div className={styles.problemMeta}>
                                    <span
                                      className={styles.difficulty}
                                      style={{ color: getDifficultyColor(problem.difficulty) }}
                                    >
                                      {problem.difficulty}
                                    </span>
                                  </div>
                                </div>
                                <span className={`${styles.problemExpandIcon} ${expandedProblems.has(problem.id) ? styles.expanded : ''}`}>
                                  ▼
                                </span>
                              </div>

                              {expandedProblems.has(problem.id) && (
                                <div className={styles.problemContent}>
                                 {problem.leetcode && (
                                      <a
                                        href={problem.leetcode}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.leetcodeLink}
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        Solve
                                      </a>
                                    )}
                                  <div className={styles.problemDescription}>
                                    <h5>Problem Description</h5>
                                    <ReactMarkdown>{problem.description}</ReactMarkdown>
                                  </div>

                                  {problem.examples && problem.examples.length > 0 && (
                                    <div className={styles.problemExamples}>
                                      <h5>Examples</h5>
                                      {problem.examples.map((example, index) => (
                                        <div key={index} className={styles.example}>
                                          <pre>{example}</pre>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {problem.timeComplexity && (
                                    <div className={styles.complexity}>
                                      <h5>Time Complexity</h5>
                                      <ReactMarkdown>{problem.timeComplexity}</ReactMarkdown>
                                    </div>
                                  )}

                                  {problem.spaceComplexity && (
                                    <div className={styles.complexity}>
                                      <h5>Space Complexity</h5>
                                      <ReactMarkdown>{problem.spaceComplexity}</ReactMarkdown>
                                    </div>
                                  )}

                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </main>
        </div>
      </div>
    </>
  );
}
