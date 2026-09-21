import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Cpu, Bot, GraduationCap, Layers, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <main className='min-h-screen bg-[#f7f7f5] px-6 sm:px-10 lg:px-16'>
      <div className='mx-auto max-w-7xl'>
        {/* Minimal Header - NO name here to ensure name appears only once */}
        <header className='flex items-center justify-between py-8'>
          <div className='flex items-center gap-2'>
            <span className='h-2 w-2 rounded-full bg-neutral-900' />
            <span className='text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase'>
              Portfolio
            </span>
          </div>

          <nav className='flex items-center gap-5 text-sm text-neutral-500 sm:gap-7'>
            <Link
              to='/projects'
              className='transition-colors hover:text-neutral-900'
            >
              Projects
            </Link>
            <Link
              to='/resume'
              className='transition-colors hover:text-neutral-900'
            >
              Resume
            </Link>
            <Link
              to='/contact'
              className='transition-colors hover:text-neutral-900'
            >
              Contact
            </Link>
            <img
              src='/pic.jpg'
              alt='Guduru Praneeth'
              className='h-11 w-11 rounded-full object-cover border border-neutral-300/90 shadow-xs transition-transform hover:scale-105'
            />
          </nav>
        </header>

        {/* Hero Section - Name Styled in Patrick Bateman Business Card Style */}
        <section className='pb-20 pt-10 sm:pb-28 sm:pt-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Patrick Bateman Style Business Card */}
            <div className='relative overflow-hidden rounded-2xl border border-[#dedcd2] bg-[#f8f7f2] p-8 sm:p-12 md:p-14 shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_18px_50px_rgba(0,0,0,0.09)]'>
              {/* Subtle bone / eggshell card inner texture effect */}
              <div className='absolute inset-0 bg-gradient-to-tr from-stone-300/15 via-transparent to-amber-100/10 pointer-events-none' />

              <div className='relative z-10 space-y-6'>
                {/* Header row of card */}
                <div className='flex flex-wrap items-center justify-between gap-3 border-b border-[#e2e0d5] pb-4 text-[11px] sm:text-xs tracking-[0.25em] text-neutral-500 uppercase font-serif'>
                  <span>AI / ML ENGINEER</span>
                  <span>HYDERABAD, INDIA</span>
                </div>

                {/* Name in iconic Patrick Bateman Silian Rail / Serif typography */}
                <div>
                  <h1 className='text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium tracking-[0.1em] text-[#1c1b18] uppercase leading-tight sm:leading-none py-1'>
                    Guduru Praneeth
                  </h1>
                </div>

                {/* Footer row of card */}
                <div className='flex flex-wrap items-center justify-between gap-3 border-t border-[#e2e0d5] pt-4 text-[10px] sm:text-xs tracking-[0.2em] text-neutral-600 uppercase font-serif'>
                  <span>MALLA REDDY UNIVERSITY</span>
                  <span> GEN AI · LLMS · RAG PIPELINES</span>
                </div>
              </div>
            </div>

            <p className='mt-10 max-w-2xl text-xl leading-relaxed text-neutral-700 sm:text-2xl'>
              Building practical machine learning, agentic AI, RAG pipelines,
              and fine-tuned language model systems.
            </p>

            <p className='mt-4 max-w-2xl text-base leading-relaxed text-neutral-500'>
              B.Tech in Computer Science & Engineering (AI & ML) graduate from
              Malla Reddy University. Specialized in bridging cutting-edge AI
              research with production-grade engineering workflows.
            </p>

            <div className='mt-10 flex flex-wrap items-center gap-6'>
              <Link
                to='/projects'
                className='group inline-flex items-center gap-3 rounded-full border border-neutral-900 bg-white px-6 py-3.5 text-sm font-medium text-neutral-900 shadow-xs transition-all hover:bg-neutral-900 hover:text-white'
              >
                <span>View all projects</span>
                <ArrowDown
                  size={15}
                  className='transition-transform duration-300 group-hover:translate-y-0.5'
                />
              </Link>

              <Link
                to='/resume'
                className='inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-medium text-neutral-800 shadow-xs transition hover:border-neutral-900 hover:bg-neutral-50'
              >
                <span>View Resume</span>
              </Link>

              <Link
                to='/contact'
                className='text-sm font-medium text-neutral-600 transition hover:text-neutral-950 hover:underline'
              >
                Get in touch →
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Quick Highlights Bar */}
        <section className='border-y border-neutral-200 py-10'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
            <div className='flex items-start gap-4'>
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800'>
                <Cpu size={18} />
              </div>
              <div>
                <p className='text-2xl font-semibold text-neutral-950'>
                  7 Projects
                </p>
                <p className='mt-1 text-xs text-neutral-500'>
                  Interactive demos across Agents, RAG, PEFT, and CV
                </p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800'>
                <GraduationCap size={18} />
              </div>
              <div>
                <p className='text-2xl font-semibold text-neutral-950'>
                  8.84 CGPA
                </p>
                <p className='mt-1 text-xs text-neutral-500'>
                  B.Tech CSE (AI & ML) · Malla Reddy University
                </p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800'>
                <Zap size={18} />
              </div>
              <div>
                <p className='text-2xl font-semibold text-neutral-950'>
                  End-to-End
                </p>
                <p className='mt-1 text-xs text-neutral-500'>
                  Production-grade ML & Agentic Architectures
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Specialization Areas */}
        <section className='py-20'>
          <div className='flex flex-col justify-between gap-4 md:flex-row md:items-end mb-12'>
            <div>
              <p className='text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase'>
                CORE EXPERTISE
              </p>
              <h2 className='mt-3 text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl'>
                Areas of Focus
              </h2>
            </div>
            <p className='max-w-md text-sm text-neutral-500'>
              Hands-on engineering across the modern machine learning and generative
              AI lifecycle.
            </p>
          </div>

          <div className='grid gap-6 md:grid-cols-3'>
            <div className='rounded-2xl border border-neutral-200 bg-white p-7 shadow-xs'>
              <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800 mb-5'>
                <Bot size={18} />
              </div>
              <h3 className='text-lg font-medium text-neutral-900'>
                J & RAG
              </h3>
              <p className='mt-3 text-sm leading-relaxed text-neutral-600'>
                Multi-agent architectures with LangGraph and Model Context Protocol (MCP),
                plus corrective RAG systems with HNSW indexing and latency optimization.
              </p>
              <div className='mt-5 flex flex-wrap gap-1.5'>
                {["LangGraph", "MCP", "FastAPI", "ChromaDB"].map((tag) => (
                  <span
                    key={tag}
                    className='rounded bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className='rounded-2xl border border-neutral-200 bg-white p-7 shadow-xs'>
              <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800 mb-5'>
                <Cpu size={18} />
              </div>
              <h3 className='text-lg font-medium text-neutral-900'>
                LLM Fine-Tuning (PEFT)
              </h3>
              <p className='mt-3 text-sm leading-relaxed text-neutral-600'>
                Adapting open-source foundation models (e.g. Qwen2-1.5B) using
                QLoRA and 4-bit quantization under hardware constraints with
                dramatic perplexity reductions.
              </p>
              <div className='mt-5 flex flex-wrap gap-1.5'>
                {["QLoRA", "PyTorch", "Hugging Face", "PEFT"].map((tag) => (
                  <span
                    key={tag}
                    className='rounded bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className='rounded-2xl border border-neutral-200 bg-white p-7 shadow-xs'>
              <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800 mb-5'>
                <Layers size={18} />
              </div>
              <h3 className='text-lg font-medium text-neutral-900'>
                Machine Learning & CV
              </h3>
              <p className='mt-3 text-sm leading-relaxed text-neutral-600'>
                Automated ML pipelines covering data auditing, feature engineering,
                cross-model hyperparameter tuning, and real-time computer vision embeddings.
              </p>
              <div className='mt-5 flex flex-wrap gap-1.5'>
                {["Scikit-learn", "XGBoost", "OpenCV", "Pandas"].map((tag) => (
                  <span
                    key={tag}
                    className='rounded bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Selected Projects Showcase */}
        <section className='border-t border-neutral-200 py-20'>
          <div className='flex flex-col justify-between gap-4 md:flex-row md:items-end mb-12'>
            <div>
              <p className='text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase'>
                SELECTED WORK
              </p>
              <h2 className='mt-3 text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl'>
                Featured Projects
              </h2>
            </div>
            <Link
              to='/projects'
              className='inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:underline'
            >
              <span>View all 7 projects</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className='grid gap-6 md:grid-cols-3'>
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className='group rounded-2xl border border-neutral-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-900 hover:shadow-md'
              >
                <div className='flex items-start justify-between'>
                  <span className='rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600'>
                    {project.technologies[0]} · {project.technologies[1]}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className='text-neutral-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900'
                  />
                </div>

                <h3 className='mt-5 text-xl font-medium text-neutral-900 group-hover:underline'>
                  {project.title}
                </h3>

                <p className='mt-2.5 text-xs leading-relaxed text-neutral-500 line-clamp-3'>
                  {project.shortDescription}
                </p>

                <div className='mt-6 border-t border-neutral-100 pt-4 flex items-center justify-between text-xs font-medium text-neutral-700'>
                  <span>Explore Architecture</span>
                  <span className='text-neutral-400 group-hover:text-neutral-900'>
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className='flex flex-col gap-4 border-t border-neutral-200 py-12 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between'>
          <nav className='flex items-center gap-6 text-xs text-neutral-500'>
            <Link to='/projects' className='hover:text-neutral-900'>
              Projects
            </Link>
            <Link to='/resume' className='hover:text-neutral-900'>
              Resume
            </Link>
            <Link to='/contact' className='hover:text-neutral-900'>
              Contact
            </Link>
          </nav>
          <span className='text-xs'>HYDERABAD, INDIA · PORTFOLIO 2026</span>
        </footer>
      </div>
    </main>
  );
}

export default Home;
