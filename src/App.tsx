import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { GameState, CharacterId, Choice, GamePhase } from '@/types';
import { Landing } from '@/components/Landing';
import { Intro } from '@/components/Intro';
import { CharacterSelection } from '@/components/CharacterSelection';
import { Quest } from '@/components/Quest';
import { Ending } from '@/components/Ending';
import { IndependenceFinale } from '@/components/IndependenceFinale';

const STORAGE_KEY = 'freedom-quest-1942';

const initialState: GameState = {
  phase: 'landing',
  characterId: null,
  currentSceneId: 'scene-01',
  stats: { courage: 0, risk: 0, impact: 0 },
  decisions: [],
  visitedScenes: [],
  startedAt: Date.now(),
};

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as GameState;
      if (parsed && parsed.phase) return parsed;
    }
  } catch {
    // ignore
  }
  return initialState;
}

export default function App() {
  const [state, setState] = useState<GameState>(initialState);

  useEffect(() => {
    setState(loadState());
  }, []);

  const persist = useCallback((next: GameState) => {
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, []);

  const setPhase = (phase: GamePhase) => persist({ ...state, phase });

  const handleBegin = () => setPhase('intro');

  const handleIntroContinue = () => setPhase('character');

  const handleCharacterSelect = (id: CharacterId) =>
    persist({
      ...state,
      phase: 'quest',
      characterId: id,
      currentSceneId: 'scene-01',
      visitedScenes: ['scene-01'],
    });

  const handleChoice = (choice: Choice) => {
    const newStats = {
      courage: state.stats.courage + choice.effects.courage,
      risk: state.stats.risk + choice.effects.risk,
      impact: state.stats.impact + choice.effects.impact,
    };
    const newDecisions = [
      ...state.decisions,
      {
        sceneId: state.currentSceneId,
        choiceText: choice.text,
        effects: choice.effects,
      },
    ];
    persist({ ...state, stats: newStats, decisions: newDecisions });
  };

  const handleContinue = (nextSceneId: string) => {
    if (nextSceneId === 'ending') {
      persist({ ...state, phase: 'ending' });
    } else {
      persist({
        ...state,
        currentSceneId: nextSceneId,
        visitedScenes: [...state.visitedScenes, nextSceneId],
      });
    }
  };

  const handleEndingContinue = () => setPhase('independence');

  const handleRestart = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    persist({ ...initialState, startedAt: Date.now() });
  };

  return (
    <div className="min-h-screen bg-ink-900">
      <AnimatePresence mode="wait">
        {state.phase === 'landing' && <Landing key="landing" onBegin={handleBegin} />}
        {state.phase === 'intro' && <Intro key="intro" onContinue={handleIntroContinue} />}
        {state.phase === 'character' && (
          <CharacterSelection key="character" onSelect={handleCharacterSelect} />
        )}
        {state.phase === 'quest' && state.characterId && (
          <Quest
            key="quest"
            characterId={state.characterId}
            stats={state.stats}
            currentSceneId={state.currentSceneId}
            visitedScenes={state.visitedScenes}
            onChoice={handleChoice}
            onContinue={handleContinue}
          />
        )}
        {state.phase === 'ending' && state.characterId && (
          <Ending
            key="ending"
            characterId={state.characterId}
            stats={state.stats}
            decisions={state.decisions}
            onContinue={handleEndingContinue}
            onRestart={handleRestart}
          />
        )}
        {state.phase === 'independence' && (
          <IndependenceFinale key="independence" onRestart={handleRestart} />
        )}
      </AnimatePresence>
    </div>
  );
}
