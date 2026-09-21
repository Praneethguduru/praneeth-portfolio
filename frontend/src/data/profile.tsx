export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface EducationInfo {
  degree: string;
  university: string;
  period: string;
  cgpa: string;
  location: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export const profile = {
  name: "Guduru Praneeth",

  title: "AI / ML Engineer",

  location: "Hyderabad, Telangana, India",

  phone: "+91 7075101590",

  education: {
    degree: "B.Tech in Computer Science & Engineering (AI & ML)",
    university: "Malla Reddy University",
    period: "2022 — 2026",
    cgpa: "8.84 / 10",
    location: "Hyderabad, India",
  },

  summary:
    "B.Tech Computer Science (AI & ML) graduate experienced in building end-to-end AI systems across RAG pipelines, LLM fine-tuning, agentic AI, and classical machine learning. Skilled in Python, LangGraph, FastAPI, PyTorch, and scikit-learn, with hands-on experience developing and evaluating AI solutions for real-world applications.",

  skillCategories: [
    {
      category: "Languages & Core",
      items: ["Python", "SQL", "Java (Basics)"],
    },
    {
      category: "Generative AI",
      items: [
        "RAG",
        "LLMs",
        "LangChain",
        "LangGraph",
        "LLM Fine-tuning (LoRA/QLoRA)",
        "Prompt Engineering",
      ],
    },
    {
      category: "Machine Learning",
      items: ["PyTorch", "Scikit-learn", "Computer Vision", "PCA", "SVM"],
    },
    {
      category: "Tools & Deployment",
      items: [
        "FastAPI",
        "Streamlit",
        "ChromaDB",
        "Hugging Face",
        "AWS",
        "Git",
        "Docker (Basics)",
      ],
    },
  ] as SkillCategory[],

  skills: [
    "Python",
    "SQL",
    "RAG",
    "LangChain",
    "LangGraph",
    "LLMs",
    "Fine-Tuning (LoRA/QLoRA)",
    "PyTorch",
    "Scikit-learn",
    "Computer Vision",
    "FastAPI",
    "ChromaDB",
    "Hugging Face",
    "AWS",
  ],

  links: {
    github: "https://github.com/Praneethguduru",
    linkedin: "https://www.linkedin.com/in/praneethguduru/",
    email: "praneeth200410@gmail.com",
  },

  experience: [
    {
      company: "Retearn Technologies Private Limited",
      role: "AI / ML Intern",
      period: "Aug 2025 – Oct 2025",
      location: "Hyderabad, India",
      description:
        "Worked on computer vision workflows involving image validation, NIR imaging, dataset preparation, annotation, and material classification.",
      highlights: [
        "Built image classification model using PCA and SVM to identify waste types from near-infrared (NIR) images.",
        "Achieved 89.2% accuracy by optimizing model parameters on 2,100+ images per class.",
        "Used cross-validation and evaluation metrics (precision, recall, F1-score) to ensure model reliability.",
        "Annotated around 10,000 images for data preparation.",
      ],
    },
  ] as ExperienceItem[],

  certifications: [
    "RAG for Enhanced AI Outputs — IBM",
    "Model Context Protocol (MCP) — Anthropic",
    "AWS Cloud Practitioner Essentials — AWS",
    "Introduction To Machine Learning — Coursera",
    "AI Fluency: Framework & Foundations — Anthropic",
  ],

  achievements: [
    "1st Place, Intelithon Hackathon (~300 participants) for building HeartHealthAI predictive cardiovascular risk system.",
  ],
};
