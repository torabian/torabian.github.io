import React from "react";
import Layout from "@theme/Layout";
import styles from "./experience.module.css";
import { experiences, Experience } from "../../data-sources/data";
import ReactMarkdown from "react-markdown";

export default function ExperienceViewer({
  experience,
}: {
  experience: Experience;
}) {
  if (!experience) {
    return (
      <Layout
        title="Experience Not Found"
        description="The requested experience was not found."
      >
        <main className={styles.main}>
          <div className={styles.error}>
            <h1>Experience Not Found</h1>
            <p>The experience you're looking for doesn't exist.</p>
          </div>
        </main>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Layout title={experience.title} description={experience.description}>
      <main className={styles.main}>
        {/* Experience Header */}
        <div className={styles.experienceHeader}>
          <div className={styles.experienceInfo}>
            <div className={styles.experienceMeta}>
              <span className={styles.category}>{experience.category}</span>
              <span className={styles.date}>{formatDate(experience.date)}</span>
              {experience.featured && (
                <span className={styles.featuredBadge}>Featured</span>
              )}
            </div>
            <h1 className={styles.experienceTitle}>{experience.title}</h1>
            <p className={styles.experienceDescription}>
              {experience.description}
            </p>

            <div className={styles.experienceTags}>
              {experience.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Video Section */}
        {experience.videoUrl && (
          <div className={styles.videoSection}>
            <h2>Video Walkthrough</h2>
            <div className={styles.videoContainer}>
              <iframe
                src={experience.videoUrl}
                title={experience.videoTitle || experience.title}
                width="100%"
                height="500"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className={styles.contentSection}>
          <div className={styles.markdownContent}>
            <ReactMarkdown>{experience.content}</ReactMarkdown>
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.navigation}>
          <a href="/experiences" className={styles.backButton}>
            ← Back to Experiences
          </a>
        </div>
      </main>
    </Layout>
  );
}
