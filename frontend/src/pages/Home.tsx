import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className='min-h-screen px-6 sm:px-10 lg:px-16'>
      <section className='mx-auto flex min-h-screen max-w-7xl flex-col justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className='mb-6 text-sm tracking-wide text-neutral-500'>
            Guduru Praneeth
          </p>

          <h1 className='max-w-4xl text-5xl font-medium tracking-[-0.04em] sm:text-7xl lg:text-8xl'>
            AI / ML Engineer
          </h1>

          <p className='mt-8 max-w-xl text-lg leading-relaxed text-neutral-500 sm:text-xl'>
            I build AI and Machine learning systems.
          </p>

          <Link
            to='/projects'
            className='group mt-12 inline-flex items-center gap-3 text-sm font-medium'
          >
            <span className='border-b border-neutral-900 pb-1'>
              View my projects
            </span>

            <ArrowDown
              size={16}
              className='transition-transform duration-300 group-hover:translate-y-1'
            />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

export default Home;
