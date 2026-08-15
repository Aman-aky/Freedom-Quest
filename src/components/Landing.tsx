import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTypewriter } from '@/hooks/useTypewriter';
import { ParticleField } from '@/components/ParticleField';
import { SmokeBackground } from '@/components/SmokeBackground';

interface LandingProps {
  onBegin: () => void;
}

export function Landing({ onBegin }: LandingProps) {
  const { displayed: yearText, done: yearDone } = useTypewriter('INDIA — 1942', 120, 800);

  return (
    <motion.div
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-900/50 px-6 backdrop-blur-[2px]"
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <SmokeBackground />
      <ParticleField count={35} />

      {/* Grain overlay */}
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-40" />
      <div className="vignette pointer-events-none absolute inset-0" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Year typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: yearDone ? 0.5 : 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="font-typewriter text-lg tracking-[0.4em] text-parchment-400 sm:text-xl">
            {yearText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="ml-0.5 inline-block"
            >
              {yearDone ? '' : '|'}
            </motion.span>
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          animate={yearDone ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="font-display text-5xl font-bold leading-tight text-parchment-50 text-glow-ember sm:text-7xl md:text-8xl"
        >
          Freedom Quest
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={yearDone ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-3 font-display text-2xl tracking-[0.2em] text-ember-400 sm:text-3xl"
        >
          1942
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={yearDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 max-w-md font-sans text-sm leading-relaxed text-parchment-300 sm:text-base"
        >
          A Choice. A Movement. A Legacy.
          <br />
          Step into the year India demanded freedom. Every decision you make will echo through history.
        </motion.p>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={yearDone ? { opacity: 0.4 } : {}}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-4 font-typewriter text-[10px] uppercase tracking-widest text-parchment-500"
        >
          Interactive Fiction — Inspired by Historical Events
        </motion.p>

        {/* Begin button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={yearDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBegin}
          className="group mt-12 flex items-center gap-2 rounded-full border border-ember-500/50 bg-ember-600/10 px-8 py-3.5 font-display text-base tracking-wide text-parchment-50 backdrop-blur-sm transition-colors hover:bg-ember-600/30 hover:border-ember-400"
        >
          Begin Your Quest
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>
    </motion.div>
  );
}
