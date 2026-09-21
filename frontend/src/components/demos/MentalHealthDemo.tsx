import { useEffect, useRef, useState } from "react";
import { HeartHandshake, RefreshCw, Sparkles, User, Wind } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const suggestedQuestions = [
  {
    id: "overwhelmed",
    label: "Feeling overwhelmed",
    question: "I've been feeling overwhelmed with everything lately.",
    getResponse: (name: string) =>
      `Hi ${name}, it sounds like several things may be weighing on you at once. Taking things one step at a time can make an overwhelming situation feel much more manageable.`,
  },
  {
    id: "sleep",
    label: "Trouble sleeping",
    question:
      "I've been having trouble sleeping because I keep thinking about things.",
    getResponse: (name: string) =>
      `When your thoughts keep running at night, ${name}, it can help to create some distance from them. A consistent wind-down routine and writing down what's on your mind can make settling in easier.`,
  },
  {
    id: "isolated",
    label: "Feeling isolated",
    question: "I've been feeling disconnected from people around me.",
    getResponse: (name: string) =>
      `Feeling disconnected can be really tough, ${name}. Reaching out to someone you trust—even for a brief text or call—can be a gentle first step forward.`,
  },
  {
    id: "anxiety",
    label: "Managing anxiety",
    question: "I feel anxious and can't seem to calm my mind.",
    getResponse: (name: string) =>
      `Take a slow breath, ${name}. Anxiety can make everything feel urgent, but you are safe right now. Try grounding yourself by focusing on three things you can see around you.`,
  },
  {
    id: "burnout",
    label: "Exhaustion & burnout",
    question: "I feel completely drained and emotionally exhausted.",
    getResponse: (name: string) =>
      `Burnout is a sign that you've been carrying too much for too long, ${name}. Give yourself permission to pause today, even if it's just for five quiet minutes.`,
  },
  {
    id: "self_worth",
    label: "Self-doubt",
    question: "I've been feeling like I'm not doing enough or good enough.",
    getResponse: (name: string) =>
      `Be kind to yourself, ${name}. You don't have to be productive or perfect to deserve peace and rest. You are doing the best you can right now.`,
  },
];

export default function MentalHealthDemo() {
  const [userName, setUserName] = useState<string>("");
  const [tempName, setTempName] = useState<string>("");
  const [isNameSubmitted, setIsNameSubmitted] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    setUserName(tempName.trim());
    setIsNameSubmitted(true);
  };

  const handleSelectOption = (option: (typeof suggestedQuestions)[number]) => {
    if (isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: option.question,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const botResponseText = option.getResponse(userName);

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botResponseText,
        timestamp: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1100);
  };

  const handleReset = () => {
    setMessages([]);
    setIsTyping(false);
  };

  return (
    <div className='relative mx-auto flex h-[700px] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/20 shadow-xl'>
      {/* Name Input Modal Backdrop Overlay */}
      {!isNameSubmitted && (
        <div className='absolute inset-0 z-50 flex items-center justify-center bg-emerald-950/20 backdrop-blur-md p-6'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className='w-full max-w-sm rounded-3xl border border-emerald-100 bg-white/95 p-7 shadow-2xl backdrop-blur-lg'
          >
            <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 shadow-inner'>
              <HeartHandshake size={28} />
            </div>
            <h2 className='mt-5 text-xl font-semibold text-emerald-950'>
              Welcome to Your Safe Space
            </h2>
            <p className='mt-1.5 text-xs text-emerald-600/80 leading-relaxed'>
              Please tell us your preferred name so we can tailor our
              conversation to you.
            </p>

            <form onSubmit={handleNameSubmit} className='mt-6 space-y-3.5'>
              <input
                type='text'
                required
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder='Enter your name...'
                className='w-full rounded-2xl border border-emerald-200/80 bg-emerald-50/30 px-4 py-3 text-xs text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all'
                autoFocus
              />
              <button
                type='submit'
                disabled={!tempName.trim()}
                className='w-full rounded-2xl bg-emerald-700 py-3 text-xs font-medium text-white transition hover:bg-emerald-800 shadow-md shadow-emerald-700/20 disabled:opacity-40'
              >
                Begin Mindful Space
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Main Chat Interface */}
      <div
        className={`flex h-full flex-col ${
          !isNameSubmitted ? "blur-md pointer-events-none" : ""
        }`}
      >
        {/* Soothing Header */}
        <header className='flex items-center justify-between border-b border-emerald-100/80 bg-white/70 backdrop-blur-md px-6 py-4'>
          <div className='flex items-center gap-3.5'>
            <div className='relative flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20'>
              <HeartHandshake size={20} />
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-sm font-semibold text-emerald-950'>
                  Mindful Assistant
                </h1>
                {/* Soothing Breathing Pulse Indicator */}
                <div className='flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 border border-emerald-200/60'>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className='text-emerald-600'
                  >
                    <Wind size={10} />
                  </motion.div>
                  <span className='text-[10px] font-medium text-emerald-700'>
                    Breathe
                  </span>
                </div>
              </div>
              <p className='text-[11px] text-emerald-600/80'>
                {userName
                  ? `Safe space for ${userName}`
                  : "Always here to support"}
              </p>
            </div>
          </div>

          {messages.length > 0 && (
            <button
              onClick={handleReset}
              className='inline-flex items-center gap-1.5 rounded-xl border border-emerald-200/60 bg-emerald-50/50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100/80 hover:text-emerald-900'
            >
              <RefreshCw size={12} />
              Reset
            </button>
          )}
        </header>

        {/* Messages Container */}
        <div className='flex-1 space-y-4 overflow-y-auto p-6'>
          {messages.length === 0 ? (
            <div className='flex h-full flex-col justify-center items-center text-center max-w-md mx-auto'>
              <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-700 mb-3 shadow-inner'>
                <Sparkles size={22} />
              </div>
              <p className='text-base font-semibold text-emerald-950'>
                Hello, {userName || "there"}.
              </p>
              <p className='mt-1 text-xs text-emerald-600/80 leading-relaxed max-w-xs'>
                Take a deep breath. Select what best describes what you are
                feeling right now.
              </p>

              <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full'>
                {suggestedQuestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectOption(item)}
                    className='w-full rounded-2xl border border-emerald-200/70 bg-white/90 p-3.5 text-left text-xs font-medium text-emerald-900 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50/50 hover:shadow-md'
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className='mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200/50'>
                    <HeartHandshake size={14} />
                  </div>
                )}

                <div
                  className={`max-w-[80%] space-y-1 ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-emerald-800 text-white shadow-sm"
                        : "bg-white border border-emerald-100 text-emerald-950 shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <p
                    className={`px-1 text-[10px] text-emerald-500/70 ${
                      msg.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>

                {msg.sender === "user" && (
                  <div className='mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-sm'>
                    <User size={14} />
                  </div>
                )}
              </motion.div>
            ))
          )}

          {/* Soothing Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className='flex items-center gap-3'
              >
                <div className='flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700'>
                  <HeartHandshake size={14} />
                </div>
                <div className='rounded-2xl bg-white border border-emerald-100 px-4 py-3 shadow-sm'>
                  <div className='flex gap-1.5 items-center'>
                    <span className='h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.3s]' />
                    <span className='h-2 w-2 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.15s]' />
                    <span className='h-2 w-2 animate-bounce rounded-full bg-emerald-600' />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={chatEndRef} />
        </div>

        {/* Options Panel & Bottom Reset Control */}
        <div className='border-t border-emerald-100 bg-white/80 backdrop-blur-md p-4 space-y-3'>
          <div className='flex items-center justify-between'>
            <p className='text-[11px] font-medium text-emerald-700'>
              Select an area to explore:
            </p>
            {messages.length > 0 && (
              <button
                onClick={handleReset}
                className='inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 hover:text-emerald-800 transition'
              >
                <RefreshCw size={11} /> Reset conversation
              </button>
            )}
          </div>

          <div className='flex flex-wrap gap-2 max-h-28 overflow-y-auto pr-1'>
            {suggestedQuestions.map((item) => (
              <button
                key={item.id}
                disabled={isTyping}
                onClick={() => handleSelectOption(item)}
                className='rounded-xl border border-emerald-200/70 bg-emerald-50/40 px-3 py-2 text-xs font-medium text-emerald-900 transition hover:border-emerald-600 hover:bg-emerald-100/60 disabled:cursor-not-allowed disabled:opacity-50'
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
