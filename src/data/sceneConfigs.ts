export type SceneVisualId =
  | 'landing'
  | 'intro'
  | 'character'
  | 'printing-press'
  | 'protest-march'
  | 'night-mission'
  | 'underground'
  | 'crackdown'
  | 'negotiation'
  | 'finale'
  | 'ending';

export interface SceneConfig {
  id: SceneVisualId;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  ambientColor: string;
  ambientIntensity: number;
  keyLightColor: string;
  keyLightIntensity: number;
  keyLightPosition: [number, number, number];
  rimLightColor: string;
  rimLightIntensity: number;
  particleColor: string;
  particleCount: number;
  particleSize: number;
  particleSpread: number;
  particleSpeed: number;
  accentColor: string;
  accentColor2: string;
  geometry: 'press' | 'protest' | 'mission' | 'underground' | 'crackdown' | 'negotiation' | 'finale' | 'default';
  cameraDrift: number;
}

export const sceneConfigs: Record<SceneVisualId, SceneConfig> = {
  landing: {
    id: 'landing',
    fogColor: '#0a0806',
    fogNear: 3,
    fogFar: 22,
    ambientColor: '#3d2418',
    ambientIntensity: 0.4,
    keyLightColor: '#ef7d2a',
    keyLightIntensity: 1.2,
    keyLightPosition: [5, 8, 5],
    rimLightColor: '#d4a857',
    rimLightIntensity: 0.6,
    particleColor: '#d4a857',
    particleCount: 400,
    particleSize: 0.04,
    particleSpread: 20,
    particleSpeed: 0.3,
    accentColor: '#ef7d2a',
    accentColor2: '#d4a857',
    geometry: 'default',
    cameraDrift: 0.3,
  },
  intro: {
    id: 'intro',
    fogColor: '#0a0806',
    fogNear: 2,
    fogFar: 18,
    ambientColor: '#2e1810',
    ambientIntensity: 0.3,
    keyLightColor: '#c2913f',
    keyLightIntensity: 0.8,
    keyLightPosition: [3, 6, 4],
    rimLightColor: '#875a2a',
    rimLightIntensity: 0.4,
    particleColor: '#a87632',
    particleCount: 250,
    particleSize: 0.03,
    particleSpread: 16,
    particleSpeed: 0.2,
    accentColor: '#c2913f',
    accentColor2: '#875a2a',
    geometry: 'default',
    cameraDrift: 0.2,
  },
  character: {
    id: 'character',
    fogColor: '#0a0806',
    fogNear: 4,
    fogFar: 25,
    ambientColor: '#3d2418',
    ambientIntensity: 0.5,
    keyLightColor: '#ef7d2a',
    keyLightIntensity: 1.0,
    keyLightPosition: [4, 7, 6],
    rimLightColor: '#d4a857',
    rimLightIntensity: 0.5,
    particleColor: '#d4a857',
    particleCount: 300,
    particleSize: 0.035,
    particleSpread: 18,
    particleSpeed: 0.25,
    accentColor: '#ef7d2a',
    accentColor2: '#d4a857',
    geometry: 'default',
    cameraDrift: 0.25,
  },
  'printing-press': {
    id: 'printing-press',
    fogColor: '#1a0e08',
    fogNear: 2,
    fogFar: 14,
    ambientColor: '#4a2a14',
    ambientIntensity: 0.5,
    keyLightColor: '#e09030',
    keyLightIntensity: 1.5,
    keyLightPosition: [2, 3, 3],
    rimLightColor: '#a86028',
    rimLightIntensity: 0.8,
    particleColor: '#c2913f',
    particleCount: 500,
    particleSize: 0.025,
    particleSpread: 14,
    particleSpeed: 0.4,
    accentColor: '#e09030',
    accentColor2: '#a86028',
    geometry: 'press',
    cameraDrift: 0.15,
  },
  'protest-march': {
    id: 'protest-march',
    fogColor: '#1a1208',
    fogNear: 3,
    fogFar: 20,
    ambientColor: '#5a3a18',
    ambientIntensity: 0.6,
    keyLightColor: '#f0a040',
    keyLightIntensity: 2.0,
    keyLightPosition: [8, 12, 6],
    rimLightColor: '#d4a857',
    rimLightIntensity: 0.7,
    particleColor: '#e0c078',
    particleCount: 600,
    particleSize: 0.03,
    particleSpread: 22,
    particleSpeed: 0.5,
    accentColor: '#f0a040',
    accentColor2: '#d4a857',
    geometry: 'protest',
    cameraDrift: 0.35,
  },
  'night-mission': {
    id: 'night-mission',
    fogColor: '#080604',
    fogNear: 1,
    fogFar: 12,
    ambientColor: '#1a1a2e',
    ambientIntensity: 0.25,
    keyLightColor: '#3060a0',
    keyLightIntensity: 0.6,
    keyLightPosition: [-3, 5, 2],
    rimLightColor: '#5070a0',
    rimLightIntensity: 0.5,
    particleColor: '#6080b0',
    particleCount: 350,
    particleSize: 0.02,
    particleSpread: 16,
    particleSpeed: 0.15,
    accentColor: '#3060a0',
    accentColor2: '#5070a0',
    geometry: 'mission',
    cameraDrift: 0.4,
  },
  underground: {
    id: 'underground',
    fogColor: '#0e0804',
    fogNear: 1.5,
    fogFar: 10,
    ambientColor: '#3a2010',
    ambientIntensity: 0.35,
    keyLightColor: '#c06028',
    keyLightIntensity: 1.2,
    keyLightPosition: [1, 2, 2],
    rimLightColor: '#875a2a',
    rimLightIntensity: 0.6,
    particleColor: '#a87632',
    particleCount: 450,
    particleSize: 0.03,
    particleSpread: 12,
    particleSpeed: 0.3,
    accentColor: '#c06028',
    accentColor2: '#875a2a',
    geometry: 'underground',
    cameraDrift: 0.12,
  },
  crackdown: {
    id: 'crackdown',
    fogColor: '#10080a',
    fogNear: 2,
    fogFar: 16,
    ambientColor: '#2a1a20',
    ambientIntensity: 0.3,
    keyLightColor: '#c03020',
    keyLightIntensity: 1.0,
    keyLightPosition: [0, 6, 4],
    rimLightColor: '#a04030',
    rimLightIntensity: 0.7,
    particleColor: '#a04030',
    particleCount: 400,
    particleSize: 0.025,
    particleSpread: 18,
    particleSpeed: 0.35,
    accentColor: '#c03020',
    accentColor2: '#a04030',
    geometry: 'crackdown',
    cameraDrift: 0.2,
  },
  negotiation: {
    id: 'negotiation',
    fogColor: '#0a0a14',
    fogNear: 3,
    fogFar: 20,
    ambientColor: '#2a2a3a',
    ambientIntensity: 0.45,
    keyLightColor: '#a0a0c0',
    keyLightIntensity: 0.9,
    keyLightPosition: [2, 8, 5],
    rimLightColor: '#d4a857',
    rimLightIntensity: 0.5,
    particleColor: '#c0c0d0',
    particleCount: 300,
    particleSize: 0.025,
    particleSpread: 18,
    particleSpeed: 0.2,
    accentColor: '#a0a0c0',
    accentColor2: '#d4a857',
    geometry: 'negotiation',
    cameraDrift: 0.15,
  },
  finale: {
    id: 'finale',
    fogColor: '#100a04',
    fogNear: 4,
    fogFar: 30,
    ambientColor: '#5a3a18',
    ambientIntensity: 0.7,
    keyLightColor: '#ff9933',
    keyLightIntensity: 2.5,
    keyLightPosition: [0, 10, 8],
    rimLightColor: '#138808',
    rimLightIntensity: 1.0,
    particleColor: '#ffcc66',
    particleCount: 800,
    particleSize: 0.04,
    particleSpread: 28,
    particleSpeed: 0.6,
    accentColor: '#ff9933',
    accentColor2: '#138808',
    geometry: 'finale',
    cameraDrift: 0.3,
  },
  ending: {
    id: 'ending',
    fogColor: '#0a0806',
    fogNear: 3,
    fogFar: 22,
    ambientColor: '#3d2418',
    ambientIntensity: 0.45,
    keyLightColor: '#d4a857',
    keyLightIntensity: 1.0,
    keyLightPosition: [4, 7, 5],
    rimLightColor: '#ef7d2a',
    rimLightIntensity: 0.5,
    particleColor: '#d4a857',
    particleCount: 350,
    particleSize: 0.035,
    particleSpread: 20,
    particleSpeed: 0.25,
    accentColor: '#d4a857',
    accentColor2: '#ef7d2a',
    geometry: 'default',
    cameraDrift: 0.2,
  },
};

export function getSceneVisualId(
  phase: string,
  characterId: string | null,
  currentSceneId: string
): SceneVisualId {
  if (phase === 'landing') return 'landing';
  if (phase === 'intro') return 'intro';
  if (phase === 'character') return 'character';
  if (phase === 'ending') return 'ending';
  if (phase === 'independence') return 'finale';
  if (phase === 'quest') {
    if (!characterId) return 'landing';
    if (currentSceneId === 'scene-01') {
      if (characterId === 'journalist') return 'printing-press';
      if (characterId === 'organizer') return 'protest-march';
      if (characterId === 'messenger') return 'night-mission';
    }
    if (currentSceneId === 'scene-02') return 'printing-press';
    if (currentSceneId === 'scene-03') return 'protest-march';
    if (currentSceneId === 'scene-04') return 'underground';
    if (currentSceneId === 'scene-05') return 'crackdown';
    if (currentSceneId === 'scene-06') return 'negotiation';
    if (currentSceneId === 'scene-07') return 'finale';
    return 'landing';
  }
  return 'landing';
}
