import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";

function ProjectDetails() {
  const { slug } = useParams();

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <main className='flex min-h-screen items-center justify-center bg-[#f7f7f5] px-6'>
        <div className='text-center'>
          <p className='text-sm text-neutral-400'>404</p>

          <h1 className='mt-3 text-3xl font-medium'>Project not found</h1>

          <Link
            to='/projects'
            className='mt-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900'
          >
            <ArrowLeft size={15} />
            Back to projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-[#f7f7f5] px-6 py-8 pb-32 sm:px-10 lg:px-16'>
      <div className='mx-auto max-w-6xl'>
        {/* Header */}
        <header className='flex items-center justify-between'>
          <Link to='/' className='text-sm font-medium tracking-wide'>
            PRANEETH GUDURU
          </Link>

          <Link
            to='/projects'
            className='group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900'
          >
            <ArrowLeft
              size={14}
              className='transition-transform duration-300 group-hover:-translate-x-1'
            />
            Projects
          </Link>
        </header>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='pt-28 sm:pt-36'
        >
          <div className='flex items-start gap-5'>
            <span className='mt-2 text-xs font-medium tracking-wide text-neutral-400'>
              PROJECT
            </span>

            <div>
              <h1 className='max-w-5xl text-5xl font-medium tracking-[-0.05em] sm:text-7xl lg:text-8xl'>
                {project.title}
              </h1>

              <p className='mt-8 max-w-3xl text-lg leading-8 text-neutral-500 sm:text-xl'>
                {project.description}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Technologies */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='mt-20 border-y border-neutral-200 py-8'
        >
          <div className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
            <span className='text-sm text-neutral-400'>Technologies</span>

            <div className='flex flex-wrap gap-2'>
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className='rounded-full border border-neutral-200 px-4 py-2 text-xs text-neutral-600'
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className='grid gap-10 py-24 md:grid-cols-[220px_1fr]'
        >
          <div>
            <span className='text-xs font-medium tracking-[0.2em] text-neutral-400'>
              01
            </span>

            <h2 className='mt-3 text-2xl font-medium'>Overview</h2>
          </div>

          <div className='max-w-3xl space-y-6 text-base leading-8 text-neutral-600'>
            <p>{project.description}</p>

            <p>
              The project focuses on building a complete workflow rather than
              treating the machine learning model as an isolated component.
            </p>

            <p>
              The implementation combines data processing, system logic, model
              or AI components, and an interface that demonstrates the resulting
              workflow.
            </p>
          </div>
        </motion.section>

        {/* How it works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className='border-t border-neutral-200 py-24'
        >
          <div className='grid gap-10 md:grid-cols-[220px_1fr]'>
            <div>
              <span className='text-xs font-medium tracking-[0.2em] text-neutral-400'>
                02
              </span>

              <h2 className='mt-3 text-2xl font-medium'>How it works</h2>
            </div>

            <div className='max-w-3xl'>
              {["Input", "Processing", "Model / System", "Output"].map(
                (step, index) => (
                  <div
                    key={step}
                    className='group flex items-center justify-between border-b border-neutral-200 py-6'
                  >
                    <div className='flex items-center gap-5'>
                      <span className='text-xs text-neutral-400'>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className='text-lg'>{step}</span>
                    </div>

                    <ArrowRight
                      size={16}
                      className='text-neutral-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-neutral-900'
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </motion.section>

        {/* Implementation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className='border-t border-neutral-200 py-24'
        >
          <div className='grid gap-10 md:grid-cols-[220px_1fr]'>
            <div>
              <span className='text-xs font-medium tracking-[0.2em] text-neutral-400'>
                03
              </span>

              <h2 className='mt-3 text-2xl font-medium'>Implementation</h2>
            </div>

            <div className='max-w-3xl'>
              <p className='text-base leading-8 text-neutral-600'>
                The system was implemented using the technologies listed above,
                with individual components working together as part of a
                complete application workflow.
              </p>
            </div>
          </div>
        </motion.section>

        {/* GitHub */}
        <section className='border-t border-neutral-200 py-12'>
          <a
            href={project.github}
            target='_blank'
            rel='noreferrer'
            className='group inline-flex items-center gap-2 text-sm font-medium'
          >
            View source on GitHub
            <ArrowUpRight
              size={15}
              className='transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
            />
          </a>
        </section>

        {/* Footer */}
        <footer className='border-t border-neutral-200 py-12 text-sm text-neutral-400'>
          PRANEETH GUDURU · AI / ML ENGINEER
        </footer>
      </div>

      {/* Fixed Demo Button */}
      <Link
        to={`/projects/${project.slug}/demo`}
        className='group fixed bottom-6 right-6 z-50 inline-flex items-center gap-4 rounded-full border border-neutral-300 bg-[#f7f7f5] px-6 py-3.5 text-sm font-medium text-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-900 hover:bg-white hover:shadow-md sm:bottom-8 sm:right-8'
      >
        <span>Try Demo</span>

        <ArrowRight
          size={16}
          className='transition-transform duration-300 group-hover:translate-x-1'
        />
      </Link>
    </main>
  );
}

export default ProjectDetails;
