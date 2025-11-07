import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";
import {
  generalInfo,
  featuredVideos,
  products,
  workshops,
} from "../data-sources/data";

export default function Home() {
  const workshop = workshops[0];
  return (
    <Layout
      title={generalInfo.introductionTitle}
      description={generalInfo.introductionLine}
    >
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-sm-12 col-md-6">
                <div className={styles.heroText}>
                  <h1>{generalInfo.introductionTitle}</h1>
                  <p>{generalInfo.introductionLine}</p>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 text-center">
                <img
                  className={styles.heroImg}
                  src="/ali/ali3.png"
                  alt="Ali Torabi"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className={styles.fullSection}>
          <h2>🧩 Products</h2>
          <div className="container">
            <div className="row d-flex align-items-stretch">
              {products.sort((a, b) => (b.thumbnail ? 1 : 0) - (a.thumbnail ? 1 : 0))
                .map((product, index) => {
                  const hasThumb = Boolean(product.thumbnail)
                  return (
                    <div key={index} className={`col-sm-12 ${hasThumb ? '' : 'col-md-6'} `} style={{marginBottom: '20px'}}>
                      <div
                        className={`${styles.productCard} ${hasThumb ? styles.productCardWithThumb : ''
                          }`}
                      >
                        {hasThumb && (
                          <div className={styles.thumb}>
                            <img src={product.thumbnail} alt={product.title} />
                          </div>
                        )}
                        <div className={hasThumb ? styles.content : ''}>
                          <h3>
                            <Link to={`/product/${product.id}`}>{product.title}</Link>
                          </h3>
                          <p className={styles.productDescription}>
                            {product.description}
                          </p>
                          <p className={styles.productDetails}>{product.details}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </section>


        {/* Videos */}
        <section className={styles.fullSection}>
          <h2>🎥 Featured Videos</h2>
          <div className={"videoGrid row"}>
            {featuredVideos.map((video, index) => (
              <div key={index} className={"videoWrapper col-sm-12 col-md-6"}>
                <iframe
                  src={video.src}
                  title={video.info.title}
                  width={"100%"}
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
              title={workshop.title}
              description={workshop.description}
              link={`/workshop/${workshop.id}`}
              duration={workshop.totalDuration}
              level={workshop.level}
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
