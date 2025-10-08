import React from "react";
import Layout from "@theme/Layout";
import styles from "./service.module.css";
import { services, Service } from "../../data-sources/data";
import ReactMarkdown from "react-markdown";

export default function ServiceViewer({ service }: { service: Service }) {
  if (!service) {
    return (
      <Layout
        title="Service Not Found"
        description="The requested service was not found."
      >
        <main className={styles.main}>
          <div className={styles.error}>
            <h1>Service Not Found</h1>
            <p>The service you're looking for doesn't exist.</p>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title={service.title} description={service.description}>
      <main className={styles.main}>
        {/* Service Header */}
        <div className={styles.serviceHeader}>
          <div className={styles.serviceInfo}>
            <div className={styles.serviceMeta}>
              <div className={styles.serviceIcon}>{service.icon}</div>
              <div className={styles.metaInfo}>
                <span className={styles.category}>{service.category}</span>
                {service.featured && (
                  <span className={styles.featuredBadge}>Featured</span>
                )}
              </div>
            </div>
            <h1 className={styles.serviceTitle}>{service.title}</h1>
            <p className={styles.serviceDescription}>{service.description}</p>

            <div className={styles.serviceDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Price Range</span>
                <span className={styles.detailValue}>{service.priceRange}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Duration</span>
                <span className={styles.detailValue}>{service.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <h2>Key Features</h2>
          <div className={styles.featuresGrid}>
            {service.features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span className={styles.featureText}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Section */}
        <div className={styles.technologiesSection}>
          <h2>Technologies & Tools</h2>
          <div className={styles.technologiesList}>
            {service.technologies.map((tech, index) => (
              <span key={index} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className={styles.contentSection}>
          <div className={styles.markdownContent}>
            <ReactMarkdown>{service.content}</ReactMarkdown>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <h2>Ready to Get Started?</h2>
          <p>
            Let's discuss your project requirements and create something amazing
            together.
          </p>
          <div className={styles.ctaButtons}>
            <a
              href="mailto:contact@example.com"
              className={styles.primaryButton}
            >
              Get Free Quote
            </a>
            <a href="tel:+1234567890" className={styles.secondaryButton}>
              Schedule Call
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.navigation}>
          <a href="/services" className={styles.backButton}>
            ← Back to Services
          </a>
        </div>
      </main>
    </Layout>
  );
}
