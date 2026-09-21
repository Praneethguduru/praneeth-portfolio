import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  return (
    <main className='min-h-screen bg-[#f7f7f5] px-6 py-8 sm:px-10 lg:px-16'>
      <div className='mx-auto max-w-7xl'>
        {/* Navigation */}
        <header className='flex items-center justify-between'>
          <Link to='/' className='text-sm font-medium tracking-wide'>
            PRANEETH GUDURU
          </Link>

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
        </header>

        {/* Page introduction */}
        <section className='pb-16 pt-28 sm:pb-20 sm:pt-36'>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className='mb-5 text-xs font-medium tracking-[0.2em] text-neutral-400'>
              SELECTED WORK
            </p>

            <h1 className='max-w-4xl text-5xl font-medium tracking-[-0.05em] sm:text-7xl lg:text-8xl'>
              Projects
            </h1>

            <p className='mt-8 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-lg'>
              A collection of machine learning, AI, computer vision, and data
              engineering projects I've built and explored.
            </p>
          </motion.div>
        </section>

        {/* Projects */}
        <section className='border-t border-neutral-200'>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </section>

        {/* Footer */}
        <footer className='flex flex-col gap-4 py-12 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between'>
          <span>PRANEETH GUDURU</span>

          <span>AI / ML Engineer</span>
        </footer>
      </div>
    </main>
  );
}

export default Projects;
