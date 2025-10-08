export const generalInfo = {
  introductionTitle: "Hi, I am Ali 👋",
  introductionLine:
    "I build digital products, share knowledge, and help others create.",
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
  type: string;
  description: string;
  details: string;
  links: {
    github?: string;
    documentation?: string;
    demo?: string;
    download?: string;
  };
  trainingRelated?: string[]; // Array of training IDs
  features: string[];
  status: "active" | "beta" | "deprecated";
  lastUpdated: string;
}

export const products: Product[] = [
  {
    id: "fireback",
    title: "Fireback",
    type: "Web Framework",
    description:
      "A powerful Golang framework for building modern web applications with built-in features for rapid development.",
    details:
      "Fireback provides a comprehensive set of tools and utilities for Go developers, including routing, middleware, database integration, and more. It's designed to streamline the development process while maintaining high performance and scalability. Built with modern Go practices and designed for both beginners and experienced developers.",
    links: {
      github: "https://github.com/torabian/fireback",
      documentation: "https://fireback.dev/docs",
      demo: "https://demo.fireback.dev",
    },
    trainingRelated: ["avoid-software-failure"],
    features: [
      "Fast HTTP routing with middleware support",
      "Built-in database ORM with migration tools",
      "Comprehensive testing utilities",
      "Auto-generated API documentation",
      "WebSocket support out of the box",
      "Environment-based configuration",
      "Graceful shutdown handling",
      "Request validation and sanitization",
    ],
    status: "active",
    lastUpdated: "2024-01-15",
  },
  {
    id: "emi",
    title: "Emi",
    type: "Compiler",
    description:
      "The Emi compiler - a cutting-edge compilation tool for modern software development.",
    details:
      "Emi is an advanced compiler that brings innovative compilation techniques to help developers optimize their code, improve performance, and streamline the build process. It supports multiple languages and provides intelligent code analysis, dead code elimination, and advanced optimization strategies.",
    links: {
      github: "https://github.com/torabian/emi",
      documentation: "https://emi.dev/docs",
      download: "https://emi.dev/download",
    },
    trainingRelated: ["avoid-software-failure"],
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
    lastUpdated: "2024-01-10",
  },
];

export const trainings: Training[] = [
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
        title: "Introduction to Software Reliability",
        description:
          "Understanding what software failure means and why it happens in modern development environments.",
        duration: "25 min",
        videoUrl: "https://www.youtube.com/embed/sample1",
        isCompleted: false,
      },
      {
        id: "chapter-2",
        title: "Common Failure Patterns",
        description:
          "Exploring the most frequent causes of software failures and how to identify them early.",
        duration: "35 min",
        videoUrl: "https://www.youtube.com/embed/sample2",
        isCompleted: false,
      },
      {
        id: "chapter-3",
        title: "Testing Strategies That Work",
        description:
          "Implementing effective testing methodologies to catch issues before they reach production.",
        duration: "40 min",
        videoUrl: "https://www.youtube.com/embed/sample3",
        isCompleted: false,
      },
      {
        id: "chapter-4",
        title: "Code Quality and Maintainability",
        description:
          "Writing clean, maintainable code that reduces the likelihood of bugs and failures.",
        duration: "30 min",
        videoUrl: "https://www.youtube.com/embed/sample4",
        isCompleted: false,
      },
      {
        id: "chapter-5",
        title: "Monitoring and Observability",
        description:
          "Setting up proper monitoring systems to detect and respond to issues quickly.",
        duration: "35 min",
        videoUrl: "https://www.youtube.com/embed/sample5",
        isCompleted: false,
      },
      {
        id: "chapter-6",
        title: "Error Handling Best Practices",
        description:
          "Implementing robust error handling mechanisms that gracefully manage unexpected situations.",
        duration: "25 min",
        videoUrl: "https://www.youtube.com/embed/sample6",
        isCompleted: false,
      },
      {
        id: "chapter-7",
        title: "Deployment and Rollback Strategies",
        description:
          "Safe deployment practices and quick rollback procedures to minimize failure impact.",
        duration: "30 min",
        videoUrl: "https://www.youtube.com/embed/sample7",
        isCompleted: false,
      },
      {
        id: "chapter-8",
        title: "Building Resilient Systems",
        description:
          "Architecting systems that can withstand failures and continue operating under adverse conditions.",
        duration: "40 min",
        videoUrl: "https://www.youtube.com/embed/sample8",
        isCompleted: false,
      },
    ],
  },
];

export const featuredVideos = [
  {
    src: "https://www.youtube.com/embed/-vVQ9iI2CNU?si=OEmqBuHB5dfRp9gw",
    info: {
      title: "YouTube video player",
      width: 560,
      height: 315,
    },
  },
  {
    src: "https://www.youtube.com/embed/kZQIbAEawp4?si=UvAdmSi1q08YlVyx",
    info: {
      title: "YouTube video player",
      width: 560,
      height: 315,
    },
  },
  {
    src: "https://www.youtube.com/embed/RCDr3Am_-bQ?si=wEYosku4vzONZhgn",
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
