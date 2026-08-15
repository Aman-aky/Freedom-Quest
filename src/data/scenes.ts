import type { Scene } from '@/types';

export const scenes: Record<string, Scene> = {
  'scene-01': {
    id: 'scene-01',
    year: 1942,
    location: 'Bombay',
    title: 'The Secret Message',
    narration:
      'August 8, 1942. The air at Gowalia Tank Maidan is electric. Hours ago, the All-India Congress Committee passed a resolution you can feel in your bones — "Quit India." The British have arrested the senior leaders, but the call has already spread like fire. Your contact presses a bundle of pamphlets into your hands and vanishes into the crowd. British lorries roll down the street. What do you do?',
    historicalRecord: {
      date: 'August 1942',
      title: 'The Quit India Resolution',
      fact: 'On 8 August 1942 at the Gowalia Tank Maidan in Bombay, the All-India Congress Committee passed the "Quit India" resolution, demanding an immediate end to British rule. Mahatma Gandhi gave the call "Do or Die." The next morning, he and the entire Congress leadership were arrested, sparking mass protests across the country.',
    },
    choices: [
      {
        id: 'a',
        text: 'Distribute the pamphlets in the market',
        consequence:
          'You slip into Crawford Market, pressing pamphlets into hands and pinning them to walls. A shopkeeper reads one and nods. But a British constable spots you — you barely escape through a side alley, heart pounding. The message is out.',
        effects: { courage: 15, risk: 15, impact: 20 },
        nextScene: 'scene-02',
      },
      {
        id: 'b',
        text: 'Join the protest gathering at the maidan',
        consequence:
          'You rush toward the maidan where thousands are gathering. Flags wave, slogans ring out. You raise your voice with them. The crowd surges — and so does the risk. Police batons come down.',
        effects: { courage: 20, risk: 20, impact: 25 },
        nextScene: 'scene-02',
      },
      {
        id: 'c',
        text: 'Hide the pamphlets and observe quietly',
        consequence:
          'You tuck the bundle under your shirt and step into a doorway. You watch, you learn, you wait. The moment passes, but you have mapped the police positions and the escape routes. Next time, you will be ready.',
        effects: { courage: -5, risk: -10, impact: 5 },
        nextScene: 'scene-02',
      },
    ],
  },
  'scene-02': {
    id: 'scene-02',
    year: 1942,
    location: 'Underground Press, Bombay',
    title: 'The Underground Press',
    narration:
      'The movement has gone underground. The leaders are in prison, but the spirit is not. In a cramped basement in Parel, a hand-cranked printing press thuds through the night. You are asked to help produce a secret bulletin — "The Congress Bulletin" — that will tell the people the truth the British are trying to bury. But the police have informers everywhere. A neighbor has been asking questions.',
    choices: [
      {
        id: 'a',
        text: 'Run the press all night to print 500 copies',
        consequence:
          'You work until your hands are ink-black and aching. 500 bulletins are ready by dawn. The noise was risky — but the truth will reach every chawl in the district. A neighbor knocks. You hold your breath.',
        effects: { courage: 18, risk: 18, impact: 22 },
        nextScene: 'scene-03',
      },
      {
        id: 'b',
        text: 'Scout the area for police before printing',
        consequence:
          'You spend two hours watching every entrance. The coast is clear, but you lost precious printing time — only 200 copies are made. Still, no one was followed. Caution has its own courage.',
        effects: { courage: 8, risk: 5, impact: 12 },
        nextScene: 'scene-03',
      },
      {
        id: 'c',
        text: 'Move the press to a safer location first',
        consequence:
          'You dismantle the press and carry it in pieces across the city by handcart. It takes all night. No bulletins printed today — but the press survives to fight another week. The movement is a marathon, not a sprint.',
        effects: { courage: 12, risk: 8, impact: 10 },
        nextScene: 'scene-03',
      },
    ],
  },
  'scene-03': {
    id: 'scene-03',
    year: 1943,
    location: 'Rural Maharashtra',
    title: 'The Village March',
    narration:
      'The movement has reached the villages. You travel by night to a village in rural Maharashtra where farmers have refused to pay land tax to the British. They are frightened but resolute. They need someone to help them organize a peaceful demonstration at the tehsildar\'s office. The police have threatened to burn their crops if they protest.',
    historicalRecord: {
      date: '1943',
      title: 'The Underground Movement Spreads',
      fact: 'After the mass arrests of August 1942, the Quit India Movement did not die — it went underground. Activists like Aruna Asaf Ali, Sucheta Kripalani, and Ram Manohar Lohia continued to organize protests, publish bulletins, and coordinate resistance from hiding. The movement spread from cities to villages across India.',
    },
    choices: [
      {
        id: 'a',
        text: 'Lead the demonstration yourself',
        consequence:
          'You stand before the tehsildar\'s office with 200 farmers behind you. The police raise their rifles. You do not flinch. The farmers see your courage and stand firm. The British officials retreat for the day. Word of the standoff reaches three more villages by nightfall.',
        effects: { courage: 25, risk: 22, impact: 28 },
        nextScene: 'scene-04',
      },
      {
        id: 'b',
        text: 'Train a local leader to speak instead',
        consequence:
          'You spend the night coaching a young farmer named Kisan to speak to the crowd. His voice trembles, but his words are true. The demonstration happens — and now the village has a leader of its own. You have planted a seed that will grow without you.',
        effects: { courage: 14, risk: 10, impact: 24 },
        nextScene: 'scene-04',
      },
      {
        id: 'c',
        text: 'Help the farmers hide their grain instead',
        consequence:
          'You help the villagers bury grain stores in the forest. No demonstration happens, but when the police come to seize crops, they find nothing. The village survives the year. Resistance takes many forms.',
        effects: { courage: 10, risk: 8, impact: 14 },
        nextScene: 'scene-04',
      },
    ],
  },
  'scene-04': {
    id: 'scene-04',
    year: 1944,
    location: 'Bombay Safehouse',
    title: 'The Informer',
    narration:
      'A year of hiding has worn you thin. You return to a Bombay safehouse to find a message: someone in your network has been turned by the police. They know where the next meeting will be. You do not know who the informer is — but you know the meeting cannot be cancelled. Too much depends on it. You must decide how to protect the network.',
    choices: [
      {
        id: 'a',
        text: 'Change the meeting location at the last minute',
        consequence:
          'You send word through three separate channels: the meeting moves to a mill in Lalbaug. Only those who arrive learn the true location. The informer shows up at the old site and finds nothing. The network is safe — for now.',
        effects: { courage: 16, risk: 12, impact: 18 },
        nextScene: 'scene-05',
      },
      {
        id: 'b',
        text: 'Confront the suspected informer directly',
        consequence:
          'You follow your gut and confront the suspect in a quiet lane. He denies everything — then runs. You will never know for certain if he was the one. But the meeting happens safely, and the suspect never returns to the network. Sometimes courage means trusting your instincts.',
        effects: { courage: 22, risk: 25, impact: 16 },
        nextScene: 'scene-05',
      },
      {
        id: 'c',
        text: 'Set a trap — feed the informer false information',
        consequence:
          'You let the suspected informer "accidentally" learn of a meeting at a false location. The police raid it and find only empty rooms. The informer is exposed without a single word. The real meeting proceeds in safety. You have outsmarted them.',
        effects: { courage: 15, risk: 10, impact: 22 },
        nextScene: 'scene-05',
      },
    ],
  },
  'scene-05': {
    id: 'scene-05',
    year: 1945,
    location: 'Bombay',
    title: 'The War Ends',
    narration:
      'The war in Europe is over. The British Empire is weakened, its treasury drained by the global conflict. In India, the political prisoners are being released one by one. The world is changing. You hear that negotiations for India\'s future may begin. But there are those who want to settle scores first — to retaliate against loyalists and informers. The movement stands at a crossroads.',
    historicalRecord: {
      date: '1945',
      title: 'The End of World War II',
      fact: 'World War II ended in 1945, leaving Britain economically and militarily exhausted. The Labour government under Clement Attlee, elected in July 1945, was committed to Indian independence. The Indian National Army trials of 1945-46 further galvanized public sentiment. The stage was set for the final negotiations toward freedom.',
    },
    choices: [
      {
        id: 'a',
        text: 'Call for unity and restraint — focus on freedom',
        consequence:
          'You argue fiercely: revenge will divide us when we must be most united. The movement must show the world that Indians can govern themselves with dignity. Some are angry, but most listen. You have kept the moral high ground — and that matters now more than ever.',
        effects: { courage: 18, risk: 8, impact: 28 },
        nextScene: 'scene-06',
      },
      {
        id: 'b',
        text: 'Help organize a mass rally to pressure the British',
        consequence:
          'You help organize a rally of 10,000 people at Shivaji Park. The speakers demand immediate release of all prisoners and a date for independence. The British take notice. The pressure is working — but so is the tension.',
        effects: { courage: 20, risk: 18, impact: 24 },
        nextScene: 'scene-06',
      },
      {
        id: 'c',
        text: 'Document British atrocities for the record',
        consequence:
          'You spend weeks compiling testimonies of arrests, beatings, and confiscations. You send the dossier to Indian and international newspapers. The truth cannot be buried. The world is watching now.',
        effects: { courage: 14, risk: 12, impact: 26 },
        nextScene: 'scene-06',
      },
    ],
  },
  'scene-06': {
    id: 'scene-06',
    year: 1946,
    location: 'Delhi',
    title: 'The Cabinet Mission',
    narration:
      'Delhi, 1946. The British Cabinet Mission has arrived to discuss the transfer of power. The negotiations are tense — the question of partition hangs over everything. You have been invited to assist a senior Congress volunteer team coordinating logistics for the talks. The decisions made in these rooms will shape the map of the subcontinent. You witness history being negotiated in real time — and you must choose how to contribute.',
    historicalRecord: {
      date: '1946',
      title: 'The Cabinet Mission & Direct Action',
      fact: 'In March 1946, the British Cabinet Mission arrived in India to negotiate the transfer of power. It proposed a federal structure for a united India. The plan was initially accepted but later rejected by both the Congress and the Muslim League. The Muslim League\'s call for "Direct Action Day" on 16 August 1946 led to widespread communal violence, accelerating the momentum toward partition.',
    },
    choices: [
      {
        id: 'a',
        text: 'Work to keep communication open between all parties',
        consequence:
          'You carry messages, arrange rooms, and quietly ensure that opposing sides at least share tea in the same corridor. You cannot stop the political tide, but you keep the channels of dialogue open one more day. Every day of dialogue is a day fewer of violence.',
        effects: { courage: 16, risk: 14, impact: 30 },
        nextScene: 'scene-07',
      },
      {
        id: 'b',
        text: 'Organize a peace march against partition',
        consequence:
          'You help organize a peace march through Delhi. Hindus and Muslims walk side by side, holding banners of unity. For one day, the city breathes. The march does not stop partition — but it reminds people that another India is possible.',
        effects: { courage: 22, risk: 20, impact: 26 },
        nextScene: 'scene-07',
      },
      {
        id: 'c',
        text: 'Help evacuate families from riot-torn areas',
        consequence:
          'You spend nights escorting families — Hindu and Muslim — across the city to safety. You do not ask their names or their faith. You ask only where they need to go. In the chaos of 1946, this is what courage looks like.',
        effects: { courage: 24, risk: 22, impact: 22 },
        nextScene: 'scene-07',
      },
    ],
  },
  'scene-07': {
    id: 'scene-07',
    year: 1947,
    location: 'New Delhi',
    title: 'The Midnight Hour',
    narration:
      'August 14, 1947. The world is about to change. At the Constituent Assembly in New Delhi, the clock ticks toward midnight. You stand among the crowd outside, pressed against the gates. Inside, Jawaharlal Nehru is about to deliver his speech. The tricolor is ready to be raised. Five years of struggle, sacrifice, and hope have led to this single night. You have earned your place in this crowd. You have one last choice to make.',
    historicalRecord: {
      date: '15 August 1947',
      title: 'India Wins Freedom',
      fact: 'At midnight on 14 August 1947, Jawaharlal Nehru delivered his historic "Tryst with Destiny" speech at the Constituent Assembly in New Delhi. India became a free nation. On 15 August 1947, the Indian tricolor was hoisted. However, independence came with the partition of India and Pakistan, which displaced an estimated 10-15 million people and was accompanied by devastating communal violence.',
    },
    choices: [
      {
        id: 'a',
        text: 'Step forward and raise your voice with the crowd',
        consequence:
          'As the clock strikes midnight, you raise your voice with thousands of others. The sound is deafening, joyful, tear-streaked. You have been part of this — every pamphlet, every march, every risk led here. Tonight, you are not a spectator. You are a citizen of a free nation.',
        effects: { courage: 20, risk: 5, impact: 30 },
        nextScene: 'ending',
      },
      {
        id: 'b',
        text: 'Stand quietly and remember those who did not live to see this',
        consequence:
          'You do not shout. You close your eyes and remember the ones who did not make it — the friends arrested, the farmers beaten, the names that will never be in any book. This freedom was bought with their sacrifice. You owe it to them to remember. The crowd roars around you. You weep quietly.',
        effects: { courage: 12, risk: 2, impact: 25 },
        nextScene: 'ending',
      },
      {
        id: 'c',
        text: 'Help a lost child find their family in the crowd',
        consequence:
          'In the chaos of celebration, a small boy is crying, separated from his parents. You lift him onto your shoulders and carry him through the crowd until you find his mother. She clutches him and blesses you. Freedom, you realize, is not just a flag. It is the people who live under it.',
        effects: { courage: 18, risk: 3, impact: 28 },
        nextScene: 'ending',
      },
    ],
    isFinal: true,
  },
};

export const sceneOrder = [
  'scene-01',
  'scene-02',
  'scene-03',
  'scene-04',
  'scene-05',
  'scene-06',
  'scene-07',
];
