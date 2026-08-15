import { motion } from 'framer-motion';
import { ScrollText, X } from 'lucide-react';
import type { HistoricalRecord as HR } from '@/types';

interface HistoricalRecordProps {
  record: HR;
  onContinue: () => void;
}

export function HistoricalRecord({ record, onContinue }: HistoricalRecordProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/90 px-4 py-8 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onContinue}
    >
      <motion.div
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto scrollbar-thin"
        initial={{ scale: 0.85, y: 30, rotateX: 15 }}
        animate={{ scale: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ perspective: 1000 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Paper document */}
        <div className="relative rounded-lg bg-gradient-to-br from-parchment-50 to-parchment-100 p-8 shadow-2xl">
          {/* Paper texture */}
          <div className="paper-grain pointer-events-none absolute inset-0 rounded-lg opacity-30" />

          {/* Aged edges */}
          <div
            className="pointer-events-none absolute inset-0 rounded-lg"
            style={{
              boxShadow:
                'inset 0 0 60px rgba(139,90,43,0.3), inset 0 0 8px rgba(77,50,25,0.2)',
            }}
          />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative flex items-center gap-2 border-b-2 border-parchment-600/40 pb-3"
          >
            <ScrollText className="h-5 w-5 text-parchment-700" />
            <span className="font-typewriter text-xs uppercase tracking-[0.25em] text-parchment-700">
              Historical Record
            </span>
          </motion.div>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative mt-4 font-typewriter text-sm uppercase tracking-widest text-parchment-600"
          >
            {record.date}
          </motion.p>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="relative mt-2 font-display text-2xl font-bold text-ink-800"
          >
            {record.title}
          </motion.h3>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="relative my-4 h-px origin-left bg-parchment-600/30"
          />

          {/* Fact */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="relative font-sans text-sm leading-relaxed text-ink-700"
          >
            {record.fact}
          </motion.p>

          {/* Stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 1.5, rotate: -20 }}
            animate={{ opacity: 0.7, scale: 1, rotate: -12 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="relative mt-6 flex justify-end"
          >
            <span className="rounded border-2 border-ember-600/50 px-3 py-1 font-typewriter text-[10px] uppercase tracking-widest text-ember-700">
              Verified Fact
            </span>
          </motion.div>

          {/* Close button */}
          <button
            onClick={onContinue}
            className="absolute right-3 top-3 rounded-full p-1.5 text-parchment-700 transition-colors hover:bg-parchment-200/60"
            aria-label="Close record"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-4 text-center font-typewriter text-xs text-parchment-500"
        >
          Tap to continue your journey
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
