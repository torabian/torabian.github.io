import React from "react";
import Layout from "@theme/Layout";
import styles from "./products.module.css";
import { products } from "../data-sources/data";
import Link from "@docusaurus/Link";

export default function Products() {
  return (
    <Layout
      title="Products Archive"
      description="Explore our collection of innovative products and tools for modern development."
    >
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>🧩 Products Archive</h1>
          <p>
            Discover our collection of innovative products and development tools
          </p>
        </div>

        <div className={styles.productsGrid}>
          {products.map((product, index) => (
            <Link
              key={index}
              to={`/product/${product.id}`}
              className={styles.productCard}
            >
              <div className={styles.productHeader}>
                <h2 className={styles.productName}>{product.title}</h2>
                <span className={`${styles.status} ${styles[product.status]}`}>
                  {product.status}
                </span>
              </div>
              <div className={styles.productContent}>
                <p className={styles.productType}>{product.type}</p>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <div className={styles.productFeatures}>
                  <ul>
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                    {product.features.length > 3 && (
                      <li className={styles.moreFeatures}>
                        +{product.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className={styles.emptyState}>
            <h3>No products available</h3>
            <p>Check back later for new products and updates.</p>
          </div>
        )}
      </main>
    </Layout>
  );
}
