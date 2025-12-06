import React, { useState } from "react";
import Layout from "@theme/Layout";
import styles from "./services.module.css";
import { services, Service } from "../data-sources/data";
import Link from "@docusaurus/Link";

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(services.map((service) => service.category))),
  ];

  // Filter services based on category and search term
  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout
      title="Services"
      description="Professional development services including custom software development, mobile apps, and technical consulting."
    >
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>🛠️ Professional Services</h1>
          <p>
            Need a developer to join your project fast, and bring value in the first day? Let's have a talk.
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.categoryFilters}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ""
                  }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className={styles.servicesGrid}>
          {filteredServices.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.serviceHeader}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <div className={styles.serviceInfo}>
                  <div className={styles.serviceMeta}>
                    <span className={styles.category}>{service.category}</span>
                    {service.featured && (
                      <span className={styles.featuredBadge}>Featured</span>
                    )}
                  </div>
                  <h2 className={styles.serviceTitle}>
                    <Link to={`/service/${service.id}`}>{service.title}</Link>
                  </h2>
                </div>
              </div>

              <div className={styles.serviceDescription}>
                <p>{service.description}</p>
              </div>

              <div className={styles.serviceDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Price Range:</span>
                  <span className={styles.detailValue}>
                    {service.priceRange}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Duration:</span>
                  <span className={styles.detailValue}>{service.duration}</span>
                </div>
              </div>

              <div className={styles.serviceFeatures}>
                <h4>Key Features:</h4>
                <ul>
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                  {service.features.length > 3 && (
                    <li>+{service.features.length - 3} more...</li>
                  )}
                </ul>
              </div>

              {service.mainVideo ? (
                <iframe
                  width="100%"
                  style={{ flex: 1 }}
                  height="270"
                  src={service.mainVideo}
                  title={`Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

              ) : null}
              <div className={styles.serviceTechnologies}>
                {service.technologies.slice(0, 4).map((tech, index) => (
                  <span key={index} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
                {service.technologies.length > 4 && (
                  <span className={styles.moreTech}>
                    +{service.technologies.length - 4} more
                  </span>
                )}
              </div>

              <div className={styles.serviceActions}>
                <Link
                  to={`/service/${service.id}`}
                  className={styles.learnMoreButton}
                >
                  Learn More →
                </Link>
                <a
                  href="https://calendly.com/ali-torabian/30min"
                  className={styles.contactButton}
                >
                  Get Quote
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className={styles.emptyState}>
            <h3>No services found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </main>
    </Layout>
  );
}
