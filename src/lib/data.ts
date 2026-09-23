export const SITE = {
  name: "Luis Filipe Crivellaro",
  role: "Software Engineer | AI & Automation",
  headline: "Turning ideas into software, automation and intelligent systems.",
  email: "lipecrivellaro468@gmail.com",
  github: "https://github.com/LuisCrivellaro",
  linkedin: "https://www.linkedin.com/in/luis-crivellaro/",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const ABOUT = {
  paragraphs: [
    "I'm a Software Engineering student at FIAP, building a career at the intersection of software development, automation and artificial intelligence.",
    "My work is hands-on: designing AI agents, wiring automated workflows and integrating the APIs and tools that let processes run with less manual effort.",
  ],
  focus: [
    "AI agent development",
    "Workflow automation with n8n",
    "API integration",
    "Process automation",
  ],
  stack: ["JavaScript", "SQL", "Git", "GitHub", "Power BI"],
} as const;

export const EXPERIENCE = {
  company: "ScaleUp",
  role: "Automation & Artificial Intelligence Intern",
  period: "March 2025 — October 2025",
  points: [
    "Development of custom AI agents for companies",
    "Creation of automated workflows using n8n",
    "Integration of APIs and external tools",
    "Automation of operational processes",
    "Implementation of solutions to reduce manual work",
    "Application of AI across different business contexts",
  ],
} as const;

export type Project = {
  id: string;
  index: string;
  name: string;
  description: string;
  tags: readonly string[];
  href?: string;
  visual: "ngo" | "ecopiso" | "agent" | "gsfront";
};

export const PROJECTS: readonly Project[] = [
  {
    id: "ngo-system",
    index: "01",
    name: "Institutional System for NGO",
    description:
      "Development of a system for organizing internal information, with features focused on institutional data management and process improvement.",
    tags: ["Web Platform"],
    href: "https://cp1-front-web.vercel.app/",
    visual: "ngo",
  },
  {
    id: "ecopiso",
    index: "02",
    name: "EcoPiso — Sustainable Energy Generator",
    description:
      "Prototype focused on clean energy generation, including an interface for visualizing energy data.",
    tags: ["Prototype", "Energy Data"],
    visual: "ecopiso",
  },
  {
    id: "ai-agent-automation",
    index: "03",
    name: "AI Agent & Automation",
    description:
      "Development of an AI agent for process automation, with automated workflows built in n8n, API integrations and AI-powered automation.",
    tags: ["n8n", "AI", "APIs"],
    visual: "agent",
  },
  {
    id: "gs-front",
    index: "04",
    name: "GS Front",
    description: "A front-end web project built and deployed as part of academic coursework.",
    tags: ["Web Platform"],
    href: "https://gs-front-drab.vercel.app/",
    visual: "gsfront",
  },
] as const;

export const SKILLS = {
  Development: ["JavaScript", "HTML", "CSS", "SQL"],
  "AI & Automation": ["AI Agents", "n8n", "API Integration", "Process Automation"],
  Tools: ["Git", "GitHub", "Power BI"],
} as const;
