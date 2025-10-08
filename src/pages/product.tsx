import React from "react";
import Layout from "@theme/Layout";
import styles from "./product.module.css";
import { trainings, Product } from "../data-sources/data";
import Link from "@docusaurus/Link";

export default function ProductPage({ product }: { product: Product }) {
  if (!product) {
    return (
      <Layout
        title="Product Not Found"
        description="The requested product was not found."
      >
        <main className={styles.main}>
          <div className={styles.errorState}>
            <h1>Product Not Found</h1>
            <p>
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/products" className={styles.backButton}>
              ← Back to Products
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

  const relatedTrainings = product.trainingRelated
    ? trainings.filter((training) =>
        product.trainingRelated?.includes(training.id)
      )
    : [];

  return (
    <Layout
      title={`${product.title} - ${product.type}`}
      description={product.description}
    >
      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <Link to="/products">Products</Link> / {product.title}
        </div>

        <div className={styles.hero}>
          <div className={styles.productHeader}>
            <div className={styles.productTitle}>
              <h1>{product.title}</h1>
              <span className={`${styles.status} ${styles[product.status]}`}>
                {product.status}
              </span>
            </div>
            <p className={styles.productType}>{product.type}</p>
            <p className={styles.productDescription}>{product.description}</p>
          </div>

          <div className={styles.productActions}>
            {product.links.github && (
              <a
                href={product.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
              >
                📁 GitHub
              </a>
            )}
            {product.links.documentation && (
              <a
                href={product.links.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
              >
                📚 Documentation
              </a>
            )}
            {product.links.demo && (
              <a
                href={product.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
              >
                🚀 Demo
              </a>
            )}
            {product.links.download && (
              <a
                href={product.links.download}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
              >
                ⬇️ Download
              </a>
            )}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h2>About {product.title}</h2>
            <p>{product.details}</p>
          </div>

          <div className={styles.section}>
            <h2>Key Features</h2>
            <ul className={styles.features}>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {relatedTrainings.length > 0 && (
            <div className={styles.section}>
              <h2>Related Training</h2>
              <p>Learn more about this product through our training courses:</p>
              <div className={styles.trainingList}>
                {relatedTrainings.map((training) => (
                  <Link
                    key={training.id}
                    to={`/trainings?id=${training.id}`}
                    className={styles.trainingCard}
                  >
                    <h3>{training.title}</h3>
                    <p>{training.description}</p>
                    <div className={styles.trainingMeta}>
                      <span className={styles.trainingLevel}>
                        {training.level}
                      </span>
                      <span className={styles.trainingDuration}>
                        {training.totalDuration}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className={styles.section}>
            <h2>Product Information</h2>
            <div className={styles.productInfo}>
              <div className={styles.infoItem}>
                <strong>Type:</strong> {product.type}
              </div>
              <div className={styles.infoItem}>
                <strong>Status:</strong>
                <span className={`${styles.status} ${styles[product.status]}`}>
                  {product.status}
                </span>
              </div>
              <div className={styles.infoItem}>
                <strong>Last Updated:</strong> {product.lastUpdated}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
