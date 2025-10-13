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
  type: string;
  description: string;
  details: string;
  links: {
    github?: string;
    documentation?: string;
    demo?: string;
    download?: string;
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

  description: string;
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
    id: "react-translation-workshop",
    title: "React Translation Workshop",
    description:
      "A hands-on workshop to master internationalization (i18n) in React applications. Learn how to implement robust translation systems, manage multiple languages, and create user-friendly multilingual interfaces.",
    language: "English",
    totalDuration: "3h 15min",
    level: "intermediate",
    category: "Frontend Development",
    prerequisites: [
      "Basic knowledge of React and JavaScript",
      "Understanding of component lifecycle",
      "Familiarity with npm/yarn package managers",
    ],
    tools: [
      "React 18+",
      "react-i18next",
      "i18next",
      "i18next-browser-languagedetector",
      "i18next-http-backend",
    ],
    sections: [
      {
        id: "section-1",
        title: "Introduction to i18n in React",
        description:
          "Understanding the fundamentals of internationalization and why it matters for modern web applications.",
        duration: "20 min",
        content: `# Introduction to i18n in React

## What is Internationalization (i18n)?

Internationalization (i18n) is the process of designing and developing applications to support multiple languages and regions. It's not just about translating text - it involves:

- **Text Translation**: Converting UI text to different languages
- **Number Formatting**: Different number formats (1,234.56 vs 1.234,56)
- **Date/Time Formatting**: Various date and time representations
- **Currency Formatting**: Different currency symbols and formats
- **Text Direction**: Support for RTL (Right-to-Left) languages
- **Cultural Considerations**: Colors, images, and cultural context

## Why i18n Matters

- **Global Reach**: Access to international markets
- **User Experience**: Users prefer content in their native language
- **Accessibility**: Better accessibility for non-English speakers
- **SEO Benefits**: Better search engine rankings in different regions
- **Business Growth**: Increased user engagement and conversion rates

## Common i18n Libraries for React

1. **react-i18next**: Most popular, feature-rich
2. **react-intl**: Part of FormatJS, excellent for complex formatting
3. **react-localize-redux**: Redux-based approach
4. **react-translate**: Lightweight option

In this workshop, we'll focus on **react-i18next** as it's the most widely adopted solution.`,
        isCompleted: false,
      },
      {
        id: "section-2",
        title: "Setting Up react-i18next",
        description:
          "Install and configure react-i18next with proper project structure and initial setup.",
        duration: "25 min",
        content: `# Setting Up react-i18next

## Installation

First, let's install the necessary packages:

\`\`\`bash
npm install react-i18next i18next i18next-browser-languagedetector i18next-http-backend
# or
yarn add react-i18next i18next i18next-browser-languagedetector i18next-http-backend
\`\`\`

## Project Structure

Create the following folder structure:

\`\`\`
src/
├── i18n/
│   ├── index.js
│   └── locales/
│       ├── en/
│       │   └── translation.json
│       ├── es/
│       │   └── translation.json
│       └── fr/
│           └── translation.json
└── components/
\`\`\`

## Basic Configuration

Create \`src/i18n/index.js\`:

\`\`\`javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
\`\`\`

## Translation Files

Create \`src/i18n/locales/en/translation.json\`:

\`\`\`json
{
  "welcome": "Welcome to our app!",
  "hello": "Hello {{name}}!",
  "buttons": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete"
  },
  "navigation": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  }
}
\`\`\`

## Initialize in Your App

In your main \`App.js\` or \`index.js\`:

\`\`\`javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './i18n'; // Import i18n configuration
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
\`\`\``,
        isCompleted: false,
      },
      {
        id: "section-3",
        title: "Basic Translation Usage",
        description:
          "Learn how to use the useTranslation hook and translate text in your React components.",
        duration: "30 min",
        content: `# Basic Translation Usage

## Using the useTranslation Hook

The \`useTranslation\` hook is the primary way to access translations in functional components:

\`\`\`javascript
import React from 'react';
import { useTranslation } from 'react-i18next';

function WelcomeComponent() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('hello', { name: 'John' })}</p>
    </div>
  );
}
\`\`\`

## Translation with Variables

You can pass variables to your translations:

\`\`\`json
{
  "greeting": "Hello {{name}}, you have {{count}} messages",
  "items": "{{count}} item",
  "items_plural": "{{count}} items"
}
\`\`\`

\`\`\`javascript
function MessageComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <p>{t('greeting', { name: 'Alice', count: 5 })}</p>
      <p>{t('items', { count: 1 })}</p> {/* "1 item" */}
      <p>{t('items', { count: 5 })}</p> {/* "5 items" */}
    </div>
  );
}
\`\`\`

## Nested Keys

Access nested translation keys using dot notation:

\`\`\`javascript
function NavigationComponent() {
  const { t } = useTranslation();
  
  return (
    <nav>
      <a href="/">{t('navigation.home')}</a>
      <a href="/about">{t('navigation.about')}</a>
      <a href="/contact">{t('navigation.contact')}</a>
    </nav>
  );
}
\`\`\`

## Language Switching

Add language switching functionality:

\`\`\`javascript
function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('es')}>Español</button>
      <button onClick={() => changeLanguage('fr')}>Français</button>
    </div>
  );
}
\`\`\`

## Class Components

For class components, use the \`withTranslation\` HOC:

\`\`\`javascript
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class WelcomeClass extends Component {
  render() {
    const { t } = this.props;
    return <h1>{t('welcome')}</h1>;
  }
}

export default withTranslation()(WelcomeClass);
\`\`\``,
        isCompleted: false,
      },
      {
        id: "section-4",
        title: "Advanced Features",
        description:
          "Explore pluralization, namespaces, lazy loading, and advanced i18n features.",
        duration: "35 min",
        content: `# Advanced Features

## Pluralization

Handle singular and plural forms correctly:

\`\`\`json
{
  "apple": "{{count}} apple",
  "apple_plural": "{{count}} apples",
  "message": "You have {{count}} message",
  "message_plural": "You have {{count}} messages"
}
\`\`\`

\`\`\`javascript
function PluralizationExample() {
  const { t } = useTranslation();
  
  return (
    <div>
      <p>{t('apple', { count: 1 })}</p>  {/* "1 apple" */}
      <p>{t('apple', { count: 5 })}</p>  {/* "5 apples" */}
      <p>{t('message', { count: 0 })}</p> {/* "You have 0 messages" */}
    </div>
  );
}
\`\`\`

## Namespaces

Organize translations into multiple files:

\`\`\`javascript
// i18n/index.js
i18n.init({
  defaultNS: 'common',
  ns: ['common', 'auth', 'dashboard'],
  // ... other options
});
\`\`\`

\`\`\`javascript
// Using specific namespace
function AuthComponent() {
  const { t } = useTranslation('auth');
  
  return (
    <div>
      <h1>{t('login')}</h1>
      <p>{t('welcome_message')}</p>
    </div>
  );
}

// Using multiple namespaces
function DashboardComponent() {
  const { t } = useTranslation(['common', 'dashboard']);
  
  return (
    <div>
      <h1>{t('common:title')}</h1>
      <p>{t('dashboard:stats')}</p>
    </div>
  );
}
\`\`\`

## Lazy Loading

Load translations only when needed:

\`\`\`javascript
// i18n/index.js
i18n
  .use(Backend)
  .init({
    // ... other options
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    // Enable lazy loading
    load: 'languageOnly',
    // Load all namespaces for current language
    ns: ['common', 'auth', 'dashboard'],
    defaultNS: 'common',
  });
\`\`\`

## Interpolation and Formatting

Advanced interpolation with formatting:

\`\`\`json
{
  "price": "Price: {{price, currency}}",
  "date": "Date: {{date, date}}",
  "number": "Number: {{number, number}}"
}
\`\`\`

\`\`\`javascript
import { useTranslation } from 'react-i18next';

function FormattingExample() {
  const { t } = useTranslation();
  
  const price = 29.99;
  const date = new Date();
  const number = 1234.56;
  
  return (
    <div>
      <p>{t('price', { price })}</p>
      <p>{t('date', { date })}</p>
      <p>{t('number', { number })}</p>
    </div>
  );
}
\`\`\`

## Context and Gender

Handle context and gender-specific translations:

\`\`\`json
{
  "friend_male": "He is my friend",
  "friend_female": "She is my friend",
  "friend_other": "They are my friend"
}
\`\`\`

\`\`\`javascript
function ContextExample() {
  const { t } = useTranslation();
  
  return (
    <div>
      <p>{t('friend', { context: 'male' })}</p>
      <p>{t('friend', { context: 'female' })}</p>
    </div>
  );
}
\`\`\``,
        isCompleted: false,
      },
      {
        id: "section-5",
        title: "Best Practices and Tips",
        description:
          "Learn industry best practices for maintaining translation files and optimizing i18n performance.",
        duration: "25 min",
        content: `# Best Practices and Tips

## Translation Key Naming

Use a consistent naming convention for your translation keys:

\`\`\`json
{
  "pages": {
    "home": {
      "title": "Welcome Home",
      "subtitle": "Your dashboard"
    },
    "profile": {
      "title": "User Profile",
      "edit_button": "Edit Profile"
    }
  },
  "common": {
    "buttons": {
      "save": "Save",
      "cancel": "Cancel",
      "delete": "Delete"
    },
    "messages": {
      "success": "Operation completed successfully",
      "error": "An error occurred"
    }
  }
}
\`\`\`

## Translation Management

### 1. Use Translation Management Tools

Consider using tools like:
- **Lokalise**: Professional translation management
- **Crowdin**: Collaborative translation platform
- **Phrase**: Enterprise translation management
- **Weblate**: Open-source translation tool

### 2. Keep Translation Files Organized

\`\`\`
locales/
├── en/
│   ├── common.json
│   ├── auth.json
│   ├── dashboard.json
│   └── errors.json
├── es/
│   ├── common.json
│   ├── auth.json
│   ├── dashboard.json
│   └── errors.json
└── fr/
    ├── common.json
    ├── auth.json
    ├── dashboard.json
    └── errors.json
\`\`\`

## Performance Optimization

### 1. Lazy Load Translations

\`\`\`javascript
// Load translations only when needed
const loadTranslations = async (lng, ns) => {
  const translations = await import(\`./locales/\${lng}/\${ns}.json\`);
  i18n.addResourceBundle(lng, ns, translations.default);
};
\`\`\`

### 2. Use Suspense for Loading States

\`\`\`javascript
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      <MyComponent />
    </Suspense>
  );
}
\`\`\`

### 3. Memoize Translation Functions

\`\`\`javascript
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

function OptimizedComponent() {
  const { t } = useTranslation();
  
  const translatedText = useMemo(() => {
    return t('expensive_translation_key');
  }, [t]);
  
  return <div>{translatedText}</div>;
}
\`\`\`

## Testing Translations

### 1. Test Translation Loading

\`\`\`javascript
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/test-config';

test('renders translated text', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <MyComponent />
    </I18nextProvider>
  );
  
  expect(screen.getByText('Welcome to our app!')).toBeInTheDocument();
});
\`\`\`

### 2. Test Language Switching

\`\`\`javascript
test('switches language correctly', async () => {
  const { getByText } = render(<LanguageSwitcher />);
  
  fireEvent.click(getByText('Español'));
  
  await waitFor(() => {
    expect(getByText('¡Bienvenido a nuestra aplicación!')).toBeInTheDocument();
  });
});
\`\`\`

## Common Pitfalls to Avoid

### 1. Hardcoded Text
❌ **Don't do this:**
\`\`\`javascript
<h1>Welcome to our app!</h1>
\`\`\`

✅ **Do this:**
\`\`\`javascript
<h1>{t('welcome')}</h1>
\`\`\`

### 2. Inconsistent Key Naming
❌ **Don't do this:**
\`\`\`json
{
  "welcome": "Welcome",
  "welcomeMessage": "Welcome message",
  "WELCOME_TITLE": "Welcome Title"
}
\`\`\`

✅ **Do this:**
\`\`\`json
{
  "welcome": {
    "title": "Welcome",
    "message": "Welcome message"
  }
}
\`\`\`

### 3. Not Handling Missing Translations
\`\`\`javascript
// Add fallback for missing translations
i18n.init({
  // ... other options
  fallbackLng: 'en',
  saveMissing: true, // Save missing keys for translation
  missingKeyHandler: (lng, ns, key) => {
    console.warn(\`Missing translation: \${lng}.\${ns}.\${key}\`);
  },
});
\`\`\``,
        isCompleted: false,
      },
      {
        id: "section-6",
        title: "Hands-on Project",
        description:
          "Build a complete multilingual React application with all the features we've learned.",
        duration: "40 min",
        content: `# Hands-on Project: Multilingual Todo App

Let's build a complete multilingual Todo application that demonstrates all the i18n concepts we've learned.

## Project Setup

### 1. Create the Project Structure

\`\`\`
src/
├── components/
│   ├── TodoApp.js
│   ├── TodoList.js
│   ├── TodoItem.js
│   ├── AddTodo.js
│   └── LanguageSwitcher.js
├── i18n/
│   ├── index.js
│   └── locales/
│       ├── en/
│       │   └── translation.json
│       ├── es/
│       │   └── translation.json
│       └── fr/
│           └── translation.json
└── App.js
\`\`\`

### 2. Translation Files

**English (en/translation.json):**
\`\`\`json
{
  "app": {
    "title": "Todo App",
    "subtitle": "Manage your tasks efficiently"
  },
  "todo": {
    "add_placeholder": "Add a new todo...",
    "add_button": "Add Todo",
    "empty_list": "No todos yet. Add one above!",
    "completed": "completed",
    "pending": "pending",
    "delete": "Delete",
    "mark_complete": "Mark Complete",
    "mark_incomplete": "Mark Incomplete"
  },
  "filters": {
    "all": "All",
    "active": "Active",
    "completed": "Completed"
  },
  "stats": {
    "total": "Total: {{count}}",
    "completed": "Completed: {{count}}",
    "remaining": "Remaining: {{count}}"
  },
  "messages": {
    "todo_added": "Todo added successfully!",
    "todo_deleted": "Todo deleted!",
    "todo_updated": "Todo updated!"
  }
}
\`\`\`

**Spanish (es/translation.json):**
\`\`\`json
{
  "app": {
    "title": "Aplicación de Tareas",
    "subtitle": "Gestiona tus tareas de manera eficiente"
  },
  "todo": {
    "add_placeholder": "Agregar una nueva tarea...",
    "add_button": "Agregar Tarea",
    "empty_list": "No hay tareas aún. ¡Agrega una arriba!",
    "completed": "completada",
    "pending": "pendiente",
    "delete": "Eliminar",
    "mark_complete": "Marcar Completa",
    "mark_incomplete": "Marcar Incompleta"
  },
  "filters": {
    "all": "Todas",
    "active": "Activas",
    "completed": "Completadas"
  },
  "stats": {
    "total": "Total: {{count}}",
    "completed": "Completadas: {{count}}",
    "remaining": "Pendientes: {{count}}"
  },
  "messages": {
    "todo_added": "¡Tarea agregada exitosamente!",
    "todo_deleted": "¡Tarea eliminada!",
    "todo_updated": "¡Tarea actualizada!"
  }
}
\`\`\`

### 3. Main TodoApp Component

\`\`\`javascript
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import LanguageSwitcher from './LanguageSwitcher';
import './TodoApp.css';

function TodoApp() {
  const { t } = useTranslation();
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState('');

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    };
    setTodos([...todos, newTodo]);
    setMessage(t('messages.todo_added'));
    setTimeout(() => setMessage(''), 3000);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    setMessage(t('messages.todo_updated'));
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setMessage(t('messages.todo_deleted'));
    setTimeout(() => setMessage(''), 3000);
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const remaining = total - completed;
    return { total, completed, remaining };
  }, [todos]);

  return (
    <div className="todo-app">
      <header className="app-header">
        <h1>{t('app.title')}</h1>
        <p>{t('app.subtitle')}</p>
        <LanguageSwitcher />
      </header>

      {message && (
        <div className="message success">
          {message}
        </div>
      )}

      <AddTodo onAdd={addTodo} />

      <div className="filters">
        {['all', 'active', 'completed'].map(filterType => (
          <button
            key={filterType}
            className={filter === filterType ? 'active' : ''}
            onClick={() => setFilter(filterType)}
          >
            {t(\`filters.\${filterType}\`)}
          </button>
        ))}
      </div>

      <div className="stats">
        <span>{t('stats.total', { count: stats.total })}</span>
        <span>{t('stats.completed', { count: stats.completed })}</span>
        <span>{t('stats.remaining', { count: stats.remaining })}</span>
      </div>

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default TodoApp;
\`\`\`

### 4. TodoList Component

\`\`\`javascript
import React from 'react';
import { useTranslation } from 'react-i18next';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete }) {
  const { t } = useTranslation();

  if (todos.length === 0) {
    return (
      <div className="empty-list">
        <p>{t('todo.empty_list')}</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
\`\`\`

### 5. TodoItem Component

\`\`\`javascript
import React from 'react';
import { useTranslation } from 'react-i18next';

function TodoItem({ todo, onToggle, onDelete }) {
  const { t } = useTranslation();

  return (
    <div className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="todo-text">{todo.text}</span>
        <span className="todo-status">
          {t(\`todo.\${todo.completed ? 'completed' : 'pending'}\`)}
        </span>
      </div>
      <div className="todo-actions">
        <button
          className="toggle-btn"
          onClick={() => onToggle(todo.id)}
        >
          {t(todo.completed ? 'todo.mark_incomplete' : 'todo.mark_complete')}
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(todo.id)}
        >
          {t('todo.delete')}
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
\`\`\`

### 6. AddTodo Component

\`\`\`javascript
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function AddTodo({ onAdd }) {
  const { t } = useTranslation();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('todo.add_placeholder')}
        className="todo-input"
      />
      <button type="submit" className="add-button">
        {t('todo.add_button')}
      </button>
    </form>
  );
}

export default AddTodo;
\`\`\`

### 7. LanguageSwitcher Component

\`\`\`javascript
import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      {languages.map(lang => (
        <button
          key={lang.code}
          className={\`lang-btn \${i18n.language === lang.code ? 'active' : ''}\`}
          onClick={() => changeLanguage(lang.code)}
        >
          {lang.flag} {lang.name}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
\`\`\`

## CSS Styles

\`\`\`css
.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
}

.language-switcher {
  margin: 20px 0;
  text-align: center;
}

.lang-btn {
  margin: 0 5px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.lang-btn.active {
  background: #007bff;
  color: white;
}

.message {
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  text-align: center;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filters button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.filters button.active {
  background: #007bff;
  color: white;
}

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.todo-item.completed {
  opacity: 0.6;
  background: #f8f9fa;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.todo-text {
  flex: 1;
}

.todo-status {
  font-size: 0.9em;
  color: #666;
}

.todo-actions {
  display: flex;
  gap: 10px;
}

.toggle-btn, .delete-btn {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.9em;
}

.delete-btn {
  background: #dc3545;
  color: white;
  border-color: #dc3545;
}

.empty-list {
  text-align: center;
  padding: 40px;
  color: #666;
}
\`\`\`

## Testing the Application

1. **Start the development server:**
   \`\`\`bash
   npm start
   \`\`\`

2. **Test language switching:**
   - Click on different language buttons
   - Verify all text changes to the selected language
   - Check that the language preference is saved

3. **Test todo functionality:**
   - Add new todos in different languages
   - Toggle completion status
   - Delete todos
   - Test filtering (All, Active, Completed)

4. **Test pluralization:**
   - Add multiple todos and verify the stats show correct pluralization
   - Test with different numbers (0, 1, 2, 5+)

## Next Steps

- Add more languages
- Implement RTL support for Arabic/Hebrew
- Add date/time formatting
- Implement currency formatting
- Add more complex pluralization rules
- Integrate with a translation management service

This project demonstrates all the key concepts of React i18n and provides a solid foundation for building multilingual applications!`,
        isCompleted: false,
      },
    ],
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
  featured: boolean;
}

// Service interfaces
export interface Service {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown content
  icon: string;
  category: string;
  priceRange: string;
  duration: string;
  features: string[];
  technologies: string[];
  featured: boolean;
}

export const experiences: Experience[] = [
  {
    id: "building-scalable-go-apis",
    title: "Building Scalable Go APIs",
    description:
      "A deep dive into creating high-performance, scalable APIs using Go and modern development practices.",
    content: `# Building Scalable Go APIs

## Overview

In this experience, I'll share my journey of building high-performance APIs using Go, covering everything from basic HTTP handlers to advanced microservices architecture.

## Key Learnings

### 1. Go's Concurrency Model
Go's goroutines and channels make it incredibly easy to handle thousands of concurrent requests. The key is understanding how to properly manage goroutine pools and avoid goroutine leaks.

\`\`\`go
func handleRequests(requests <-chan Request) {
    for req := range requests {
        go func(r Request) {
            processRequest(r)
        }(req)
    }
}
\`\`\`

### 2. Database Optimization
- Connection pooling is crucial for performance
- Use prepared statements to prevent SQL injection
- Implement proper indexing strategies
- Consider read replicas for heavy read workloads

### 3. Caching Strategies
- Redis for session storage and frequently accessed data
- HTTP caching headers for static content
- Application-level caching for expensive computations

### 4. Monitoring and Observability
- Structured logging with correlation IDs
- Metrics collection with Prometheus
- Distributed tracing for microservices
- Health checks and graceful shutdowns

## Architecture Decisions

The API follows a clean architecture pattern with clear separation of concerns:

- **Handlers**: HTTP request/response handling
- **Services**: Business logic implementation
- **Repositories**: Data access layer
- **Models**: Domain entities and DTOs

## Performance Results

- **Throughput**: 50,000+ requests per second
- **Latency**: P99 under 10ms
- **Memory Usage**: Stable at 100MB under load
- **CPU Usage**: Efficient utilization with goroutines

## Lessons Learned

1. **Start Simple**: Begin with a monolithic approach, then extract services as needed
2. **Measure Everything**: You can't optimize what you don't measure
3. **Fail Fast**: Implement proper error handling and circuit breakers
4. **Document APIs**: Use OpenAPI/Swagger for better developer experience

## Next Steps

- Implement GraphQL for more flexible data fetching
- Add gRPC for internal service communication
- Explore service mesh with Istio
- Implement advanced caching with CDN integration

This experience taught me that Go's simplicity and performance make it an excellent choice for building scalable APIs. The key is to leverage its strengths while following best practices for maintainability and reliability.`,
    videoUrl: "https://www.youtube.com/embed/-vVQ9iI2CNU?si=OEmqBuHB5dfRp9gw",
    videoTitle: "Building Scalable Go APIs - Full Walkthrough",
    date: "2024-01-15",
    category: "Backend Development",
    tags: ["Go", "APIs", "Microservices", "Performance", "Scalability"],
    featured: true,
  },
  {
    id: "react-native-mobile-development",
    title: "React Native Mobile Development Journey",
    description:
      "From concept to production: building cross-platform mobile apps with React Native and best practices.",
    content: `# React Native Mobile Development Journey

## The Challenge

Building a cross-platform mobile application that works seamlessly on both iOS and Android while maintaining native performance and user experience.

## Development Process

### 1. Project Setup
- React Native CLI vs Expo
- Choosing the right navigation library
- State management with Redux Toolkit
- TypeScript integration

### 2. UI/UX Considerations
- Platform-specific design guidelines
- Responsive design for different screen sizes
- Accessibility implementation
- Dark mode support

### 3. Performance Optimization
- Image optimization and lazy loading
- List virtualization for large datasets
- Memory management
- Bundle size optimization

### 4. Native Integration
- Camera and photo library access
- Push notifications
- Biometric authentication
- Deep linking implementation

## Key Technologies Used

- **React Native 0.72+**
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **React Navigation** for navigation
- **React Query** for data fetching
- **Flipper** for debugging

## Challenges and Solutions

### Challenge 1: Platform Differences
**Problem**: iOS and Android handle certain features differently.
**Solution**: Created platform-specific implementations with shared business logic.

### Challenge 2: Performance Issues
**Problem**: App was slow on older devices.
**Solution**: Implemented lazy loading, image optimization, and reduced bundle size.

### Challenge 3: State Management Complexity
**Problem**: Complex state management across multiple screens.
**Solution**: Implemented Redux Toolkit with proper data normalization.

## Results

- **Development Time**: 40% faster than native development
- **Code Reuse**: 85% shared code between platforms
- **Performance**: 95% of native app performance
- **User Satisfaction**: 4.8/5 rating on app stores

## Lessons Learned

1. **Start with Expo**: For rapid prototyping and development
2. **Use TypeScript**: Essential for large-scale applications
3. **Test on Real Devices**: Emulators don't catch all issues
4. **Plan for Platform Differences**: Design with both platforms in mind
5. **Optimize Early**: Performance issues are harder to fix later

## Best Practices

- Use functional components with hooks
- Implement proper error boundaries
- Write comprehensive tests
- Follow platform-specific guidelines
- Use proper navigation patterns
- Implement proper loading states

This experience showed me that React Native is a powerful tool for cross-platform development when used correctly, but it requires careful planning and understanding of both React and native development concepts.`,
    videoUrl: "https://www.youtube.com/embed/kZQIbAEawp4?si=UvAdmSi1q08YlVyx",
    videoTitle: "React Native Development - Complete Guide",
    date: "2024-01-10",
    category: "Mobile Development",
    tags: [
      "React Native",
      "Mobile",
      "Cross-platform",
      "TypeScript",
      "Performance",
    ],
    featured: true,
  },
  {
    id: "microservices-architecture",
    title: "Microservices Architecture Implementation",
    description:
      "Designing and implementing a microservices architecture for a large-scale e-commerce platform.",
    content: `# Microservices Architecture Implementation

## Project Overview

Transforming a monolithic e-commerce application into a microservices architecture to improve scalability, maintainability, and team productivity.

## Architecture Design

### Service Decomposition
- **User Service**: Authentication and user management
- **Product Service**: Product catalog and inventory
- **Order Service**: Order processing and fulfillment
- **Payment Service**: Payment processing and billing
- **Notification Service**: Email and SMS notifications
- **API Gateway**: Request routing and authentication

### Technology Stack
- **Go** for high-performance services
- **PostgreSQL** for transactional data
- **Redis** for caching and session storage
- **RabbitMQ** for message queuing
- **Docker** for containerization
- **Kubernetes** for orchestration

## Implementation Challenges

### 1. Data Consistency
**Challenge**: Maintaining data consistency across services.
**Solution**: Implemented event-driven architecture with eventual consistency.

### 2. Service Communication
**Challenge**: Reliable communication between services.
**Solution**: Used message queues with retry mechanisms and circuit breakers.

### 3. Distributed Logging
**Challenge**: Tracking requests across multiple services.
**Solution**: Implemented distributed tracing with correlation IDs.

### 4. Service Discovery
**Challenge**: Dynamic service registration and discovery.
**Solution**: Used Consul for service discovery and health checks.

## Key Patterns Implemented

### 1. API Gateway Pattern
- Single entry point for all client requests
- Authentication and authorization
- Rate limiting and throttling
- Request/response transformation

### 2. Database per Service
- Each service owns its data
- No direct database access between services
- Data consistency through events

### 3. Event Sourcing
- Store events instead of current state
- Rebuild state from events
- Audit trail and debugging

### 4. CQRS (Command Query Responsibility Segregation)
- Separate read and write models
- Optimized for different use cases
- Better performance and scalability

## Monitoring and Observability

### Metrics Collection
- Prometheus for metrics collection
- Grafana for visualization
- Custom business metrics

### Logging
- Structured logging with ELK stack
- Correlation IDs for request tracking
- Centralized log aggregation

### Tracing
- Jaeger for distributed tracing
- Request flow visualization
- Performance bottleneck identification

## Results

- **Scalability**: 10x improvement in handling traffic spikes
- **Development Speed**: 3x faster feature development
- **Team Productivity**: Independent service development
- **Reliability**: 99.9% uptime with proper monitoring
- **Performance**: 50% reduction in response times

## Lessons Learned

1. **Start Small**: Don't try to migrate everything at once
2. **Design for Failure**: Implement proper error handling and circuit breakers
3. **Monitor Everything**: You can't manage what you don't measure
4. **Team Structure**: Organize teams around services
5. **Data Management**: Plan data migration and consistency carefully

## Best Practices

- Use API versioning from the start
- Implement proper health checks
- Design for horizontal scaling
- Use infrastructure as code
- Implement proper security measures
- Plan for data migration and rollback

This experience taught me that microservices are powerful but require careful planning, proper tooling, and a team that understands distributed systems concepts.`,
    videoUrl: "https://www.youtube.com/embed/RCDr3Am_-bQ?si=wEYosku4vzONZhgn",
    videoTitle: "Microservices Architecture - Complete Implementation",
    date: "2024-01-05",
    category: "Architecture",
    tags: ["Microservices", "Go", "Docker", "Kubernetes", "Architecture"],
    featured: false,
  },
];

export const services: Service[] = [
  {
    id: "custom-software-development",
    title: "Custom Software Development",
    description:
      "Build tailored software solutions using modern technologies like Go, React, and TypeScript.",
    content: `# Custom Software Development

## What I Offer

I specialize in building custom software solutions that are perfectly tailored to your business needs. Whether you need a web application, mobile app, or backend API, I can help you bring your ideas to life.

## Technologies I Work With

### Backend Development
- **Go**: High-performance APIs and microservices
- **Node.js**: JavaScript/TypeScript backend services
- **Python**: Data processing and machine learning applications
- **PostgreSQL**: Robust relational database design
- **Redis**: Caching and session management
- **Docker**: Containerization and deployment

### Frontend Development
- **React**: Modern, interactive user interfaces
- **TypeScript**: Type-safe development
- **Next.js**: Full-stack React applications
- **Tailwind CSS**: Utility-first styling
- **React Native**: Cross-platform mobile development

### DevOps & Infrastructure
- **AWS**: Cloud infrastructure and services
- **Docker**: Containerization
- **Kubernetes**: Container orchestration
- **CI/CD**: Automated deployment pipelines
- **Monitoring**: Application performance monitoring

## Development Process

### 1. Discovery & Planning
- Requirements gathering and analysis
- Technical architecture design
- Project timeline and milestone planning
- Technology stack selection

### 2. Design & Prototyping
- User experience (UX) design
- User interface (UI) mockups
- Technical architecture diagrams
- Proof of concept development

### 3. Development & Testing
- Agile development methodology
- Regular progress updates
- Comprehensive testing (unit, integration, e2e)
- Code reviews and quality assurance

### 4. Deployment & Maintenance
- Production deployment
- Performance optimization
- Ongoing maintenance and support
- Feature enhancements and updates

## What Makes Me Different

### 1. Full-Stack Expertise
I can handle both frontend and backend development, ensuring seamless integration between all parts of your application.

### 2. Modern Best Practices
I follow industry best practices for code quality, security, performance, and maintainability.

### 3. Scalable Architecture
I design systems that can grow with your business, from MVP to enterprise-scale applications.

### 4. Clear Communication
I provide regular updates and clear documentation throughout the development process.

## Project Types

### Web Applications
- E-commerce platforms
- Content management systems
- Business process automation
- Data visualization dashboards
- Real-time applications

### Mobile Applications
- Cross-platform mobile apps
- Native iOS/Android development
- Progressive web applications
- Mobile API development

### Backend Services
- RESTful APIs
- GraphQL endpoints
- Microservices architecture
- Database design and optimization
- Third-party integrations

## Pricing & Timeline

### Project-Based Pricing
- Fixed price for well-defined projects
- Milestone-based payments
- Transparent pricing with no hidden costs

### Hourly Consulting
- $150/hour for consulting and development
- Flexible engagement models
- Minimum 4-hour blocks

### Timeline
- **Small Projects**: 2-4 weeks
- **Medium Projects**: 1-3 months
- **Large Projects**: 3-6 months
- **Ongoing Support**: Available

## Getting Started

1. **Initial Consultation**: Free 30-minute discovery call
2. **Project Proposal**: Detailed scope and timeline
3. **Contract & Payment**: Clear terms and milestones
4. **Development**: Regular updates and communication
5. **Delivery**: Testing, deployment, and handover

## Recent Projects

### E-commerce Platform
Built a full-stack e-commerce platform with React frontend, Go backend, and PostgreSQL database. Features include user authentication, product catalog, shopping cart, payment processing, and admin dashboard.

### Mobile Banking App
Developed a React Native mobile app for a fintech startup with features like account management, money transfers, bill payments, and transaction history.

### API Integration Service
Created a microservices-based API integration platform that connects various third-party services with proper error handling, retry mechanisms, and monitoring.

Ready to start your project? Let's discuss your requirements and create something amazing together!`,
    icon: "💻",
    category: "Development",
    priceRange: "$5,000 - $50,000",
    duration: "2-6 months",
    features: [
      "Full-stack development",
      "Modern tech stack",
      "Scalable architecture",
      "Code quality assurance",
      "Ongoing support",
      "Documentation",
    ],
    technologies: ["Go", "React", "TypeScript", "PostgreSQL", "Docker", "AWS"],
    featured: true,
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    description:
      "Create beautiful, performant mobile applications for iOS and Android using React Native and native technologies.",
    content: `# Mobile App Development

## Cross-Platform Mobile Solutions

I specialize in creating mobile applications that work seamlessly across iOS and Android platforms, using React Native for maximum code reuse and native performance.

## Development Approach

### React Native Development
- **Single Codebase**: Write once, run on both platforms
- **Native Performance**: Access to native APIs and components
- **Hot Reloading**: Fast development and testing
- **TypeScript**: Type-safe development
- **Modern Hooks**: Functional components and hooks

### Native Development
- **iOS**: Swift and SwiftUI for native iOS apps
- **Android**: Kotlin and Jetpack Compose for native Android apps
- **Platform-Specific Features**: Camera, GPS, push notifications
- **App Store Optimization**: ASO and store compliance

## App Categories

### Business Applications
- Customer relationship management (CRM)
- Inventory management systems
- Field service applications
- Employee management tools
- Business process automation

### E-commerce & Retail
- Online shopping apps
- Product catalog applications
- Payment processing integration
- Inventory tracking
- Customer loyalty programs

### Social & Communication
- Chat applications
- Social media platforms
- Video calling apps
- Community forums
- Messaging services

### Productivity & Utilities
- Task management apps
- Note-taking applications
- File management tools
- Calendar and scheduling
- Utility applications

## Key Features I Implement

### User Interface
- Responsive design for all screen sizes
- Platform-specific UI guidelines
- Dark mode support
- Accessibility compliance
- Smooth animations and transitions

### Backend Integration
- RESTful API integration
- GraphQL endpoints
- Real-time data synchronization
- Offline functionality
- Data caching strategies

### Native Features
- Camera and photo library access
- GPS and location services
- Push notifications
- Biometric authentication
- Deep linking and URL schemes

### Performance Optimization
- Image optimization and lazy loading
- Memory management
- Bundle size optimization
- List virtualization
- Background task handling

## Development Process

### 1. Planning & Design
- Requirements analysis
- User experience (UX) design
- User interface (UI) mockups
- Technical architecture planning
- Platform-specific considerations

### 2. Development
- Cross-platform development with React Native
- Native module integration when needed
- API integration and data management
- State management implementation
- Testing and quality assurance

### 3. Testing & Optimization
- Device testing on multiple platforms
- Performance optimization
- Bug fixing and refinement
- User acceptance testing
- App store preparation

### 4. Deployment & Launch
- App store submission
- Beta testing programs
- Production deployment
- Performance monitoring
- Ongoing maintenance and updates

## Technologies & Tools

### Frontend
- **React Native**: Cross-platform development
- **TypeScript**: Type-safe development
- **Redux Toolkit**: State management
- **React Navigation**: Navigation library
- **React Query**: Data fetching and caching

### Backend Integration
- **REST APIs**: Standard API integration
- **GraphQL**: Flexible data fetching
- **WebSocket**: Real-time communication
- **Firebase**: Backend-as-a-Service
- **AWS**: Cloud services integration

### Development Tools
- **Expo**: Development and deployment platform
- **Flipper**: Mobile debugging
- **Detox**: End-to-end testing
- **Fastlane**: Automated deployment
- **CodePush**: Over-the-air updates

## App Store Optimization

### iOS App Store
- App Store Connect setup
- Metadata optimization
- Screenshot and preview creation
- Review and rating management
- App Store guidelines compliance

### Google Play Store
- Google Play Console setup
- Store listing optimization
- A/B testing for store listings
- Play Store policies compliance
- Release management

## Pricing & Packages

### Basic App Package
- **Price**: $10,000 - $25,000
- **Timeline**: 6-12 weeks
- **Features**: Standard UI, basic functionality, API integration
- **Platforms**: iOS and Android

### Premium App Package
- **Price**: $25,000 - $50,000
- **Timeline**: 12-20 weeks
- **Features**: Custom UI, advanced features, native integrations
- **Platforms**: iOS, Android, and web

### Enterprise App Package
- **Price**: $50,000+
- **Timeline**: 20+ weeks
- **Features**: Complex business logic, enterprise integrations, custom native modules
- **Platforms**: All platforms with custom requirements

## Ongoing Support

### Maintenance & Updates
- Bug fixes and performance improvements
- Feature enhancements
- OS compatibility updates
- Security updates
- Performance monitoring

### App Store Management
- Regular updates and releases
- Store listing optimization
- Review and rating management
- Analytics and reporting
- User feedback handling

Ready to build your mobile app? Let's discuss your requirements and create an app that your users will love!`,
    icon: "📱",
    category: "Mobile",
    priceRange: "$10,000 - $50,000",
    duration: "6-20 weeks",
    features: [
      "Cross-platform development",
      "Native performance",
      "App store optimization",
      "Push notifications",
      "Offline functionality",
      "Ongoing maintenance",
    ],
    technologies: [
      "React Native",
      "TypeScript",
      "iOS",
      "Android",
      "Firebase",
      "AWS",
    ],
    featured: true,
  },
  {
    id: "technical-consulting",
    title: "Technical Consulting",
    description:
      "Get expert advice on architecture, technology choices, and development best practices for your projects.",
    content: `# Technical Consulting

## Expert Guidance for Your Technology Decisions

I provide strategic technical consulting to help you make informed decisions about your technology stack, architecture, and development processes.

## Consulting Areas

### Architecture & System Design
- **Microservices vs Monolith**: Choosing the right architecture
- **Database Design**: Relational vs NoSQL, optimization strategies
- **API Design**: RESTful vs GraphQL, versioning strategies
- **Scalability Planning**: Performance optimization and scaling strategies
- **Security Architecture**: Authentication, authorization, and data protection

### Technology Stack Selection
- **Frontend Technologies**: React, Vue, Angular comparison
- **Backend Technologies**: Go, Node.js, Python, Java evaluation
- **Database Technologies**: PostgreSQL, MongoDB, Redis selection
- **Cloud Platforms**: AWS, Azure, GCP comparison
- **DevOps Tools**: Docker, Kubernetes, CI/CD pipeline design

### Development Process Optimization
- **Agile Methodologies**: Scrum, Kanban implementation
- **Code Quality**: Testing strategies, code review processes
- **DevOps Practices**: CI/CD, monitoring, deployment strategies
- **Team Structure**: Technical team organization and roles
- **Documentation**: Technical documentation best practices

## Consulting Services

### 1. Technical Architecture Review
- **Current State Analysis**: Evaluate existing systems and processes
- **Gap Analysis**: Identify areas for improvement
- **Recommendations**: Provide actionable improvement plans
- **Implementation Roadmap**: Step-by-step implementation guide

### 2. Technology Selection
- **Requirements Analysis**: Understand your specific needs
- **Technology Evaluation**: Compare different options
- **Proof of Concept**: Build small prototypes to validate choices
- **Migration Planning**: Plan technology transitions

### 3. Code Review & Quality Assessment
- **Code Quality Audit**: Review existing codebase
- **Best Practices**: Identify areas for improvement
- **Performance Analysis**: Identify bottlenecks and optimization opportunities
- **Security Review**: Assess security vulnerabilities

### 4. Team Training & Mentoring
- **Technical Training**: Train your team on new technologies
- **Code Review Sessions**: Improve code quality practices
- **Architecture Workshops**: Design system architecture together
- **Best Practices**: Implement development best practices

## Industries I Serve

### E-commerce & Retail
- Online marketplace architecture
- Payment processing systems
- Inventory management solutions
- Customer relationship management
- Supply chain optimization

### Fintech & Banking
- Financial application architecture
- Payment gateway integration
- Compliance and security
- Risk management systems
- Mobile banking solutions

### Healthcare & MedTech
- Electronic health records (EHR)
- Telemedicine platforms
- Medical device integration
- HIPAA compliance
- Patient data management

### SaaS & Enterprise
- Multi-tenant architecture
- Subscription management
- API monetization
- Enterprise integrations
- Scalability planning

## Consulting Process

### 1. Initial Discovery
- **Free Consultation**: 30-minute discovery call
- **Requirements Gathering**: Understand your challenges
- **Scope Definition**: Define consulting engagement
- **Proposal Creation**: Detailed consulting plan

### 2. Analysis & Assessment
- **Current State Review**: Analyze existing systems
- **Technology Audit**: Evaluate current tech stack
- **Process Review**: Assess development processes
- **Team Assessment**: Evaluate team capabilities

### 3. Recommendations & Planning
- **Solution Design**: Create technical solutions
- **Implementation Plan**: Detailed roadmap
- **Risk Assessment**: Identify potential challenges
- **Success Metrics**: Define success criteria

### 4. Implementation Support
- **Guided Implementation**: Support during execution
- **Regular Check-ins**: Progress monitoring
- **Problem Solving**: Address implementation challenges
- **Knowledge Transfer**: Ensure team understanding

## Deliverables

### Technical Documentation
- Architecture diagrams and specifications
- Technology comparison reports
- Implementation roadmaps
- Best practices guides
- Code review reports

### Presentations & Workshops
- Technical presentations to stakeholders
- Team training sessions
- Architecture workshops
- Best practices seminars
- Technology demos

### Code & Prototypes
- Proof of concept implementations
- Reference architectures
- Code examples and templates
- Migration scripts
- Testing frameworks

## Pricing & Engagement Models

### Hourly Consulting
- **Rate**: $200/hour
- **Minimum**: 4-hour blocks
- **Flexibility**: On-demand availability
- **Best For**: Specific technical questions

### Project-Based Consulting
- **Fixed Price**: Based on project scope
- **Timeline**: 2-8 weeks typically
- **Deliverables**: Defined outcomes
- **Best For**: Complete architecture reviews

### Retainer Consulting
- **Monthly Fee**: $5,000 - $15,000/month
- **Availability**: Regular check-ins and support
- **Ongoing Support**: Continuous guidance
- **Best For**: Long-term technical guidance

## Why Choose My Consulting Services

### 1. Real-World Experience
- 10+ years of hands-on development experience
- Experience with various industries and company sizes
- Proven track record of successful projects

### 2. Practical Approach
- Focus on practical, implementable solutions
- Consider your team's capabilities and constraints
- Balance ideal solutions with realistic timelines

### 3. Clear Communication
- Explain complex technical concepts clearly
- Provide actionable recommendations
- Regular updates and progress reports

### 4. Ongoing Support
- Available for follow-up questions
- Support during implementation
- Long-term relationship building

Ready to get expert technical guidance? Let's discuss your challenges and find the best solutions for your needs.`,
    icon: "🎯",
    category: "Consulting",
    priceRange: "$200/hour",
    duration: "Flexible",
    features: [
      "Architecture design",
      "Technology selection",
      "Code review",
      "Team training",
      "Process optimization",
      "Ongoing support",
    ],
    technologies: [
      "Architecture",
      "Go",
      "React",
      "AWS",
      "Docker",
      "Kubernetes",
    ],
    featured: false,
  },
];

// Skills interfaces
export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
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
      "Go",
      "React",
      "React Native",
      "JavaScript",
      "Node.js",
      "SQLite",
      "MySQL",
    ],
  },
  {
    id: "other-technologies",
    title: "Other Technologies",
    description: "Additional technologies and frameworks I work with",
    skills: ["SwiftUI", "Android", "MongoDB", "SpringBoot"],
  },
  {
    id: "archived-knowledge",
    title: "Archived Knowledge",
    description: "Deep knowledge in these areas, though not actively used",
    skills: ["C#", "PHP", "WordPress"],
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
