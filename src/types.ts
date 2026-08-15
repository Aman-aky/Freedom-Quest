export type CharacterId = 'journalist' | 'organizer' | 'messenger';

export interface Character {
  id: CharacterId;
  name: string;
  role: string;
  description: string;
  strength: string;
  risk: 'Medium' | 'High' | 'Very High';
  impact: 'High' | 'Very High';
  icon: string;
  accent: string;
}

export interface ChoiceEffects {
  courage: number;
  risk: number;
  impact: number;
}

export interface Choice {
  id: string;
  text: string;
  consequence: string;
  effects: ChoiceEffects;
  nextScene: string;
}

export interface HistoricalRecord {
  date: string;
  title: string;
  fact: string;
}

export interface Scene {
  id: string;
  year: number;
  location: string;
  title: string;
  narration: string;
  historicalRecord?: HistoricalRecord;
  choices: Choice[];
  isFinal?: boolean;
}

export type GamePhase =
  | 'landing'
  | 'intro'
  | 'character'
  | 'quest'
  | 'ending'
  | 'independence';

export interface GameState {
  phase: GamePhase;
  characterId: CharacterId | null;
  currentSceneId: string;
  stats: { courage: number; risk: number; impact: number };
  decisions: { sceneId: string; choiceText: string; effects: ChoiceEffects }[];
  visitedScenes: string[];
  startedAt: number;
}
