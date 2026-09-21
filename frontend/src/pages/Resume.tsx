import { motion } from "motion/react";
import { ArrowLeft, Download, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { projects } from "../data/projects";

export default function Resume() {
  return (
    <main className='min-h-screen bg-[#f7f7f5] px-6 py-8 pb-32 sm:px-10 lg:px-16'>
      <div className='mx-auto max-w-5xl'>
        {/* Navigation - top-left back to Home */}
        <header className='flex items-center justify-between'>
          <Link
            to='/'
            className='group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900'
          >
            <ArrowLeft
              size={14}
              className='transition-transform duration-300 group-hover:-translate-x-1'
            />
            Home
          </Link>

          <Link to='/' className='text-sm font-medium tracking-wide'>
            PRANEETH GUDURU
          </Link>
        </header>

        {/* Hero / Action Header */}
        <section className='pb-12 pt-20 sm:pb-16 sm:pt-28'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'
          >
            <div>
              <p className='mb-4 text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase'>
                CURRICULUM VITAE
              </p>
              <h1 className='text-5xl font-medium tracking-[-0.04em] sm:text-6xl lg:text-7xl'>
                Resume
              </h1>
              <p className='mt-4 max-w-xl text-base text-neutral-500 sm:text-lg'>
                AI / ML Engineer with expertise in RAG pipelines, LLM fine-tuning,
                agentic workflows, and machine learning systems.
              </p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-wrap items-center gap-3 pt-4 sm:pt-0'>
              <a
                href='/resume.pdf'
                download='Guduru_Praneeth_Resume.pdf'
                className='group inline-flex items-center gap-2 rounded-full border border-black bg-black px-6 py-3.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-neutral-800 hover:shadow-lg'
              >
                <Download size={14} />
                <span>Download Resume</span>
              </a>

              <a
                href='/resume.pdf'
                target='_blank'
                rel='noreferrer'
                className='group inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-3 text-xs font-medium text-neutral-800 shadow-xs transition hover:border-neutral-900 hover:bg-neutral-50'
              >
                <span>View Original PDF</span>
                <ExternalLink
                  size={13}
                  className='transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
                />
              </a>
            </div>
          </motion.div>
        </section>

        {/* Structured Resume Content */}
        <div className='border-t border-neutral-200'>
          {/* Header Card */}
          <section className='border-b border-neutral-200 py-10'>
            <div className='flex flex-col justify-between gap-6 md:flex-row md:items-center'>
              <div>
                <h2 className='text-3xl font-medium tracking-tight text-neutral-900'>
                  {profile.name}
                </h2>
                <p className='mt-1 text-base font-medium text-neutral-600'>
                  {profile.title}
                </p>
              </div>

              <div className='flex flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-600'>
                <a
                  href={`mailto:${profile.links.email}`}
                  className='inline-flex items-center gap-1.5 hover:text-neutral-950 hover:underline'
                >
                  <Mail size={13} className='text-neutral-400' />
                  <span>{profile.links.email}</span>
                </a>
                <a
                  href={`tel:${profile.phone}`}
                  className='inline-flex items-center gap-1.5 hover:text-neutral-950 hover:underline'
                >
                  <Phone size={13} className='text-neutral-400' />
                  <span>{profile.phone}</span>
                </a>
                <span className='inline-flex items-center gap-1.5 text-neutral-500'>
                  <MapPin size={13} className='text-neutral-400' />
                  <span>{profile.location}</span>
                </span>
              </div>
            </div>
          </section>

          {/* Professional Summary */}
          <section className='grid gap-8 border-b border-neutral-200 py-12 md:grid-cols-[200px_1fr]'>
            <div>
              <span className='text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase'>
                01 / SUMMARY
              </span>
              <h3 className='mt-2 text-xl font-medium'>Professional Summary</h3>
            </div>
            <div>
              <p className='text-base leading-relaxed text-neutral-600'>
                {profile.summary}
              </p>
            </div>
          </section>

          {/* Technical Skills */}
          <section className='grid gap-8 border-b border-neutral-200 py-12 md:grid-cols-[200px_1fr]'>
            <div>
              <span className='text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase'>
                02 / EXPERTISE
              </span>
              <h3 className='mt-2 text-xl font-medium'>Technical Skills</h3>
            </div>
            <div className='grid gap-6 sm:grid-cols-2'>
              {profile.skillCategories.map((group) => (
                <div
                  key={group.category}
                  className='rounded-xl border border-neutral-200 bg-white p-5'
                >
                  <p className='text-xs font-semibold tracking-wider text-neutral-400 uppercase'>
                    {group.category}
                  </p>
                  <div className='mt-3 flex flex-wrap gap-1.5'>
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className='rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-800'
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Engineering Projects */}
          <section className='grid gap-8 border-b border-neutral-200 py-12 md:grid-cols-[200px_1fr]'>
            <div>
              <span className='text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase'>
                03 / PROJECTS
              </span>
              <h3 className='mt-2 text-xl font-medium'>Key Projects</h3>
            </div>
            <div className='space-y-6'>
              {projects.slice(0, 4).map((proj) => (
                <div
                  key={proj.slug}
                  className='rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8'
                >
                  <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline'>
                    <h4 className='text-lg font-medium text-neutral-900'>
                      {proj.title}
                    </h4>
                    <div className='flex flex-wrap gap-1.5'>
                      {proj.technologies.map((tech) => (
                        <span
                          key={tech}
                          className='rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className='mt-3 text-sm leading-relaxed text-neutral-600'>
                    {proj.description}
                  </p>

                  <div className='mt-4 flex items-center justify-between border-t border-neutral-100 pt-3'>
                    <Link
                      to={`/projects/${proj.slug}`}
                      className='text-xs font-medium text-neutral-900 hover:underline'
                    >
                      View architecture & demo →
                    </Link>
                    <a
                      href={proj.github}
                      target='_blank'
                      rel='noreferrer'
                      className='text-xs text-neutral-500 hover:text-neutral-900'
                    >
                      GitHub repository ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className='grid gap-8 border-b border-neutral-200 py-12 md:grid-cols-[200px_1fr]'>
            <div>
              <span className='text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase'>
                04 / EDUCATION
              </span>
              <h3 className='mt-2 text-xl font-medium'>Education</h3>
            </div>
            <div>
              <div className='rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8'>
                <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline'>
                  <div>
                    <h4 className='text-lg font-medium text-neutral-900'>
                      {profile.education.degree}
                    </h4>
                    <p className='text-sm text-neutral-500'>
                      {profile.education.university} · {profile.education.location}
                    </p>
                  </div>
                  <span className='inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600'>
                    {profile.education.period}
                  </span>
                </div>
                <div className='mt-4 flex items-center gap-2'>
                  <span className='text-xs font-medium text-neutral-400 uppercase tracking-wider'>
                    Performance:
                  </span>
                  <span className='inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-semibold text-emerald-800'>
                    CGPA: {profile.education.cgpa}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Certifications & Achievements */}
          <section className='grid gap-8 py-12 md:grid-cols-[200px_1fr]'>
            <div>
              <span className='text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase'>
                05 / HONORS
              </span>
              <h3 className='mt-2 text-xl font-medium'>Certifications</h3>
            </div>
            <div className='space-y-6'>
              <div className='rounded-2xl border border-neutral-200 bg-white p-6'>
                <p className='text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-4'>
                  Industry Certifications
                </p>
                <ul className='space-y-2.5 text-sm text-neutral-700'>
                  {profile.certifications.map((cert, idx) => (
                    <li key={idx} className='flex items-center gap-2.5'>
                      <span className='h-1.5 w-1.5 rounded-full bg-neutral-900' />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='rounded-2xl border border-amber-200/80 bg-amber-50/40 p-6'>
                <p className='text-xs font-bold tracking-wider text-amber-800 uppercase mb-2'>
                  🏆 Hackathon Award
                </p>
                <p className='text-sm leading-relaxed text-neutral-800'>
                  {profile.achievements[0]}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Navigation */}
        <footer className='mt-8 flex flex-col gap-4 border-t border-neutral-200 py-12 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between'>
          <Link
            to='/'
            className='group inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-900'
          >
            <ArrowLeft
              size={14}
              className='transition-transform group-hover:-translate-x-1'
            />
            Back to Home
          </Link>
          <span>PRANEETH GUDURU · AI / ML ENGINEER</span>
        </footer>
      </div>
    </main>
  );
}
