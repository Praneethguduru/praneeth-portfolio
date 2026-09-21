import { useEffect, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronRight,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  RefreshCw,
  RotateCcw,
  Send,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const questions = [
  {
    text: "What is retrieval-augmented generation?",
    type: "documents",
  },
  {
    text: "Why is vector search useful in RAG?",
    type: "documents",
  },
  {
    text: "What is MCP?",
    type: "documents",
  },
  {
    text: "What is the latest MCP specification version?",
    type: "web",
  },
];

const documents = [
  {
    id: "DOC-I",
    file: "rag.pdf",
    title: "RAG Architecture",
    description: "Retrieval-Augmented Generation",
  },
  {
    id: "DOC-II",
    file: "vector_search.pdf",
    title: "Vector Search",
    description: "Dense embeddings & similarity",
  },
  {
    id: "DOC-III",
    file: "mcp.pdf",
    title: "MCP Specification",
    description: "Model Context Protocol",
  },
];

const agents = [
  { name: "Retriever", symbol: "α" },
  { name: "Relevance Grader", symbol: "β" },
  { name: "Corrective Retry", symbol: "γ" },
  { name: "Web Search", symbol: "δ" },
  { name: "Context Builder", symbol: "ε" },
  { name: "Generator", symbol: "ζ" },
];

const normalOutputs = [
  "Searched built-in ChromaDB index for relevant chunk embeddings.",
  "Evaluated chunk relevance score: 0.92 (High confidence).",
  "Sufficient grounding evidence confirmed in local manuscripts.",
  "Bypassed — Local manuscripts contained sufficient verified context.",
  "Assembled grounded context payload for LLM generation.",
  "Generated response fully grounded in retrieved document context.",
];

const webOutputs = [
  "Searched built-in ChromaDB index for relevant chunk embeddings.",
  "Evaluated chunk relevance score: 0.24 (LOW RELEVANCE - Below threshold).",
  "Local documents insufficient. Prompt rewritten and retrieval retried.",
  "Local knowledge retry failed. Triggered fallback web search.",
  "Combined live web search results with local schema references.",
  "Generated grounded answer using verified external web context.",
];

const answers = [
  "Retrieval-Augmented Generation combines information retrieval with language generation. A system retrieves relevant external information and supplies it to the language model as context before generating the response.",
  "Vector search represents text as embeddings and retrieves semantically similar content. This allows a RAG system to find relevant information even when the query and document use different words.",
  "Model Context Protocol (MCP) is an open protocol that standardizes how applications provide context to LLMs. It enables models to safely connect to local files, databases, and remote service tools.",
  "The Model Context Protocol specification continuously updates. Since local papers only covered base concepts, Veritas performed corrective retrieval and executed a live web search to retrieve current specification details.",
];

const webSources = [
  {
    title: "Model Context Protocol Specification",
    domain: "modelcontextprotocol.io/specification",
    url: "https://modelcontextprotocol.io/specification/",
  },
  {
    title: "MCP Architecture Guide",
    domain: "modelcontextprotocol.io",
    url: "https://modelcontextprotocol.io/",
  },
];

function VeritasDemo() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [activeAgent, setActiveAgent] = useState<number | null>(null);
  const [completedAgents, setCompletedAgents] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [showDocsModal, setShowDocsModal] = useState(false);

  const isWebQuestion =
    selectedQuestion !== null && questions[selectedQuestion].type === "web";

  const runQuestion = (index: number) => {
    if (running) return;

    setSelectedQuestion(index);
    setSelectedAgent(null);
    setActiveAgent(0);
    setCompletedAgents([]);
    setShowAnswer(false);
    setRetryCount(0);
    setIsRetrying(false);
    setRunning(true);
  };

  const reset = () => {
    setSelectedQuestion(null);
    setSelectedAgent(null);
    setActiveAgent(null);
    setCompletedAgents([]);
    setRunning(false);
    setShowAnswer(false);
    setRetryCount(0);
    setIsRetrying(false);
    setSelectedDocument(null);
    setShowDocsModal(false);
  };

  useEffect(() => {
    if (!running) return;

    let current = 0;
    const isWeb =
      selectedQuestion !== null && questions[selectedQuestion].type === "web";

    const timer = window.setInterval(() => {
      setCompletedAgents((prev) =>
        current === 0 ? prev : [...prev, current - 1],
      );

      current += 1;

      if (current === 2 && isWeb) {
        setRetryCount(1);
        setIsRetrying(true);
      }

      if (current < agents.length) {
        setActiveAgent(current);
      } else {
        setCompletedAgents(Array.from({ length: agents.length }, (_, i) => i));
        setActiveAgent(null);
        setRunning(false);
        setShowAnswer(true);
        window.clearInterval(timer);
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running, selectedQuestion]);

  const getAgentOutput = (index: number) => {
    return isWebQuestion ? webOutputs[index] : normalOutputs[index];
  };

  return (
    <div className='min-h-screen bg-[#FAF8F5] text-[#2B2825] p-6 sm:p-10 font-serif antialiased selection:bg-[#A03820] selection:text-white'>
      {/* Header */}
      <header className='max-w-7xl mx-auto border-b-2 border-[#A03820]/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6'>
        <div>
          <span className='text-[11px] font-sans font-semibold tracking-[0.25em] text-[#A03820] uppercase block mb-1'>
            Systema Correctivum Veritas · MMXXVI
          </span>
          <h1 className='text-3xl sm:text-4xl font-bold tracking-tight text-[#1E1C1A] font-serif'>
            VERITAS
          </h1>
          <p className='mt-1 text-xs font-sans text-[#6B6560] max-w-xl leading-relaxed'>
            A self-correcting RAG system with classical Greco-Roman node
            orchestration. Grades retrieved context, retries low-relevance
            queries, and falls back to live web search.
          </p>
        </div>

        <div className='flex items-center gap-3 font-sans'>
          {completedAgents.length === agents.length && (
            <button
              onClick={() => setShowDocsModal(true)}
              className='inline-flex items-center gap-2 rounded-lg bg-[#2B2825] px-4 py-2.5 text-xs font-semibold text-[#FAF8F5] transition hover:bg-[#A03820]'
            >
              <BookOpen size={14} />
              Architecture Record
            </button>
          )}

          <button
            onClick={reset}
            className='inline-flex items-center gap-2 rounded-lg border border-[#2B2825]/20 bg-white px-4 py-2.5 text-xs font-medium text-[#2B2825] transition hover:border-[#A03820] hover:text-[#A03820]'
          >
            <RotateCcw size={13} />
            Reset State
          </button>
        </div>
      </header>

      {/* Main Grid: Left Chatbot | Right Top Workflow + Right Bottom Docs */}
      <main className='max-w-7xl mx-auto mt-8 grid gap-8 lg:grid-cols-12'>
        {/* LEFT COLUMN: Chatbot Console */}
        <section className='lg:col-span-5 flex flex-col rounded-xl border border-[#A03820]/20 bg-white p-6 shadow-sm font-sans min-h-[580px]'>
          <div className='border-b border-[#2B2825]/10 pb-3.5 flex items-center justify-between'>
            <div className='flex items-center gap-2.5'>
              <Sparkles size={16} className='text-[#A03820]' />
              <h2 className='text-xs font-bold uppercase tracking-widest text-[#2B2825]'>
                Veritas Oracle
              </h2>
            </div>
            <span className='text-[10px] font-mono font-medium text-[#C89B3C] uppercase tracking-widest'>
              CRAG Interactive
            </span>
          </div>

          <div className='mt-4 flex-1 space-y-4 text-xs overflow-y-auto'>
            {/* Prompt Selector */}
            {selectedQuestion === null && (
              <div className='space-y-3'>
                <p className='text-[11px] text-[#6B6560] font-serif italic'>
                  Select an inquiry to initiate the corrective pipeline:
                </p>

                {questions.map((q, index) => (
                  <button
                    key={q.text}
                    onClick={() => runQuestion(index)}
                    className='group flex w-full items-center justify-between rounded-lg border border-[#2B2825]/10 bg-[#FAF8F5] p-3.5 text-left transition hover:border-[#A03820] hover:bg-white shadow-xs'
                  >
                    <span className='text-xs text-[#2B2825] font-medium leading-relaxed pr-2'>
                      {q.text}
                    </span>
                    {q.type === "web" ? (
                      <span className='shrink-0 rounded bg-[#A03820]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#A03820] uppercase tracking-wider'>
                        Web Fallback
                      </span>
                    ) : (
                      <Send
                        size={12}
                        className='shrink-0 text-[#2B2825]/30 transition group-hover:translate-x-0.5 group-hover:text-[#A03820]'
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Active Query Display */}
            {selectedQuestion !== null && (
              <div className='rounded-lg border border-[#A03820]/20 bg-[#FAF8F5] p-4 text-[#2B2825]'>
                <p className='text-[10px] uppercase tracking-wider text-[#A03820] font-bold mb-1'>
                  Submitted Query
                </p>
                <p className='text-xs font-semibold leading-relaxed font-serif'>
                  {questions[selectedQuestion].text}
                </p>
              </div>
            )}

            {/* Running Execution Indicator */}
            {running && (
              <div className='flex items-center gap-2 rounded-lg bg-[#FAF8F5] p-3.5 text-xs text-[#6B6560] border border-[#2B2825]/10'>
                <RefreshCw size={14} className='animate-spin text-[#A03820]' />
                <span>Traversing CRAG Node Pipeline...</span>
              </div>
            )}

            {/* Grounded Final Answer */}
            {showAnswer && selectedQuestion !== null && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className='rounded-lg border border-emerald-900/20 bg-emerald-50/60 p-4 text-xs'
              >
                <div className='flex items-center justify-between border-b border-emerald-900/10 pb-2 mb-2'>
                  <span className='font-serif text-[10px] font-bold text-emerald-900 uppercase tracking-wider'>
                    Grounded Response
                  </span>
                  <span className='text-[9px] font-semibold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded'>
                    VERIFIED
                  </span>
                </div>

                <p className='leading-relaxed text-[#2B2825] text-xs font-serif italic'>
                  {answers[selectedQuestion]}
                </p>

                <div className='mt-3 border-t border-emerald-900/10 pt-2 flex items-center justify-between text-[10px] text-[#6B6560] font-sans'>
                  <span>Evidence Origin:</span>
                  <span className='font-semibold text-emerald-900'>
                    {isWebQuestion ? "Live Web Search" : "Local Manuscripts"}
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          <div className='mt-4 border-t border-[#2B2825]/10 pt-3'>
            {selectedQuestion !== null ? (
              <button
                onClick={reset}
                disabled={running}
                className='w-full rounded-lg border border-[#2B2825]/20 bg-white py-2.5 text-xs font-semibold text-[#2B2825] transition hover:border-[#A03820] hover:text-[#A03820] disabled:opacity-40'
              >
                Ask Another Query
              </button>
            ) : (
              <p className='text-center text-[10px] text-[#6B6560]'>
                Select an inquiry prompt above to execute
              </p>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: Execution Flow on Top + Manuscripts on Bottom */}
        <div className='lg:col-span-7 space-y-6 font-sans'>
          {/* TOP HORIZONTAL: Execution Workflow Bar */}
          <section className='rounded-xl border border-[#A03820]/20 bg-white p-5 shadow-sm'>
            <div className='border-b border-[#2B2825]/10 pb-3 flex items-center justify-between'>
              <div>
                <h2 className='text-xs font-bold uppercase tracking-widest text-[#2B2825]'>
                  Corrective Execution Nodes
                </h2>
                <p className='text-[10px] text-[#6B6560] mt-0.5'>
                  Horizontal node pipeline ($\alpha \to \zeta$). Click any
                  completed step for details.
                </p>
              </div>

              {isRetrying && (
                <span className='rounded bg-[#A03820] px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider animate-pulse'>
                  Retry Active
                </span>
              )}
            </div>

            {/* Red Alert Banner on Fallback */}
            <AnimatePresence>
              {isRetrying && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className='mt-3 overflow-hidden rounded-lg border border-[#A03820]/30 bg-[#A03820]/10 p-3 text-[#A03820]'
                >
                  <div className='flex items-start gap-2.5'>
                    <ShieldAlert size={16} className='shrink-0 mt-0.5' />
                    <div className='text-xs leading-relaxed'>
                      <p className='font-bold uppercase tracking-wider text-[9px]'>
                        Low Relevance Warning — Escalating Query
                      </p>
                      <p className='text-[#6B6560] text-[10px]'>
                        Local context fell below threshold (Score: 0.24).
                        Rewriting prompt and searching the web.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Horizontal Nodes Map */}
            <div className='mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2'>
              {agents.map((agent, index) => {
                const active = activeAgent === index;
                const complete = completedAgents.includes(index);
                const isWebStage = index === 3;
                const isBypassed = isWebStage && !isWebQuestion && complete;
                const isRetryStage = index === 2 && isRetrying;

                return (
                  <button
                    key={agent.name}
                    type='button'
                    disabled={!complete}
                    onClick={() => complete && setSelectedAgent(index)}
                    className={`flex flex-col items-center justify-between rounded-lg border p-2.5 text-center transition ${
                      isRetryStage
                        ? "border-[#A03820] bg-[#A03820]/10 text-[#A03820]"
                        : active
                          ? "border-[#A03820] bg-white shadow-md text-[#A03820]"
                          : complete
                            ? isBypassed
                              ? "border-neutral-200 bg-neutral-100 text-neutral-400"
                              : "border-[#2B2825]/15 bg-[#FAF8F5] hover:border-[#A03820] text-[#2B2825] cursor-pointer"
                            : "border-[#2B2825]/5 bg-white opacity-40 text-[#2B2825]/30 cursor-default"
                    }`}
                  >
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded font-serif text-xs font-bold ${
                        isRetryStage
                          ? "bg-[#A03820] text-white"
                          : active
                            ? "bg-[#A03820] text-white"
                            : complete
                              ? isBypassed
                                ? "bg-neutral-300 text-neutral-600"
                                : "bg-[#2B2825] text-white"
                              : "bg-[#2B2825]/10 text-[#2B2825]/40"
                      }`}
                    >
                      {agent.symbol}
                    </div>

                    <p className='mt-2 text-[10px] font-bold truncate w-full'>
                      {agent.name}
                    </p>

                    <p className='text-[8px] mt-0.5 text-[#6B6560]'>
                      {isBypassed
                        ? "Bypassed"
                        : complete
                          ? "Done"
                          : active
                            ? "Running"
                            : "Pending"}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Node Details Drawer */}
            <AnimatePresence mode='wait'>
              {selectedAgent !== null &&
                completedAgents.includes(selectedAgent) && (
                  <motion.div
                    key={selectedAgent}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className='mt-4 rounded-lg border border-[#2B2825]/20 bg-[#2B2825] p-3.5 text-white text-xs'
                  >
                    <div className='flex items-center justify-between border-b border-white/10 pb-2'>
                      <span className='font-serif font-bold text-[11px] text-white uppercase tracking-wider'>
                        Node {agents[selectedAgent].symbol}:{" "}
                        {agents[selectedAgent].name}
                      </span>
                      <button
                        onClick={() => setSelectedAgent(null)}
                        className='text-white/60 hover:text-white'
                      >
                        <X size={13} />
                      </button>
                    </div>

                    <p className='mt-2 text-[11px] text-neutral-200 leading-relaxed'>
                      {getAgentOutput(selectedAgent)}
                    </p>

                    {selectedAgent === 3 && isWebQuestion && (
                      <div className='mt-2 space-y-1.5 border-t border-white/10 pt-2'>
                        <p className='text-[9px] uppercase tracking-wider text-[#C89B3C] font-bold'>
                          Retrieved Web Sources:
                        </p>
                        {webSources.map((source) => (
                          <a
                            key={source.url}
                            href={source.url}
                            target='_blank'
                            rel='noreferrer'
                            className='flex items-center justify-between rounded bg-white/10 p-1.5 text-white text-[10px] hover:bg-white/20 transition'
                          >
                            <span className='truncate'>{source.title}</span>
                            <ExternalLink size={10} className='shrink-0 ml-2' />
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
            </AnimatePresence>
          </section>

          {/* BOTTOM: Knowledge Base Manuscripts */}
          <section className='rounded-xl border border-[#A03820]/20 bg-white p-5 shadow-sm'>
            <div className='flex items-center justify-between border-b border-[#2B2825]/10 pb-3'>
              <div className='flex items-center gap-2'>
                <BookOpen size={16} className='text-[#A03820]' />
                <h2 className='text-xs font-bold uppercase tracking-widest text-[#2B2825]'>
                  Manuscripts Knowledge Base
                </h2>
              </div>
              <span className='text-[10px] font-mono text-[#6B6560]'>
                ChromaDB Index
              </span>
            </div>

            {/* Click Preview Banner Callout */}
            <div className='mt-3 flex items-center gap-2 rounded-md bg-[#FAF8F5] px-3 py-2 text-[11px] text-[#6B6560] border border-[#2B2825]/10'>
              <Eye size={13} className='text-[#A03820] shrink-0' />
              <span>
                Click any manuscript below to view its full PDF document.
              </span>
            </div>

            <div className='mt-3 space-y-2.5'>
              {documents.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocument(doc.file)}
                  className='group flex w-full items-center justify-between rounded-lg border border-[#2B2825]/10 bg-[#FAF8F5] p-3 text-left transition hover:border-[#A03820] hover:bg-white'
                >
                  <div className='flex items-center gap-3 min-w-0'>
                    <span className='font-serif font-bold text-xs text-[#A03820] shrink-0 w-6 text-center'>
                      {doc.id.replace("DOC-", "")}
                    </span>
                    <div className='min-w-0'>
                      <p className='truncate text-xs font-semibold text-[#2B2825] group-hover:text-[#A03820]'>
                        {doc.file}
                      </p>
                      <p className='truncate text-[10px] text-[#6B6560]'>
                        {doc.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={14}
                    className='shrink-0 text-[#2B2825]/30 transition group-hover:translate-x-0.5 group-hover:text-[#A03820]'
                  />
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Architecture Overview Modal */}
      <AnimatePresence>
        {showDocsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[100] flex items-center justify-center bg-[#1E1C1A]/60 p-4 backdrop-blur-sm font-sans'
            onClick={() => setShowDocsModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className='flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white border border-[#2B2825]/20 shadow-2xl text-[#2B2825]'
            >
              <div className='flex items-center justify-between border-b border-[#2B2825]/10 px-6 py-4 bg-[#FAF8F5]'>
                <div>
                  <h2 className='text-base font-serif font-bold text-[#1E1C1A]'>
                    Veritas — Corrective RAG System
                  </h2>
                  <p className='text-xs text-[#6B6560]'>
                    Architectural Specification & Benchmark Record
                  </p>
                </div>

                <button
                  onClick={() => setShowDocsModal(false)}
                  className='rounded-md p-1.5 text-[#6B6560] hover:bg-[#2B2825]/10 hover:text-[#2B2825]'
                >
                  <X size={18} />
                </button>
              </div>

              <div className='overflow-y-auto p-6 text-xs text-[#2B2825] space-y-5 leading-relaxed'>
                <section className='space-y-1.5'>
                  <h3 className='text-xs font-bold uppercase tracking-wider text-[#A03820] border-b border-[#2B2825]/10 pb-1'>
                    1. Corrective RAG Protocol
                  </h3>
                  <p>
                    Veritas checks its own work rather than trusting initial
                    retrieval. It grades chunk relevance, rewrites low-scoring
                    queries, triggers web fallbacks when local context is
                    insufficient, and verifies answer groundedness prior to
                    output.
                  </p>
                </section>

                <section className='space-y-1.5'>
                  <h3 className='text-xs font-bold uppercase tracking-wider text-[#A03820] border-b border-[#2B2825]/10 pb-1'>
                    2. Tech Stack
                  </h3>
                  <div className='grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px]'>
                    <div className='rounded bg-[#FAF8F5] p-2.5 border border-[#2B2825]/10'>
                      <span className='font-bold text-[#2B2825] block'>
                        Orchestration
                      </span>
                      LangGraph Nodes
                    </div>
                    <div className='rounded bg-[#FAF8F5] p-2.5 border border-[#2B2825]/10'>
                      <span className='font-bold text-[#2B2825] block'>
                        Vector DB
                      </span>
                      ChromaDB (Local)
                    </div>
                    <div className='rounded bg-[#FAF8F5] p-2.5 border border-[#2B2825]/10'>
                      <span className='font-bold text-[#2B2825] block'>
                        Embeddings
                      </span>
                      BAAI/bge-small-en
                    </div>
                    <div className='rounded bg-[#FAF8F5] p-2.5 border border-[#2B2825]/10'>
                      <span className='font-bold text-[#2B2825] block'>
                        Web Search
                      </span>
                      DuckDuckGo Fallback
                    </div>
                  </div>
                </section>

                <section className='space-y-1.5'>
                  <h3 className='text-xs font-bold uppercase tracking-wider text-[#A03820] border-b border-[#2B2825]/10 pb-1'>
                    3. Benchmark Results
                  </h3>
                  <div className='grid grid-cols-3 gap-3 text-center font-serif'>
                    <div className='rounded border border-[#2B2825]/10 p-3 bg-[#FAF8F5]'>
                      <p className='text-sm font-bold text-[#A03820]'>4 / 5</p>
                      <p className='text-[10px] text-[#6B6560] font-sans'>
                        Faithfulness
                      </p>
                    </div>
                    <div className='rounded border border-[#2B2825]/10 p-3 bg-[#FAF8F5]'>
                      <p className='text-sm font-bold text-[#A03820]'>5 / 5</p>
                      <p className='text-[10px] text-[#6B6560] font-sans'>
                        Relevancy
                      </p>
                    </div>
                    <div className='rounded border border-[#2B2825]/10 p-3 bg-[#FAF8F5]'>
                      <p className='text-sm font-bold text-[#A03820]'>5 / 5</p>
                      <p className='text-[10px] text-[#6B6560] font-sans'>
                        Correctness
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <div className='border-t border-[#2B2825]/10 px-6 py-3 bg-[#FAF8F5] flex justify-end'>
                <button
                  onClick={() => setShowDocsModal(false)}
                  className='rounded-lg bg-[#2B2825] px-4 py-2 text-xs font-bold text-white hover:bg-[#A03820]'
                >
                  Close Record
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Document Preview Modal */}
      <AnimatePresence>
        {selectedDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[100] flex items-center justify-center bg-[#1E1C1A]/60 p-4 backdrop-blur-sm font-sans'
            onClick={() => setSelectedDocument(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className='flex h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white border border-[#2B2825]/20 shadow-2xl'
            >
              <div className='flex items-center justify-between border-b border-[#2B2825]/10 px-5 py-4 bg-[#FAF8F5]'>
                <div className='flex items-center gap-3 text-[#2B2825]'>
                  <FileText size={16} className='text-[#A03820]' />
                  <span className='text-sm font-bold'>{selectedDocument}</span>
                </div>

                <button
                  onClick={() => setSelectedDocument(null)}
                  className='rounded-md px-3 py-1 text-xs text-[#6B6560] hover:bg-[#2B2825]/10 hover:text-[#2B2825]'
                >
                  Close Preview
                </button>
              </div>

              <iframe
                src={`/docs/${selectedDocument}`}
                title={selectedDocument}
                className='min-h-0 flex-1 bg-[#FAF8F5]'
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default VeritasDemo;
