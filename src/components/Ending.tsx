import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';
import type { CharacterId, ChoiceEffects } from '@/types';
import { characters } from '@/data/characters';
import { scenes, sceneOrder } from '@/data/scenes';
import { StatMeter } from '@/components/StatMeter';
import { ProgressTimeline } from '@/components/ProgressTimeline';
import { SmokeBackground } from '@/components/SmokeBackground';

interface EndingProps {
  characterId: CharacterId;
  stats: { courage: number; risk: number; impact: number };
  decisions: { sceneId: string; choiceText: string; effects: ChoiceEffects }[];
  onContinue: () => void;
  onRestart: () => void;
}

export function Ending({ characterId, stats, decisions, onContinue, onRestart }: EndingProps) {
  const character = characters.find((c) => c.id === characterId)!;
  const visitedYears = sceneOrder.map((id) => scenes[id].year);
  const totalDecisions = decisions.length;

  const getRank = () => {
    const total = stats.courage + stats.impact;
    if (total >= 120) return { label: 'Freedom Fighter', desc: 'Your courage and impact shaped the course of the movement.' };
    if (total >= 80) return { label: 'Dedicated Activist', desc: 'You stood firm when it mattered and made a real difference.' };
    if (total >= 50) return { label: 'Quiet Resister', desc: 'You contributed in your own way, and every contribution counted.' };
    return { label: 'Cautious Observer', desc: 'You witnessed history unfold. Sometimes survival itself is a form of resistance.' };
  };

  const rank = getRank();

  return (
    <motion.div
      className="relative z-10 min-h-screen overflow-hidden bg-ink-900/50 px-4 py-12 backdrop-blur-[2px]"
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <SmokeBackground />
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-25" />
      <div className="vignette pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-3 font-typewriter text-xs uppercase tracking-[0.3em] text-ember-400">
            Journey Summary
          </p>
          <h2 className="font-display text-3xl font-bold text-parchment-50 sm:text-4xl">
            Your Journey
          </h2>
          <p className="mt-2 text-sm text-parchment-400">
            {character.name} · {totalDecisions} decisions made
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-xl border border-parchment-700/20 bg-ink-800/40 p-5"
        >
          <p className="mb-4 font-typewriter text-xs uppercase tracking-widest text-parchment-500">
            Five Years of Struggle
          </p>
          <ProgressTimeline currentYear={1947} visitedYears={visitedYears} />
        </motion.div>

        {/* Rank */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 rounded-xl border border-ember-500/30 bg-ember-600/10 p-6 text-center"
        >
          <p className="font-typewriter text-xs uppercase tracking-widest text-ember-400">
            Your Role in History
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold text-parchment-50">
            {rank.label}
          </h3>
          <p className="mt-2 text-sm text-parchment-300">{rank.desc}</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 space-y-4 rounded-xl border border-parchment-700/20 bg-ink-800/40 p-5"
        >
          <p className="font-typewriter text-xs uppercase tracking-widest text-parchment-500">
            Final Statistics
          </p>
          <StatMeter label="Courage" value={stats.courage} icon="courage" delay={0.1} />
          <StatMeter label="Risk" value={stats.risk} icon="risk" delay={0.2} />
          <StatMeter label="Impact" value={stats.impact} icon="impact" delay={0.3} />
        </motion.div>

        {/* Decisions log */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 rounded-xl border border-parchment-700/20 bg-ink-800/40 p-5"
        >
          <p className="mb-3 font-typewriter text-xs uppercase tracking-widest text-parchment-500">
            Decisions You Made
          </p>
          <div className="space-y-3">
            {decisions.map((d, i) => {
              const scene = scenes[d.sceneId];
              return (
                <div key={i} className="flex gap-3 border-l-2 border-ember-500/30 pl-3">
                  <div className="flex-1">
                    <p className="text-xs text-parchment-500">
                      {scene?.year} · {scene?.location}
                    </p>
                    <p className="text-sm text-parchment-200">{d.choiceText}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <button
            onClick={onContinue}
            className="group flex items-center gap-2 rounded-full bg-ember-600 px-8 py-3.5 font-display text-base text-ink-900 transition-colors hover:bg-ember-500"
          >
            Witness Independence
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 rounded-full border border-parchment-600/30 px-6 py-3.5 font-display text-sm text-parchment-300 transition-colors hover:border-ember-400/40 hover:text-parchment-100"
          >
            <RotateCcw className="h-4 w-4" />
            Play Again
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
