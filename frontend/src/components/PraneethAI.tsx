import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Cat,
  X,
  FolderGit2,
  Cpu,
  GraduationCap,
  FileText,
  Mail,
  User,
  RotateCcw,
  MessageSquare,
} from "lucide-react";
import { profile } from "../data/profile";

type TopicId = "about" | "projects" | "skills" | "education" | "resume" | "contact";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  topic?: TopicId;
  actions?: {
    label: string;
    path?: string;
    url?: string;
    isDownload?: boolean;
  }[];
}

interface PromptOption {
  id: TopicId;
  label: string;
  prompt: string;
  icon: typeof User;
}

const PROMPT_OPTIONS: PromptOption[] = [
  {
    id: "about",
    label: "About Praneeth",
    prompt: "Who is Praneeth and what does he specialize in?",
    icon: User,
  },
  {
    id: "projects",
    label: "Featured Projects",
    prompt: "Show me Praneeth's AI and ML projects",
    icon: FolderGit2,
  },
  {
    id: "skills",
    label: "Skills & Stack",
    prompt: "What technologies and frameworks does he use?",
    icon: Cpu,
  },
  {
    id: "education",
    label: "Education & Degree",
    prompt: "Tell me about his degree and background",
    icon: GraduationCap,
  },
  {
    id: "resume",
    label: "View Resume",
    prompt: "Where can I view or download his resume?",
    icon: FileText,
  },
  {
    id: "contact",
    label: "Get in Touch",
    prompt: "How can I contact Praneeth?",
    icon: Mail,
  },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "init-1",
    sender: "bot",
    text: "Hi! I'm Milo, Praneeth's portfolio assistant. What would you like to explore about his work?",
  },
];

let msgIdCounter = 0;
function generateId(): string {
  msgIdCounter += 1;
  return `milo-${Date.now()}-${msgIdCounter}`;
}

export default function PraneethAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleSelectPrompt = (option: PromptOption) => {
    if (isTyping) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      sender: "user",
      text: option.prompt,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let botResponse: ChatMessage;

      switch (option.id) {
        case "about":
          botResponse = {
            id: generateId(),
            sender: "bot",
            text: `Praneeth is an AI / ML Engineer based in Hyderabad. He builds practical generative AI, RAG pipelines, LLM fine-tuning workflows (LoRA/QLoRA), and computer vision systems. He specializes in turning cutting-edge AI research into production-grade systems.`,
            actions: [
              { label: "Explore Projects →", path: "/projects" },
              { label: "Contact Him →", path: "/contact" },
            ],
          };
          break;

        case "projects":
          botResponse = {
            id: generateId(),
            sender: "bot",
            topic: "projects",
            text: `Praneeth has built 7 interactive AI/ML systems! Here are a few key highlights:
• DataPilot — Multi-agent system converting natural language to SQL queries via MCP.
• Veritas — Self-correcting RAG pipeline over ML papers with 450ms retrieval latency.
• Finance LLM — Qwen2-1.5B fine-tuned with QLoRA, dropping perplexity from 21.2 to 6.6.
• AutoMLEngineer — Automated end-to-end ML pipeline with RandomizedSearchCV.

Click below to explore any project's architecture or interactive demo!`,
            actions: [
              { label: "DataPilot (Multi-Agent SQL)", path: "/projects/datapilot" },
              { label: "Veritas (Corrective RAG)", path: "/projects/veritas" },
              { label: "AutoMLEngineer", path: "/projects/automl-engineer" },
              { label: "Finance LLM", path: "/projects/finance-llm" },
              { label: "View All 7 Projects →", path: "/projects" },
            ],
          };
          break;

        case "skills":
          botResponse = {
            id: generateId(),
            sender: "bot",
            topic: "skills",
            text: `Here is a breakdown of his technical toolkit:
• Generative AI: LangChain, LangGraph, RAG, LLM Fine-Tuning (LoRA/QLoRA), Prompt Engineering
• Core Languages: Python, SQL, Java (Basics)
• Machine Learning: PyTorch, Scikit-learn, Computer Vision, PCA, SVM
• Tools & Cloud: FastAPI, ChromaDB, Hugging Face, AWS, Streamlit, Docker`,
            actions: [
              { label: "View Resume with Full Stack →", path: "/resume" },
            ],
          };
          break;

        case "education":
          botResponse = {
            id: generateId(),
            sender: "bot",
            topic: "education",
            text: `Praneeth is pursuing his B.Tech in Computer Science & Engineering (AI & ML) at Malla Reddy University (2022–2026) with an 8.84 / 10 CGPA.

Certifications:
• Anthropic — Model Context Protocol (MCP) & AI Fluency
• IBM — RAG for Enhanced AI Outputs
• AWS — Cloud Practitioner Essentials
• Coursera — Introduction to Machine Learning`,
            actions: [
              { label: "View Full Resume →", path: "/resume" },
            ],
          };
          break;

        case "resume":
          botResponse = {
            id: generateId(),
            sender: "bot",
            text: `You can check out his complete resume directly on the dedicated resume page or download the PDF copy anytime!`,
            actions: [
              { label: "Open Resume Page →", path: "/resume" },
              {
                label: "Download resume.pdf ↗",
                url: "/resume.pdf",
                isDownload: true,
              },
            ],
          };
          break;

        case "contact":
          botResponse = {
            id: generateId(),
            sender: "bot",
            text: `You can reach Praneeth directly:
📧 Email: praneeth200410@gmail.com
📍 Location: Hyderabad, Telangana, India
🔗 LinkedIn: linkedin.com/in/praneethguduru
💻 GitHub: github.com/Praneethguduru`,
            actions: [
              { label: "Visit Contact Page →", path: "/contact" },
              {
                label: "Send Email (mailto) ↗",
                url: `mailto:${profile.links.email}`,
              },
            ],
          };
          break;

        default:
          botResponse = {
            id: generateId(),
            sender: "bot",
            text: "Feel free to pick any topic below to learn more.",
          };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 450);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <aside
      aria-label='Portfolio Assistant'
      className='fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden'
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className='mb-3 flex max-h-[82vh] w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white text-neutral-900 shadow-2xl shadow-neutral-900/10 sm:w-[420px]'
          >
            {/* Widget Header */}
            <div className='flex items-center justify-between border-b border-neutral-200 bg-neutral-900 px-5 py-3.5 text-white'>
              <div className='flex items-center gap-3'>
                <div className='relative flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-white ring-1 ring-neutral-700'>
                  <Cat size={18} strokeWidth={2} />
                  <span
                    className='absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-neutral-900 bg-emerald-400'
                    title='Milo is online'
                  />
                </div>
                <div>
                  <div className='flex items-center gap-1.5'>
                    <h2 className='text-sm font-semibold tracking-wide'>
                      Milo 🐾
                    </h2>
                    <span className='rounded-full bg-neutral-800 px-2 py-0.5 text-[10px] font-medium text-neutral-300'>
                      Assistant
                    </span>
                  </div>
                  <p className='text-[11px] text-neutral-400'>
                    Ask me about Praneeth's projects & skills
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-1'>
                <button
                  type='button'
                  onClick={handleResetChat}
                  className='rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-800 hover:text-white'
                  title='Restart conversation'
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  type='button'
                  onClick={() => setIsOpen(false)}
                  className='rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-800 hover:text-white'
                  aria-label='Close assistant'
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Chat Messages Stream */}
            <div
              ref={chatContainerRef}
              className='flex-1 space-y-3.5 overflow-y-auto p-4 text-sm leading-relaxed'
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className='mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white shadow-xs'>
                      <Cat size={14} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm ${
                      msg.sender === "user"
                        ? "bg-neutral-900 text-white shadow-xs rounded-br-xs"
                        : "border border-neutral-200 bg-neutral-50 text-neutral-800 shadow-xs rounded-bl-xs"
                    }`}
                  >
                    <p className='whitespace-pre-line leading-relaxed'>
                      {msg.text}
                    </p>

                    {/* Action buttons inside bot messages */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className='mt-3 flex flex-wrap gap-1.5 border-t border-neutral-200/60 pt-2.5'>
                        {msg.actions.map((act, idx) =>
                          act.path ? (
                            <button
                              key={idx}
                              type='button'
                              onClick={() => handleNavigate(act.path!)}
                              className='inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-800 transition hover:border-neutral-900 hover:bg-neutral-900 hover:text-white'
                            >
                              <span>{act.label}</span>
                            </button>
                          ) : (
                            <a
                              key={idx}
                              href={act.url}
                              target='_blank'
                              rel='noreferrer'
                              download={act.isDownload ? "Guduru_Praneeth_Resume.pdf" : undefined}
                              className='inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-800 transition hover:border-neutral-900 hover:bg-neutral-900 hover:text-white'
                            >
                              <span>{act.label}</span>
                            </a>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className='flex items-center gap-2 text-xs text-neutral-400 pl-9'>
                  <span className='inline-block animate-pulse'>Milo is writing...</span>
                </div>
              )}
            </div>

            {/* Quick Prompt Chips */}
            <div className='border-t border-neutral-200 bg-[#fafafa] p-3 space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-[10px] font-semibold tracking-wider text-neutral-400 uppercase'>
                  Topics:
                </span>
                <span className='text-[10px] text-neutral-400'>
                  Select any item
                </span>
              </div>

              <div className='flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1'>
                {PROMPT_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      type='button'
                      disabled={isTyping}
                      onClick={() => handleSelectPrompt(opt)}
                      className='group inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-neutral-900 hover:bg-neutral-900 hover:text-white disabled:opacity-50'
                    >
                      <Icon size={12} className='text-neutral-500 group-hover:text-white' />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Widget Footer */}
            <div className='flex items-center justify-between border-t border-neutral-200 bg-neutral-100 px-4 py-2 text-[10px] text-neutral-500'>
              <span className='flex items-center gap-1'>
                <MessageSquare size={11} className='text-neutral-500' />
                Interactive assistant · Zero visitor data stored
              </span>
              <span>Portfolio Assistant</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label={isOpen ? "Close Assistant" : "Open Assistant"}
        className={`group relative flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium shadow-md transition-all duration-300 ${
          isOpen
            ? "border-neutral-900 bg-neutral-900 text-white shadow-neutral-900/20"
            : "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900 hover:shadow-lg"
        }`}
      >
        <span className='relative flex items-center justify-center'>
          {isOpen ? (
            <X size={18} className='text-white' />
          ) : (
            <Cat size={18} strokeWidth={2} className='text-neutral-900' />
          )}
        </span>
        <span className='tracking-tight'>
          {isOpen ? "Close" : "Milo"}
        </span>
        {!isOpen && <span className='text-xs'>🐾</span>}
      </motion.button>
    </aside>
  );
}
