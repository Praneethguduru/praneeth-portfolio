import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import DataPilotDemo from "../components/demos/DataPilotDemo";
import VeritasDemo from "../components/demos/VeritasDemo";
import AutoMLEngineerDemo from "../components/demos/AutoMLEngineerDemo";
import FinanceLLMDemo from "../components/demos/FinanceLLMDemo";
import MentalHealthDemo from "../components/demos/MentalHealthDemo";
import HeartHealthDemo from "../components/demos/HeartHealthDemo";
import FaceRecognitionDemo from "../components/demos/FaceRecognitionDemo";

function Demo() {
  const { slug } = useParams();

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <main className='flex min-h-screen items-center justify-center bg-[#f7f7f5] px-6'>
        <div className='text-center'>
          <p className='text-sm text-neutral-400'>404</p>

          <h1 className='mt-3 text-3xl font-medium'>Demo not found</h1>

          <Link
            to='/projects'
            className='mt-8 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900'
          >
            <ArrowLeft size={15} />
            Back to projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-[#f7f7f5] px-6 py-8 sm:px-10 lg:px-16'>
      <div className='mx-auto max-w-7xl'>
        <header className='flex items-center justify-between'>
          <Link
            to={`/projects/${project.slug}`}
            className='group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900'
          >
            <ArrowLeft
              size={14}
              className='transition-transform duration-300 group-hover:-translate-x-1'
            />
            Back to project
          </Link>

          <span className='text-sm font-medium'>PRANEETH GUDURU</span>
        </header>

        <section className='pt-28 sm:pt-36'>
          <p className='text-xs font-medium tracking-[0.2em] text-neutral-400'>
            INTERACTIVE DEMO
          </p>

          <h1 className='mt-5 text-5xl font-medium tracking-[-0.05em] sm:text-7xl'>
            {project.title}
          </h1>

          <p className='mt-6 max-w-2xl text-lg leading-8 text-neutral-500'>
            This is an interactive demonstration of the project. The demo is a
            simplified representation of the full implementation.
          </p>

          <div className='mt-16 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 lg:p-10'>
            {slug === "datapilot" ? (
              <DataPilotDemo />
            ) : slug === "veritas" ? (
              <VeritasDemo />
            ) : slug === "automl-engineer" ? (
              <AutoMLEngineerDemo />
            ) : slug === "finance-llm" ? (
              <FinanceLLMDemo />
            ) : slug === "mental-health-chatbot" ? (
              <MentalHealthDemo />
            ) : slug === "heart-health-ai" ? (
              <HeartHealthDemo />
            ) : slug === "face-recognition-attendance" ? (
              <FaceRecognitionDemo />
            ) : (
              <div className='flex min-h-[300px] items-center justify-center'>
                <div className='text-center'>
                  <p className='text-sm text-neutral-400'>Demo interface</p>

                  <p className='mt-3 text-xl font-medium'>{project.title}</p>

                  <p className='mt-2 text-sm text-neutral-500'>
                    We are building this interaction next.
                  </p>
                </div>
              </div>
            )}
          </div>

          <p className='mt-6 text-xs leading-5 text-neutral-400'>
            Demo only. The final project implementation may differ. No visitor
            data is stored.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Demo;
