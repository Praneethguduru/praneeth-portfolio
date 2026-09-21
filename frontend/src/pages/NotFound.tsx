import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-[#f7f7f5] px-6 text-center'>
      <div>
        <p className='text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase'>
          404
        </p>

        <h1 className='mt-4 text-4xl font-medium tracking-tight sm:text-5xl'>
          Page not found
        </h1>

        <div className='mt-8'>
          <Link
            to='/'
            className='group inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900'
          >
            <ArrowLeft
              size={14}
              className='transition-transform duration-300 group-hover:-translate-x-1'
            />
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
