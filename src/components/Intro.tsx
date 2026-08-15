import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTypewriter } from '@/hooks/useTypewriter';
import { SmokeBackground } from '@/components/SmokeBackground';

interface IntroProps {
  onContinue: () => void;
}

export function Intro({ onContinue }: IntroProps) {
  const { displayed, done } = useTypewriter(
    'In August 1942, the Indian National Congress passed a resolution that shook the British Empire to its core. The call was simple — "Quit India." The response was anything but. Across the country, ordinary people made extraordinary choices. They printed pamphlets in secret. They marched into baton charges. They carried messages through the night. Many were arrested. Many were beaten. Some never came home. But the movement did not die. It grew. Five years later, at the stroke of midnight on August 15, 1947, India was free. This is the story of those five years. And you are in it.',
    22,
    400
  );

  return (
    <motion.div
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden bg-ink-900/50 px-6 backdrop-blur-[2px]"
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <SmokeBackground />
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-30" />
      <div className="vignette pointer-events-none absolute inset-0" />

      <div className="relative z-10 max-w-2xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center font-typewriter text-xs uppercase tracking-[0.3em] text-ember-400"
        >
          Historical Introduction
        </motion.p>

        <p className="font-typewriter text-sm leading-relaxed text-parchment-200 sm:text-base">
          {displayed}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="ml-0.5 inline-block"
          >
            {done ? '' : '|'}
          </motion.span>
        </p>

        {done && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 flex justify-center"
          >
            <button
              onClick={onContinue}
              className="group flex items-center gap-2 rounded-full border border-parchment-600/40 bg-ink-700/60 px-7 py-3 font-display text-sm tracking-wide text-parchment-100 backdrop-blur-sm transition-colors hover:border-ember-400/60 hover:bg-ember-600/20"
            >
              Choose Your Path
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
