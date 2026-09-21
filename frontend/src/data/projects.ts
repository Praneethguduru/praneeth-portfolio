export interface HowItWorksStep {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  github: string;
  howItWorks: HowItWorksStep[];
  implementationDetails?: string;
}

export const projects: Project[] = [
  {
    slug: "datapilot",
    title: "DataPilot",
    shortDescription:
      "Multi-agent natural language to SQL assistant built with LangGraph and Llama 3.3 70B.",
    description:
      "An agentic database assistant that converts plain-English questions into valid SQL queries, automatically executes them over SQLite databases, and summarizes key insights.",
    technologies: ["Python", "LangGraph", "Llama 3.3 70B", "MCP", "SQL"],
    github: "https://github.com/Praneethguduru/datapilot",
    howItWorks: [
      {
        title: "Natural Language Question Parsing",
        description:
          "Takes user questions in plain English and identifies the required table columns, metrics, and filters.",
      },
      {
        title: "Schema Introspection via MCP",
        description:
          "Uses Model Context Protocol (MCP) to inspect database schema structures and relationships safely without exposing raw data.",
      },
      {
        title: "SQL Generation & Safety Validation",
        description:
          "Automatically generates SQL queries and runs validation checks to ensure syntactical correctness and read-only execution.",
      },
      {
        title: "Execution & Business Insights",
        description:
          "Executes approved SQL queries against the database and translates the resulting rows into clear, conversational insights.",
      },
    ],
    implementationDetails:
      "Built with Python, LangGraph, and Llama 3.3 70B. Features stateful multi-agent graphs and MCP integration for safe, schema-aware SQL generation.",
  },
  {
    slug: "veritas",
    title: "Veritas Corrective RAG",
    shortDescription:
      "Self-correcting RAG system that grades document retrieval and rewrites queries to eliminate hallucinations.",
    description:
      "A retrieval-augmented generation system for research papers that evaluates retrieved text relevance, rewrites low-quality queries, and falls back to web search when document context is insufficient.",
    technologies: ["Python", "LangGraph", "FastAPI", "ChromaDB", "RAG"],
    github: "https://github.com/Praneethguduru/veritas-corrective-rag",
    howItWorks: [
      {
        title: "Dense Vector Document Search",
        description:
          "Performs fast vector similarity search over indexed research papers using ChromaDB to retrieve candidate context passages.",
      },
      {
        title: "Relevance & Correctness Grading",
        description:
          "Evaluates retrieved document chunks using an evaluator agent to filter out irrelevant or weak information.",
      },
      {
        title: "Query Reformulation & Fallback",
        description:
          "Automatically rewrites ambiguous search queries and triggers web search if indexed documents lack adequate answers.",
      },
      {
        title: "Grounded Answer Generation",
        description:
          "Synthesizes precise, hallucination-free answers backed by clear source citations.",
      },
    ],
    implementationDetails:
      "Built using Python, LangGraph, FastAPI, and ChromaDB. Combines HNSW vector search with corrective evaluation loops to achieve low latency (450ms) and factual reliability.",
  },
  {
    slug: "automl-engineer",
    title: "AutoMLEngineer",
    shortDescription:
      "Multi-agent automated machine learning pipeline that acts like an autonomous ML engineer.",
    description:
      "An automated end-to-end machine learning system that ingests datasets, cleans data, performs feature engineering, trains multiple candidate models, and selects the best model.",
    technologies: ["Python", "Scikit-Learn", "XGBoost", "LightGBM", "Pandas"],
    github: "https://github.com/Praneethguduru/AutoMLEngineer",
    howItWorks: [
      {
        title: "Data Quality & Health Audit",
        description:
          "Ingests tabular datasets, identifies missing values, detects column cardinality, and generates a data health audit report.",
      },
      {
        title: "Automated Feature Preprocessing",
        description:
          "Handles missing value imputations, categorical encoding, feature scaling, and automated feature selection.",
      },
      {
        title: "Cross-Model Benchmark & Tuning",
        description:
          "Trains multiple algorithms (XGBoost, Random Forest, SVM, LightGBM) and optimizes parameters using RandomizedSearchCV.",
      },
      {
        title: "Champion Model Selection & Reporting",
        description:
          "Evaluates models on cross-validation metrics (F1-score, Accuracy, RMSE) and generates confusion matrices and performance reports.",
      },
    ],
    implementationDetails:
      "Developed in Python using Scikit-Learn, XGBoost, and Pandas. Structures ML workflows into modular agents for automated ETL, model comparison, and report generation.",
  },
  {
    slug: "finance-llm",
    title: "Finance LLM",
    shortDescription:
      "Qwen2-1.5B model fine-tuned on financial Q&A data using 4-bit QLoRA.",
    description:
      "A fine-tuned language model adapted specifically for financial reasoning and Q&A, achieving a 3.2x perplexity reduction while running on consumer GPU hardware.",
    technologies: ["Python", "PyTorch", "Hugging Face", "QLoRA", "LoRA"],
    github: "https://github.com/Praneethguduru/finance-llm-finetuning",
    howItWorks: [
      {
        title: "Financial Dataset Preparation",
        description:
          "Curates and formats financial Q&A conversations into instruction-tuning datasets with domain terminology.",
      },
      {
        title: "4-Bit Quantization & Memory Optimization",
        description:
          "Loads base model weights in 4-bit NormalFloat precision via BitsAndBytes to operate efficiently within consumer GPU memory.",
      },
      {
        title: "QLoRA Adapter Fine-Tuning",
        description:
          "Trains low-rank adapter matrices attached to key attention layers, fine-tuning only 4.6% of total parameters on a 4GB GPU.",
      },
      {
        title: "Model Evaluation & Perplexity Benchmark",
        description:
          "Evaluates fine-tuned outputs, dropping perplexity from 21.2 to 6.6 and boosting ROUGE-L score from 0.148 to 0.341.",
      },
    ],
    implementationDetails:
      "Constructed using PyTorch, Hugging Face Transformers, and BitsAndBytes. Demonstrates domain adaptation of LLMs under strict hardware constraints.",
  },
  {
    slug: "mental-health-chatbot",
    title: "Mental Health Chatbot",
    shortDescription:
      "AI support assistant that listents to your voice/text and adapts its tone based on your feelings.",
    description:
      "An empathetic conversational AI chatbot trained on clinical conversation data that provides context-aware guidance and soothing responses grounded in supportive dialogue resources.",
    technologies: ["Python", "LangChain", "RAG", "Gemini", "OpenAI"],
    github: "https://github.com/Praneethguduru/MentalHealthChatBot",
    howItWorks: [
      {
        title: "Emotional Tone & Sentiment Analysis",
        description:
          "Analyzes incoming user messages and audio inputs to detect sentiment, distress levels, and emotional state.",
      },
      {
        title: "Supportive Vector Resource Retrieval",
        description:
          "Searches a vector database of clinical conversation guidelines and grounding exercises for appropriate strategies.",
      },
      {
        title: "Safety & Crisis Guardrails",
        description:
          "Filters candidate responses against strict safety constraints to ensure helpful, de-escalating dialogue.",
      },
      {
        title: "Empathetic Response Generation",
        description:
          "Generates comforting, personalized conversational responses tailored to the user's feelings.",
      },
    ],
    implementationDetails:
      "Built with Python, LangChain, and Google Gemini. Uses retrieval-augmented generation over clinical conversation data to deliver grounded emotional support.",
  },
  {
    slug: "heart-health-ai",
    title: "Heart Health AI",
    shortDescription:
      "Predictive cardiovascular risk assessment system trained on clinical indicators.",
    description:
      "A machine learning application that analyzes clinical indicators (blood pressure, cholesterol, heart rate, age) to predict cardiovascular disease risk categories.",
    technologies: ["Python", "Scikit-Learn", "Machine Learning", "Pandas"],
    github: "https://github.com/Praneethguduru/HeartHealthAI",
    howItWorks: [
      {
        title: "Clinical Indicator Preprocessing",
        description:
          "Normalizes patient physiological metrics such as blood pressure, cholesterol, resting heart rate, and age.",
      },
      {
        title: "Feature Correlation Analysis",
        description:
          "Measures feature importances and maps non-linear correlations with cardiovascular risk markers.",
      },
      {
        title: "Ensemble Risk Classification",
        description:
          "Employs machine learning algorithms (Random Forest, Logistic Regression) to calculate overall risk probabilities.",
      },
      {
        title: "Interpretable Risk Assessment",
        description:
          "Generates a user-friendly report explaining key risk factors and biomarker contributions.",
      },
    ],
    implementationDetails:
      "Developed in Python with Scikit-Learn and Pandas. Processes clinical health indicator datasets to provide transparent predictive risk evaluation.",
  },
  {
    slug: "face-recognition-attendance",
    title: "Face Recognition Attendance",
    shortDescription:
      "Real-time computer vision identity verification and automated attendance system.",
    description:
      "A computer vision system that captures camera video feeds, extracts facial embeddings, matches identities against registered records, and logs attendance automatically.",
    technologies: ["Python", "OpenCV", "Computer Vision", "Facial Embeddings"],
    github: "https://github.com/Praneethguduru/FaceRecognitionAttendance",
    howItWorks: [
      {
        title: "Real-Time Face Detection & Alignment",
        description:
          "Processes incoming video frames to detect facial bounding boxes and align facial landmarks.",
      },
      {
        title: "Deep Facial Embedding Extraction",
        description:
          "Generates high-dimensional vector representations invariant to lighting and minor angle changes.",
      },
      {
        title: "Vector Similarity Matching",
        description:
          "Compares extracted facial embeddings against enrolled user profiles using cosine and Euclidean distance thresholds.",
      },
      {
        title: "Automated Attendance Logging",
        description:
          "Records authenticated user check-ins with timestamps and confidence scores into an attendance roster.",
      },
    ],
    implementationDetails:
      "Built using Python and OpenCV. Features real-time frame processing, anti-spoofing checks, and automated attendance record management.",
  },
];
