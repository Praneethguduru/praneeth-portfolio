import { useEffect, useState } from "react";
import {
  BarChart3,
  Check,
  Cpu,
  Database,
  Eye,
  Filter,
  Layers,
  Play,
  RotateCcw,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// Simple Datasets
const datasets = [
  {
    id: "churn",
    name: "Customer Churn Data",
    description: "Customer usage metrics and churn labels.",
    data: [
      { Age: 25, UsageHours: 12, MonthlyCost: 45, Churn: "No" },
      { Age: 42, UsageHours: 85, MonthlyCost: 110, Churn: "Yes" },
      { Age: 31, UsageHours: 40, MonthlyCost: 65, Churn: "No" },
      { Age: 50, UsageHours: 95, MonthlyCost: 125, Churn: "Yes" },
      { Age: 22, UsageHours: 8, MonthlyCost: 35, Churn: "No" },
    ],
  },
  {
    id: "loan",
    name: "Loan Approval Data",
    description: "Applicant credit history and loan decision.",
    data: [
      { Income: 50000, CreditScore: 720, DebtRatio: 0.2, Approved: "Yes" },
      { Income: 28000, CreditScore: 580, DebtRatio: 0.5, Approved: "No" },
      { Income: 85000, CreditScore: 790, DebtRatio: 0.1, Approved: "Yes" },
      { Income: 35000, CreditScore: 610, DebtRatio: 0.4, Approved: "No" },
      { Income: 62000, CreditScore: 700, DebtRatio: 0.3, Approved: "Yes" },
    ],
  },
];

const agents = [
  { id: 0, name: "1. Data Cleaning Agent", icon: Database },
  { id: 1, name: "2. Feature Engineering Agent", icon: Filter },
  { id: 2, name: "3. Model Training Agent", icon: Cpu },
  { id: 3, name: "4. Voting Ensemble Agent", icon: Layers },
  { id: 4, name: "5. Metric Evaluation Agent", icon: BarChart3 },
];

const models = [
  { name: "Voting Ensemble", accuracy: "97.2%", f1: "96.2%", isBest: true },
  { name: "XGBoost Classifier", accuracy: "96.6%", f1: "95.4%", isBest: false },
  { name: "Random Forest", accuracy: "96.0%", f1: "95.1%", isBest: false },
  { name: "Gradient Boosting", accuracy: "95.5%", f1: "94.8%", isBest: false },
  {
    name: "Logistic Regression",
    accuracy: "83.8%",
    f1: "76.4%",
    isBest: false,
  },
];

const featureImportances = [
  { name: "MonthlyCost / DebtRatio", score: 42 },
  { name: "UsageHours / CreditScore", score: 32 },
  { name: "Age / Income", score: 26 },
];

function AutoMLEngineerDemo() {
  const [selectedDatasetId, setSelectedDatasetId] = useState("churn");
  const [running, setRunning] = useState(false);
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [activeReportTab, setActiveReportTab] = useState<
    "leaderboard" | "importance" | "json"
  >("leaderboard");

  const currentDataset = datasets.find((d) => d.id === selectedDatasetId)!;

  const runPipeline = () => {
    if (running) return;

    setRunning(true);
    setActiveStage(0);
    setCompletedStages([]);
    setSelectedStage(null);
    setShowResults(false);
  };

  const reset = () => {
    setRunning(false);
    setActiveStage(null);
    setCompletedStages([]);
    setSelectedStage(null);
    setShowResults(false);
  };

  useEffect(() => {
    if (!running) return;

    let current = 0;

    const timer = window.setInterval(() => {
      setCompletedStages((previous) =>
        current === 0 ? previous : [...previous, current - 1],
      );

      current += 1;

      if (current < agents.length) {
        setActiveStage(current);
      } else {
        setCompletedStages(
          Array.from({ length: agents.length }, (_, index) => index),
        );
        setActiveStage(null);
        setRunning(false);
        setShowResults(true);
        window.clearInterval(timer);
      }
    }, 900);

    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <div className='min-h-screen bg-[#F8FAFC] text-[#0F172A] p-6 sm:p-10 font-sans antialiased selection:bg-[#4338CA] selection:text-white'>
      {/* Header */}
      <header className='max-w-6xl mx-auto border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <span className='text-[11px] font-mono font-semibold tracking-wider text-[#4338CA] uppercase block mb-1'>
            Multi-Agent AutoML Architecture
          </span>
          <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]'>
            AutoMLEngineer Agents
          </h1>
          <p className='mt-1 text-xs text-slate-500 max-w-lg leading-relaxed'>
            Autonomous agents handle data cleaning, feature scaling, model
            selection, hyperparameter tuning, and ensemble evaluation.
          </p>
        </div>

        <div className='flex items-center gap-3 font-sans'>
          <button
            onClick={reset}
            className='inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 shadow-xs'
          >
            <RotateCcw size={13} />
            Reset Pipeline
          </button>

          <button
            onClick={runPipeline}
            disabled={running}
            className='inline-flex items-center gap-1.5 rounded-lg bg-[#4338CA] px-4.5 py-2 text-xs font-semibold text-white transition hover:bg-[#3730A3] disabled:opacity-40 shadow-xs'
          >
            <Play size={13} fill='currentColor' />
            {running ? "Agents Executing..." : "Execute Agents"}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className='max-w-6xl mx-auto mt-6 space-y-6'>
        {/* TOP SECTION: Dataset Picker & Live Data Preview */}
        <section className='grid gap-6 md:grid-cols-12 rounded-xl border border-slate-200 bg-white p-6 shadow-xs'>
          {/* Dataset Selector */}
          <div className='md:col-span-5 space-y-3 border-r-0 md:border-r border-slate-100 md:pr-6'>
            <div className='flex items-center gap-2'>
              <Database size={16} className='text-[#4338CA]' />
              <h2 className='text-xs font-bold uppercase tracking-wider text-slate-900'>
                1. Choose Target Dataset
              </h2>
            </div>

            <div className='space-y-2'>
              {datasets.map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setSelectedDatasetId(d.id);
                    reset();
                  }}
                  className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition ${
                    selectedDatasetId === d.id
                      ? "border-[#4338CA] bg-[#EEF2FF] shadow-xs"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <div>
                    <p
                      className={`text-xs font-bold ${selectedDatasetId === d.id ? "text-[#4338CA]" : "text-slate-800"}`}
                    >
                      {d.name}
                    </p>
                    <p className='text-[10px] text-slate-500 mt-0.5'>
                      {d.description}
                    </p>
                  </div>

                  {selectedDatasetId === d.id && (
                    <Check size={16} className='text-[#4338CA] shrink-0' />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Dataset Table Preview */}
          <div className='md:col-span-7 space-y-2'>
            <div className='flex items-center justify-between pb-2 border-b border-slate-100'>
              <span className='text-xs font-bold text-slate-900 uppercase tracking-wider'>
                Live Input Data ({currentDataset.name})
              </span>
              <span className='text-[10px] font-mono font-semibold text-slate-400'>
                {currentDataset.data.length} Rows Ingested
              </span>
            </div>

            <div className='overflow-x-auto rounded-lg border border-slate-200 bg-slate-50'>
              <table className='w-full text-left text-[11px] font-mono'>
                <thead>
                  <tr className='border-b border-slate-200 bg-white text-slate-600'>
                    {Object.keys(currentDataset.data[0]).map((key) => (
                      <th key={key} className='px-3 py-2 font-bold'>
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentDataset.data.map((row, idx) => (
                    <tr
                      key={idx}
                      className='border-b border-slate-200/60 last:border-0 hover:bg-white'
                    >
                      {Object.values(row).map((val, vIdx) => (
                        <td
                          key={vIdx}
                          className={`px-3 py-1.5 ${
                            val === "Yes" || val === "No"
                              ? "font-bold text-[#4338CA]"
                              : "text-slate-700"
                          }`}
                        >
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* MIDDLE SECTION: Model Performance Leaderboard & Visual Reports */}
        <section className='rounded-xl border border-slate-200 bg-white p-6 shadow-xs min-h-[280px] flex flex-col justify-between'>
          <div className='flex items-center justify-between border-b border-slate-100 pb-3'>
            <div className='flex items-center gap-2'>
              <BarChart3 size={16} className='text-[#4338CA]' />
              <h2 className='text-xs font-bold uppercase tracking-wider text-slate-900'>
                2. Agent Evaluation Leaderboard
              </h2>
            </div>

            {/* Tab Controls */}
            {showResults && (
              <div className='flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-[10px] font-semibold'>
                <button
                  onClick={() => setActiveReportTab("leaderboard")}
                  className={`px-2.5 py-1 rounded transition ${
                    activeReportTab === "leaderboard"
                      ? "bg-white text-[#4338CA] shadow-xs font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Leaderboard
                </button>
                <button
                  onClick={() => setActiveReportTab("importance")}
                  className={`px-2.5 py-1 rounded transition ${
                    activeReportTab === "importance"
                      ? "bg-white text-[#4338CA] shadow-xs font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Feature Importance
                </button>
                <button
                  onClick={() => setActiveReportTab("json")}
                  className={`px-2.5 py-1 rounded transition ${
                    activeReportTab === "json"
                      ? "bg-white text-[#4338CA] shadow-xs font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Execution JSON
                </button>
              </div>
            )}
          </div>

          {!showResults ? (
            <div className='flex flex-1 flex-col items-center justify-center py-10 text-center'>
              <Layers size={24} className='text-slate-300' />
              <p className='mt-2 text-xs font-bold text-slate-700'>
                Pipeline Standing By
              </p>
              <p className='text-[11px] text-slate-400 max-w-[220px]'>
                Click "Execute Agents" above to trigger automated ML pipeline
                execution.
              </p>
            </div>
          ) : (
            <div className='mt-4 flex-1'>
              {/* Leaderboard Tab */}
              {activeReportTab === "leaderboard" && (
                <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-3'>
                  {models.map((m) => (
                    <div
                      key={m.name}
                      className={`rounded-lg border p-3 text-xs transition font-mono ${
                        m.isBest
                          ? "border-[#4338CA] bg-[#EEF2FF]"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <div className='flex items-center justify-between'>
                        <span
                          className={`font-bold ${m.isBest ? "text-[#4338CA]" : "text-slate-800"}`}
                        >
                          {m.name}
                        </span>
                        {m.isBest && (
                          <span className='rounded bg-[#4338CA] px-1.5 py-0.5 text-[8px] font-bold text-white uppercase'>
                            Best
                          </span>
                        )}
                      </div>

                      <div className='mt-2 border-t border-slate-200/60 pt-2 flex justify-between text-[10px] text-slate-600'>
                        <span>
                          Accuracy: <strong>{m.accuracy}</strong>
                        </span>
                        <span>
                          F1 Score:{" "}
                          <strong className='text-[#4338CA]'>{m.f1}</strong>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Feature Importance Tab */}
              {activeReportTab === "importance" && (
                <div className='space-y-2.5 max-w-lg mx-auto font-mono text-xs'>
                  {featureImportances.map((f) => (
                    <div key={f.name} className='space-y-1'>
                      <div className='flex justify-between text-[11px]'>
                        <span className='text-slate-700 font-semibold'>
                          {f.name}
                        </span>
                        <span className='text-[#4338CA] font-bold'>
                          {f.score}%
                        </span>
                      </div>
                      <div className='h-2 w-full overflow-hidden rounded bg-slate-200'>
                        <div
                          className='h-full bg-[#4338CA] rounded'
                          style={{ width: `${f.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* JSON Summary Tab */}
              {activeReportTab === "json" && (
                <div className='rounded-lg bg-slate-900 p-3 font-mono text-[10px] text-teal-400 max-w-lg mx-auto overflow-x-auto'>
                  <pre>
                    {`{
  "dataset": "${currentDataset.name}",
  "best_model": "Voting Ensemble",
  "accuracy": "97.2%",
  "f1_score": "96.2%"
}`}
                  </pre>
                </div>
              )}
            </div>
          )}
        </section>

        {/* BOTTOM SECTION: Horizontal Execution Pipeline Bar */}
        <section className='rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3'>
          <div className='flex items-center justify-between border-b border-slate-100 pb-2.5'>
            <div>
              <h2 className='text-xs font-bold uppercase tracking-wider text-slate-900'>
                3. Automated Agent Workflow Pipeline
              </h2>
              <p className='text-[10px] text-slate-500 mt-0.5 font-medium flex items-center gap-1.5'>
                <Eye size={12} className='text-[#4338CA]' />
                <span>
                  Click any completed agent stage below to inspect its execution
                  output.
                </span>
              </p>
            </div>
            {running && (
              <span className='rounded bg-[#4338CA]/10 px-2 py-0.5 text-[9px] font-bold text-[#4338CA] uppercase tracking-wider animate-pulse'>
                Active Execution
              </span>
            )}
          </div>

          {/* Horizontal Stage Buttons */}
          <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5'>
            {agents.map((agent, index) => {
              const Icon = agent.icon;
              const active = activeStage === index;
              const complete = completedStages.includes(index);

              return (
                <button
                  key={agent.name}
                  disabled={!complete}
                  onClick={() => complete && setSelectedStage(index)}
                  className={`group relative flex flex-col items-center justify-between rounded-lg border p-3 text-center transition-all ${
                    active
                      ? "border-[#4338CA] bg-[#EEF2FF] shadow-xs"
                      : complete
                        ? "border-slate-200 bg-slate-50 hover:border-[#4338CA] hover:bg-white cursor-pointer shadow-2xs"
                        : "border-slate-100 bg-white opacity-40 cursor-default"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded text-xs font-bold ${
                      active
                        ? "bg-[#4338CA] text-white"
                        : complete
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {complete ? <Check size={14} /> : <Icon size={14} />}
                  </div>

                  <p
                    className={`mt-2 text-[11px] font-bold ${active ? "text-[#4338CA]" : "text-slate-800"}`}
                  >
                    {agent.name}
                  </p>

                  <div className='mt-1 text-[9px] font-semibold text-slate-500'>
                    {complete ? (
                      <span className='text-[#4338CA] group-hover:underline flex items-center justify-center gap-0.5'>
                        Inspect Output →
                      </span>
                    ) : active ? (
                      <span className='text-[#4338CA] animate-pulse'>
                        Running...
                      </span>
                    ) : (
                      <span>Pending</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Stage Output Drawer */}
          <AnimatePresence mode='wait'>
            {selectedStage !== null && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className='mt-3 rounded-lg border border-slate-300 bg-slate-900 p-4 text-white text-xs font-mono shadow-md'
              >
                <div className='flex items-center justify-between border-b border-slate-700 pb-2 mb-2'>
                  <span className='font-bold text-[10px] text-teal-400 uppercase tracking-wider flex items-center gap-1.5'>
                    <Eye size={13} />
                    Agent Inspection: {agents[selectedStage].name}
                  </span>
                  <button
                    onClick={() => setSelectedStage(null)}
                    className='text-slate-400 hover:text-white text-xs'
                  >
                    <X size={14} />
                  </button>
                </div>

                {selectedStage === 0 && (
                  <p className='text-[11px] leading-relaxed text-slate-200'>
                    ✓ Cleaned missing entries via Mode/Mean imputation.
                    <br />
                    ✓ Verified target label vector distributions.
                    <br />✓ Checked column variance thresholds.
                  </p>
                )}

                {selectedStage === 1 && (
                  <p className='text-[11px] leading-relaxed text-slate-200'>
                    ✓ Standardized numerical feature columns via StandardScaler.
                    <br />✓ Constructed normalized feature matrices for model
                    input.
                  </p>
                )}

                {selectedStage === 2 && (
                  <p className='text-[11px] leading-relaxed text-slate-200'>
                    ✓ Trained candidate model pool (Trees, Boosting, SVM,
                    Logistic Regression).
                    <br />✓ Tuned hyperparameters using RandomizedSearchCV.
                  </p>
                )}

                {selectedStage === 3 && (
                  <p className='text-[11px] leading-relaxed text-slate-200'>
                    ✓ Combined top 3 estimators into a Voting Ensemble.
                    <br />✓ Validation Accuracy: 97.2%.
                  </p>
                )}

                {selectedStage === 4 && (
                  <p className='text-[11px] leading-relaxed text-slate-200'>
                    ✓ Compiled metrics leaderboard across precision, recall, and
                    F1.
                    <br />✓ Exported structured pipeline execution JSON
                    artifacts.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}

export default AutoMLEngineerDemo;
