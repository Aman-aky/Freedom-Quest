import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { ParticleField } from '@/components/ParticleField';
import { useTypewriter } from '@/hooks/useTypewriter';

interface IndependenceFinaleProps {
  onRestart: () => void;
}

export function IndependenceFinale({ onRestart }: IndependenceFinaleProps) {
  const { displayed: dateText, done: dateDone } = useTypewriter('15 AUGUST 1947', 130, 1200);
  const { displayed: freedomText, done: freedomDone } = useTypewriter('INDIA IS FREE', 140, 0);

  return (
    <motion.div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-900 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Tricolor glow background */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,153,51,0.12) 0%, transparent 50%), radial-gradient(ellipse at top, rgba(19,136,8,0.08) 0%, transparent 40%), radial-gradient(ellipse at bottom, rgba(0,0,128,0.08) 0%, transparent 40%)',
        }}
      />

      <ParticleField count={50} color="rgba(255,153,51,0.4)" />

      <div className="paper-grain pointer-events-none absolute inset-0 opacity-20" />
      <div className="vignette pointer-events-none absolute inset-0" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="font-typewriter text-base tracking-[0.3em] text-parchment-400 sm:text-xl">
            {dateText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="ml-0.5 inline-block"
            >
              {dateDone ? '' : '|'}
            </motion.span>
          </span>
        </motion.div>

        {/* INDIA IS FREE */}
        {dateDone && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            animate={dateDone ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="mt-8 font-display text-5xl font-black leading-tight text-parchment-50 text-glow-ember sm:text-7xl md:text-8xl"
          >
            {freedomText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="ml-1 inline-block"
            >
              {freedomDone ? '' : '|'}
            </motion.span>
          </motion.h1>
        )}

        {/* Tricolor flag */}
        {freedomDone && (
          <motion.div
            initial={{ opacity: 0, y: 30, scaleY: 0 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-10 overflow-hidden rounded-lg shadow-2xl"
            style={{ transformOrigin: 'top' }}
          >
            <div className="h-2 w-16 sm:h-3 sm:w-24" style={{ backgroundColor: '#FF9933' }} />
            <div className="flex h-3 items-center justify-center bg-white sm:h-5 sm:w-24" style={{ width: 'auto' }}>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="h-6 w-6 sm:h-10 sm:w-10"
              >
                <svg viewBox="0 0 40 40" className="h-full w-full">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="#000080" strokeWidth="1.5" />
                  <circle cx="20" cy="20" r="3" fill="#000080" />
                  {[...Array(12)].map((_, i) => (
                    <line
                      key={i}
                      x1="20"
                      y1="20"
                      x2={20 + 17 * Math.cos((i * Math.PI) / 6)}
                      y2={20 + 17 * Math.sin((i * Math.PI) / 6)}
                      stroke="#000080"
                      strokeWidth="0.8"
                    />
                  ))}
                </svg>
              </motion.div>
            </div>
            <div className="h-2 w-16 sm:h-3 sm:w-24" style={{ backgroundColor: '#138808' }} />
          </motion.div>
        )}

        {/* JAI HIND */}
        {freedomDone && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-10 font-display text-3xl font-bold tracking-[0.3em] text-ember-400 sm:text-4xl"
          >
            JAI HIND
          </motion.p>
        )}

        {/* Message */}
        {freedomDone && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-parchment-300"
          >
            You walked through five years of struggle. You made choices that mattered. And now, at the stroke of the midnight hour, India awakes to life and freedom.
          </motion.p>
        )}

        {/* Restart */}
        {freedomDone && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onRestart}
            className="mt-12 flex items-center gap-2 rounded-full border border-ember-500/50 bg-ember-600/10 px-8 py-3.5 font-display text-base text-parchment-50 backdrop-blur-sm transition-colors hover:bg-ember-600/30"
          >
            <RotateCcw className="h-4 w-4" />
            Begin Again
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
