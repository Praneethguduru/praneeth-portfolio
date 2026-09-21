import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
      <path d='M9 18c-4.51 2-5-2-7-2' />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
      <rect width='4' height='12' x='2' y='9' />
      <circle cx='4' cy='4' r='2' />
    </svg>
  );
}

export default function Contact() {
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

          <div className='flex items-center gap-3.5'>
            <Link to='/' className='text-sm font-medium tracking-wide'>
              PRANEETH GUDURU
            </Link>
            <img
              src='/pic.jpg'
              alt='Guduru Praneeth'
              className='h-11 w-11 rounded-full object-cover border border-neutral-300/90 shadow-xs transition-transform hover:scale-105'
            />
          </div>
        </header>

        {/* Page introduction */}
        <section className='pb-16 pt-24 sm:pb-20 sm:pt-36'>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className='mb-5 text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase'>
              GET IN TOUCH
            </p>

            <h1 className='max-w-4xl text-5xl font-medium tracking-[-0.05em] sm:text-7xl lg:text-8xl'>
              Contact
            </h1>

            <p className='mt-8 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-lg'>
              Interested in collaborating on AI/ML systems, discussing technical
              challenges, or exploring opportunities? Feel free to reach out.
            </p>
          </motion.div>
        </section>

        {/* Contact Methods */}
        <section className='border-t border-neutral-200 py-12'>
          <div className='grid gap-6 sm:grid-cols-2'>
            {/* Email */}
            <motion.a
              href={`mailto:${profile.links.email}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className='group rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 transition-all hover:border-neutral-900 hover:shadow-md'
            >
              <div className='flex items-center justify-between'>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800 transition group-hover:bg-neutral-900 group-hover:text-white'>
                  <Mail size={18} />
                </div>
                <ArrowUpRight
                  size={18}
                  className='text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900'
                />
              </div>

              <div className='mt-8'>
                <span className='text-xs font-medium text-neutral-400 uppercase tracking-wider'>
                  Email
                </span>
                <p className='mt-1 text-lg font-medium text-neutral-900'>
                  {profile.links.email}
                </p>
                <p className='mt-2 text-xs text-neutral-500'>
                  Send a direct message via your preferred email client
                </p>
              </div>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href={profile.links.linkedin}
              target='_blank'
              rel='noreferrer'
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className='group rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 transition-all hover:border-neutral-900 hover:shadow-md'
            >
              <div className='flex items-center justify-between'>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800 transition group-hover:bg-neutral-900 group-hover:text-white'>
                  <LinkedinIcon size={18} />
                </div>
                <ArrowUpRight
                  size={18}
                  className='text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900'
                />
              </div>

              <div className='mt-8'>
                <span className='text-xs font-medium text-neutral-400 uppercase tracking-wider'>
                  LinkedIn
                </span>
                <p className='mt-1 text-lg font-medium text-neutral-900'>
                  praneethguduru
                </p>
                <p className='mt-2 text-xs text-neutral-500'>
                  Connect professionally and view endorsements
                </p>
              </div>
            </motion.a>

            {/* GitHub */}
            <motion.a
              href={profile.links.github}
              target='_blank'
              rel='noreferrer'
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className='group rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 transition-all hover:border-neutral-900 hover:shadow-md'
            >
              <div className='flex items-center justify-between'>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800 transition group-hover:bg-neutral-900 group-hover:text-white'>
                  <GithubIcon size={18} />
                </div>
                <ArrowUpRight
                  size={18}
                  className='text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900'
                />
              </div>

              <div className='mt-8'>
                <span className='text-xs font-medium text-neutral-400 uppercase tracking-wider'>
                  GitHub
                </span>
                <p className='mt-1 text-lg font-medium text-neutral-900'>
                  Praneethguduru
                </p>
                <p className='mt-2 text-xs text-neutral-500'>
                  Browse open-source repositories and code implementations
                </p>
              </div>
            </motion.a>

            {/* Location & Phone */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className='rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8'
            >
              <div className='flex items-center justify-between'>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800'>
                  <MapPin size={18} />
                </div>
              </div>

              <div className='mt-8 space-y-4'>
                <div>
                  <span className='text-xs font-medium text-neutral-400 uppercase tracking-wider'>
                    Location
                  </span>
                  <p className='mt-1 text-lg font-medium text-neutral-900'>
                    {profile.location}
                  </p>
                </div>

                <div className='border-t border-neutral-100 pt-3 flex items-center justify-between text-xs text-neutral-500'>
                  <span className='flex items-center gap-1.5'>
                    <Phone size={12} className='text-neutral-400' />
                    {profile.phone}
                  </span>
                  <span>IST (UTC+5:30)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className='border-t border-neutral-200 py-12 text-sm text-neutral-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
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
