export const generalInfo = {
  introductionTitle: "Hi, I am Ali 👋",
  introductionLine: `I build digital products, share knowledge, and help others create.
I’m deeply passionate about programming, engineering, and continuous learning — always pushing to master new technologies and understand how things work from the ground up.
I enjoy bridging practical skills with digital innovation, from building software frameworks like Fireback to learning welding, electrical systems, and construction.
For me, creating — whether it’s code, a tool, or a physical structure — is both a craft and a lifelong pursuit of excellence.`,
};

// Training interfaces
export interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "15 min", "1h 30min"
  videoUrl?: string;
  isCompleted?: boolean;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  language: string;
  totalDuration: string;
  chapters: Chapter[];
  level: "beginner" | "intermediate" | "advanced";
  category: string;
}

// Product interfaces
export interface Product {
  id: string;
  title: string;
  mainVideo?: string;
  type: string;
  description: string;
  thumbnail?: string;
  details: string;
  links: {
    github?: string;
    documentation?: string;
    demo?: string;
    download?: string;
    downloadSize?: string;
    downloadLabel?: string;
  };
  trainingRelated?: string[];
  features: string[];
  status: "active" | "beta" | "deprecated";
  lastUpdated: string;

  relatedWorkshop?: Workshop;

  artifacts?: {
    name: string;
    type: "installer" | "binary" | "archive" | "apk";
    url: string;
    os: "windows" | "linux" | "macos" | "android" | "ios" | string;
    arch: "x64" | "arm64" | "armv7" | string;
  }[];
}

// Workshop interfaces
export interface WorkshopSection {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "15 min", "1h 30min"
  content: string; // Markdown content
  isCompleted?: boolean;
  mainVideo?: {
    url: string;
  };
}

export interface Workshop {
  id: string;
  title: string;
  mainVideo?: string;
  description: string;
  download?: string;
  language: string;
  totalDuration: string;
  sections: WorkshopSection[];
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  prerequisites: string[];
  tools: string[];
}

export const trainings: Training[] = [
  {
    id: "emi-compiler-training",
    title: "Emi Compiler Training",
    description:
      "A hands-on training for understanding and using the Emi compiler. Learn how to define DTOs, explore data types, generate TypeScript code, and use VSCode autocompletion effectively.",
    language: "English",
    totalDuration: "55min",
    level: "intermediate",
    category: "Software Development",
    chapters: [
      {
        id: "chapter-1",
        title: "Emi compiler introduction",
        description:
          "Introduction to the Emi compiler, its purpose, and core features.",
        duration: "5:57",
        videoUrl:
          "https://www.youtube.com/embed/p_hkbarIQjM?si=_wFU_XarYwcXDfHK",
        isCompleted: false,
      },
      {
        id: "chapter-2",
        title: "Emi definition overview and setup (PART 1/3)",
        description:
          "Overall overview of the Emi definition, setting up your environment for the first time.",
        duration: "1:45",
        videoUrl:
          "https://www.youtube.com/embed/4JB7vr7u9iM?si=WjAAtn0GxSEc3Dnh",
        isCompleted: false,
      },
      {
        id: "chapter-3",
        title: "Download and install and npx emicc (PART 2/3)",
        description:
          "Download Emi and learn how to use the command line interface with npx emicc.",
        duration: "4:09",
        videoUrl:
          "https://www.youtube.com/embed/w4b6BqY0exA?si=07oCstzEhlpSX62E",
        isCompleted: false,
      },
      {
        id: "chapter-4",
        title: "Emi Compiler: Compiling the Emi into actual code (PART 3/3)",
        description: "Compiling Emi definitions into actual TypeScript code.",
        duration: "7:05",
        videoUrl:
          "https://www.youtube.com/embed/7j3FgidvIAk?si=0-WNQb03_JYvSVnu",
        isCompleted: false,
      },

      {
        id: "chapter-5",
        title:
          "Emi Compiler: VSCode/Cursor autocompletion for the Emi YAML definitions",
        description:
          "Using the RedHat YAML plugin to enable autocompletion for Emi definitions in VSCode.",
        duration: "3:25",
        videoUrl:
          "https://www.youtube.com/embed/QgTvLPF4Gg8?si=D8KvdOTIyH-M3r1r",
        isCompleted: false,
      },
      {
        id: "chapter-6",
        title: "Emi Compiler: Compiler internal features, and details",
        description:
          "Exploring general features, the playground, tags, and other internal aspects of the Emi compiler.",
        duration: "4:51",
        videoUrl:
          "https://www.youtube.com/embed/srBSwiBVChg?si=dqZo7ah_br3UulZ3",
        isCompleted: false,
      },
      {
        id: "chapter-7",
        title: "Emi Compiler: Why not use OpenAPI spec for the code generation",
        description:
          "Explaining why OpenAPI is not suitable as a source for code generation in our workflow.",
        duration: "3:33",
        videoUrl:
          "https://www.youtube.com/embed/Q6TofW2ogZg?si=2JWhP7ZVW3GQv_l_",
        isCompleted: false,
      },
      {
        id: "chapter-8",
        title: "Emi Compiler: Why alternative GRPC is a bad option",
        description:
          "Discussing the limitations of using alternatives like GRPC for our products.",
        duration: "5:04",
        videoUrl:
          "https://www.youtube.com/embed/-MUT2uN-V9A?si=ITdAArEnq15qCUny",
        isCompleted: false,
      },
      {
        id: "chapter-9",
        title:
          "Emi Compiler: Dto compilation, data types, and generated TypeScript file",
        description:
          "Practical demonstration of how a DTO is generated in JavaScript, exploring different data types.",
        duration: "18:47",
        videoUrl:
          "https://www.youtube.com/embed/4JwsYdvOAy4?si=DnZGoMLA0JEdZ5z6",
        isCompleted: false,
      },
    ],
  },
  {
    id: "avoid-software-failure",
    title: "How to Avoid Software Failure",
    description:
      "A comprehensive guide to building reliable, maintainable software systems. Learn best practices, common pitfalls, and proven strategies to prevent software failures in your projects.",
    language: "English",
    totalDuration: "4h 30min",
    level: "intermediate",
    category: "Software Development",
    chapters: [
      {
        id: "chapter-1",
        title:
          "What is a reliable, multiplatform, and long lasting software? Part 1",
        description: `In this series, we are exploring why many bad software are out there, why do they fail, and how to avoid it in the first place. Later in the course I show how to build software correctly from the beginning.

In Part 1, I explain what are reliable software, how to make it last long, and create for as many as platforms as we can.

I recommend to watch the entire series if you want to build a software, by yourself as a programmer or as an startup founder.
`,
        duration: "11 min",
        videoUrl:
          "https://www.youtube.com/embed/OdMFRt5O3fc?si=9HCwATsPqFPQJS17",
        isCompleted: false,
      },
      {
        id: "chapter-2",
        title: "Why should you build high quality software? Part 2",
        description: `
In Part 2, I explain why we need to build high quality from the beginning, and who are the main audience of this course.
`,
        duration: "4 min",
        videoUrl:
          "https://www.youtube.com/embed/WeGUtO9xVJA?si=d9ta0kXU4bpQwKq7",
        isCompleted: false,
      },
      {
        id: "chapter-3",
        title: "Terrible choices for database in a software project. Part 3",
        description: `In Part 3: I explain why choosing non-relational database will affect significantly your project quality in the first place, and what are the great choices to build your product on top of them. We discuss the necessity of data normalization later in the video.`,
        duration: "9 min",
        videoUrl:
          "https://www.youtube.com/embed/QuY3m_qpZxw?si=fh9CavnSIBZTKAF0",
        isCompleted: false,
      },
      {
        id: "chapter-4",
        title:
          "Terrible choice between Angular, React and Vue js in front-end? Part 4",
        description: `In Part 4, we review the options for web applications, so called front-ends, and why we need to choose React over the other options such as Angular and Vue.js.

In fact, so many products quickly become hard to edit, just by wrong choice of the front-end framework.
`,
        duration: "5 min",
        videoUrl:
          "https://www.youtube.com/embed/YD_Kh2uXYgg?si=sC_hA_x_K9n2fGJI",
        isCompleted: false,
      },
      {
        id: "chapter-5",
        title:
          "Terrible backend choices to build a software, app or any product. Part 5",
        description: `In Part 5 let's explain what is the best programming language for building apps, to avoid limits, expensive hardware, make it portable for many frameworks as possible, and see how a stack, or language can in fact slow down the pace of development.`,
        duration: "10 min",
        videoUrl:
          "https://www.youtube.com/embed/gQaqMIu6its?si=9UNCO40J8sa8-MgA",
        isCompleted: false,
      },
      {
        id: "chapter-6",
        title: " Terrible mobile frameworks, and why use cordova? Part 6",
        description: `In Part 6, let's think about why cordova might be a good option, and other hybrid frameworks might set you back. I think every successful app in any store, if not 100%, but mostly is native. I am explaining why you should also avoid hybrid frameworks as much as you can, until your native app arrives.`,
        duration: "5 min",
        videoUrl:
          "https://www.youtube.com/embed/85GJre7DrVs?si=MwTU75FFOac5qLYg",
        isCompleted: false,
      },
      {
        id: "chapter-7",
        title:
          "Terrible strategies in software or app development and how to avoid? Part 7",
        description: `In Part 7, we see why a bad strategy can fail a software product, or an startup, and vice versa. So many people are building bad software, but how do they succeed? Various great software fail very quickly, even done by smart people. This video would be an answer to that.`,
        duration: "9 min",
        videoUrl:
          "https://www.youtube.com/embed/EGI1RaW3akI?si=EsjVz3oB6xb6ZSCr",
        isCompleted: false,
      },
      {
        id: "chapter-8",
        title: "How I build products for clients? Part 8",
        description: `In Part 8, I show how would I build most of software products for startups and my clients. By using fireback and some good strategies, I build things 20x, 25x faster in the beginning, and product with few features, which are polished, are available in 2 weeks.
It might sound impossible, but let's watch this video and I will show you me coding :)

`,
        duration: "22 min",
        videoUrl:
          "https://www.youtube.com/embed/sGhQF2NkJOg?si=1ngxaAGnHaqwg3cO",
        isCompleted: false,
      },
    ],
  },
];

export const workshops: Workshop[] = [
  {
    mainVideo: "https://www.youtube.com/embed/mjAZ3yVzEd8?si=1YNph2m1ywhMSgat",
    id: "react-architecture-workshop",
    title: "React Architecture Workshops",
    description:
      "A practical workshop on building scalable, maintainable React applications. Covers component architecture, state management, data fetching patterns, design systems, performance optimization, and production best practices.",
    language: "English",
    totalDuration: "4h 30m",
    level: "intermediate",
    category: "Frontend Development",
    prerequisites: [
      "Solid understanding of JavaScript or TypeScript",
      "Basic knowledge of React",
      "Familiarity with modern frontend tooling",
    ],
    tools: [
      "React",
      "TypeScript",
      "Vite or Next.js",
      "Redux Toolkit / Zustand / Jotai",
      "Tailwind CSS",
      "React Query",
    ],
    sections: [
      {
        title: "React/React Native modals and overlays like a pro",
        description: `Tired of the react modal repeating components on building react modals? Take a look with me how did I do it in the Fireback react.js a clean approach, chainable, without code repeat.`,
        duration: "27m",
        mainVideo: {
          url: "https://www.youtube.com/embed/mjAZ3yVzEd8?si=1YNph2m1ywhMSgat",
        },
        content: "",
        id: "react-react-native-modals",
      },
      {
        title: "Material explorer architecture in React",
        description: `I have created a Material explorer for Izadom software. Resolving material types, was really challenging, I wanted a good structure which would work long term, and react hook that supports it.`,
        duration: "11m",
        mainVideo: {
          url: "https://www.youtube.com/embed/xaW-ZH8wf4c?si=Xj_loLbs-soeiYu-",
        },
        content: "",
        id: "react-material-explorer",
      },
      {
        title: "React Stacked Menu",
        description: `
        In this workshop I explain how did I create a shopisticated menu system, which can handle dynamic elements adjustment, and more importantly, how to plan building such elements.
        


        `,
        duration: "20m",
        mainVideo: {
          url: "https://www.youtube.com/embed/EK6sR9AmVH8?si=zp3jbkTsg5yOfaQs",
        },
        content: `
You can check the demo for this library here:

[https://torabian.github.io/workshops/react-stacked-menu/](https://torabian.github.io/workshops/react-stacked-menu/)

Also the source is here:

[https://github.com/torabian/torabian.github.io/tree/main/other/react-stacked-menu-lib](https://github.com/torabian/torabian.github.io/tree/main/other/react-stacked-menu-lib)
        `,
        id: "react-stacked-menu",
      },
    ],
  },
  {
    mainVideo: "https://www.youtube.com/embed/lyw-NSCqk3E?si=bjaAwcndvyv3mXqN",
    id: "plugin-system-workshop",
    title: "React & Go Plugin System Workshop",
    description:
      "A hands-on workshop on building a plugin system first in React, then extending it to Go (Fireback). Covers host-plugin architecture, hooks, dynamic plugin loading, and rendering user-uploaded plugins.",
    language: "English",
    totalDuration: "2h 0m",
    level: "intermediate to advanced",
    category: "Fullstack Development",
    download: "https://torabian.github.io/workshops/plugin-system-workshop.zip",
    prerequisites: [
      "Solid understanding of JavaScript or TypeScript",
      "Basic knowledge of React and hooks",
      "Familiarity with Go and Fireback",
      "Experience with Vite or similar tooling",
    ],
    tools: ["React", "TypeScript", "Vite", "Golang", "Fireback"],
    sections: [
      {
        "title": "Chapter 0: Full stack plugin system workshop introduction",
        "description": "\nTrue modular system implementation using JavaScript (react or not) and Golang. Goal of this workshop:\n\n- Understanding the modular projects, plugins, monorepo, and benefits and consequences of each\n- Create a plugin project, focused on React section\n- Create a host project, which handles plugins\n- Create a backend project, which manages client plugins\n- Create plugin system for backend before coming to front-end, at all\n- Advanced topics and future proofing our work\n",
        "duration": "2m",
        "mainVideo": {
          "url": "https://www.youtube.com/embed/lyw-NSCqk3E?si=bjaAwcndvyv3mXqN"
        },
        "content": "True modular system implementation using JavaScript (react or not) and Golang. Goal of this workshop:\n\n- Understanding the modular projects, plugins, monorepo, and benefits and consequences of each\n- Create a plugin project, focused on React section\n- Create a host project, which handles plugins\n- Create a backend project, which manages client plugins\n- Create plugin system for backend before coming to front-end, at all\n- Advanced topics and future proofing our work",
        "id": "chapter-0-full-stack-plugin-system-workshop-introduction"
      },
      {
        "title": "Chapter 1: Architectural knowledge about plugin system",
        "description": "\nWhat is a modular system?\n\n- Anything which allows multiple parts to build a product from multiple smaller products\n- Microservices\n- Micro front-ends\n- Multi-project with a central routing\n- A serious plugin systems\n\nScenarios which you need a plugin system\n- In a system which is developed outside of main team\n- Developed features, by unknown teams\n- No way to anticipate what plugins will offer.\n- Massively modifiable, based on region, laws, more.\n- You have determined there is no other way.\n",
        "duration": "22m",
        "mainVideo": {
          "url": "https://www.youtube.com/embed/fFtUhNiPu1k?si=oe1O7mHVIK6xCdsp"
        },
        "content": "What is a modular system?\n\n- Anything which allows multiple parts to build a product from multiple smaller products\n- Microservices\n- Micro front-ends\n- Multi-project with a central routing\n- A serious plugin systems\n\nScenarios which you need a plugin system\n- In a system which is developed outside of main team\n- Developed features, by unknown teams\n- No way to anticipate what plugins will offer.\n- Massively modifiable, based on region, laws, more.\n- You have determined there is no other way.\n",
        "id": "chapter-1-architectural-knowledge-about-plugin-system"
      },
      {
        "title": "Chapter 2: Create front end plugin project",
        "description": "\nAs plugin, what things to consider?\n\n- It should be able to run normally, as its own project\n- We export different parts, which can be as plugin\n- Can have multiple different builds, standalone, html only, in react, or full content\n- We do not depend on any module, such as module federation or webpack.\n- Keeping the Host API consistent.\n- Testing and marking the versions that plugin is compatible with host itself.\n- Keep styling out, as an option to be imported.\n- Keeping the markup very clean\n- Avoid as many as libraries we can.\n",
        "duration": "21m",
        "mainVideo": {
          "url": "https://www.youtube.com/embed/CRHPiSl8xFc?si=fEiW2OxY-6RI0u44"
        },
        "content": "\nAs plugin, what things to consider?\n\n- It should be able to run normally, as its own project\n- We export different parts, which can be as plugin\n- Can have multiple different builds, standalone, html only, in react, or full content\n- We do not depend on any module, such as module federation or webpack.\n- Keeping the Host API consistent.\n- Testing and marking the versions that plugin is compatible with host itself.\n- Keep styling out, as an option to be imported.\n- Keeping the markup very clean\n- Avoid as many as libraries we can.\n",
        "id": "chapter-2-create-front-end-plugin-project"
      },
      {
        "title": "Chapter 3: Create front end host plugin manager",
        "description": "\nWe need to register hooks, and routes\n\n- We need somewhere to store the hooks and routes (pages) from plugins\n- We need a register plugin mechanism\n- A mechanism to share the Host API\n- Documentation, how the plugin system works.\n- All the events, and screens a plugin can add (host/plugin)\n- Create things as plugin, from beginning if that’s the way to go.\n- Provide so much details via Host API, even if it’s not planned now\n",
        "duration": "1h 0m",
        "mainVideo": {
          "url": "https://www.youtube.com/embed/iGH-JTZ7uT8?si=P2icyFqeeq5xboTc"
        },
        "content": "\nWe need to register hooks, and routes\n\n- We need somewhere to store the hooks and routes (pages) from plugins\n- We need a register plugin mechanism\n- A mechanism to share the Host API\n- Documentation, how the plugin system works.\n- All the events, and screens a plugin can add (host/plugin)\n- Create things as plugin, from beginning if that’s the way to go.\n- Provide so much details via Host API, even if it’s not planned now\n",
        "id": "chapter-3-create-front-end-host-plugin-manager"
      },
      {
        "title": "Chapter 4:  Manage plugins via a backend system",
        "description": "\n          In this video, we implement a backend system, which would service the plugins for front-end, and enabled and disable them programmatically without compiling the plugin into the code base.\n          ",
        "duration": "30m",
        "mainVideo": {
          "url": "https://www.youtube.com/embed/iOglPncUKOQ?si=59rXoHbG-PT2qi_c"
        },
        "content": "\n          In this video, we implement a backend system, which would service the plugins for front-end, and enabled and disable them programmatically without compiling the plugin into the code base.\n          ",
        "id": "chapter-4-manage-plugins-via-a-backend-system"
      }
    ]
    ,
  },
  {
    id: "adc-keyboard-workshop",
    title: "Building an ADC Keyboard on ESP32",
    description:
      "A hands-on workshop where you learn how to build, read, and decode an analog (ADC) keyboard on the ESP32. We go from the hardware theory—voltage dividers, key ladders, and ADC channels—to writing a reusable driver with debouncing, long-press detection, callbacks, and multi-keyboard support. Perfect for anyone building IoT devices, custom controllers, or embedded UX.",
    language: "English",
    totalDuration: "2h 15m",
    level: "intermediate",
    category: "Embedded Development",
    mainVideo: "https://www.youtube.com/embed/H4qN3ECmUfY?si=9SM2Ha1qt_r2BPAT",
    prerequisites: [
      "Basic C programming",
      "General knowledge of microcontrollers",
      "Minimal ESP-IDF experience",
    ],
    tools: [
      "ESP32 board with ADC keypad",
      "ESP-IDF v5.x",
      "VSCode + ESP-IDF extension",
      "Multimeter (optional)",
      "Logic analyzer (optional)",
    ],
    sections: [],
  },
  {
    id: "developer-coaching-workshop",
    title: "Developer Coaching Workshop",
    mainVideo: "https://www.youtube.com/embed/vle1OgvoFgc?si=2U3neWomyuU7QcE3",
    description:
      "A workshop focused on leveling up developers by fixing mindset traps, improving engineering judgment, and avoiding common long-term career pitfalls. Practical, direct, and based on real-world software experience.",
    language: "English",
    totalDuration: "45m",
    level: "intermediate",
    category: "Software Engineering",
    prerequisites: [
      "General programming experience",
      "Basic understanding of modern frontend or backend workflows",
    ],
    tools: [],
    sections: [
      {
        title: "Side Projects Hurt Programmers",
        description:
          "Breaking down why random side projects often waste years, create fragmented skills, and block real career progress — and what to do instead.",
        duration: "20m",
        mainVideo: {
          url: "https://www.youtube.com/embed/vle1OgvoFgc?si=2U3neWomyuU7QcE3", // replace with real link
        },
        content: "",
        id: "side-projects-hurt-programmers",
      },
      {
        title: "Why Shared Component Libraries Are Bad",
        description:
          "Why centralizing UI components looks smart but usually kills speed, ownership, and product quality. A candid look at real-world failures and better alternatives.",
        duration: "25m",
        mainVideo: {
          url: "https://www.youtube.com/embed/7cRfr48kYZE?si=dOjkyF_WotQZexpV", // replace with real link
        },
        content: "",
        id: "why-shared-component-library-is-bad",
      },
    ],
  },
  {
    id: "mastering-fireback-workshop",
    title: "Mastering Fireback",
    description:
      "A complete workshop to learn Fireback — from setup to building production-grade backends and cross-platform apps. Covers definitions, code generation, CLI usage, database integration, and embedding backends in mobile and desktop apps.",
    language: "English",
    totalDuration: "4h 30m",
    level: "intermediate",
    category: "Backend Development",
    prerequisites: [
      "Basic understanding of Go or TypeScript",
      "Familiarity with REST or WebSocket APIs",
      "General backend development experience",
    ],
    tools: [
      "Fireback CLI",
      "Golang",
      "PostgreSQL",
      "Node.js",
      "React",
      "Android Studio",
      "Xcode",
    ],
    mainVideo: "https://www.youtube.com/embed/jEgbZGyhMNw?si=BZrYVkOddeXGFNAg",
    sections: [
      {
        title: "XHTML and Fireback",
        description: `Ever wonder there is an easier way of creating websites, instead of using different frameworks, bundlers, constantly updating frameworks.

Let's explore how can we build a website with pure javascript, pure css, and simple html.`,
        duration: "13m",
        mainVideo: {
          url: "https://www.youtube.com/embed/jEgbZGyhMNw?si=BZrYVkOddeXGFNAg",
        },
        content: "",
        id: "xhtml-and-fireback",
      },

      {
        title: "Fireback Post Request Handling Features",
        description: `In this video I am demoing the default features of Fireback framework when creating APIs.

Parsing json
Error handling on json
Parsing Yaml
Form data, formdata urlencoded
XML support on API requests.`,
        duration: "12m",
        mainVideo: {
          url: "https://www.youtube.com/embed/BfSGCpExi8o?si=-KLq2bW80rP7taCf",
        },
        content: "",
        id: "fireback-post-request-handling",
      },
      {
        title: "How we develop backend in 3 minutes",
        description: `Fireback features overview.`,
        duration: "25m",
        mainVideo: {
          url: "https://www.youtube.com/embed/gMInPjCu3pY?si=nvVeOCim1f14U4To",
        },
        content: "",
        id: "fireback-overview-build-in-3-minutes",
      },
    ],
  },
  {
    id: "react-and-react-native-translation",
    category: "i18n",
    description: `
The significance of translations appears to be overlooked, with the second language 
often treated as an afterthought in my projects; some even begin with non-English 
strings hardcoded in templates, only to encounter challenges later when attempting 
to modify them, as the lack of type safety prevents immediate detection of all 
occurrences, resulting in an inconsistent user experience where English words may 
unexpectedly appear in a Spanish interface,
negatively impacting the brand's reputation.`,
    language: "English",
    level: "advanced",
    title: "React & React Native Translations Done Right Once",
    totalDuration: "1 hour",
    prerequisites: [],
    sections: [],
    mainVideo: "https://www.youtube.com/embed/-vVQ9iI2CNU?si=iRFH9tvQIrJiGkvU",
    tools: ["react", "fireback"],
  },
  {
    id: "standard-react-native-list",
    category: "ui-ux",
    description: `
Lists are a core UI pattern in mobile apps, yet they're often implemented inconsistently.
Common issues include missing keys, unoptimized rendering of large datasets, poor accessibility,
and lack of uniform styling, which leads to janky scrolling, memory leaks, or a fragmented UX.
Following best practices ensures performant, maintainable, and accessible lists that feel native
and cohesive across screens, enhancing both developer efficiency and user satisfaction.`,
    language: "English",
    level: "advanced",
    title: "ATS-01 Standard for React Native List based projects",
    totalDuration: "1 hour",
    mainVideo: "https://www.youtube.com/embed/ZLnImRfvRC8?si=CV1R6qEF4HseXf5n",
    prerequisites: [
      "React Native fundamentals",
      "Basic performance optimization concepts",
    ],
    sections: [],
    tools: ["react-native", "fireback"],
  },
  {
    id: "why-use-lottie-in-react-native-mobile-development",
    category: "ui-ux",
    description: `
Animations often make or break the perceived quality of a mobile app. 
Using static images or simple GIFs feels outdated and can hurt performance. 
Lottie allows you to ship high-quality, lightweight, vector-based animations
directly from After Effects, ensuring smooth playback on all devices.
In my projects, these two Lottie animations demonstrate how engaging micro-interactions
and seamless transitions can elevate UX, reduce development effort, and make the app
feel polished without bloating the bundle size.`,
    language: "English",
    level: "intermediate",
    title: "Why Use Lottie in React Native Projects",
    totalDuration: "30 minutes",
    prerequisites: [
      "React Native fundamentals",
      "Basic understanding of animations",
    ],
    sections: [],
    tools: ["react-native", "lottie-react-native", "fireback"],
  },
];

export const products: Product[] = [
  {
    id: "fireback",
    title: "Fireback",
    relatedWorkshop: workshops.find(
      (workshop) => workshop.id === "mastering-fireback-workshop"
    ),
    type: "Web Framework",
    description:
      "A full-stack Golang framework for rapidly building web, mobile, and desktop apps — with built-in backend and client code generation.",
    details:
      "Fireback provides a comprehensive set of tools and utilities for Go developers, including routing, middleware, database integration, and more. It's designed to streamline the development process while maintaining high performance and scalability. Built with modern Go practices and designed for both beginners and experienced developers.",
    links: {
      github: "https://github.com/torabian/fireback",
      documentation: "https://torabian.github.io/fireback/docs/intro",
      demo: "https://torabian.github.io/fireback/demo",
    },
    artifacts: [
      {
        name: "Installer",
        url: "https://github.com/torabian/fireback/releases/latest/download/fireback-amd64.deb",
        os: "linux",
        arch: "x64",
        type: "installer",
      },
      {
        name: "Installer",
        url: "https://github.com/torabian/fireback/releases/latest/download/fireback-arm64.deb",
        os: "linux",
        arch: "arm64",
        type: "installer",
      },
      {
        name: "Monolith",
        url: "https://github.com/torabian/fireback/releases/latest/download/fireback-boilerplate.zip",
        os: "other",
        arch: "",
        type: "archive",
      },
      {
        name: "Android Demo",
        url: "https://github.com/torabian/fireback/releases/latest/download/fireback-capcitor.apk",
        os: "other",
        arch: "arm64",
        type: "apk",
      },
      {
        name: "Microservice",
        url: "https://github.com/torabian/fireback/releases/latest/download/fireback-microservice-boilerplate.zip",
        os: "other",
        arch: "",
        type: "archive",
      },
      {
        name: "Binary",
        url: "https://github.com/torabian/fireback/releases/latest/download/fireback_amd64_darwin.zip",
        os: "macos",
        arch: "x64",
        type: "binary",
      },
      {
        name: "Binary",
        url: "https://github.com/torabian/fireback/releases/latest/download/fireback_amd64_linux.zip",
        os: "linux",
        arch: "x64",
        type: "binary",
      },
      {
        name: "Binary",
        url: "https://github.com/torabian/fireback/releases/latest/download/fireback_amd64_windows.zip",
        os: "windows",
        arch: "x64",
        type: "binary",
      },
      {
        name: "Binary",
        url: "https://github.com/torabian/fireback/releases/latest/download/fireback_arm64_darwin.zip",
        os: "macos",
        arch: "arm64",
        type: "binary",
      },
      {
        name: "Binary",
        url: "https://github.com/torabian/fireback/releases/latest/download/fireback_arm64_linux.zip",
        os: "linux",
        arch: "arm64",
        type: "binary",
      },
      {
        name: "Binary",
        url: "https://github.com/torabian/fireback/releases/latest/download/fireback_arm64_windows.zip",
        os: "windows",
        arch: "arm64",
        type: "binary",
      },
      {
        name: "Installer",
        url: "https://github.com/torabian/fireback/releases/latest/download/fireback_intel_amd64.pkg",
        os: "macos",
        arch: "x64",
        type: "installer",
      },
      {
        name: "Installer",
        url: "https://github.com/torabian/fireback/releases/latest/download/fireback_silicon_arm64.pkg",
        os: "macos",
        arch: "arm64",
        type: "installer",
      },
      {
        name: "Installer",
        url: "https://github.com/torabian/fireback/releases/latest/download/fireback_win_amd64_installer.msi",
        os: "windows",
        arch: "x64",
        type: "installer",
      },
      {
        name: "Installer",
        url: "https://github.com/torabian/fireback/releases/latest/download/fireback_win_arm64_installer.msi",
        os: "windows",
        arch: "arm64",
        type: "installer",
      },
    ],

    // trainingRelated: ["avoid-software-failure"],
    features: [
      "Compile the fastest (within 10 seconds or less), use the least memory (less than 5MB in idle mode), and ensure type safety.",
      "Products should have a minimum lifespan of 20 years after their initial build.",
      "Never rewrite the code, due to bad structure or skipping important details.",
      "Achieve machine independence without relying on Docker or similar tools.",
      "Compile for various platforms including web, native mobile (iOS, Android), desktop, and embedded devices.",
      "Do not address ambiguity regarding roles, workspaces, permissions, or email/SMS/OAuth authentication.",
      "Utilize SQL with an organized data structure.",
      "Prioritize code management over code generation.",
      "Significantly reduce build times for clients in Android, React, Angular, and SwiftUI.",
      "Zero setup backend usage for front-end or app developers.",
      "Always provide more than anyone’s need, always before they ask.",
      "Integrated desktop app support using Wails.",
      "Binaries ready to be embedded on Android and iOS native, as well as Cordova for offline backend usage (same code base).",
      "Build on top of Golang — fast build time, blazing runtime, minimal memory usage.",
      "Terminal (CLI) for everything, even user signup and password reset.",
      "User/Role/Workspace built into everything.",
      "User permission management.",
      "Relational Database support (SQLite, MySQL, Oracle, Postgres).",
      "Nested, Object in Object, Array in Object, Object in Array post form handler.",
      "Polyglot (Multilingual) built into the definition.",
      "File upload system with virtual directories based on resumable uploads (TUS).",
      "Form validation for nested objects.",
      "Reactive stream query via WebSocket on Module3 definition.",
      "Bulk Patch (Update) on every entity.",
      "Publicly available vs workspace/user protected actions.",
      "Custom action definition with auto cast from HTTP and CLI.",
      "Generate Post, Patch, Query, Delete, Bulk Patch for every entity.",
      "HTML and rich text content storage.",
      "Dynamic data via JSON and ERD data storage.",
      "QueryDSL for every entity — query, filter, sort without dependencies.",
      "Built-in search mechanism.",
      "Multilingual menu, sidebar, and tabbar system.",
      "Generate APIs and actions for nested entities (add/remove/etc).",
      "Auto handle unique IDs and relations between non-nested elements.",
      "Format dates, currency, and time based on client region.",
      "Backend errors translated based on Accept-Language.",
      "Unified Google JSON styleguide response without exception.",
      "Manual and automatic mocking system for all entities.",
      "Seeder system for including initial or necessary content (yaml/json/csv).",
      "Advanced background operations for import/export of all entities.",
      "Default and custom permission definitions.",
      "CSV/YAML data template generation for import.",
      "Auto sanitize content.",
      "Advanced form validation and excerpt generation.",
      "Casting DTO/entity from CLI parameters.",
      "PDF export for queries (beta) without third-party dependencies.",
      "JsonDSL (complex query conditions) and QueryDSL (textual query).",
      "Predefined SQL queries (Pivot and Recursive CTE).",
      "Event system for entity changes, broadcasted via WebSocket.",
      "CLI wipe and multi-row delete for entities.",
      "Automatic privilege enforcement on content creation/modification.",
      "Multiple workspaces and multiple roles per workspace.",
      "Multiple workspace types (e.g., School, Student).",
      "Direct signup to a team via public join key.",
      "Distinct-by-user workspace operation flag.",
      "Interactive CLI tools for entity creation.",
      "Support for complex enums, auto-casting to major programming languages.",
    ],
    status: "active",
    lastUpdated: "2024-01-15",
  },
  {
    id: "emi",
    title: "Emi",
    type: "Compiler",
    mainVideo: "https://www.youtube.com/embed/p_hkbarIQjM?si=_wFU_XarYwcXDfHK",
    description:
      "The Emi compiler - a cutting-edge compilation tool for modern software development.",
    details:
      "Emi is an advanced compiler that brings innovative compilation techniques to help developers optimize their code, improve performance, and streamline the build process. It supports multiple languages and provides intelligent code analysis, dead code elimination, and advanced optimization strategies.",
    links: {
      github: "https://github.com/torabian/emi",
      documentation: "https://torabian.github.io/emi/",
      download: "https://github.com/torabian/emi/releases",
    },
    trainingRelated: ["emi-compiler-training"],
    features: [
      "Multi-language support (Go, Rust, C++)",
      "Advanced dead code elimination",
      "Intelligent optimization algorithms",
      "Parallel compilation support",
      "Cross-platform compatibility",
      "Plugin architecture for extensibility",
      "Real-time compilation feedback",
      "Memory usage optimization",
    ],
    status: "beta",
    artifacts: [
      {
        name: "Node WASM Package",
        url: "https://github.com/torabian/emi/releases/latest/download/emi-node-wasm-package.zip",
        os: "other",
        arch: "",
        type: "archive",
      },
      {
        name: "Binary",
        url: "https://github.com/torabian/emi/releases/latest/download/emi_amd64_darwin.zip",
        os: "macos",
        arch: "x64",
        type: "binary",
      },
      {
        name: "Binary",
        url: "https://github.com/torabian/emi/releases/latest/download/emi_amd64_linux.zip",
        os: "linux",
        arch: "x64",
        type: "binary",
      },
      {
        name: "Binary",
        url: "https://github.com/torabian/emi/releases/latest/download/emi_amd64_windows.zip",
        os: "windows",
        arch: "x64",
        type: "binary",
      },
      {
        name: "Binary",
        url: "https://github.com/torabian/emi/releases/latest/download/emi_arm64_darwin.zip",
        os: "macos",
        arch: "arm64",
        type: "binary",
      },
      {
        name: "Binary",
        url: "https://github.com/torabian/emi/releases/latest/download/emi_arm64_linux.zip",
        os: "linux",
        arch: "arm64",
        type: "binary",
      },
      {
        name: "Binary",
        url: "https://github.com/torabian/emi/releases/latest/download/emi_arm64_windows.zip",
        os: "windows",
        arch: "arm64",
        type: "binary",
      },
    ],
    lastUpdated: "2024-01-10",
  },
  {
    id: "izadom",
    title: "Izadom",
    thumbnail: "/izadom/demo.png",
    type: "3D Design Program",
    mainVideo: "https://www.youtube.com/embed/aP_8FSqxvW4?si=aEwCxFcKr_TIL_Dj",
    description:
      "Izadom — a structural 3D house design tool that calculates precise material needs based on the Polish construction market.",
    details:
      "Izadom enables users to design houses from a structural perspective with real-world precision. It automatically estimates the exact quantities of materials, components, and products required for construction, aligned with Polish market standards and suppliers. Ideal for architects, builders, and DIY enthusiasts who want accurate cost and material planning without guesswork.",
    links: {
      demo: "https://torabian.github.io/izadom",
      download: "https://torabian.github.io/izadom-latest.apk",
      downloadLabel: "Download Android",
      downloadSize: "18MB",
    },
    trainingRelated: ["construction-efficiency", "smart-building-planning"],
    features: [
      "3D structural modeling of buildings",
      "Automatic material and cost estimation",
      "Integration with Polish construction products database",
      "Accurate quantity take-off calculations",
      "Real-time structural validation",
      "Multi-layer wall, roof, and floor customization",
      "Export-ready plans and BOM (Bill of Materials)",
      "Collaboration tools for engineers and builders",
    ],
    status: "beta",
    lastUpdated: "2025-10-16",
  },
  {
    id: "meshora-thermo",
    title: "Meshora Thermo",
    type: "DIY Heating Control",
    description:
      "Meshora Thermo — a DIY-friendly heat control system for underfloor heating circuits, pumps and wood-burner automation with live monitoring and consumption tracking.",
    details:
      "Meshora Thermo lets home users and hobbyist installers control multiple underfloor heating circuits (valves), manage pump speed, and automate wood-burning stoves. It provides live sensor readings (pressure, flow, temperature, energy), consumption history, and an admin area for configuration and safety rules. Built to be modular and simple to extend — replace the mock hooks with a real backend when ready.",
    links: {
      demo: "https://torabian.github.io/meshora-thermo",
      download: "https://torabian.github.io/meshora-thermo-latest.zip",
      downloadSize: "15MB",
    },
    thumbnail: "/meshora-thermo/demo.png",
    trainingRelated: [
      "home-heating-automation",
      "hvac-diy",
      "energy-efficiency",
    ],

    features: [
      "Control multiple underfloor heating circuits (open/close valves)",
      "Per-room thermostat UI with on/off and disabled states",
      "Pump control (0–100%) with Stop button",
      "Sensor dashboard: pressure, flow, energy, temperature",
      "Consumption tracking and simple history charts",
      "Wood-burner automation (set schedules & safety interlocks)",
      "Admin section for user/access and system configuration",
      "Theme-aware UI (dark/light) and responsive dashboard",
      "Mocked react-query-style hooks ready to swap for real API",
    ],
    status: "active",
    lastUpdated: "2025-10-27",
  },
];

// Experience interfaces
export interface Experience {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown content
  videoUrl?: string;
  videoTitle?: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

// Service interfaces
export interface Service {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown content
  icon: string;
  category: string;
  mainVideo?: string;
  priceRange: string;
  duration?: string;
  features: string[];
  technologies: string[];
  featured: boolean;
}
export const services: Service[] = [
  {
    id: "frontend-development",
    title: "Front-end Development",
    description:
      "I build clean, interactive web interfaces with React and TypeScript.",
    content:
      "Front-end web apps using React, TypeScript, Next.js, and Tailwind. I focus on performance, usability, and maintainable code.",
    icon: "💻",
    category: "Development",
    priceRange: "180 zł/hour",
    features: [
      "React & TypeScript",
      "Responsive UI",
      "Clean code",
      "Performance focus",
    ],
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    featured: true,
    mainVideo: "https://www.youtube.com/embed/kwFtGI6fJQk?si=9Ot3rdoENp7bPJaQ",
  },
  {
    id: "hybrid-mobile-apps",
    title: "Hybrid Mobile Apps",
    description:
      "I create cross-platform apps for iOS and Android using React Native.",
    content:
      "Build hybrid apps with React Native. One codebase, runs smoothly on iOS & Android.",
    icon: "📱",
    category: "Mobile",
    priceRange: "140 zł/hour",
    features: [
      "React Native",
      "Cross-platform",
      "TypeScript",
      "Native API access",
    ],
    technologies: ["React Native", "TypeScript", "iOS", "Android"],
    featured: true,
    mainVideo: "https://www.youtube.com/embed/IggQEhKKOY0?si=6d2nGQVY8eqdcxTW",
  },
  {
    id: "native-mobile-apps",
    title: "Native Mobile Apps",
    description: "I develop high-performance native apps for iOS and Android.",
    content:
      "Native iOS apps with Swift/SwiftUI and Android apps with Kotlin/Jetpack Compose.",
    icon: "📱",
    category: "Mobile",
    priceRange: "250 zł/hour",
    features: ["Swift & Kotlin", "Platform-specific UI", "App Store ready"],
    technologies: ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose"],
    featured: true,
    mainVideo: "https://www.youtube.com/embed/IggQEhKKOY0?si=6d2nGQVY8eqdcxTW",
  },
  {
    id: "backend-development",
    title: "Backend Development",
    description:
      "I build reliable APIs and server-side logic with Go and Node.js.",
    content:
      "Backend services, REST/GraphQL APIs, microservices, and database design.",
    icon: "🖥️",
    category: "Development",
    priceRange: "180 zł/hour",
    features: [
      "Go & Node.js",
      "REST & GraphQL",
      "Database design",
      "Scalable services",
    ],
    technologies: ["Go", "Node.js", "PostgreSQL", "Redis", "Docker"],
    featured: true,
    mainVideo: "https://www.youtube.com/embed/ij8R7YHt5Q8?si=5VTV15EHWauTgMpy",
  },
];

// Skills interfaces
export interface SkillCategory {
  id: string;
  title: string;
  skills: Array<{
    title: string;
    id?: string;
  }>;
  description?: string;
}

export interface LanguageSkill {
  language: string;
  level: string;
  description?: string;
}

export interface OtherSkill {
  category: string;
  skills: string[];
  description?: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming-languages",
    title: "Programming Languages",
    description: "Core programming languages I work with regularly",
    skills: [
      { title: "Go", id: "golang" },
      { title: "React" },
      { title: "React Native" },
      { title: "JavaScript" },
      { title: "Node.js" },
      { title: "SQLite" },
      { title: "MySQL" },
    ],
  },
  {
    id: "other-technologies",
    title: "Other Technologies",
    description: "Additional technologies and frameworks I work with",
    skills: [
      { title: "SwiftUI" },
      { title: "Android" },
      { title: "MongoDB" },
      { title: "SpringBoot" },
      { title: "C#" },
      { title: "PHP" },
      { title: "WordPress" },
    ],
  },
];

export const otherSkills: OtherSkill[] = [
  {
    category: "Technical Certifications",
    skills: ["Polish G1", "Polish G2", "Polish G3"],
    description: "Polish technical certifications",
  },
  {
    category: "Installation & Maintenance",
    skills: ["Heating system installation", "Gas boiler installations"],
    description: "Technical installation and maintenance skills",
  },
  {
    category: "Design & Creative",
    skills: ["3D design"],
    description: "Creative and design capabilities",
  },
  {
    category: "Driving Licenses",
    skills: ["C driving license", "C+E driving license"],
    description: "Professional driving qualifications",
  },
];

export const languageSkills: LanguageSkill[] = [
  {
    language: "English",
    level: "C1/C2",
    description: "Fluent in both written and spoken English",
  },
  {
    language: "Polish",
    level: "B1/B2",
    description: "Good command of Polish language",
  },
  {
    language: "Turkish",
    level: "B1",
    description: "Intermediate level Turkish",
  },
  {
    language: "German",
    level: "A2-B1",
    description: "Basic to intermediate German",
  },
  {
    language: "Russian",
    level: "A1-A2",
    description: "Basic Russian language skills",
  },
];

export const futureLanguages = ["Spanish", "Japanese"];

export const featuredVideos = [
  {
    src: "https://www.youtube.com/embed/H4qN3ECmUfY?si=9SM2Ha1qt_r2BPATw",
    info: {
      title: "YouTube video player",
      width: 560,
      height: 315,
    },
  },
  {
    src: "https://www.youtube.com/embed/-vVQ9iI2CNU?si=iRFH9tvQIrJiGkvU",
    info: {
      title: "YouTube video player",
      width: 560,
      height: 315,
    },
  },
  {
    src: "https://www.youtube.com/embed/aP_8FSqxvW4?si=aEwCxFcKr_TIL_Dj",
    info: {
      title: "YouTube video player",
      width: 560,
      height: 315,
    },
  },
  {
    src: "https://www.youtube.com/embed/OdMFRt5O3fc?si=uIAZpf0OeH2zP_y6",
    info: {
      title: "YouTube video player",
      width: 560,
      height: 315,
    },
  },
];
