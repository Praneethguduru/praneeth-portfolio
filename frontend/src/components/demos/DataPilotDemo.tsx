import { useEffect, useState } from "react";
import {
  Bot,
  Check,
  Database,
  MessageSquare,
  Play,
  RotateCcw,
  Send,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const questions = [
  "How many customers are there?",
  "Which country has the most customers?",
  "What is the average customer spending?",
];

const dataset = [
  { CustomerId: 1, FirstName: "John", Country: "USA", TotalSpent: 42.91 },
  { CustomerId: 2, FirstName: "Emma", Country: "Canada", TotalSpent: 27.45 },
  { CustomerId: 3, FirstName: "Michael", Country: "USA", TotalSpent: 58.73 },
  { CustomerId: 4, FirstName: "Sophia", Country: "UK", TotalSpent: 19.82 },
  { CustomerId: 5, FirstName: "Daniel", Country: "USA", TotalSpent: 76.31 },
  { CustomerId: 6, FirstName: "Olivia", Country: "Germany", TotalSpent: 34.28 },
  { CustomerId: 7, FirstName: "James", Country: "Canada", TotalSpent: 45.62 },
  { CustomerId: 8, FirstName: "Ava", Country: "USA", TotalSpent: 63.19 },
];

const agents = [
  "Supervisor",
  "Schema Agent",
  "SQL Generator",
  "Validator",
  "Execution",
  "Insight",
];

const agentOutputs = [
  "Question classified as a customer analytics query.",
  "Identified Customer table and relevant fields.",
  "Generated a SQL query for the requested analysis.",
  "SQL syntax, tables and columns validated successfully.",
  "Query executed against the synthetic customer dataset.",
  "Generated a concise natural-language insight.",
];

const sqlQueries = [
  "SELECT COUNT(*) AS customer_count FROM Customer;",
  "SELECT Country, COUNT(*) AS customers FROM Customer GROUP BY Country ORDER BY customers DESC LIMIT 1;",
  "SELECT AVG(TotalSpent) AS average_spending FROM Customer;",
];

const results = [
  {
    answer: "There are 8 customers in the dataset.",
    headers: ["customer_count"],
    rows: [["8"]],
  },
  {
    answer: "The USA has the most customers, with 4 customers.",
    headers: ["Country", "customers"],
    rows: [["USA", "4"]],
  },
  {
    answer: "The average customer spending is $46.04.",
    headers: ["average_spending"],
    rows: [["46.04"]],
  },
];

function DataPilotDemo() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [activeAgent, setActiveAgent] = useState<number | null>(null);
  const [completedAgents, setCompletedAgents] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const runQuestion = (index: number) => {
    if (running) return;

    setSelectedQuestion(index);
    setSelectedAgent(null);
    setRunning(true);
    setActiveAgent(0);
    setCompletedAgents([]);
    setShowResult(false);
  };

  const reset = () => {
    setRunning(false);
    setActiveAgent(null);
    setCompletedAgents([]);
    setSelectedQuestion(null);
    setSelectedAgent(null);
    setShowResult(false);
  };

  useEffect(() => {
    if (!running) return;

    let current = 0;

    const timer = window.setInterval(() => {
      setCompletedAgents((prev) =>
        current === 0 ? prev : [...prev, current - 1],
      );

      current += 1;

      if (current < agents.length) {
        setActiveAgent(current);
      } else {
        setCompletedAgents(Array.from({ length: agents.length }, (_, i) => i));
        setActiveAgent(null);
        setRunning(false);
        setShowResult(true);
        window.clearInterval(timer);
      }
    }, 850);

    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <div className='space-y-8'>
      {/* Demo header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='text-xs font-medium uppercase tracking-[0.18em] text-neutral-400'>
            DataPilot Demo
          </p>

          <h2 className='mt-3 text-2xl font-medium tracking-[-0.03em]'>
            Ask a question. Watch the agents work.
          </h2>

          <p className='mt-2 max-w-2xl text-sm leading-6 text-neutral-500'>
            A controlled demonstration of the multi-agent database workflow.
          </p>
        </div>

        <button
          onClick={reset}
          className='inline-flex items-center gap-2 self-start rounded-full border border-neutral-200 px-4 py-2 text-xs font-medium text-neutral-500 transition hover:border-neutral-900 hover:text-neutral-900 sm:self-auto'
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>

      {/* Main workspace */}
      <div className='grid gap-5 xl:grid-cols-[280px_minmax(420px,1fr)_320px]'>
        {/* Dataset */}
        <section className='rounded-2xl border border-neutral-200 bg-white p-5'>
          <div className='flex items-center gap-3'>
            <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100'>
              <Database size={16} />
            </div>

            <div>
              <p className='text-sm font-medium'>Customer</p>
              <p className='text-xs text-neutral-400'>8 rows · 4 columns</p>
            </div>
          </div>

          <div className='mt-5 overflow-hidden rounded-xl border border-neutral-200'>
            <div className='overflow-x-auto'>
              <table className='w-full text-left text-[11px]'>
                <thead>
                  <tr className='border-b border-neutral-200 bg-neutral-50'>
                    <th className='px-3 py-2 font-medium text-neutral-500'>
                      ID
                    </th>
                    <th className='px-3 py-2 font-medium text-neutral-500'>
                      Name
                    </th>
                    <th className='px-3 py-2 font-medium text-neutral-500'>
                      Country
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {dataset.map((row) => (
                    <tr
                      key={row.CustomerId}
                      className='border-b border-neutral-100 last:border-0'
                    >
                      <td className='px-3 py-2 text-neutral-500'>
                        {row.CustomerId}
                      </td>
                      <td className='px-3 py-2 text-neutral-700'>
                        {row.FirstName}
                      </td>
                      <td className='px-3 py-2 text-neutral-500'>
                        {row.Country}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className='mt-4 rounded-xl bg-neutral-50 p-3'>
            <p className='text-[10px] uppercase tracking-[0.15em] text-neutral-400'>
              Available fields
            </p>

            <div className='mt-2 flex flex-wrap gap-1.5'>
              {["CustomerId", "FirstName", "Country", "TotalSpent"].map(
                (field) => (
                  <span
                    key={field}
                    className='rounded-md border border-neutral-200 bg-white px-2 py-1 font-mono text-[10px] text-neutral-500'
                  >
                    {field}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Agent workflow */}
        <section className='rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6'>
          <div className='flex items-start justify-between'>
            <div>
              <p className='text-xs font-medium uppercase tracking-[0.15em] text-neutral-400'>
                Agent workflow
              </p>

              <p className='mt-2 text-sm text-neutral-500'>
                {running
                  ? "Agents are processing the request..."
                  : completedAgents.length > 0
                    ? "Click a completed agent to inspect its output."
                    : "Select a question to start."}
              </p>
            </div>

            {running && (
              <div className='flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-400'>
                <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-900' />
                Running
              </div>
            )}
          </div>

          <div className='relative mt-8'>
            {/* Flow line */}
            <div className='absolute bottom-6 left-[23px] top-6 w-px bg-neutral-200' />

            <motion.div
              animate={{
                height:
                  completedAgents.length > 0
                    ? `${(completedAgents.length / agents.length) * 100}%`
                    : "0%",
              }}
              transition={{ duration: 0.5 }}
              className='absolute left-[23px] top-6 z-0 w-px bg-neutral-900'
            />

            <div className='relative z-10 space-y-1'>
              {agents.map((agent, index) => {
                const active = activeAgent === index;
                const complete = completedAgents.includes(index);

                return (
                  <motion.button
                    key={agent}
                    type='button'
                    disabled={!complete}
                    onClick={() => {
                      if (complete) {
                        setSelectedAgent(index);
                      }
                    }}
                    whileHover={complete ? { x: 3 } : undefined}
                    className={`group flex w-full items-center gap-4 rounded-xl px-2 py-3 text-left transition-all ${
                      complete
                        ? "cursor-pointer hover:bg-neutral-50"
                        : "cursor-default"
                    }`}
                  >
                    {/* Agent icon */}
                    <div className='relative shrink-0'>
                      {active && (
                        <>
                          <motion.div
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.4, 0, 0.4],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                            className='absolute inset-0 rounded-full border border-neutral-900'
                          />

                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className='absolute -inset-1 rounded-full border border-dashed border-neutral-400'
                          />
                        </>
                      )}

                      <div
                        className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 ${
                          active || complete
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-200 bg-white text-neutral-300"
                        }`}
                      >
                        {complete ? (
                          <Check size={16} />
                        ) : (
                          <Bot size={18} strokeWidth={1.5} />
                        )}
                      </div>
                    </div>

                    {/* Agent information */}
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-center gap-2'>
                        <p
                          className={`text-sm font-medium ${
                            active || complete
                              ? "text-neutral-900"
                              : "text-neutral-400"
                          }`}
                        >
                          {agent}
                        </p>

                        {active && (
                          <span className='text-[10px] uppercase tracking-wider text-neutral-400'>
                            Working
                          </span>
                        )}

                        {complete && (
                          <span className='text-[10px] uppercase tracking-wider text-neutral-400'>
                            Complete
                          </span>
                        )}
                      </div>

                      <p className='mt-1 text-[11px] text-neutral-400'>
                        {active
                          ? "Processing..."
                          : complete
                            ? "Click to inspect output"
                            : "Waiting"}
                      </p>
                    </div>

                    {/* Activity */}
                    {active && (
                      <div className='flex items-center gap-1'>
                        {[0, 1, 2].map((dot) => (
                          <motion.span
                            key={dot}
                            animate={{
                              opacity: [0.2, 1, 0.2],
                              y: [0, -2, 0],
                            }}
                            transition={{
                              duration: 0.7,
                              repeat: Infinity,
                              delay: dot * 0.12,
                            }}
                            className='h-1.5 w-1.5 rounded-full bg-neutral-900'
                          />
                        ))}
                      </div>
                    )}

                    {complete && (
                      <span className='text-xs text-neutral-300 transition-colors group-hover:text-neutral-900'>
                        View
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Selected agent output */}
          <AnimatePresence mode='wait'>
            {selectedAgent !== null &&
              completedAgents.includes(selectedAgent) && (
                <motion.div
                  key={selectedAgent}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className='mt-6 overflow-hidden rounded-xl border border-neutral-200'
                >
                  <div className='flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3'>
                    <div className='flex items-center gap-2'>
                      <Bot size={14} />
                      <span className='text-xs font-medium'>
                        {agents[selectedAgent]} output
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedAgent(null)}
                      className='text-xs text-neutral-400 hover:text-neutral-900'
                    >
                      Close
                    </button>
                  </div>

                  <div className='p-5'>
                    <p className='text-sm leading-6 text-neutral-600'>
                      {agentOutputs[selectedAgent]}
                    </p>

                    {/* SQL Generator */}
                    {selectedAgent === 2 && selectedQuestion !== null && (
                      <pre className='mt-4 overflow-x-auto rounded-xl bg-neutral-950 p-4 font-mono text-xs leading-6 text-neutral-200'>
                        {sqlQueries[selectedQuestion]}
                      </pre>
                    )}

                    {/* Validator */}
                    {selectedAgent === 3 && (
                      <div className='mt-4 space-y-2 rounded-xl bg-neutral-50 p-4 text-xs text-neutral-600'>
                        <div className='flex items-center gap-2'>
                          <Check size={13} />
                          Query structure valid
                        </div>

                        <div className='flex items-center gap-2'>
                          <Check size={13} />
                          Tables verified
                        </div>

                        <div className='flex items-center gap-2'>
                          <Check size={13} />
                          Columns verified
                        </div>
                      </div>
                    )}

                    {/* Execution */}
                    {selectedAgent === 4 && selectedQuestion !== null && (
                      <div className='mt-4 overflow-hidden rounded-xl border border-neutral-200'>
                        <div className='border-b border-neutral-200 bg-neutral-50 px-4 py-3'>
                          <p className='text-[10px] uppercase tracking-[0.15em] text-neutral-400'>
                            Query result
                          </p>
                        </div>

                        <div className='overflow-x-auto'>
                          <table className='w-full text-left text-xs'>
                            <thead>
                              <tr className='border-b border-neutral-200'>
                                {results[selectedQuestion].headers.map(
                                  (header) => (
                                    <th
                                      key={header}
                                      className='px-4 py-3 font-medium text-neutral-500'
                                    >
                                      {header}
                                    </th>
                                  ),
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {results[selectedQuestion].rows.map(
                                (row, rowIndex) => (
                                  <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                      <td
                                        key={cellIndex}
                                        className='px-4 py-3 text-neutral-700'
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Insight */}
                    {selectedAgent === 5 && selectedQuestion !== null && (
                      <div className='mt-4 rounded-xl bg-neutral-50 p-4'>
                        <p className='text-[10px] uppercase tracking-[0.15em] text-neutral-400'>
                          Final insight
                        </p>

                        <p className='mt-2 text-sm leading-6 text-neutral-700'>
                          {results[selectedQuestion].answer}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        </section>

        {/* Chat */}
        <section className='flex min-h-[560px] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white'>
          <div className='flex items-center gap-3 border-b border-neutral-200 px-5 py-4'>
            <div className='flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white'>
              <Bot size={16} />
            </div>

            <div>
              <p className='text-sm font-medium'>DataPilot</p>
              <div className='mt-0.5 flex items-center gap-1.5'>
                <span className='h-1.5 w-1.5 rounded-full bg-neutral-900' />
                <p className='text-[10px] text-neutral-400'>
                  Database assistant
                </p>
              </div>
            </div>
          </div>

          <div className='flex-1 space-y-4 overflow-y-auto p-5'>
            {/* Initial assistant message */}
            <div className='flex gap-2'>
              <div className='mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100'>
                <Bot size={13} />
              </div>

              <div className='max-w-[85%] rounded-2xl rounded-tl-sm bg-neutral-100 px-4 py-3'>
                <p className='text-xs leading-5 text-neutral-700'>
                  What would you like to know about the customer data?
                </p>
              </div>
            </div>

            {/* Question choices */}
            {selectedQuestion === null && (
              <div className='space-y-2 pl-9'>
                {questions.map((question, index) => (
                  <motion.button
                    key={question}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => runQuestion(index)}
                    className='group flex w-full items-center justify-between rounded-2xl border border-neutral-200 px-4 py-3 text-left text-xs text-neutral-600 transition-all hover:border-neutral-900 hover:text-neutral-900'
                  >
                    <span>{question}</span>
                    <Send
                      size={13}
                      className='shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100'
                    />
                  </motion.button>
                ))}
              </div>
            )}

            {/* User question */}
            {selectedQuestion !== null && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex justify-end'
              >
                <div className='max-w-[85%] rounded-2xl rounded-br-sm bg-neutral-900 px-4 py-3 text-white'>
                  <p className='text-xs leading-5'>
                    {questions[selectedQuestion]}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Thinking */}
            {running && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex gap-2'
              >
                <div className='mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100'>
                  <Bot size={13} />
                </div>

                <div className='flex items-center gap-1 rounded-2xl rounded-tl-sm bg-neutral-100 px-4 py-3'>
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      animate={{
                        y: [0, -3, 0],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: dot * 0.15,
                      }}
                      className='h-1.5 w-1.5 rounded-full bg-neutral-500'
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Final response */}
            {showResult && selectedQuestion !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex gap-2'
              >
                <div className='mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white'>
                  <Bot size={13} />
                </div>

                <div className='max-w-[88%] rounded-2xl rounded-tl-sm bg-neutral-100 px-4 py-3'>
                  <p className='text-[10px] uppercase tracking-[0.12em] text-neutral-400'>
                    Result
                  </p>

                  <p className='mt-1.5 text-xs leading-5 text-neutral-700'>
                    {results[selectedQuestion].answer}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Chat footer */}
          <div className='border-t border-neutral-200 p-4'>
            {selectedQuestion !== null ? (
              <button
                onClick={reset}
                disabled={running}
                className='flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 text-xs font-medium text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40'
              >
                <Play size={13} />
                Ask another question
              </button>
            ) : (
              <div className='flex items-center gap-2 rounded-xl bg-neutral-50 px-4 py-3 text-xs text-neutral-400'>
                <MessageSquare size={13} />
                Select a question above
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Demo notice */}
      <div className='rounded-xl border border-neutral-200 bg-white px-5 py-4'>
        <p className='text-xs leading-5 text-neutral-400'>
          Demo only — this interface uses a small synthetic dataset and
          predefined responses. The full DataPilot implementation can work with
          real databases and dynamically generated queries.
        </p>
      </div>
    </div>
  );
}

export default DataPilotDemo;
