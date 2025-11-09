import React, { useState } from "react";
import Layout from "@theme/Layout";
import styles from "./experiences.module.css";

import Link from "@docusaurus/Link";
import { experiences } from "../data-sources/experiences";

export default function Experiences() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(experiences.map((exp) => exp.category))),
  ];

  // Filter experiences based on category and search term
  const filteredExperiences = experiences.filter((experience) => {
    const matchesCategory =
      selectedCategory === "all" || experience.category === selectedCategory;
    const matchesSearch =
      experience.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experience.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experience.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Layout
      title="Experiences"
      description="Real-world development experiences, lessons learned, and technical insights from building software solutions."
    >
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>🚀 Experiences</h1>
          <p>
            Real-world insights, lessons learned, and technical deep-dives from
            building software solutions, and other stuff in life.
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search experiences..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.categoryFilters}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  selectedCategory === category ? styles.active : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Experiences Grid */}
        <div className={styles.experiencesGrid}>
          {filteredExperiences.map((experience) => (
            <div key={experience.id} className={styles.experienceCard}>
              <div className={styles.experienceHeader}>
                <div className={styles.experienceMeta}>
                  <span className={styles.category}>{experience.category}</span>
                  {experience.date ? (
                    <span className={styles.date}>
                      {formatDate(experience.date)}
                    </span>
                  ) : null}
                  {experience.featured && (
                    <span className={styles.featuredBadge}>Featured</span>
                  )}
                </div>
                <h2 className={styles.experienceTitle}>
                  <Link to={`/experience/${experience.id}`}>
                    {experience.title}
                  </Link>
                </h2>
              </div>

              <div className={styles.experienceDescription}>
                <p>{experience.description}...</p>
              </div>

              <div className={styles.experienceTags}>
                {experience.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              {experience.videoUrl && (
                <div className={styles.videoPreview}>
                  <iframe
                    src={experience.videoUrl}
                    title={experience.videoTitle || experience.title}
                    width="100%"
                    height="200"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}

              <div className={styles.experienceActions}>
                <Link
                  to={`/experience/${experience.id}`}
                  className={styles.readMoreButton}
                >
                  Read Experience →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <div className={styles.emptyState}>
            <h3>No experiences found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </main>
    </Layout>
  );
}
