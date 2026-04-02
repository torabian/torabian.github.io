import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { LanguageSkill, OtherSkill, SkillCategory } from "../data-sources/data";
import styles from "./skills.module.css";

const languages = [
  {
    name: "Persian(Farsi)",
    description: "Born and rised with the language",
    level: "C1/C2",
    proof: "Professional skilled in writing",
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
    proof: "Basic conversation, reading Russian texts",
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
            Extremely passionate about Go, as an ecosystem and language, simple,
            fast, compiled, small and easy to work with. I have built and
            contributed to dozens of projects in my programming journey, and
            still thinking what can in future reach the level of reliability of
            this language. My favorite features are cross compiling, goroutines
            and its simple package management service. I would use golang for
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
            , are two flagship open-source products I have developed, and
            Fireback easily could be said is one of most opinionated and
            complicated frameworks out there in Golang.
          </p>

          <h3>JavaScript(?TypeScript)</h3>
          <p>
            When I was learning VBScript, I've realized also a language is
            gaining popularity which is called JavaScript. At the time VBScript
            was also actively used for web page interactions. My experience with
            JavaScript says it's gonna be around for decades to come, due to
            widespread, loosely typed features. Many people criticize the
            language for its lack of type system, that's exactly what has made
            it so famous and widely accepted. In fact that's its power, not
            weakness. Amount of lines of code I have written in JavaScript is
            almost countless, both in node.js, browser, electron.js, react
            native, ionic, pure vanilla JavaScript, and yet believe it or not,
            years of writing jQuery and maintaining custom created JavaScript
            libraries.
          </p>

          <h3>PHP</h3>
          <p>
            PHP is one of the languages that I have started my career with,
            earlier than 2006. Used PHP for multiple projects on proprietary CMS
            and CRM system, as main developer for few years. Later on in another
            series of WordPress custom theme development it was one of the main
            focuses. I have migrated a major commercial platform internal
            services from PHP into Golang in recent years. PHP is a magic
            language, easy, a simple file and it works. It got popular for the
            fact allows plugin systems to work perfectly, that's why many
            successful shop platforms, such as Magento and Prestashop are built
            on top of it. Loved the syntax, and its straightforward OOP model.
          </p>

          <h3>C</h3>
          <p>
            I have used C across different projects, all in micro-controller
            environment. I have good experience on writing reliable, memory leak
            free code on electronic devices. For me C is very straightforward,
            yet waiting to see if any language can become close to its usability
            in small memory systems. Mostly focused on esp-idf platform, have a
            good understanding of general purpose c code for small memory
            devices.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Major Frameworks</h2>
          <p>
            Understanding a language is great but most of the work usually is
            done on top of the major frameworks.
          </p>
          <h3>Angular 1...18</h3>
          <p>
            Started Angular since version 1 in plain JavaScript. Done 2 projects
            in AngularJs, created build system, cli tools for it. After release
            of Angular 2, I had to rewrite the project into Angular 2, which was
            really difficult, basically a deep rewrite. I have worked on many
            commercial projects with Angular, as well as Angular Material (CDK).
            The strength of Angular is its structure, and I love frameworks
            which do not depend so much on external libraries and Angular has
            done a perfect job in this area.
          </p>

          <h3>React</h3>
          <p>
            React and React ecosystem undoubtedly are major player in terms of
            front-end, server side rendering, and of course mobile development.
            I have started working with react since a decade ago. I loved the
            fact, that it's using classes, because I was coming from C# and
            Angular background. React major strength is that it has a small
            footprint, and it's a perfect tool for building fast UIs. In early
            days, libraries available to it were not that reliable, but in 2020+
            it has changed mostly. Worked many commercial projects on react and
            its' ecosystem, it's one of the widest frameworks I have used
            alongside React Native in my career.
          </p>

          <h3>React Native</h3>
          <p>
            I have encountered React Native from its early days, when installing
            and running a hello world was a major challenge. Still remember,
            when we were hiring for React Native project at the time, a
            candidate just was selected, by one my colleagues due to fact he
            could run it in first few hours. Many things have changed ever, I
            have built dozens of apps in past 10 years which are in React
            Native, in many different categories.
          </p>

          <h3>ESP-IDF</h3>
          <p>
            Deep experience with ESP series micro-controllers using vendor SDKs
            (ESP-IDF). Worked extensively with advanced Wi-Fi (station/AP,
            provisioning, hotspot), BLE (GATT server/client), and dual-mode
            connectivity for IoT devices, primarily in home automation and
            energy systems. Experienced in FreeRTOS-based development, low-power
            modes, OTA updates, secure communication (TLS), MQTT/HTTP protocols,
            peripheral integration (GPIO, UART, SPI, I2C, ADC), and real-time
            device control.
          </p>

          <h3>Node.js (ecosystem)</h3>
          <p>
            Deep and competent knowledge has been built around the node.js
            ecosystem, to build different kinds of products, mostly focused on
            traditional backend. I have done pure node.js scripting in its early
            days, then done projects in Sails.js framework, and later on
            Nest.js. Nest.js is the missing part for commercial products in
            node.js ecosystem, and honestly a copy of Angular in backend side. I
            can fully conduct entire project in this.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Databases</h2>
          <p>
            Through my career I have faced usage of different type of databases,
            here I'll list the ones I feel most confident.
          </p>

          <h3>MySQL</h3>
          <p>
            Used MySQL with PHP, until to this day is a go to database for me.
            Worked with it's advanced features, and maintained databases, up to
            100GB alone in my career. I love to write queries and avoid ORM, if
            possible in the projects, and I would prefer this product for its
            reliability.
          </p>

          <h3>SQLite</h3>
          <p>
            SQLite has appeared very handy and useful in many places. From
            mobile applications I have written, until micro-controllers that the
            only option was SQLite to store data on them. SQLite is a very
            powerful database, and I have reduced the database maintenance on a
            few projects to minimum by using it, and even storing files in it.
            It's quite compatible with MySQL with some small changes, and this
            gives the power to run similar, if not same structure on a cloud
            backend and micro-controller project with small amount of ram.
          </p>

          <h3>MongoDB</h3>
          <p>
            Faced Mongodb in couple of projects since its inception. Having an
            overall understanding of its power and limits, can be used for
            places the data structure is unknown, or snapshots of data is needed
            instead of relations between them.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Libraries</h2>
          <p>
            Smaller than programming languages and frameworks related to them,
            are the libraries which worth to mention.
          </p>
          <h3>Cypress testing framework.</h3>
          <p>
            Got hands on experience on the framework since it came out, Cypress
            is a great tool for doing all kind of testings. I have used it
            successfully both on testing front-end projects, Angular, React, and
            websites, as well as it used it few times for running integration
            tests with backend. A perfect solution to write e2e tests overall,
            with some challenges on cookies in the past.
          </p>

          <h3>Docusaurus (Project documentation)</h3>
          <p>
            Experienced in building and maintaining documentation platforms
            using Docusaurus. Skilled in configuring versioned docs, custom
            themes, and plugins, as well as writing and structuring Markdown/MDX
            content. Familiar with integrating search, localization (i18n), and
            deployment workflows (CI/CD), ensuring scalable, well-organized, and
            developer-friendly documentation sites.
          </p>

          <h3>Katex</h3>
          <p>
            Katex is formula writing library, and is doing a perfect job when
            you need to work on scientific projects. I've used it in a product
            that managed question bank, and authors needed to write the formulas
            down, and we moved away from embedding pictures into using Katex.
          </p>

          <h3>Maps & Geography (Google, Open-street map)</h3>
          <p>
            Hands-on experience integrating Google Maps and OpenStreetMap in
            React, React Native, Angular, and vanilla JavaScript. Implemented
            custom markers, clustering, and interactive overlays (polylines,
            polygons, drawing tools), with event handling and map state
            management. Worked with Geocoding/Reverse Geocoding APIs, address
            autocomplete, and coordinate transformations. Familiar with map
            performance optimization, mobile responsiveness, and integration of
            third-party location services.
          </p>

          <h3>Jest, React Testing Library</h3>
          <p>
            Writing tests for logic control, mostly on non-ui interactions is a
            favorite task for me. When there are complicated calculations, for
            example in time-series operation, I'd write tests to make sure pure
            functions are working properly. React testing library also seems
            promising, I have used it to test the logic of components rendering,
            in React and React Native.
          </p>

          <h3>TinyMCE Text Editor</h3>
          <p>
            Many projects over past 2 decades needed a rich text editor, and
            TinyMCE is my favorite. I am keen to see if there will be an easy
            replacement, such as Gotenberg in WordPress, but still TinyMCE is
            one of top options to go. One of challenges I had was adding formula
            writing to it, using Katex and it really made me to be very focused
            until getting the task done.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Software skills</h2>
          <p>
            As a developer, not only I am focused on creating software, I also
            highly focused on learning other people products to both be able to
            do more, and as well get inspired.
          </p>
          <h3>Autodesk Fusion</h3>
          <p>
            Fusion is a Autodesk star, in CAM design and as of recent changes
            it's possible to do electrical. I have good experience in the
            product, able to create industrial elements, end to end, preparing
            blueprints and tool-path for machining parts.
          </p>

          <h3>KiCad</h3>
          <p>
            Kicad is one of my favorite software and I use it for designing PCB.
            It's open-source, missing some features but in general totally can
            be used for 2 layer PCB projects which I mostly build as prototypes
            for client or hobby. I have used software for quite sometime.
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
            Deep experience with building MQTT centric products, which require
            realtime full-duplex communication between servers, devices, and
            client software. Implemented both client, and setup for on-premise
            broker, MQTT remains one of my skills, which also actively used on
            my own IP owned products, such as Meshora.
          </p>

          <h3>Bluetooth (BLE)</h3>
          <p>
            Strong experience with Bluetooth Classic and BLE across ESP
            micro-controllers, STM-based circuits, Ubuntu desktop environments,
            and React Native applications. Skilled in implementing GATT
            server/client architectures, device provisioning, pairing/bonding,
            and real-time data exchange. Worked with low-level drivers and
            vendor SDKs, as well as higher-level libraries for mobile
            integration, ensuring reliable connectivity, performance
            optimization, and cross-platform interoperability.
          </p>

          <h3>E-Commerce Systems</h3>
          <p>
            During my career, I have encountered projects which helped me to
            learn deeper shops systems, such as <b>WooCommerece</b> and{" "}
            <b>Prestashop</b>, and later on those experiences has been applied
            to commercial custom built systems using Node.js and Golang. Deep
            understanding of the online e-commerce platforms, inventory
            management, product info caching, custom fields, recursive category
            management and storage in database are unique experience in journey
            and shop systems.
          </p>

          <h3>OpenTherm</h3>
          <p>
            As a part of my IoT knowledge and experience, I had the chance to
            dig deeper in OpenTherm protocol, both as Master and Slave, writing
            communication code, simulations, and debugging actual boiler systems
            on the protocol.
          </p>

          <h3>Internationalization</h3>
          <p>
            I am specialized in creating internationalized digital products, on
            web, mobile, desktop and other perspectives such as documentations.
            Working many years in Iran, creating both right to left, and left to
            right products, with custom calendar system is one of my skills when
            it comes to building products. It goes as deep as maintaining a
            multilingual database system, serving different product for specific
            region and all necessary planning and configuration in between.
          </p>

          <h3>WebSocket</h3>
          <p>
            In early days, I had written a chat system with long-polling and
            even page refresh in IE browser. Since WebSockets came out, if was
            revolutionary for many projects which worked later on. I have deep
            experience on both sending text and binary data over WebSockets,
            managing load-balanced systems notification via sockets, and even
            streaming audio content, are a part of my history.
          </p>

          <h3>AppStore and Google Play Management</h3>
          <p>
            I can control the entire application release process, from codebase
            until it's reachable via stores to end user. This process includes
            setting CI/CD, creating products in stores, deep knowledge of
            approval process specially for Apple, details touching design,
            behavior, texts and so on. Every application finally needs to be
            released, and with my experience it would forward with smallest
            hassles down the road.
          </p>

          <h3>Advanced cross-platform data structure synchronization</h3>
          <p>
            One of my strongest skills in overall software engineering I have
            created is to share the data layer, in backend, with mobile apps,
            desktop apps and web app partially, in order to give an application
            offline feature with the same exact API signature. This is achieved
            by a series of processes, coming from selective api choices, and
            compiling parts of backend written in Golang or C, and running them
            as system service.
          </p>
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
        </section>

        {/* Other Skills */}
        <section className={styles.section}>
          <h2>Construction Skills</h2>
          <p>
            I can carry independently entire operation of building single family
            concrete based houses, compatible with Polish laws.
          </p>

          <h3>Heating system design and implementation (G3)</h3>
          <p>
            Independent designer of underfloor heating, gas, and multi-room
            systems using Vaillant and Viessmann solutions. Experienced in heat
            load calculations, hydraulic design, and PEX piping layout,
            including manifolds, pumps, and boilers. Skilled in zoned and smart
            control integration, delivering efficient and standards-compliant
            system designs.
          </p>

          <h3>Residential electric design and implementation (G1)</h3>
          <p>
            Experienced in residential electrical installations, including
            circuit design, load calculation, panel layout, and wiring for
            lighting, sockets, and dedicated systems. Skilled in reading and
            creating technical schematics, selecting protective devices, and
            ensuring compliance with safety standards and regulations.
          </p>

          <h3>Smart and intelligence solutions</h3>
          <p>
            Proficient in designing and implementing smart home systems,
            including automation of lighting, heating, and security. Experienced
            with integrating sensors, controllers, and IoT devices, enabling
            remote control, energy optimization, and scalable home automation
            solutions.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Semi/Non-professional licenses</h2>
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
