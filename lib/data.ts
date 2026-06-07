import { AboutData, ExperienceItem, ProjectItem, SkillCategory } from '../types';

export const fallbackAboutData: AboutData = {
  name: "Santhosh S",
  title: "Software Developer",
  summary: "Software Developer with 2+ years of experience in React.js, Next.js, Angular, TypeScript, and WebSockets. Eager to solve complex challenges and build visually stunning, performant web applications.",
  email: "santhoshpy0209@gmail.com",
  phone: "+91 90807 06050",
  linkedIn: "https://linkedin.com/in/santhosh-s-8700421b9",
  dob: "23-02-2002",
  location: "Erode, Tamil Nadu",
  education: [
    {
      degree: "B.E. Computer Science",
      institution: "Nandha College of Technology",
      period: "2019–2023",
      details: "CGPA 8.1"
    }
  ],
  certifications: [
    { name: "Core Python Programming", issuer: "Nurture InfoTech" },
    { name: "Responsive Web Design", issuer: "freeCodeCamp" }
  ],
  publications: [
    {
      title: "One Pass Packet Steering in Software Defined Data Centers",
      journal: "IJETMS",
      date: "May 2023"
    }
  ],
  interests: ["Football", "Browsing", "Typing"],
  awards: ["Zone Level Ball Badminton Runner-Up"],
  languages: ["English", "Tamil"]
};

export const fallbackExperienceData: ExperienceItem[] = [
  {
    company: "Syncfusion",
    role: "Software Developer III",
    period: "Feb 2024 – Present",
    location: "Chennai, Tamil Nadu",
    projects: [
      {
        name: "BoldAI Agent",
        points: [
          "Developed scalable UI components using Next.js and Tailwind CSS with lazy loading optimizations.",
          "Built and integrated REST APIs to handle complex AI chat flows and agent versioning.",
          "Designed and delivered an embeddable JS widget allowing external platforms to integrate the AI agent.",
          "Leveraged Chrome DevTools extensively for runtime profiling, memory leak detection, and CPU usage optimization.",
          "Worked in a fast-paced Agile/Scrum environment with daily standups and sprint planning."
        ]
      },
      {
        name: "BoldChat",
        points: [
          "Engineered high-performance real-time messaging features using Angular, TypeScript, and WebSockets.",
          "Implemented robust REST API integrations for history loading, user status syncing, and file sharing.",
          "Optimized UI/UX rendering pipelines, significantly reducing message-delivery lag and rendering times."
        ]
      }
    ]
  }
];

export const fallbackProjectsData: ProjectItem[] = [
  {
    id: "corporate-employee-attrition",
    title: "Corporate Employee Attrition (IBM)",
    period: "Oct 2022 – Apr 2023",
    tags: ["Data Analysis", "IBM", "HR Analytics"],
    description: "Analyzed employee attrition factors using IBM HR datasets to identify top churn indicators and predict turnover.",
    points: [
      "Performed thorough exploratory data analysis (EDA) to map key retention statistics and correlation factors.",
      "Engineered predictive machine learning models to forecast employee attrition with high accuracy.",
      "Generated actionable visualizations and insight reports for HR department decision-making."
    ],
    status: "Completed"
  },
  {
    id: "ai-portfolio-assistant",
    title: "AI Portfolio Assistant",
    period: "Future",
    tags: ["Next.js", "AI", "OpenRouter"],
    description: "An intelligent chatbot assistant integrated directly into this portfolio using Next.js, Framer Motion, and open-source LLMs.",
    points: [
      "Will support natural language query parsing about skills and work history.",
      "Will use server-sent events for streaming token responses."
    ],
    status: "Coming Soon"
  },
  {
    id: "realtime-analytics-dashboard",
    title: "Real-time Analytics Dashboard",
    period: "Future",
    tags: ["Angular", "WebSockets", "RxJS"],
    description: "A high-performance live charting dashboard fed by real-time WebSocket connections.",
    points: [
      "Will feature highly customizable widget dashboards.",
      "Will optimize DOM painting using Angular's change detection strategies."
    ],
    status: "Coming Soon"
  }
];

export const fallbackSkillsData: SkillCategory[] = [
  {
    name: "Frontend Technologies",
    skills: ["React.js", "Next.js", "Angular", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"]
  },
  {
    name: "Backend & APIs",
    skills: ["C#", "ASP.NET Core", "REST APIs", "Node.js (basic)"]
  },
  {
    name: "Real-time & Tooling",
    skills: ["WebSockets", "Git / GitHub", "Chrome DevTools", "Agile / Scrum"]
  }
];
