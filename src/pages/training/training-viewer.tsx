import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import styles from "./training.module.css";
import { trainings, Training, Chapter } from "../../data-sources/data";

export default function TrainingViewer({ training }: { training: Training }) {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleChapterSelect = (chapter: Chapter) => {
    setSelectedChapter(chapter);
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

  if (loading) {
    return (
      <Layout title="Loading..." description="Loading training...">
        <main className={styles.main}>
          <div className={styles.loading}>Loading training...</div>
        </main>
      </Layout>
    );
  }

  if (!training) {
    return (
      <Layout
        title="Training Not Found"
        description="The requested training was not found."
      >
        <main className={styles.main}>
          <div className={styles.error}>
            <h1>Training Not Found</h1>
            <p>The training you're looking for doesn't exist.</p>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title={training.title} description={training.description}>
      <main className={styles.main}>
        {/* Training Header */}
        <div className={styles.trainingHeader}>
          <div className={styles.trainingInfo}>
            <h1 className={styles.trainingTitle}>{training.title}</h1>
            <div className={styles.trainingMeta}>
              <span
                className={styles.level}
                style={{ backgroundColor: getLevelColor(training.level) }}
              >
                {training.level}
              </span>
              <span className={styles.category}>{training.category}</span>
              <span className={styles.language}>{training.language}</span>
              <span className={styles.duration}>{training.totalDuration}</span>
            </div>
            <p className={styles.trainingDescription}>{training.description}</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={styles.contentArea}>
          {/* Left Sidebar - Chapters */}
          <div className={styles.chaptersSidebar}>
            <h3>Course Chapters ({training.chapters.length})</h3>
            <div className={styles.chaptersList}>
              {training.chapters.map((chapter, index) => (
                <div
                  key={chapter.id}
                  className={`${styles.chapterItem} ${
                    selectedChapter?.id === chapter.id ? styles.selected : ""
                  }`}
                  onClick={() => handleChapterSelect(chapter)}
                >
                  <div className={styles.chapterNumber}>{index + 1}</div>
                  <div className={styles.chapterContent}>
                    <h4 className={styles.chapterTitle}>{chapter.title}</h4>
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
                    <div className={styles.videoThumbnail}>
                      <iframe
                        src={chapter.videoUrl}
                        title={chapter.title}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Selected Chapter */}
          <div className={styles.mainContent}>
            {selectedChapter ? (
              <div className={styles.chapterContent}>
                <div className={styles.chapterHeader}>
                  <h2>{selectedChapter.title}</h2>
                  <div className={styles.chapterInfo}>
                    <span className={styles.chapterDuration}>
                      {selectedChapter.duration}
                    </span>
                    {selectedChapter.isCompleted && (
                      <span className={styles.completedBadge}>✓ Completed</span>
                    )}
                  </div>
                </div>

                <div className={styles.chapterDescription}>
                  <p>{selectedChapter.description}</p>
                </div>

                {selectedChapter.videoUrl && (
                  <div className={styles.videoPlayer}>
                    <iframe
                      src={selectedChapter.videoUrl}
                      title={selectedChapter.title}
                      width="100%"
                      height="400"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                )}

                <div className={styles.chapterActions}>
                  <button className={styles.watchButton}>
                    {selectedChapter.videoUrl ? "Watch Video" : "Read Content"}
                  </button>
                  <button className={styles.completeButton}>
                    Mark as Complete
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.noChapterSelected}>
                <h3>Select a chapter to begin</h3>
                <p>Choose a chapter from the sidebar to start learning.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
