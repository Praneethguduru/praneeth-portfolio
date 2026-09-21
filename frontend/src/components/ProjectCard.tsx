import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: "easeOut",
      }}
      className='group relative border-b border-neutral-200'
    >
      <div className='relative py-10 sm:py-12'>
        <div className='flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
          {/* Project information */}
          <Link to={`/projects/${project.slug}`} className='min-w-0 flex-1'>
            <div className='flex items-start gap-5'>
              {/* Project number */}
              <span className='mt-1 text-xs font-medium tracking-wide text-neutral-400'>
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className='min-w-0'>
                {/* Title */}
                <div className='flex items-center gap-3'>
                  <h2 className='text-2xl font-medium tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl'>
                    {project.title}
                  </h2>

                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.7}
                    className='shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100'
                  />
                </div>

                {/* Description */}
                <p className='mt-4 max-w-2xl text-base leading-7 text-neutral-500'>
                  {project.shortDescription}
                </p>

                {/* Technologies */}
                <div className='mt-6 flex flex-wrap gap-2'>
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className='rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-500 transition-colors duration-300 group-hover:border-neutral-300'
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>

          {/* Actions */}
          <div className='flex shrink-0 items-center gap-4 pl-9 lg:pl-0'>
            {/* Explore */}
            <Link
              to={`/projects/${project.slug}`}
              className='group/explore inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors duration-200 hover:text-neutral-900'
            >
              Explore
              <ArrowUpRight
                size={15}
                className='transition-transform duration-200 group-hover/explore:-translate-y-0.5 group-hover/explore:translate-x-0.5'
              />
            </Link>

            {/* Try Demo */}
            <Link
              to={`/projects/${project.slug}/demo`}
              className='group/demo inline-flex items-center gap-3 rounded-full border border-neutral-900 bg-transparent px-5 py-2.5 text-sm font-medium text-neutral-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-900 hover:text-white'
            >
              <span>Try Demo</span>

              <ArrowRight
                size={15}
                strokeWidth={1.8}
                className='transition-transform duration-300 group-hover/demo:translate-x-1'
              />
            </Link>
          </div>
        </div>

        {/* Animated bottom line */}
        <div className='absolute bottom-0 left-0 h-px w-0 bg-neutral-900 transition-all duration-500 ease-out group-hover:w-full' />
      </div>
    </motion.article>
  );
}

export default ProjectCard;
