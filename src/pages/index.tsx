import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";
import { generalInfo, featuredVideos, products } from "../data-sources/data";

export default function Home() {
  return (
    <Layout
      title={generalInfo.introductionTitle}
      description={generalInfo.introductionLine}
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
              src="/ali/ali3.png"
              alt="Ali Torabi"
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

        {/* Experiences */}
        <section className={styles.fullSection}>
          <h2>🚀 Development Experiences</h2>
          <div className={styles.cardRow}>
            <ExperienceCard
              title="Building Scalable Go APIs"
              description="A deep dive into creating high-performance, scalable APIs using Go and modern development practices."
              link="/experience/building-scalable-go-apis"
              category="Backend Development"
              date="Jan 15, 2024"
              featured={true}
            />
            <ExperienceCard
              title="React Native Mobile Development"
              description="From concept to production: building cross-platform mobile apps with React Native and best practices."
              link="/experience/react-native-mobile-development"
              category="Mobile Development"
              date="Jan 10, 2024"
              featured={true}
            />
          </div>
          <Link to="/experiences" className={styles.moreLink}>
            View all experiences →
          </Link>
        </section>

        {/* Workshops */}
        <section className={styles.fullSection}>
          <h2>🛠️ Workshops</h2>
          <div className={styles.cardRow}>
            <WorkshopCard
              title="React Translation Workshop"
              description="Master internationalization (i18n) in React applications"
              link="/workshop/react-translation-workshop"
              duration="3h 15min"
              level="Intermediate"
            />
          </div>
          <Link to="/workshops" className={styles.moreLink}>
            View all workshops →
          </Link>
        </section>

        {/* Services */}
        <section className={styles.fullSection}>
          <h2>🛠️ Professional Services</h2>
          <div className={styles.cardRow}>
            <ServiceCard
              title="Custom Software Development"
              description="Build tailored software solutions using modern technologies like Go, React, and TypeScript."
              link="/service/custom-software-development"
              icon="💻"
              priceRange="$5,000 - $50,000"
              duration="2-6 months"
            />
            <ServiceCard
              title="Mobile App Development"
              description="Create beautiful, performant mobile applications for iOS and Android using React Native."
              link="/service/mobile-app-development"
              icon="📱"
              priceRange="$10,000 - $50,000"
              duration="6-20 weeks"
            />
          </div>
          <Link to="/services" className={styles.moreLink}>
            View all services →
          </Link>
        </section>

        {/* Skills */}
        <section className={styles.fullSection}>
          <h2>🛠️ Skills & Knowledge</h2>
          <div className={styles.cardRow}>
            <SkillsCard
              title="Programming Languages"
              description="Go, React, React Native, JavaScript, Node.js, and more"
              link="/skills"
              icon="💻"
            />
            <SkillsCard
              title="Languages & Certifications"
              description="English C1/C2, Polish B1/B2, Turkish B1, and technical certifications"
              link="/skills"
              icon="🌍"
            />
          </div>
          <Link to="/skills" className={styles.moreLink}>
            View all skills →
          </Link>
        </section>

        {/* Contact */}
        <section className={styles.cta}>
          <h2>Let’s Work Together</h2>
          <p>Have a project or collaboration idea?</p>
          <div>ali-torabian@outlook.com</div>
          <a
            className="button button--primary button--lg"
            href="mailto:ali-torabian@outlook.com"
          >
            Contact Me →
          </a>
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

function ExperienceCard({
  title,
  description,
  link,
  category,
  date,
  featured,
}) {
  return (
    <Link to={link} className={styles.card}>
      <div className={styles.experienceHeader}>
        <div className={styles.experienceMeta}>
          <span className={styles.experienceCategory}>{category}</span>
          <span className={styles.experienceDate}>{date}</span>
          {featured && (
            <span className={styles.experienceFeatured}>Featured</span>
          )}
        </div>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}

function WorkshopCard({ title, description, link, duration, level }) {
  return (
    <Link to={link} className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.workshopMeta}>
        <span className={styles.workshopDuration}>{duration}</span>
        <span className={styles.workshopLevel}>{level}</span>
      </div>
    </Link>
  );
}

function ServiceCard({ title, description, link, icon, priceRange, duration }) {
  return (
    <Link to={link} className={styles.card}>
      <div className={styles.serviceHeader}>
        <div className={styles.serviceIcon}>{icon}</div>
        <div className={styles.serviceInfo}>
          <h3>{title}</h3>
          <div className={styles.serviceMeta}>
            <span className={styles.servicePrice}>{priceRange}</span>
            <span className={styles.serviceDuration}>{duration}</span>
          </div>
        </div>
      </div>
      <p>{description}</p>
    </Link>
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

function SkillsCard({ title, description, link, icon }) {
  return (
    <Link to={link} className={styles.card}>
      <div className={styles.serviceHeader}>
        <div className={styles.serviceIcon}>{icon}</div>
        <div className={styles.serviceInfo}>
          <h3>{title}</h3>
        </div>
      </div>
      <p>{description}</p>
    </Link>
  );
}
