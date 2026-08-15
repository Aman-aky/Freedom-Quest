import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, BookOpen } from 'lucide-react';
import type { Scene, Choice, ChoiceEffects, CharacterId } from '@/types';
import { scenes } from '@/data/scenes';
import { characters } from '@/data/characters';
import { StatMeter } from '@/components/StatMeter';
import { ProgressTimeline } from '@/components/ProgressTimeline';
import { HistoricalRecord } from '@/components/HistoricalRecord';
import { SmokeBackground } from '@/components/SmokeBackground';

interface QuestProps {
  characterId: CharacterId;
  stats: { courage: number; risk: number; impact: number };
  currentSceneId: string;
  visitedScenes: string[];
  onChoice: (choice: Choice) => void;
  onContinue: (nextSceneId: string) => void;
}

type Stage = 'narration' | 'choices' | 'consequence' | 'record';

export function Quest({
  characterId,
  stats,
  currentSceneId,
  visitedScenes,
  onChoice,
  onContinue,
}: QuestProps) {
  const scene: Scene = scenes[currentSceneId];
  const character = characters.find((c) => c.id === characterId)!;

  const [stage, setStage] = useState<Stage>('narration');
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [prevStats, setPrevStats] = useState(stats);
  const [showRecord, setShowRecord] = useState(false);

  useEffect(() => {
    setStage('narration');
    setSelectedChoice(null);
    setPrevStats(stats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSceneId]);

  const visitedYears = [...new Set(visitedScenes.map((id) => scenes[id]?.year).filter(Boolean))];

  const handleSelectChoice = (choice: Choice) => {
    setSelectedChoice(choice);
    setPrevStats(stats);
    setStage('consequence');
    onChoice(choice);
  };

  const handleContinueFromConsequence = () => {
    if (scene.historicalRecord) {
      setShowRecord(true);
    } else {
      setStage('choices');
      // No record — proceed to next scene directly
      if (selectedChoice) {
        onContinue(selectedChoice.nextScene);
      }
    }
  };

  const handleRecordClose = () => {
    setShowRecord(false);
    if (selectedChoice) {
      onContinue(selectedChoice.nextScene);
    }
  };

  const deltas: ChoiceEffects | undefined = selectedChoice
    ? {
        courage: stats.courage - prevStats.courage,
        risk: stats.risk - prevStats.risk,
        impact: stats.impact - prevStats.impact,
      }
    : undefined;

  return (
    <motion.div
      className="relative z-10 min-h-screen overflow-hidden bg-ink-900/50 backdrop-blur-[2px]"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <SmokeBackground />
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-25" />
      <div className="vignette pointer-events-none absolute inset-0" />

      {/* Top bar: timeline */}
      <div className="relative z-10 border-b border-parchment-700/20 bg-ink-800/40 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-typewriter text-xs uppercase tracking-widest text-parchment-500">
              {character.name}
            </span>
            <span className="font-typewriter text-xs uppercase tracking-widest text-parchment-500">
              Scene {visitedScenes.length}
            </span>
          </div>
          <ProgressTimeline currentYear={scene.year} visitedYears={visitedYears} />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {/* NARRATION STAGE */}
          {stage === 'narration' && (
            <motion.div
              key="narration"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 flex items-center gap-2 text-ember-400">
                <MapPin className="h-4 w-4" />
                <span className="font-typewriter text-xs uppercase tracking-widest">
                  {scene.year} · {scene.location}
                </span>
              </div>

              <h2 className="font-display text-3xl font-bold text-parchment-50 sm:text-4xl">
                {scene.title}
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-6 font-sans text-base leading-relaxed text-parchment-200 sm:text-lg"
              >
                {scene.narration}
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStage('choices')}
                className="mt-8 flex items-center gap-2 rounded-full border border-parchment-600/30 bg-ink-700/50 px-6 py-2.5 font-display text-sm text-parchment-100 transition-colors hover:border-ember-400/50"
              >
                What will you do?
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          )}

          {/* CHOICES STAGE */}
          {stage === 'choices' && (
            <motion.div
              key="choices"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 flex items-center gap-2 text-ember-400">
                <MapPin className="h-4 w-4" />
                <span className="font-typewriter text-xs uppercase tracking-widest">
                  {scene.year} · {scene.location}
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold text-parchment-50 sm:text-3xl">
                {scene.title}
              </h2>

              <p className="mt-3 font-typewriter text-xs uppercase tracking-widest text-parchment-500">
                Choose your action
              </p>

              <div className="mt-6 space-y-3">
                {scene.choices.map((choice, i) => (
                  <motion.button
                    key={choice.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectChoice(choice)}
                    className="group flex w-full items-start gap-3 rounded-xl border border-parchment-700/30 bg-ink-700/50 p-4 text-left backdrop-blur-sm transition-colors hover:border-ember-400/50 hover:bg-ember-600/10"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ink-800 font-display text-sm font-bold text-ember-400 ring-1 ring-parchment-700/30">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="font-sans text-sm leading-relaxed text-parchment-200 group-hover:text-parchment-50">
                      {choice.text}
                    </span>
                  </motion.button>
                ))}
              </div>

              {scene.historicalRecord && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => setShowRecord(true)}
                  className="mt-6 flex items-center gap-2 text-xs text-parchment-500 transition-colors hover:text-ember-400"
                >
                  <BookOpen className="h-4 w-4" />
                  View Historical Record
                </motion.button>
              )}
            </motion.div>
          )}

          {/* CONSEQUENCE STAGE */}
          {stage === 'consequence' && selectedChoice && (
            <motion.div
              key="consequence"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 flex items-center gap-2 text-ember-400">
                <MapPin className="h-4 w-4" />
                <span className="font-typewriter text-xs uppercase tracking-widest">
                  {scene.year} · {scene.location}
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold text-parchment-50 sm:text-3xl">
                The Consequence
              </h2>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-4 rounded-xl border border-ember-500/30 bg-ember-600/10 p-4"
              >
                <p className="mb-2 font-typewriter text-xs uppercase tracking-widest text-ember-400">
                  You chose:
                </p>
                <p className="font-sans text-sm text-parchment-200">{selectedChoice.text}</p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-6 font-sans text-base leading-relaxed text-parchment-200"
              >
                {selectedChoice.consequence}
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 space-y-4 rounded-xl border border-parchment-700/20 bg-ink-800/40 p-5"
              >
                <p className="font-typewriter text-xs uppercase tracking-widest text-parchment-500">
                  Your Statistics
                </p>
                <StatMeter label="Courage" value={stats.courage} delta={deltas?.courage} icon="courage" delay={0.1} />
                <StatMeter label="Risk" value={stats.risk} delta={deltas?.risk} icon="risk" delay={0.2} />
                <StatMeter label="Impact" value={stats.impact} delta={deltas?.impact} icon="impact" delay={0.3} />
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContinueFromConsequence}
                className="mt-8 flex items-center gap-2 rounded-full bg-ember-600 px-7 py-3 font-display text-sm text-ink-900 transition-colors hover:bg-ember-500"
              >
                {scene.historicalRecord ? 'View Historical Record' : 'Continue'}
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Historical Record Modal */}
      <AnimatePresence>
        {showRecord && scene.historicalRecord && (
          <HistoricalRecord
            key="record-modal"
            record={scene.historicalRecord}
            onContinue={
              stage === 'consequence'
                ? handleRecordClose
                : () => setShowRecord(false)
            }
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
