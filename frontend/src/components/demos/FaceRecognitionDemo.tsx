import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Camera,
  CheckCircle2,
  RefreshCw,
  ScanFace,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UserPlus,
} from "lucide-react";

type EnrolledUser = {
  id: string;
  name: string;
  role: string;
  snapshotUrl: string;
  enrolledAt: string;
};

type FaceRegistrationPortalProps = {
  onBack?: () => void;
};

export default function FaceRegistrationPortal({
  onBack,
}: FaceRegistrationPortalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Status State
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("Student");

  // Scan & Enrollment State
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [enrolledUsers, setEnrolledUsers] = useState<EnrolledUser[]>([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Ensure camera hardware turns off on unmount or tab unload
  useEffect(() => {
    const handleUnload = () => {
      stopCamera();
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      stopCamera();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  async function startCamera() {
    try {
      setErrorMessage(null);

      if (!navigator.mediaDevices?.getUserMedia) {
        setErrorMessage("Webcam access is not supported by your browser.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Camera access was denied or device is unavailable.");
    }
  }

  function handleVideoPlay() {
    setCameraReady(true);
  }

  function stopCamera() {
    if (videoRef.current) {
      videoRef.current.pause();

      const stream = videoRef.current.srcObject as MediaStream | null;
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.enabled = false;
          track.stop();
          stream.removeTrack(track);
        });
      }

      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
    setCameraReady(false);
  }

  function handleBackToProjects() {
    stopCamera();
    if (onBack) {
      onBack();
    }
  }

  async function captureFace() {
    if (!videoRef.current || !cameraReady || isProcessing) return;

    setIsProcessing(true);
    setErrorMessage(null);

    // 10-Second Timeout Guard
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(
        () =>
          reject(new Error("Demo is not working. Sorry, models were removed.")),
        10000,
      ),
    );

    // Simulated Scan Routine
    const scanPromise = new Promise<string>((resolve) => {
      setTimeout(() => {
        const video = videoRef.current;
        if (!video) return;

        const canvas = canvasRef.current || document.createElement("canvas");
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg"));
        }
      }, 2500);
    });

    try {
      const capturedImage = await Promise.race([scanPromise, timeoutPromise]);
      setSnapshot(capturedImage);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || "Demo is not working. Sorry, models were removed.",
      );
      stopCamera();
    } finally {
      setIsProcessing(false);
    }
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !snapshot) return;

    const newUser: EnrolledUser = {
      id: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
      name: fullName.trim(),
      role,
      snapshotUrl: snapshot,
      enrolledAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setEnrolledUsers((prev) => [newUser, ...prev]);
    setRegistrationSuccess(true);

    setTimeout(() => {
      resetScan();
      setFullName("");
      setRegistrationSuccess(false);
    }, 2000);
  }

  function resetScan() {
    setSnapshot(null);
    setErrorMessage(null);
  }

  return (
    <div className='mx-auto max-w-6xl space-y-8 p-4 font-sans sm:p-6'>
      {/* Navigation & Header */}
      <div className='flex items-center justify-between'>
        <button
          onClick={handleBackToProjects}
          className='inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900'
        >
          <ArrowLeft size={14} />
          Back to Projects
        </button>

        <div className='flex items-center gap-3'>
          <span className='text-xs font-medium text-neutral-500'>
            Demo Status:
          </span>

          <span className='inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700'>
            <span className='h-2 w-2 rounded-full bg-emerald-500' />
            Camera System Ready
          </span>
        </div>
      </div>

      <header className='flex flex-col gap-2 border-b border-neutral-200 pb-6 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500'>
            <ShieldCheck size={16} className='text-emerald-600' />
            Identity Management
          </div>

          <h1 className='mt-1 text-2xl font-semibold tracking-tight text-neutral-900'>
            Biometric Face Enrollment
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className='grid gap-8 lg:grid-cols-12'>
        {/* Left: Camera Station */}
        <section className='space-y-4 lg:col-span-7'>
          <div className='relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950'>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onLoadedMetadata={handleVideoPlay}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                snapshot ? "hidden" : "block"
              }`}
            />

            <canvas ref={canvasRef} className='hidden' />

            {/* Display Snapshot */}
            {snapshot && (
              <img
                src={snapshot}
                alt='Captured Face'
                className='h-full w-full object-cover'
              />
            )}

            {/* Camera Offline State */}
            {!cameraActive && !snapshot && (
              <div className='p-6 text-center space-y-3'>
                <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-neutral-400'>
                  <Camera size={24} />
                </div>

                <p className='text-sm font-medium text-neutral-300'>
                  Camera Feed Offline
                </p>

                <button
                  onClick={startCamera}
                  className='inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-neutral-900 transition hover:bg-neutral-200'
                >
                  Start Camera
                </button>
              </div>
            )}

            {/* Live Animation Overlay */}
            {cameraReady && !snapshot && (
              <>
                <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                  <div
                    className={`h-64 w-52 rounded-[3rem] border-2 transition-all duration-300 ${
                      isProcessing
                        ? "animate-pulse border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.5)]"
                        : "border-dashed border-white/60 shadow-[0_0_0_9999px_rgba(0,0,0,0.3)]"
                    }`}
                  />
                </div>

                {isProcessing && (
                  <div className='pointer-events-none absolute inset-x-0 top-1/4 h-0.5 animate-bounce bg-emerald-400 shadow-[0_0_12px_#34d399]' />
                )}

                <div className='absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur'>
                  <span className='h-2 w-2 animate-pulse rounded-full bg-red-500' />
                  Live Preview
                </div>
              </>
            )}

            {/* Captured Badge */}
            {snapshot && (
              <div className='absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-medium text-white backdrop-blur'>
                <CheckCircle2 size={14} />
                Face Captured
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className='flex items-center justify-between gap-3'>
            {!snapshot ? (
              <div className='flex w-full gap-2'>
                <button
                  onClick={captureFace}
                  disabled={!cameraReady || isProcessing}
                  className='inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-40'
                >
                  {isProcessing ? (
                    <RefreshCw size={16} className='animate-spin' />
                  ) : (
                    <ScanFace size={16} />
                  )}
                  {isProcessing
                    ? "Scanning Features..."
                    : "Scan & Capture Face"}
                </button>

                {cameraActive && (
                  <button
                    onClick={stopCamera}
                    className='rounded-xl border border-neutral-300 px-4 py-3 text-xs font-medium text-neutral-700 transition hover:bg-neutral-100'
                  >
                    Turn Off
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={resetScan}
                className='inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50'
              >
                <RefreshCw size={16} />
                Retake Photo
              </button>
            )}
          </div>

          {errorMessage && (
            <div className='flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700'>
              <AlertCircle size={16} className='mt-0.5 shrink-0 text-red-500' />
              <span>{errorMessage}</span>
            </div>
          )}
        </section>

        {/* Right: Registration Form & Roster */}
        <section className='space-y-6 lg:col-span-5'>
          <div className='rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm'>
            <h2 className='flex items-center gap-2 text-lg font-semibold text-neutral-900'>
              <UserPlus size={18} />
              Register Identity
            </h2>

            <p className='mt-1 text-xs text-neutral-500'>
              Enter user details to complete registration.
            </p>

            <form onSubmit={handleRegister} className='mt-5 space-y-4'>
              <div>
                <label className='block text-xs font-medium text-neutral-700'>
                  Full Name
                </label>

                <input
                  type='text'
                  required
                  placeholder='e.g. Praneeth'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className='mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none'
                />
              </div>

              <div>
                <label className='block text-xs font-medium text-neutral-700'>
                  Role / Designation
                </label>

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className='mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none'
                >
                  <option value='Student'>Student</option>
                  <option value='Faculty'>Faculty</option>
                  <option value='Staff'>Staff</option>
                  <option value='Visitor'>Visitor</option>
                </select>
              </div>

              <button
                type='submit'
                disabled={!snapshot || !fullName.trim() || registrationSuccess}
                className='inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-40'
              >
                {registrationSuccess ? (
                  <>
                    <Sparkles size={16} />
                    Registered Successfully!
                  </>
                ) : (
                  <>
                    <UserCheck size={16} />
                    Save & Complete Registration
                  </>
                )}
              </button>
            </form>
          </div>

          <div className='rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm'>
            <h3 className='text-sm font-semibold text-neutral-900'>
              Enrolled Records ({enrolledUsers.length})
            </h3>

            {enrolledUsers.length === 0 ? (
              <p className='mt-3 text-xs text-neutral-400'>
                No profiles registered in this session yet.
              </p>
            ) : (
              <div className='mt-4 max-h-56 space-y-3 overflow-y-auto pr-1'>
                {enrolledUsers.map((user) => (
                  <div
                    key={user.id}
                    className='flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 p-2.5'
                  >
                    <div className='flex items-center gap-3'>
                      <img
                        src={user.snapshotUrl}
                        alt={user.name}
                        className='h-10 w-10 rounded-lg object-cover'
                      />

                      <div>
                        <p className='text-sm font-medium text-neutral-900'>
                          {user.name}
                        </p>

                        <p className='text-xs text-neutral-400'>
                          {user.role} • {user.id}
                        </p>
                      </div>
                    </div>

                    <span className='text-[10px] text-neutral-400'>
                      {user.enrolledAt}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
