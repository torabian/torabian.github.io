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
import Link from "@docusaurus/Link";

const languages = [
  {
    name: "Persian(Farsi)",
    description: "Born and rised with the language",
    level: "C1/C2",
    proof: "-",
  },
  {
    name: "English",
    description:
      "Explain technical systems, lead conversations, write documentation",
    level: "B2/C1",
    proof: "Used daily in programming & communication",
  },
  {
    name: "Polish",
    description:
      "Handle real-life situations, paperwork, construction-related topics",
    level: "B1/B2",
    proof: "Passed Polish National Exam",
  },
  {
    name: "German",
    description: "Understand conversations, basic communication",
    level: "A2",
    proof: "Previously studied, currently refreshing",
  },
  {
    name: "Turkish",
    description: "Casual conversations, reading & writing",
    level: "A2",
    proof: "Can hold conversations comfortably",
  },
  {
    name: "Russian",
    description: "Slowly reading the texts, understanding in passive mode",
    level: "A1",
    proof: "-",
  },
];

export function LanguageTable() {
  return (
    <table className="w-full border border-gray-300 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Language</th>
          <th className="p-2 text-left">What I Can Do</th>
          <th className="p-2 text-left">Level</th>
          <th className="p-2 text-left">Remarks</th>
        </tr>
      </thead>
      <tbody>
        {languages.map((lang) => (
          <tr key={lang.name} className="border-t">
            <td className="p-2 font-medium">{lang.name}</td>
            <td className="p-2">{lang.description}</td>
            <td className="p-2">{lang.level}</td>
            <td className="p-2">{lang.proof}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Skills() {
  return (
    <Layout
      title="Skills & Knowledge"
      description="My technical skills, programming languages, certifications, and language abilities."
    >
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Skills & Knowledge</h1>
          <p>
            A comprehensive overview of my technical expertise, programming
            languages, certifications, and language abilities.
          </p>
        </div>

        <section className={styles.section}>
          <h2>Major programming languages</h2>
          <p>
            I am writing code since age 9, therefore over all these years of
            passionate working in engineering, I have picked many skills, and
            here we discuss languages I worked over 5 years with at least.
          </p>
          <h3>Golang</h3>
          <p>
            Extreamly passionate about Go, as an ecosystem and language, simple,
            fast, compiled, small and easy to work with. I have built and
            contributed to dozens of projects in my programming journey, and
            still thinking what can in future reach the level of reliablity of
            this language. My favorite features are cross compiling, goroutines
            and it's simple package management service. I would use golang for
            most cases, specially desktop apps, cli apps, shared common
            libraries, web servers, database tasks.
            <br />
            Besides of many commercial projects and contracts,{" "}
            <a href="https://github.com/torabian/fireback" target="_blank">
              Fireback
            </a>{" "}
            and{" "}
            <a href="https://torabian.github.io/emi/playground" target="_blank">
              Emi
            </a>
            , are two flagship opensource products I have developed, and
            Fireback easily could be said is one of most opiniated and
            complicated frameworks out there in Golang.
          </p>

          <h3>JavaScript</h3>
          <p>
            When I was learning VBScript, I've realised also a language is
            gaining popularity which is called JavaScript. At the time VBScript
            was also actively used for web page interactions. My experience with
            JavaScript says it's gonna be around for decades to come, due to
            wide spread, loosly typed features. Many people critise the language
            for it's lack of type system, that's exactly what has made it so
            famous and widely accepted. In fact that's its power, not weakness.
            Amount of lines of code I have written in JavaScript is almost
            countless, both in node.js, browser, electron.js, react native,
            ionic, pure vanilla JavaScript, and yet believe it or not, years of
            writing jQuery and maintaing custom created JavaScript libraries.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Protocols, Standards, Processes</h2>
          <p>
            Working on different products and industries, I have built a solid
            knowledge of different deep frameworks, standards, protocols as
            well.
          </p>
          <h3>MQTT</h3>
          <p>
            Deep experience with building MQTT centeric products, which require
            realtime full-duplex communication between servers, devices, and
            client software. Implemented both client, and setup for on-premise
            broker, MQTT remains one of my skills, which also actively used on
            my own IP owned products, such as Meshora.
          </p>

          <h3>AppStore and Google Play Management</h3>
          <p>
            I can controll the entire application release process, from codebase
            until it's reachable via stores to end user. This process includes
            setting CI/CD, creating products in stores, deep knowledge of
            approval process specially for Apple, details touching design,
            behavior, texts and so on. Every application finally needs to be
            released, and with my experience it would forward with smallest
            hassles down the road.
          </p>
        </section>

        {/* Programming Languages & Technologies */}
        <section className={styles.section}>
          <div className={styles.skillCategories}>
            {skillCategories.map((category) => (
              <SkillCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Language Skills */}
        <section className={styles.section}>
          <h2>Language Skills</h2>
          <p>
            Learning languages, since childhood was a hobby for me. I still
            remember how many nights I have spent until late, to read one more
            page, here you can see an overview of languages I know, and plan to
            learn
          </p>
          <LanguageTable />
          <br />
          As a future goal for language learning, I am considering between
          following options:
          <ul>
            <li>Jumping B1/B2 level in Turkish</li>
            <li>Jumping B2/C1 level in Polish</li>
            <li>Spanish B1</li>
            <li>Russian B1</li>
            <li>Armenian B1</li>
          </ul>
          The decision is not made yet, based on other priorities in personal
          life at this moment.
        </section>

        {/* Other Skills */}
        <section className={styles.section}>
          <h2>Construction Skills</h2>
          <p>
            I can carry independently entire operation of building single family
            concrete based houses, compatible with Polish laws.
          </p>
          <div className={styles.otherSkillsGrid}>
            {otherSkills.map((skillGroup, index) => (
              <OtherSkillCard key={index} skillGroup={skillGroup} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Semi/None professional licenses</h2>
          <p>
            Besides professional life, I have some other licenses which allows
            me to conduct tasks.
            <ul>
              <li>
                C Driving license, and C+E driving license for long vehicles
                (EU)
              </li>
              <li>Motorboat license, and Sailboat license issued in Poland</li>
              <li>PADI Diving license.</li>
            </ul>
          </p>
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
            {skill.id ? (
              <Link to={`/skill/${skill.id}`}>{skill.title}</Link>
            ) : (
              skill.title
            )}
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
