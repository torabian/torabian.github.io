import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import styles from "./workshop.module.css";
import { workshops, Workshop, WorkshopSection } from "../../data-sources/data";
import ReactMarkdown from "react-markdown";

export default function WorkshopViewer({ workshop }: { workshop: Workshop }) {
  const [selectedSection, setSelectedSection] =
    useState<WorkshopSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSectionSelect = (section: WorkshopSection) => {
    setSelectedSection(section);
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
      <Layout title="Loading..." description="Loading workshop...">
        <main className={styles.main}>
          <div className={styles.loading}>Loading workshop...</div>
        </main>
      </Layout>
    );
  }

  if (!workshop) {
    return (
      <Layout
        title="Workshop Not Found"
        description="The requested workshop was not found."
      >
        <main className={styles.main}>
          <div className={styles.error}>
            <h1>Workshop Not Found</h1>
            <p>The workshop you're looking for doesn't exist.</p>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title={workshop.title} description={workshop.description}>
      <main className={styles.main}>
        {/* Workshop Header */}
        <div className={styles.workshopHeader}>
          <div className={styles.workshopInfo}>
            <h1 className={styles.workshopTitle}>{workshop.title}</h1>
            <div className={styles.workshopMeta}>
              <span
                className={styles.level}
                style={{ backgroundColor: getLevelColor(workshop.level) }}
              >
                {workshop.level}
              </span>
              <span className={styles.category}>{workshop.category}</span>
              <span className={styles.language}>{workshop.language}</span>
              <span className={styles.duration}>{workshop.totalDuration}</span>
            </div>
            <p className={styles.workshopDescription}>{workshop.description}</p>

            {workshop.download && (
              <a
                href={workshop.download}
                target="_blank"
                style={{ backgroundColor: 'green' }}
                rel="noopener noreferrer"
                className={"actionButton"}
              >
                ⬇️ Download Files
              </a>
            )}

            {/* Prerequisites and Tools */}
            <div className={styles.workshopDetails}>
              <div className={styles.prerequisitesSection}>
                <h3>Prerequisites</h3>
                <ul className={styles.prerequisitesList}>
                  {workshop.prerequisites.map((prereq, index) => (
                    <li key={index}>{prereq}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.toolsSection}>
                <h3>Tools & Technologies</h3>
                <div className={styles.toolsList}>
                  {workshop.tools.map((tool, index) => (
                    <span key={index} className={styles.toolTag}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={styles.contentArea}>
          {/* Left Sidebar - Sections */}
          <div className={styles.sectionsSidebar}>
            <h3>Workshop Sections ({workshop.sections.length})</h3>
            <div className={styles.sectionsList}>
              {workshop.sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`${styles.sectionItem} ${selectedSection?.id === section.id ? styles.selected : ""
                    }`}
                  onClick={() => handleSectionSelect(section)}
                >
                  <div className={styles.sectionNumber}>{index + 1}</div>
                  <div className={styles.sectionContent}>
                    <h4 className={styles.sectionTitle}>{section.title}</h4>
                    <p className={styles.sectionDescription}>
                      {section.description}
                    </p>
                    <div className={styles.sectionMeta}>
                      <span className={styles.sectionDuration}>
                        {section.duration}
                      </span>
                      {section.isCompleted && (
                        <span className={styles.completedBadge}>
                          ✓ Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Selected Section */}
          <div className={styles.mainContent}>
            {selectedSection ? (
              <div className={styles.sectionContent}>
                <div className={styles.sectionHeader}>
                  <h2>{selectedSection.title}</h2>
                  <div className={styles.sectionInfo}>
                    <span className={styles.sectionDuration}>
                      {selectedSection.duration}
                    </span>
                    {selectedSection.isCompleted && (
                      <span className={styles.completedBadge}>✓ Completed</span>
                    )}
                  </div>
                </div>
                {selectedSection.mainVideo ? (
                  <iframe
                    width="100%"
                    style={{ flex: 1 }}
                    height="470"
                    src={selectedSection.mainVideo?.url}
                    title={`Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : null}

                <div className={styles.sectionDescription}>
                  <p>{selectedSection.description}</p>
                </div>

                <div className={styles.markdownContent}>
                  <ReactMarkdown>{selectedSection.content?.trim()}</ReactMarkdown>
                </div>

                <div className={styles.sectionActions}>
                  <button className={styles.completeButton}>
                    Mark as Complete
                  </button>
                  <button className={styles.nextButton}>Next Section</button>
                </div>
              </div>
            ) : (
              <div className={styles.noSectionSelected}>
                <h3>Select a section to begin</h3>
                <p>Choose a section from the sidebar to start learning.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
