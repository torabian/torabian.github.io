import React, { useState } from "react";
import Layout from "@theme/Layout";
import styles from "./insights.module.css";
import { trainings, Training, Chapter, insights } from "../data-sources/data";
import Link from "@docusaurus/Link";

export default function Insights() {
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
      title="Insights"
      description="Articles and notes, comparisons, introductions about technology and engineering"
    >
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Insights</h1>
          <p>
            Articles and notes, comparisons, introductions about technology and
            engineering
          </p>
        </div>

        <div className={styles.trainingsGrid}>
          {insights.map((insight) => (
            <div key={insight.id} className={styles.trainingCard}>
              <div className={styles.trainingHeader}>
                <div className={styles.trainingInfo}>
                  <h2 className={styles.trainingTitle}>
                    <Link to={`/insight/${insight.id}`}>{insight.title}</Link>
                  </h2>
                </div>
              </div>

              <div className={styles.trainingDescription}>
                <p>{insight.description}</p>
              </div>
            </div>
          ))}
        </div>

        {trainings.length === 0 && (
          <div className={styles.emptyState}>
            <h3>No insights available</h3>
            <p>Check back later for new training courses and updates.</p>
          </div>
        )}
      </main>
    </Layout>
  );
}
