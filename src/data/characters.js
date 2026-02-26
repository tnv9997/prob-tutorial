const characters = [
  {
    id: 'suppandi',
    name: 'Suppandi',
    color: '#FF6B35',
    emoji: '😄',
    personality: 'Innocent helper, always in funny situations',
    scenarios: ['marbles', 'candy', 'socks', 'toys'],
  },
  {
    id: 'shambu',
    name: 'Shambu',
    color: '#2E8B57',
    emoji: '📷',
    personality: 'Wildlife photographer, animal and nature scenarios',
    scenarios: ['birds', 'safari', 'butterflies', 'fish'],
  },
  {
    id: 'nithyananda',
    name: 'Nithyananda',
    color: '#8B5CF6',
    emoji: '🔮',
    personality: 'Mystic who loves making predictions',
    scenarios: ['spinner', 'fortune', 'crystals', 'stars'],
  },
  {
    id: 'shakuni',
    name: 'Shakuni',
    color: '#DC2626',
    emoji: '🎲',
    personality: 'Strategic game player who loves dice and cards',
    scenarios: ['dice', 'cards', 'board_games', 'coins'],
  },
  {
    id: 'bheema',
    name: 'Bheema',
    color: '#D97706',
    emoji: '🍛',
    personality: 'Strong food lover, cooking and eating scenarios',
    scenarios: ['food', 'cooking', 'fruits', 'sweets'],
  },
  {
    id: 'mahisha',
    name: 'Mahisha',
    color: '#0891B2',
    emoji: '🏟️',
    personality: 'Grand organizer of events and tournaments',
    scenarios: ['tournament', 'event', 'teams', 'tickets'],
  },
];

export function getCharacter(id) {
  return characters.find(c => c.id === id);
}

export function getRandomCharacter() {
  return characters[Math.floor(Math.random() * characters.length)];
}

export function getCharacterForScenario(scenario) {
  const match = characters.find(c => c.scenarios.includes(scenario));
  return match || getRandomCharacter();
}

export default characters;
