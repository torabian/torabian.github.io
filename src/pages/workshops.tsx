import React, { useState } from "react";
import Layout from "@theme/Layout";
import styles from "./workshops.module.css";
import { workshops, Workshop, WorkshopSection } from "../data-sources/data";
import Link from "@docusaurus/Link";

export default function Workshops() {
  const [expandedWorkshop, setExpandedWorkshop] = useState<string | null>(null);

  const toggleWorkshop = (workshopId: string) => {
    setExpandedWorkshop(expandedWorkshop === workshopId ? null : workshopId);
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
      title="Workshops"
      description="Hands-on workshops to enhance your development skills with practical, interactive learning experiences."
    >
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>🛠️ Development Workshops</h1>
          <p>
            Hands-on learning experiences to master new technologies and
            techniques
          </p>
        </div>

        <div className={styles.workshopsGrid}>
          {workshops.map((workshop) => (
            <div key={workshop.id} className={styles.workshopCard}>
              {workshop.mainVideo ?
                <iframe
                  width="300"
                  src={workshop.mainVideo}
                  title={`Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                : null}
              <div style={{ flex: 1, marginLeft: '25px' }}>
                <div className={styles.workshopHeader}>
                  <div className={styles.workshopInfo}>
                    <h2 className={styles.workshopTitle}>
                      <Link to={`/workshop/${workshop.id}`}>
                        {workshop.title}
                      </Link>
                    </h2>
                    <div className={styles.workshopMeta}>
                      <span
                        className={styles.level}
                        style={{ backgroundColor: getLevelColor(workshop.level) }}
                      >
                        {workshop.level}
                      </span>
                      <span className={styles.category}>{workshop.category}</span>
                      <span className={styles.language}>{workshop.language}</span>
                      <span className={styles.duration}>
                        {workshop.totalDuration}
                      </span>
                    </div>
                  </div>
                  <button
                    className={styles.expandButton}
                    onClick={() => toggleWorkshop(workshop.id)}
                    aria-label={`${expandedWorkshop === workshop.id ? "Collapse" : "Expand"
                      } workshop details`}
                  >
                    {expandedWorkshop === workshop.id ? "−" : "+"}
                  </button>
                </div>

                <div className={styles.workshopDescription}>
                  <p>{workshop.description}</p>
                </div>

                {expandedWorkshop === workshop.id && (
                  <div className={styles.detailsSection}>
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

                    <div className={styles.sectionsSection}>
                      <h3>Workshop Sections ({workshop.sections.length})</h3>
                      <div className={styles.sectionsList}>
                        {workshop.sections.map((section, index) => (
                          <div key={section.id} className={styles.sectionItem}>
                            <div className={styles.sectionNumber}>
                              {index + 1}
                            </div>
                            <div className={styles.sectionContent}>
                              <h4 className={styles.sectionTitle}>
                                {section.title}
                              </h4>
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
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {workshops.length === 0 && (
          <div className={styles.emptyState}>
            <h3>No workshops available</h3>
            <p>Check back later for new workshop sessions and updates.</p>
          </div>
        )}
      </main>
    </Layout>
  );
}
