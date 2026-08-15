import type { Character } from '@/types';

export const characters: Character[] = [
  {
    id: 'journalist',
    name: 'Underground Journalist',
    role: 'Spreads information through secret newspapers and pamphlets',
    description:
      'You wield the pen as your weapon, printing truth in the dead of night. Every pamphlet you distribute is a spark that can ignite a nation — or draw the British straight to your door.',
    strength: 'Information',
    risk: 'High',
    impact: 'High',
    icon: 'Feather',
    accent: 'ember',
  },
  {
    id: 'organizer',
    name: 'Protest Organizer',
    role: 'Helps organize peaceful protests and rallies',
    description:
      'You stand at the front of the crowd, voice raised, heart steady. You turn scattered anger into coordinated action. The movement follows your courage — and your risks.',
    strength: 'Leadership',
    risk: 'High',
    impact: 'Very High',
    icon: 'Megaphone',
    accent: 'ember',
  },
  {
    id: 'messenger',
    name: 'Secret Messenger',
    role: 'Delivers messages between freedom fighters',
    description:
      'You move unseen through the streets of Bombay, carrying the words that hold the movement together. One intercepted note could unravel weeks of planning.',
    strength: 'Communication',
    risk: 'Medium',
    impact: 'High',
    icon: 'Footprints',
    accent: 'ember',
  },
];
