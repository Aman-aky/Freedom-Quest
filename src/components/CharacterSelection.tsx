import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Feather, Megaphone, Footprints, ArrowRight, Check } from 'lucide-react';
import type { Character, CharacterId } from '@/types';
import { characters } from '@/data/characters';
import { SmokeBackground } from '@/components/SmokeBackground';

interface CharacterSelectionProps {
  onSelect: (id: CharacterId) => void;
}

const iconMap = {
  Feather,
  Megaphone,
  Footprints,
};

export function CharacterSelection({ onSelect }: CharacterSelectionProps) {
  const [selected, setSelected] = useState<CharacterId | null>(null);

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden bg-ink-900 px-6 py-16"
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <SmokeBackground />
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-30" />
      <div className="vignette pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 font-typewriter text-xs uppercase tracking-[0.3em] text-ember-400">
            Choose Your Role
          </p>
          <h2 className="font-display text-3xl font-bold text-parchment-50 sm:text-4xl">
            Who Will You Be?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-parchment-400">
            Your character shapes how you contribute to the movement. Each role carries its own strengths — and its own dangers.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {characters.map((char: Character, index) => {
            const Icon = iconMap[char.icon as keyof typeof iconMap];
            const isSelected = selected === char.id;

            return (
              <motion.button
                key={char.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.03, y: -6 }}
                onClick={() => setSelected(char.id)}
                className={`group relative flex flex-col rounded-2xl border p-6 text-left backdrop-blur-sm transition-colors ${
                  isSelected
                    ? 'border-ember-400 bg-ember-600/15 shadow-[0_0_40px_rgba(239,125,42,0.25)]'
                    : 'border-parchment-700/30 bg-ink-700/50 hover:border-parchment-500/40'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="selected-glow"
                    className="absolute -inset-px -z-10 rounded-2xl"
                    style={{
                      boxShadow: '0 0 30px rgba(239,125,42,0.3), inset 0 0 20px rgba(239,125,42,0.1)',
                    }}
                  />
                )}

                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-ink-800 ring-1 ring-parchment-700/30">
                    <Icon className="h-7 w-7 text-ember-400" />
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-ember-500"
                    >
                      <Check className="h-4 w-4 text-ink-900" />
                    </motion.div>
                  )}
                </div>

                <h3 className="font-display text-xl font-semibold text-parchment-50">
                  {char.name}
                </h3>
                <p className="mt-1 text-xs text-parchment-400">{char.role}</p>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-parchment-300">
                  {char.description}
                </p>

                <div className="mt-5 space-y-2 border-t border-parchment-700/20 pt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-parchment-500">Strength</span>
                    <span className="font-medium text-parchment-200">{char.strength}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-parchment-500">Risk Level</span>
                    <span className={`font-medium ${char.risk === 'High' || char.risk === 'Very High' ? 'text-ember-400' : 'text-parchment-200'}`}>
                      {char.risk}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-parchment-500">Impact</span>
                    <span className="font-medium text-parchment-200">{char.impact}</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-10 flex justify-center"
            >
              <button
                onClick={() => onSelect(selected)}
                className="group flex items-center gap-2 rounded-full bg-ember-600 px-8 py-3.5 font-display text-base text-ink-900 transition-colors hover:bg-ember-500"
              >
                Enter 1942
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
