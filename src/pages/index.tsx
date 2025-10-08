import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";
import { generalInfo, featuredVideos, products } from "../data-sources/data";

export default function Home() {
  return (
    <Layout
      title="John Doe — Developer & Maker"
      description="I build digital products, share knowledge, and help others create."
    >
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1>{generalInfo.introductionTitle}</h1>
              <p>{generalInfo.introductionLine}</p>
            </div>
            <img
              className={styles.heroImg}
              src="/img/profile.jpg"
              alt="John Doe"
            />
          </div>
        </section>

        {/* Products */}
        <section className={styles.fullSection}>
          <h2>🧩 Products</h2>
          <div className={styles.productsGrid}>
            {products.map((product, index) => (
              <div key={index} className={styles.productCard}>
                <h3>{product.title}</h3>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <p className={styles.productDetails}>{product.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Videos */}
        <section className={styles.fullSection}>
          <h2>🎥 Featured Videos</h2>
          <div className={styles.videoGrid}>
            {featuredVideos.map((video, index) => (
              <div key={index} className={styles.videoWrapper}>
                <iframe
                  src={video.src}
                  title={video.info.title}
                  width={video.info.width}
                  height={video.info.height}
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </section>

        {/* Articles */}
        <section className={styles.fullSection}>
          <h2>📰 Recent Articles</h2>
          <div className={styles.cardRow}>
            <ArticleCard
              title="Building Reliable Go APIs"
              link="/blog/go-apis"
            />
            <ArticleCard
              title="Independent Living Setup"
              link="/blog/self-sufficiency"
            />
            <ArticleCard
              title="Fireback Framework Overview"
              link="/blog/fireback"
            />
          </div>
          <Link to="/blog" className={styles.moreLink}>
            See all articles →
          </Link>
        </section>

        {/* Services */}
        <section className={styles.fullSection}>
          <h2>🛠 Services</h2>
          <div className={styles.servicesGrid}>
            <Service
              title="Custom Software"
              desc="Go / React / TypeScript solutions"
            />
            <Service title="Mobile Apps" desc="React Native, SwiftUI, Kotlin" />
            <Service title="Automation" desc="Integrations, backend tooling" />
            <Service
              title="Mentorship"
              desc="Technical coaching & code reviews"
            />
          </div>
        </section>

        {/* Contact */}
        <section className={styles.cta}>
          <h2>Let’s Work Together</h2>
          <p>Have a project or collaboration idea?</p>
          <Link className="button button--primary button--lg" to="/contact">
            Contact Me →
          </Link>
        </section>
      </main>
    </Layout>
  );
}

function ArticleCard({ title, link }) {
  return (
    <Link to={link} className={styles.card}>
      <h3>{title}</h3>
      <p>Read →</p>
    </Link>
  );
}

function ProductCard({ name, desc }) {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>{desc}</p>
    </div>
  );
}

function Service({ title, desc }) {
  return (
    <div className={styles.service}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
