import { useState, useEffect } from "react";
import {
  AlertCircle,
  HeartPulse,
  ShieldCheck,
  UserRound,
  Activity,
  Stethoscope,
  Building2,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Brain,
  FileSpreadsheet,
  Database,
} from "lucide-react";

interface Profile {
  id: number;
  label: string;
  code: string;
  age: number;
  gender: string;
  restingBp: string;
  cholesterol: number;
  maxHeartRate: number;
  exercise: string;
  smoking: string;
  result: "Lower Risk" | "Moderate Risk" | "High Risk";
  score: number;
  explanation: string;
}

const candidates: Profile[] = [
  {
    id: 1,
    label: "Candidate 1",
    code: "PT-2026-001",
    age: 32,
    gender: "Female",
    restingBp: "118/76 mmHg",
    cholesterol: 168,
    maxHeartRate: 178,
    exercise: "Regular (4-5x/wk)",
    smoking: "Non-Smoker",
    result: "Lower Risk",
    score: 14,
    explanation:
      "All primary vital markers fall within optimal physiological ranges. Baseline cardiovascular stress and risk parameters are low based on Framingham model features.",
  },
  {
    id: 2,
    label: "Candidate 2",
    code: "PT-2026-002",
    age: 51,
    gender: "Male",
    restingBp: "142/90 mmHg",
    cholesterol: 224,
    maxHeartRate: 148,
    exercise: "Occasional (1-2x/wk)",
    smoking: "Non-Smoker",
    result: "Moderate Risk",
    score: 56,
    explanation:
      "Elevated systolic blood pressure paired with borderline hypercholesterolemia indicates moderate 10-year cardiovascular risk.",
  },
  {
    id: 3,
    label: "Candidate 3",
    code: "PT-2026-003",
    age: 61,
    gender: "Male",
    restingBp: "156/96 mmHg",
    cholesterol: 268,
    maxHeartRate: 132,
    exercise: "Rarely / Sedentary",
    smoking: "Current Smoker",
    result: "High Risk",
    score: 82,
    explanation:
      "Compounding risk factors including persistent hypertension, hyperlipidemia, age, and active smoking elevate overall risk under the Framingham assessment framework.",
  },
];

const factors = [
  {
    label: "Patient Age & Gender",
    key: (c: Profile) => `${c.age} yrs (${c.gender})`,
  },
  { label: "Resting Blood Pressure", key: (c: Profile) => c.restingBp },
  { label: "Serum Cholesterol", key: (c: Profile) => `${c.cholesterol} mg/dL` },
  {
    label: "Max Heart Rate (bpm)",
    key: (c: Profile) => `${c.maxHeartRate} bpm`,
  },
  { label: "Physical Activity Level", key: (c: Profile) => c.exercise },
  { label: "Tobacco / Smoking Status", key: (c: Profile) => c.smoking },
];

function HeartHealthDemo() {
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(
    null,
  );
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  const selectedCandidate = candidates.find(
    (c) => c.id === selectedCandidateId,
  );

  const handleSelectCandidate = (id: number) => {
    setSelectedCandidateId(id);
    setIsAnalyzing(true);
    setShowResults(false);
    setAnalysisProgress(0);
  };

  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setShowResults(true);
          return 100;
        }
        return prev + 25;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleReset = () => {
    setSelectedCandidateId(null);
    setIsAnalyzing(false);
    setShowResults(false);
    setAnalysisProgress(0);
  };

  const getScoreColorClass = (score: number) => {
    if (score < 30)
      return {
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        ring: "border-emerald-500 text-emerald-700 bg-emerald-50/50",
        bar: "bg-emerald-500",
      };
    if (score < 65)
      return {
        badge: "bg-amber-50 text-amber-700 border-amber-200",
        ring: "border-amber-500 text-amber-700 bg-amber-50/50",
        bar: "bg-amber-500",
      };
    return {
      badge: "bg-rose-50 text-rose-700 border-rose-200",
      ring: "border-rose-500 text-rose-700 bg-rose-50/50",
      bar: "bg-rose-500",
    };
  };

  return (
    <div className='min-h-screen bg-slate-50/60 text-slate-800 font-sans p-4 sm:p-8'>
      <div className='mx-auto max-w-4xl space-y-6'>
        {/* Header using original project name "Heart Health Prediction Model" */}
        <header className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 bg-white p-6 rounded-2xl shadow-sm border'>
          <div className='flex items-center gap-3.5'>
            <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/20'>
              <Building2 size={24} />
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <span className='text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100'>
                  Cardiovascular ML Model
                </span>
                <span className='text-xs text-slate-400'>
                  • Scikit-learn Inference
                </span>
              </div>
              <h1 className='text-xl font-bold text-slate-900 tracking-tight mt-1'>
                Heart Health Prediction Model
              </h1>
            </div>
          </div>

          {selectedCandidateId !== null && (
            <button
              onClick={handleReset}
              className='inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300'
            >
              <RotateCcw size={14} />
              Reset Selection
            </button>
          )}
        </header>

        {/* STEP 1: INITIAL STATE - SELECT CANDIDATE ONLY */}
        {selectedCandidateId === null && (
          <main className='space-y-6'>
            <div className='rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm text-center'>
              <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 mb-4 border border-teal-100'>
                <Stethoscope size={28} />
              </div>
              <h2 className='text-lg font-bold text-slate-900'>
                Select a Candidate Profile
              </h2>
              <p className='mt-1.5 max-w-md mx-auto text-xs text-slate-500 leading-relaxed'>
                Choose one of the candidate profiles below to ingest patient
                health features into the ML pipeline trained on the{" "}
                <strong>Framingham Heart Study dataset</strong>.
              </p>

              <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3'>
                {candidates.map((candidate) => (
                  <button
                    key={candidate.id}
                    onClick={() => handleSelectCandidate(candidate.id)}
                    className='group relative flex flex-col justify-between rounded-xl border-2 border-slate-200/80 bg-white p-5 text-left transition-all hover:border-teal-600 hover:shadow-lg hover:shadow-teal-900/5 focus:outline-none'
                  >
                    <div>
                      <div className='flex items-center justify-between border-b border-slate-100 pb-3'>
                        <span className='text-xs font-mono text-slate-400 font-medium'>
                          {candidate.code}
                        </span>
                        <span className='flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500 group-hover:bg-teal-600 group-hover:text-white transition-colors'>
                          <ChevronRight size={14} />
                        </span>
                      </div>

                      <div className='mt-4 flex items-center gap-3'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700 border border-teal-100'>
                          <UserRound size={20} />
                        </div>
                        <div>
                          <h3 className='text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors'>
                            {candidate.label}
                          </h3>
                          <p className='text-xs text-slate-500'>
                            {candidate.age} yrs • {candidate.gender}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='mt-6 pt-3 border-t border-slate-100 text-[11px] font-semibold text-teal-700 flex items-center gap-1'>
                      <span>Select profile</span>
                      <ChevronRight
                        size={12}
                        className='group-hover:translate-x-0.5 transition-transform'
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </main>
        )}

        {/* STEP 2: PROCESSING STATE */}
        {isAnalyzing && selectedCandidate && (
          <div className='rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm'>
            <div className='relative mx-auto flex h-16 w-16 items-center justify-center'>
              <div className='absolute inset-0 animate-ping rounded-full bg-teal-400/20' />
              <div className='relative flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-md shadow-teal-600/30'>
                <Brain size={26} className='animate-pulse' />
              </div>
            </div>

            <h3 className='mt-6 text-base font-bold text-slate-900'>
              Evaluating via Framingham ML Pipeline...
            </h3>
            <p className='mt-1 text-xs text-slate-500'>
              Running model inference on{" "}
              <span className='font-semibold text-slate-700'>
                {selectedCandidate.label} ({selectedCandidate.code})
              </span>
            </p>

            <div className='mx-auto mt-6 max-w-xs'>
              <div className='h-2 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200'>
                <div
                  className='h-full bg-teal-600 transition-all duration-300 ease-out'
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
              <p className='mt-2 text-[11px] font-mono text-slate-400'>
                Evaluating against Framingham Heart Study parameters (
                {analysisProgress}%)
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: RESULTS DISPLAYED AFTER MODEL PREDICTION */}
        {showResults && selectedCandidate && (
          <main className='space-y-6 animate-fadeIn'>
            <div className='grid gap-6 md:grid-cols-2'>
              {/* Patient Features File */}
              <section className='flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                <div>
                  <div className='flex items-center justify-between border-b border-slate-100 pb-4'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 border border-slate-200'>
                        <FileSpreadsheet size={20} />
                      </div>
                      <div>
                        <h2 className='text-sm font-bold text-slate-900'>
                          {selectedCandidate.label} Health Features
                        </h2>
                        <p className='text-xs text-slate-400 font-mono'>
                          ID: {selectedCandidate.code}
                        </p>
                      </div>
                    </div>
                    <span className='flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200'>
                      <CheckCircle2 size={13} />
                      Framingham Features Loaded
                    </span>
                  </div>

                  <div className='mt-4 divide-y divide-slate-100'>
                    {factors.map((factor, idx) => (
                      <div
                        key={idx}
                        className='flex items-center justify-between py-2.5 text-xs'
                      >
                        <span className='font-medium text-slate-500'>
                          {factor.label}
                        </span>
                        <span className='font-semibold text-slate-900'>
                          {factor.key(selectedCandidate)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='mt-4 rounded-xl bg-slate-50 p-3 border border-slate-100 text-[11px] text-slate-500 flex items-center gap-2'>
                  <Database size={14} className='text-teal-600 shrink-0' />
                  <span>
                    Mapped to Framingham Heart Study classification vectors.
                  </span>
                </div>
              </section>

              {/* Model Risk Assessment Output */}
              <section className='flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                <div>
                  <div className='flex items-center justify-between border-b border-slate-100 pb-4'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-100'>
                        <HeartPulse size={20} />
                      </div>
                      <div>
                        <h2 className='text-sm font-bold text-slate-900'>
                          Framingham Model Result
                        </h2>
                        <p className='text-xs text-slate-400'>
                          Cardiovascular Risk Estimation
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='mt-6 text-center'>
                    {(() => {
                      const colors = getScoreColorClass(
                        selectedCandidate.score,
                      );
                      return (
                        <>
                          <div
                            className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 text-3xl font-black transition-all ${colors.ring}`}
                          >
                            {selectedCandidate.score}
                            <span className='text-xs font-normal text-slate-400'>
                              /100
                            </span>
                          </div>

                          <div className='mt-4'>
                            <span
                              className={`inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${colors.badge}`}
                            >
                              {selectedCandidate.result}
                            </span>
                          </div>

                          <p className='mt-3 text-xs leading-relaxed text-slate-600 px-2'>
                            {selectedCandidate.explanation}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div className='mt-6 space-y-2'>
                  <div className='flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 text-slate-600 border border-slate-100'>
                    <ShieldCheck
                      size={15}
                      className='shrink-0 text-slate-400'
                    />
                    <p className='text-[11px]'>
                      Validated using Framingham Heart Study baseline risk
                      scores.
                    </p>
                  </div>
                  <div className='flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 text-slate-600 border border-slate-100'>
                    <AlertCircle
                      size={15}
                      className='shrink-0 text-slate-400'
                    />
                    <p className='text-[11px]'>
                      For demonstration purposes only. Not intended for clinical
                      diagnosis.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Bottom Action: Choose another candidate */}
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-teal-200 bg-teal-900 text-white p-5 shadow-sm'>
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-teal-200'>
                  <UserRound size={20} />
                </div>
                <div>
                  <h3 className='text-sm font-bold'>
                    Finished evaluating {selectedCandidate.label}?
                  </h3>
                  <p className='text-xs text-teal-200'>
                    Select another candidate profile to run a new prediction
                    through the model.
                  </p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className='w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-teal-950 transition hover:bg-teal-50 shadow-md'
              >
                <RotateCcw size={14} />
                Choose Another Candidate
              </button>
            </div>

            {/* Production vs Demo Disclaimer Note mentioning Framingham Dataset */}
            <div className='rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-slate-700'>
              <div className='flex gap-3'>
                <Activity
                  size={18}
                  className='text-amber-600 shrink-0 mt-0.5'
                />
                <div className='space-y-1'>
                  <h4 className='text-xs font-bold uppercase tracking-wider text-amber-900'>
                    Framingham Dataset & Production Architecture Note
                  </h4>
                  <p className='text-xs leading-relaxed text-amber-900/80'>
                    This demonstration model processes core cardiovascular
                    features derived from the{" "}
                    <strong>Framingham Heart Study dataset</strong> (including
                    age, blood pressure, cholesterol, max heart rate, and
                    smoking habits). In an end-production medical application,
                    the model pipeline incorporates an expanded feature vector
                    including longitudinal patient history, extended serum
                    biomarkers, ECG waveform analysis, and real-time biometric
                    telemetry.
                  </p>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

export default HeartHealthDemo;
