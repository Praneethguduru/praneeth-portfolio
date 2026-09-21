export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  github: string;
}

export const projects: Project[] = [
  {
    slug: "datapilot",
    title: "DataPilot",
    shortDescription:
      "An agentic system that turns natural-language questions into database insights.",
    description:
      "A multi-agent data analysis system that understands database schemas, generates SQL, validates queries, executes them and produces insights.",
    technologies: ["Python", "LangGraph", "MCP", "SQL"],
    github: "https://github.com/Praneethguduru/datapilot",
  },
  {
    slug: "veritas",
    title: "Veritas Corrective RAG",
    shortDescription:
      "A RAG system for answering questions using information retrieved from documents.",
    description:
      "A retrieval-augmented generation system that retrieves relevant document context before generating an answer.",
    technologies: ["Python", "FastAPI", "RAG", "Embeddings"],
    github: "https://github.com/Praneethguduru/veritas-corrective-rag",
  },
  {
    slug: "automl-engineer",
    title: "AutoMLEngineer",
    shortDescription:
      "An automated machine learning pipeline for data preparation, training and evaluation.",
    description:
      "A complete machine learning workflow covering data cleaning, exploratory analysis, feature engineering, model training, comparison and reporting.",
    technologies: ["Python", "Scikit-learn", "XGBoost", "Pandas"],
    github: "https://github.com/Praneethguduru/AutoMLEngineer",
  },
  {
    slug: "finance-llm",
    title: "Finance LLM Fine-tuning",
    shortDescription:
      "A fine-tuning experiment exploring how QLoRA adapts a language model to financial data.",
    description:
      "An experiment comparing a base language model with a QLoRA fine-tuned model using a financial instruction dataset.",
    technologies: ["Python", "QLoRA", "Transformers", "Hugging Face"],
    github: "https://github.com/Praneethguduru/finance-llm-finetuning",
  },
  {
    slug: "mental-health-chatbot",
    title: "Mental Health Chatbot",
    shortDescription:
      "A context-aware conversational AI system using retrieval-augmented generation.",
    description:
      "A conversational AI system designed to provide context-aware responses using retrieved information from mental-health dialogue data.",
    technologies: ["Python", "RAG", "LangChain", "Gemini"],
    github: "https://github.com/Praneethguduru/MentalHealthChatBot",
  },

  {
    slug: "heart-health-ai",
    title: "Heart Health AI",
    shortDescription:
      "A machine learning project focused on cardiovascular risk analysis.",
    description:
      "A machine learning system that analyzes selected health-related inputs and demonstrates how predictive models can be used for cardiovascular risk assessment.",
    technologies: ["Python", "Machine Learning", "Scikit-learn"],
    github: "https://github.com/Praneethguduru/HeartHealthAI",
  },

  {
    slug: "face-recognition-attendance",
    title: "Face Recognition Attendance",
    shortDescription:
      "A computer vision system for face recognition and attendance workflows.",
    description:
      "A computer vision application that detects faces, generates facial embeddings, and demonstrates an attendance workflow.",
    technologies: ["Python", "OpenCV", "Computer Vision"],
    github: "https://github.com/Praneethguduru/FaceRecognitionAttendance",
  },
];
