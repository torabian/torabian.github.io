import React from "react";
import Layout from "@theme/Layout";
import styles from "./skills.module.css";
import {
  skillCategories,
  languageSkills,
  otherSkills,
  futureLanguages,
  SkillCategory,
  LanguageSkill,
  OtherSkill,
} from "../data-sources/data";

export default function Skills() {
  return (
    <Layout
      title="Skills & Knowledge"
      description="My technical skills, programming languages, certifications, and language abilities."
    >
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>🛠️ Skills & Knowledge</h1>
          <p>
            A comprehensive overview of my technical expertise, programming
            languages, certifications, and language abilities.
          </p>
        </div>

        {/* Programming Languages & Technologies */}
        <section className={styles.section}>
          <h2>💻 Programming & Technologies</h2>
          <div className={styles.skillCategories}>
            {skillCategories.map((category) => (
              <SkillCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Language Skills */}
        <section className={styles.section}>
          <h2>🌍 Language Skills</h2>
          <div className={styles.languageGrid}>
            {languageSkills.map((lang, index) => (
              <LanguageCard key={index} language={lang} />
            ))}
          </div>

          <div className={styles.futureLanguages}>
            <h3>Languages I'm Planning to Learn</h3>
            <div className={styles.futureLanguageList}>
              {futureLanguages.map((lang, index) => (
                <span key={index} className={styles.futureLanguageTag}>
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Other Skills */}
        <section className={styles.section}>
          <h2>🎯 Other Skills & Certifications</h2>
          <div className={styles.otherSkillsGrid}>
            {otherSkills.map((skillGroup, index) => (
              <OtherSkillCard key={index} skillGroup={skillGroup} />
            ))}
          </div>
        </section>

        {/* About Me Section */}
        <section className={styles.aboutSection}>
          <h2>👨‍💻 About Me</h2>
          <div className={styles.aboutContent}>
            <p>
              I'm a passionate developer with a diverse skill set spanning
              multiple programming languages and technologies. My journey in
              software development has taken me through various domains, from
              web development to mobile apps, and from backend services to
              full-stack solutions.
            </p>
            <p>
              What drives me is the constant learning and adaptation to new
              technologies. I believe in building robust, scalable solutions
              while maintaining clean, maintainable code. My experience ranges
              from modern frameworks like React and Go to traditional
              technologies like PHP and C#, giving me a broad perspective on
              different approaches to problem-solving.
            </p>
            <p>
              Beyond technical skills, I value clear communication, continuous
              learning, and collaborative problem-solving. I'm always excited to
              take on new challenges and contribute to meaningful projects that
              make a difference.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

function SkillCategoryCard({ category }: { category: SkillCategory }) {
  return (
    <div className={styles.skillCategoryCard}>
      <div className={styles.skillCategoryHeader}>
        <h3>{category.title}</h3>
        {category.description && (
          <p className={styles.skillCategoryDescription}>
            {category.description}
          </p>
        )}
      </div>
      <div className={styles.skillsList}>
        {category.skills.map((skill, index) => (
          <span key={index} className={styles.skillTag}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function LanguageCard({ language }: { language: LanguageSkill }) {
  return (
    <div className={styles.languageCard}>
      <div className={styles.languageHeader}>
        <h4>{language.language}</h4>
        <span className={styles.languageLevel}>{language.level}</span>
      </div>
      {language.description && (
        <p className={styles.languageDescription}>{language.description}</p>
      )}
    </div>
  );
}

function OtherSkillCard({ skillGroup }: { skillGroup: OtherSkill }) {
  return (
    <div className={styles.otherSkillCard}>
      <h4>{skillGroup.category}</h4>
      {skillGroup.description && (
        <p className={styles.otherSkillDescription}>{skillGroup.description}</p>
      )}
      <div className={styles.otherSkillsList}>
        {skillGroup.skills.map((skill, index) => (
          <span key={index} className={styles.otherSkillTag}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
