import React, { ReactNode } from "react";
import Layout from "@theme/Layout";
import styles from "./product.module.css";
import { trainings, Product } from "../data-sources/data";
import Link from "@docusaurus/Link";

export default function ProductPage({
  product,
  children,
}: {
  product: Product;
  children?: ReactNode;
}) {
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
                style={{ backgroundColor: 'green' }}
                rel="noopener noreferrer"
                className={styles.actionButton}
              >
                ⬇️ {product?.links?.downloadLabel || 'Download Artifacts'}  {product.links.downloadSize ? `(${product.links.downloadSize})` : null}
              </a>
            )}
            {product.artifacts?.length > 0 && (
              <div className={styles.section}>
                <h2>Downloads</h2>

                <div className="row">
                  {Object.entries(
                    product.artifacts.reduce<
                      Record<string, typeof product.artifacts>
                    >((acc, art) => {
                      (acc[art.os] = acc[art.os] || []).push(art);
                      return acc;
                    }, {})
                  ).map(([os, artifacts]) => (
                    <div key={os} className="os-group col-sm-12 col-md-3">
                      <h3 className={styles.osTitle}>{os.toUpperCase()}</h3>
                      <div className={styles.artifactList}>
                        <ul>
                          {artifacts.map((artifact, index) => (
                            <li>
                              <a
                                key={index}
                                href={artifact.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.artifactItem}
                              >
                                ⬇️ {artifact.name}{" "}
                                {artifact.arch ? "(" + artifact.arch + ")" : ""}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {product.mainVideo ? (
          <div className="row">
            <div className="col-12">
              <iframe
                style={{ flex: 1, width: "100%" }}
                height="470"
                src={product.mainVideo}
                title={`Video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : null}

        <div className={styles.content}>
          <div className={styles.section}>
            <h2>About {product.title}</h2>
            <p>{product.details}</p>
          </div>

          {product.relatedWorkshop?.sections?.length > 0 && (
            <div className={styles.section}>
              <h2>Related workshops</h2>

              {product.relatedWorkshop?.sections.map((section, idx) => (
                <div key={idx} className={styles.sectionItem}>
                  {section.mainVideo ? (
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <iframe
                          width="100%"
                          style={{ flex: 1 }}
                          height="270"
                          src={section.mainVideo.url}
                          title={`Video`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div
                        style={{ paddingLeft: "20px" }}
                        className="col-sm-12 col-md-6"
                      >
                        <h3>{section.title}</h3>
                        <p>{section.description}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}

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
                    to={`/training/${training.id}`}
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

          {children}

          {/* <div className={styles.section}>
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
          </div> */}
        </div>
      </main>
    </Layout>
  );
}
