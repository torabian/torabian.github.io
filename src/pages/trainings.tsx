import React, { useState } from "react";
import Layout from "@theme/Layout";
import styles from "./trainings.module.css";
import { trainings, Training, Chapter } from "../data-sources/data";
import Link from "@docusaurus/Link";

export default function Trainings() {
  const [expandedTraining, setExpandedTraining] = useState<string | null>(null);

  const toggleTraining = (trainingId: string) => {
    setExpandedTraining(expandedTraining === trainingId ? null : trainingId);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "#22c55e";
      case "intermediate":
        return "#f59e0b";
      case "advanced":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <Layout
      title="Trainings"
      description="Professional training courses to enhance your software development skills and knowledge."
    >
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>🎓 Training Courses</h1>
          <p>Enhance your skills with our comprehensive training programs</p>
        </div>

        <div className={styles.trainingsGrid}>
          {trainings.map((training) => (
            <div key={training.id} className={styles.trainingCard}>
              <div className={styles.trainingHeader}>
                <div className={styles.trainingInfo}>
                  <h2 className={styles.trainingTitle}>
                    <Link to={`/training/${training.id}`}>
                      {training.title}
                    </Link>
                  </h2>
                  <div className={styles.trainingMeta}>
                    <span
                      className={styles.level}
                      style={{ backgroundColor: getLevelColor(training.level) }}
                    >
                      {training.level}
                    </span>
                    <span className={styles.category}>{training.category}</span>
                    <span className={styles.language}>{training.language}</span>
                    <span className={styles.duration}>
                      {training.totalDuration}
                    </span>
                  </div>
                </div>
                <button
                  className={styles.expandButton}
                  onClick={() => toggleTraining(training.id)}
                  aria-label={`${
                    expandedTraining === training.id ? "Collapse" : "Expand"
                  } training details`}
                >
                  {expandedTraining === training.id ? "−" : "+"}
                </button>
              </div>

              <div className={styles.trainingDescription}>
                <p>{training.description}</p>
              </div>

              {expandedTraining === training.id && (
                <div className={styles.chaptersSection}>
                  <h3>Course Chapters ({training.chapters.length})</h3>
                  <div className={styles.chaptersList}>
                    {training.chapters.map((chapter, index) => (
                      <div key={chapter.id} className={styles.chapterItem}>
                        <div className={styles.chapterNumber}>{index + 1}</div>
                        <div className={styles.chapterContent}>
                          <h4 className={styles.chapterTitle}>
                            {chapter.title}
                          </h4>
                          <p className={styles.chapterDescription}>
                            {chapter.description}
                          </p>
                          <div className={styles.chapterMeta}>
                            <span className={styles.chapterDuration}>
                              {chapter.duration}
                            </span>
                            {chapter.isCompleted && (
                              <span className={styles.completedBadge}>
                                ✓ Completed
                              </span>
                            )}
                          </div>
                        </div>
                        {chapter.videoUrl && (
                          <button className={styles.watchButton}>Watch</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {trainings.length === 0 && (
          <div className={styles.emptyState}>
            <h3>No trainings available</h3>
            <p>Check back later for new training courses and updates.</p>
          </div>
        )}
      </main>
    </Layout>
  );
}
