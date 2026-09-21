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
      "An agentic system that turns natural-language questions into database insights.",
    description:
      "A multi-agent data analysis system that understands database schemas, generates SQL, validates queries, executes them and produces insights.",
    technologies: ["Python", "LangGraph", "MCP", "SQL"],
    github: "https://github.com/Praneethguduru/datapilot",
    howItWorks: [
      {
        title: "Schema Introspection via MCP",
        description:
          "Connects to the database using the Model Context Protocol to extract table schemas, foreign key relationships, and column data types without exposing sensitive table contents.",
      },
      {
        title: "Intent Parsing & AST Construction",
        description:
          "Deconstructs natural-language questions into analytical requirements (aggregations, filters, groupings) and generates a preliminary SQL query tailored to dialect syntax.",
      },
      {
        title: "Query Validation & Safety Guardrails",
        description:
          "An agentic validator checks the query against syntax rules, confirms read-only constraints, and verifies join consistency before any statement touches the database engine.",
      },
      {
        title: "Execution & Insight Synthesis",
        description:
          "Executes approved queries, tabulates results, and prompts an analytical agent to translate raw numerical rows into natural, actionable business takeaways.",
      },
    ],
    implementationDetails:
      "Built with Python and LangGraph using stateful agent graphs. Uses the Model Context Protocol (MCP) for schema retrieval and safe database queries with automated validation loops.",
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
    howItWorks: [
      {
        title: "Query Classification & Retrieval Strategy",
        description:
          "Analyzes user questions to determine whether vector store documents suffice or if web search / query reformulation is required.",
      },
      {
        title: "HNSW Dense Vector Retrieval",
        description:
          "Performs approximate nearest neighbor search over 150+ indexed machine learning research papers with embedding caching, bringing retrieval latency down from 2.8s to 450ms.",
      },
      {
        title: "Self-Correction & Document Grading",
        description:
          "An evaluator agent grades retrieved text chunks for relevance and factual alignment, discarding irrelevant context to prevent hallucinations.",
      },
      {
        title: "Grounded Answer Generation & Citation",
        description:
          "Generates faithful answers referencing specific retrieved chunks, scoring high on factual correctness benchmarks (5/5 average evaluation).",
      },
    ],
    implementationDetails:
      "Engineered with FastAPI, ChromaDB, and Python. Utilizes an HNSW-indexed vector space with self-corrective retrieval loops and latency-optimized embedding caches.",
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
    howItWorks: [
      {
        title: "Automated Data Ingestion & Quality Audit",
        description:
          "Loads datasets and inspects missing values, skewed distributions, column types, and cardinality to produce an initial data health score.",
      },
      {
        title: "Adaptive Preprocessing & Feature Engineering",
        description:
          "Applies imputations, dynamic categorical encoding, numerical scaling, and automated feature selection tailored to regression or classification targets.",
      },
      {
        title: "Cross-Model Benchmark & RandomizedSearchCV",
        description:
          "Iteratively trains 8 classification and 10 regression algorithms (Random Forest, XGBoost, SVM, LightGBM) with hyperparameter search across k-fold cross-validation.",
      },
      {
        title: "Champion Model Selection & Diagnostic Reports",
        description:
          "Ranks candidate models by F1-score, accuracy, or RMSE, generating confusion matrices, ROC curves, and feature-importance charts for instant inspection.",
      },
    ],
    implementationDetails:
      "Implemented in Python with scikit-learn, XGBoost, and Pandas. Includes modular stages for automated ETL, parallelized cross-validation, and serialized artifact export.",
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
    howItWorks: [
      {
        title: "Dataset Cleaning & Financial Q&A Tokenization",
        description:
          "Curates instruction-formatted financial domain conversations, tokenizing question-answer pairs with domain-specific terminology.",
      },
      {
        title: "4-Bit NF4 Quantization & Base Model Freezing",
        description:
          "Loads the Qwen2-1.5B architecture in 4-bit NormalFloat precision via BitsAndBytes, freezing primary weights to fit in consumer GPU memory.",
      },
      {
        title: "Parameter-Efficient LoRA Adapter Training",
        description:
          "Injects trainable rank-decomposition matrices into query/value projection layers, fine-tuning only 4.6% of model parameters on an RTX 3050 4GB GPU.",
      },
      {
        title: "Perplexity Reduction & Evaluation",
        description:
          "Evaluates model outputs on financial comprehension tasks, reducing perplexity from 21.2 down to 6.6 with high retention of reasoning capabilities.",
      },
    ],
    implementationDetails:
      "Constructed using Hugging Face Transformers, PEFT, and BitsAndBytes. Explores parameter-efficient fine-tuning (PEFT) constraints on consumer GPU hardware.",
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
    howItWorks: [
      {
        title: "Sentiment & Emotional Tone Detection",
        description:
          "Analyzes incoming conversation turns to gauge sentiment, distress indicators, and user emotional context.",
      },
      {
        title: "Therapeutic Guidance Vector Retrieval",
        description:
          "Retrieves verified strategies, grounding exercises, and coping mechanisms from a vector index of mental-health dialogue resources.",
      },
      {
        title: "Safety Guardrails & Crisis Protocol",
        description:
          "Evaluates candidate responses through safety filters to prevent harmful advice and prioritize supportive, de-escalating communication.",
      },
      {
        title: "Empathetic Dialogue Generation with Gemini",
        description:
          "Synthesizes warm, context-aware responses using Gemini and LangChain prompts tailored to supportive conversation.",
      },
    ],
    implementationDetails:
      "Built with LangChain, Google Gemini, and Python. Integrates strict prompt constraints for safety and vector retrieval over verified supportive dialogue resources.",
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
    howItWorks: [
      {
        title: "Clinical Biomarker Normalization",
        description:
          "Standardizes health metrics including systolic blood pressure, cholesterol levels, fasting blood sugar, and resting heart rate.",
      },
      {
        title: "Cardiovascular Risk Factor Weighting",
        description:
          "Computes feature importance across clinical variables and maps non-linear correlations with cardiovascular disease markers.",
      },
      {
        title: "Ensemble Risk Classification",
        description:
          "Employs calibrated classification models trained on clinical datasets to compute risk category probabilities (Low, Moderate, Elevated).",
      },
      {
        title: "Interactive Metric Analysis & Insights",
        description:
          "Outputs an interpretable breakdown of risk factors, highlighting which individual biomarkers contribute most to the patient's predicted profile.",
      },
    ],
    implementationDetails:
      "Developed in Python with scikit-learn. Won 1st Place at Intelithon Hackathon (~300 participants) for predictive cardiovascular analysis.",
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
    howItWorks: [
      {
        title: "Video Stream Face Detection & Alignment",
        description:
          "Captures live camera frames, isolates facial regions using Haar Cascades / SSD detectors, and normalizes facial rotation and scale.",
      },
      {
        title: "Deep Facial Embedding Extraction",
        description:
          "Passes aligned facial crops through a neural embedding network to compute a high-dimensional feature vector invariant to slight pose and illumination changes.",
      },
      {
        title: "Euclidean Vector Similarity Matching",
        description:
          "Compares generated facial embeddings against enrolled identity vectors in the local database using thresholded cosine/Euclidean distance.",
      },
      {
        title: "Automated Attendance Verification & Logging",
        description:
          "Logs authenticated check-ins with timestamps and confidence scores into a structured ledger, preventing duplicate scans.",
      },
    ],
    implementationDetails:
      "Built with Python, OpenCV, and deep learning facial embeddings. Includes real-time frame processing, anti-spoofing heuristics, and automated check-in logging.",
  },
];
