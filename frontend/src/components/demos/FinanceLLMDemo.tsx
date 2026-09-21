import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  Bot,
  Cpu,
  Play,
  RotateCcw,
  Terminal,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Prebuilt evaluation prompts directly from project results
const prompts = [
  {
    id: "robinhood",
    title: "Robinhood Zero Commission",
    question: "Why can Robinhood offer trading without commissions?",
    baseOutput:
      "Robinhood offers trading without commissions because it is a decentralized platform that allows users to trade directly with each other... relies on user-generated liquidity... funds its operations through a 'staking' mechanism.",
    baseFlaw:
      "Hallucinates crypto-decentralization & non-existent staking mechanisms.",
    tunedOutput:
      "Robinhood is a broker, not an exchange. They are not charging you for the transaction fees that would be charged by an exchange. Instead they charge you via payment for order flow and premium subscriptions.",
    tunedAdvantage:
      "Accurate broker-vs-exchange distinction; matches finance Q&A tone.",
  },
  {
    id: "equity_timing",
    title: "Market Timing & Risk",
    question:
      "Is it the wrong time to get into the equity market immediately after large gains?",
    baseOutput:
      "0.9745. This indicates a 97.45% probability of a positive return in the upcoming trading quarter based on historical momentum metrics.",
    baseFlaw:
      "Fabricates an ungrounded probability figure (0.9745) out of thin air.",
    tunedOutput:
      "I think you are confusing two things: 1) The stock market is not a 'one size fits all' thing. 2) You can't predict what will happen in the future. 3) There are many factors that go into determining whether or not an investment is a good idea.",
    tunedAdvantage:
      "Grounded advice emphasizing unpredictability & dollar-cost averaging.",
  },
  {
    id: "gpl_tools",
    title: "GPL Personal Finance Tools",
    question:
      "What is the best cross-platform GPL personal finance tool available?",
    baseOutput:
      "Check out [Personal Finance Manager](https://www.personalfinancemanager.com/) for complete GPL automation.",
    baseFlaw: "Hallucinates a non-existent URL and fictional product name.",
    tunedOutput:
      "I use Mint. It's free, open source, and runs on Windows, Mac OS X, Linux, iOS, and Android.",
    tunedAdvantage: "Direct match with human respondent forum structure.",
  },
];

const projectMetrics = [
  { name: "Perplexity", base: "21.21", tuned: "6.55", lift: "3.2x Drop" },
  { name: "ROUGE-L", base: "0.148", tuned: "0.341", lift: "2.3x Gain" },
  { name: "ROUGE-2", base: "0.062", tuned: "0.242", lift: "3.9x Gain" },
  { name: "BLEU Score", base: "0.040", tuned: "0.054", lift: "+33% Gain" },
];

function FinanceLLMDemo() {
  const [selectedPromptIdx, setSelectedPromptIdx] = useState<number | null>(
    null,
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [baseStreamText, setBaseStreamText] = useState("");
  const [tunedStreamText, setTunedStreamText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const baseIntervalRef = useRef<number | null>(null);
  const tunedIntervalRef = useRef<number | null>(null);

  const stopStreams = () => {
    if (baseIntervalRef.current) clearInterval(baseIntervalRef.current);
    if (tunedIntervalRef.current) clearInterval(tunedIntervalRef.current);
    setIsGenerating(false);
  };

  const startSideBySideGeneration = (indexToUse: number) => {
    stopStreams();

    setSelectedPromptIdx(indexToUse);
    const targetPrompt = prompts[indexToUse];
    setIsGenerating(true);
    setIsFinished(false);
    setBaseStreamText("");
    setTunedStreamText("");

    const baseWords = targetPrompt.baseOutput.split(" ");
    const tunedWords = targetPrompt.tunedOutput.split(" ");

    let bIdx = 0;
    let tIdx = 0;

    // Stream Base Model
    baseIntervalRef.current = window.setInterval(() => {
      if (bIdx < baseWords.length) {
        const nextWord = baseWords[bIdx];
        setBaseStreamText((prev) => (prev ? prev + " " + nextWord : nextWord));
        bIdx++;
      } else {
        if (baseIntervalRef.current) clearInterval(baseIntervalRef.current);
      }
    }, 45);

    // Stream Fine-Tuned Model
    tunedIntervalRef.current = window.setInterval(() => {
      if (tIdx < tunedWords.length) {
        const nextWord = tunedWords[tIdx];
        setTunedStreamText((prev) => (prev ? prev + " " + nextWord : nextWord));
        tIdx++;
      } else {
        if (tunedIntervalRef.current) clearInterval(tunedIntervalRef.current);
        setIsGenerating(false);
        setIsFinished(true);
      }
    }, 32);
  };

  const resetState = () => {
    stopStreams();
    setSelectedPromptIdx(null);
    setBaseStreamText("");
    setTunedStreamText("");
    setIsFinished(false);
  };

  useEffect(() => {
    return () => stopStreams();
  }, []);

  const activePrompt =
    selectedPromptIdx !== null ? prompts[selectedPromptIdx] : null;

  return (
    <div className='min-h-screen bg-[#080B11] text-[#E2E8F0] p-4 sm:p-8 font-sans antialiased selection:bg-cyan-500 selection:text-black'>
      <div className='max-w-5xl mx-auto space-y-6'>
        {/* Header Bar */}
        <header className='flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-5 gap-4'>
          <div>
            <div className='flex items-center gap-2 mb-1'>
              <span className='h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400' />
              <span className='text-[11px] font-mono font-semibold text-cyan-400 uppercase tracking-widest'>
                AI Evaluation Lab · Qwen2-1.5B
              </span>
            </div>
            <h1 className='text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2'>
              Finance LLM Engine{" "}
              <Zap size={18} className='text-cyan-400' />
            </h1>
          </div>

          <div className='flex items-center gap-3'>
            {selectedPromptIdx !== null && (
              <button
                onClick={resetState}
                className='inline-flex items-center gap-1.5 rounded-xl bg-slate-900 border border-slate-700/80 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white'
              >
                <RotateCcw size={13} />
                Reset Workspace
              </button>
            )}

            <div className='flex items-center gap-2 rounded-xl bg-slate-900/90 border border-cyan-500/30 px-3.5 py-1.5 text-xs font-mono text-cyan-300 shadow-sm shadow-cyan-950/50'>
              <Cpu size={14} className='text-cyan-400' />
              <span>RTX 3050 (4GB) · QLoRA 4-bit</span>
            </div>
          </div>
        </header>

        {/* UNIFIED SNIPPET WORKSPACE (Prompt Selection & Execution in One Window) */}
        <section className='rounded-2xl border border-slate-800/80 bg-[#0D121D]/90 overflow-hidden shadow-2xl backdrop-blur-md'>
          {/* Snippet Header */}
          <div className='flex items-center justify-between bg-[#111726] border-b border-slate-800/80 px-5 py-3.5'>
            <div className='flex items-center gap-2.5'>
              <div className='flex items-center gap-1.5 mr-2'>
                <span className='h-3 w-3 rounded-full bg-rose-500/80 inline-block' />
                <span className='h-3 w-3 rounded-full bg-amber-500/80 inline-block' />
                <span className='h-3 w-3 rounded-full bg-emerald-500/80 inline-block' />
              </div>
              <Terminal size={14} className='text-cyan-400' />
              <span className='text-xs font-mono text-slate-300 font-bold'>
                eval_benchmark_runner.py
              </span>
            </div>

            {isGenerating && (
              <span className='text-[10px] font-mono text-cyan-400 font-bold animate-pulse flex items-center gap-1.5'>
                <span className='h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping' />
                Streaming Side-by-Side Tokens
              </span>
            )}
          </div>

          <div className='p-5 sm:p-6 space-y-6'>
            {/* Prompt Selector Bar within Snippet */}
            <div className='space-y-2'>
              <p className='text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold'>
                Select Query Prompt To Execute:
              </p>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                {prompts.map((q, index) => {
                  const isSelected = selectedPromptIdx === index;
                  return (
                    <button
                      key={q.id}
                      onClick={() => startSideBySideGeneration(index)}
                      className={`group flex items-center justify-between rounded-xl border p-3.5 text-left transition ${
                        isSelected
                          ? "border-cyan-500/80 bg-cyan-950/30 text-white shadow-lg shadow-cyan-950/40"
                          : "border-slate-800/80 bg-[#121826] text-slate-300 hover:border-slate-600 hover:bg-[#161F33]"
                      }`}
                    >
                      <div className='min-w-0 pr-2'>
                        <p
                          className={`text-xs font-bold ${isSelected ? "text-cyan-300" : "text-slate-200"}`}
                        >
                          {q.title}
                        </p>
                        <p className='text-[10px] text-slate-400 truncate mt-0.5 font-serif italic'>
                          "{q.question}"
                        </p>
                      </div>
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition ${
                          isSelected
                            ? "bg-cyan-500 text-black"
                            : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
                        }`}
                      >
                        <Play size={11} fill='currentColor' />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Selected Prompt Display */}
            <AnimatePresence mode='wait'>
              {activePrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className='rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 font-mono text-xs'
                >
                  <span className='text-[10px] uppercase tracking-wider text-cyan-400 font-bold block mb-1'>
                    Active Executed Prompt:
                  </span>
                  <p className='text-slate-100 font-serif italic text-sm'>
                    "{activePrompt.question}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Side-by-Side Dual Model Stream Canvas */}
            {selectedPromptIdx === null ? (
              <div className='flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-[#080B11] p-8 text-center font-mono text-xs text-slate-500'>
                <Bot size={28} className='text-slate-700 mb-2' />
                <p>
                  Select a prompt above to trigger real-time side-by-side model
                  execution.
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {/* Left Assistant: Base Model */}
                <div className='flex flex-col justify-between rounded-xl border border-slate-800 bg-[#080B11] p-4.5 space-y-4 min-h-[260px]'>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between border-b border-slate-800/80 pb-2.5'>
                      <div className='flex items-center gap-2'>
                        <Bot size={16} className='text-slate-400' />
                        <span className='text-xs font-bold text-slate-300 uppercase tracking-wider'>
                          Base Model (Qwen2-1.5B)
                        </span>
                      </div>
                      <span className='text-[9px] font-mono text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded'>
                        Un-tuned
                      </span>
                    </div>

                    <div className='text-xs font-serif leading-relaxed text-slate-300 min-h-[100px]'>
                      {baseStreamText}
                      {isGenerating && (
                        <span className='inline-block w-1.5 h-3.5 bg-slate-400 ml-1 animate-pulse' />
                      )}
                    </div>
                  </div>

                  {isFinished && activePrompt && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='pt-2.5 border-t border-rose-900/40 text-[11px] font-sans text-rose-300 bg-rose-950/30 p-2.5 rounded-lg border border-rose-900/30'
                    >
                      <span className='font-bold block text-[9px] uppercase tracking-wider text-rose-400 mb-0.5'>
                        Base Flaw:
                      </span>
                      {activePrompt.baseFlaw}
                    </motion.div>
                  )}
                </div>

                {/* Right Assistant: QLoRA Fine-Tuned Model */}
                <div className='flex flex-col justify-between rounded-xl border border-cyan-500/40 bg-cyan-950/20 p-4.5 space-y-4 min-h-[260px] shadow-lg shadow-cyan-950/20'>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between border-b border-cyan-500/30 pb-2.5'>
                      <div className='flex items-center gap-2'>
                        <Zap size={16} className='text-cyan-400' />
                        <span className='text-xs font-bold text-cyan-300 uppercase tracking-wider'>
                          QLoRA Fine-Tuned Model
                        </span>
                      </div>
                      <span className='text-[9px] font-mono text-cyan-300 bg-cyan-950 border border-cyan-500/40 px-2 py-0.5 rounded font-bold'>
                        4.57% Params Merged
                      </span>
                    </div>

                    <div className='text-xs font-serif leading-relaxed text-cyan-100 min-h-[100px] font-medium'>
                      {tunedStreamText}
                      {isGenerating && (
                        <span className='inline-block w-1.5 h-3.5 bg-cyan-400 ml-1 animate-pulse' />
                      )}
                    </div>
                  </div>

                  {isFinished && activePrompt && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='pt-2.5 border-t border-cyan-500/30 text-[11px] font-sans text-cyan-200 bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-500/30'
                    >
                      <span className='font-bold block text-[9px] uppercase tracking-wider text-cyan-400 mb-0.5'>
                        Fine-Tuned Advantage:
                      </span>
                      {activePrompt.tunedAdvantage}
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* BOTTOM EVALUATION BENCHMARKS CARD (HIDDEN UNTIL QUERY FINISHES GENERATING) */}
        <AnimatePresence>
          {isFinished && (
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className='rounded-2xl border border-slate-800/80 bg-[#0D121D]/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md space-y-4'
            >
              <div className='flex items-center justify-between border-b border-slate-800/80 pb-3'>
                <div className='flex items-center gap-2.5'>
                  <BarChart3 size={16} className='text-cyan-400' />
                  <h2 className='text-xs font-bold uppercase tracking-wider text-slate-200'>
                    Project Evaluation Benchmarks (Held-Out Test Set)
                  </h2>
                </div>
                <span className='text-[10px] font-mono text-slate-500'>
                  20 Unseen Test Questions
                </span>
              </div>

              <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs'>
                {projectMetrics.map((m) => (
                  <div
                    key={m.name}
                    className='rounded-xl border border-slate-800/80 bg-[#080B11] p-3.5 space-y-1.5'
                  >
                    <p className='text-[10px] uppercase tracking-wider text-slate-500 font-bold'>
                      {m.name}
                    </p>
                    <div className='flex items-baseline justify-between'>
                      <span className='text-xs text-slate-500 line-through'>
                        {m.base}
                      </span>
                      <span className='text-sm font-bold text-cyan-400'>
                        {m.tuned}
                      </span>
                    </div>
                    <div className='text-[9px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-1.5 py-0.5 rounded w-fit'>
                      {m.lift}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FinanceLLMDemo;
