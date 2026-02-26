// Helper: greatest common divisor for fraction simplification
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function simplify(n, d) {
  if (d === 0) return [0, 1];
  const g = gcd(Math.abs(n), Math.abs(d));
  return [n / g, d / g];
}
const questionTemplates = [
  // ============ SIMPLE PROBABILITY (concept: simple_probability) ============
  {
    id: 'simple_marbles',
    concept: 'simple_probability',
    difficulty: 1,
    characterId: 'suppandi',
    keywords: ['probability', 'total_outcomes', 'desired_outcomes', 'equally_likely'],
    storyTemplate: '{character}\'s boss yelled "You\'ve lost your marbles!" so {character} went and bought actual marbles to prove he hasn\'t. He now has {red} red, {blue} blue, and {green} green marbles in a bag. "See boss? All my marbles are right here!" Each marble is **equally likely** to be picked. {character} reaches in without looking to show one to his boss.',
    paramGenerator: () => {
      const red = 2 + Math.floor(Math.random() * 6);
      const blue = 2 + Math.floor(Math.random() * 6);
      const green = 1 + Math.floor(Math.random() * 5);
      return { red, blue, green, total: red + blue + green };
    },
    steps: [
      {
        prompt: 'How many marbles are in the bag in total? (This is the **total outcomes**.)',
        computeAnswer: (p) => p.total,
        acceptFormats: ['integer'],
        hint: 'Count all the marbles: add the red, blue, and green ones together. This gives us the **total outcomes**.',
        theory: 'The **total outcomes** is the count of ALL possible results. Here: total = red + blue + green = {red} + {blue} + {green} = {total}.',
        formula: 'Total Outcomes = count of ALL items',
        miniExample: 'If a jar has 4 red and 6 blue candies, total outcomes = 4 + 6 = 10.',
        visual: 'marbles',
        visualParams: (p) => ({ red: p.red, blue: p.blue, green: p.green, highlight: 'all' }),
      },
      {
        prompt: 'What is the **probability** of picking a red marble? (Write as a fraction like 3/10)',
        computeAnswer: (p) => simplify(p.red, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Probability** = **desired outcomes** / **total outcomes**. The **desired outcomes** here are the red marbles.',
        theory: 'The **probability** formula: P(event) = **desired outcomes** / **total outcomes**. Red marbles (desired) = {red}, total marbles = {total}. So P(red) = {red}/{total}.',
        formula: 'P(event) = desired outcomes / total outcomes',
        miniExample: 'If a bag has 3 red out of 10 marbles, P(red) = 3/10 = 0.3. This event is **unlikely** since 3/10 < 1/2.',
        visual: 'marbles',
        visualParams: (p) => ({ red: p.red, blue: p.blue, green: p.green, highlight: 'red' }),
      },
    ],
  },
  {
    id: 'simple_dice',
    concept: 'simple_probability',
    difficulty: 1,
    characterId: 'shakuni',
    keywords: ['probability', 'fair', 'equally_likely', 'total_outcomes', 'desired_outcomes', 'likely', 'unlikely'],
    storyTemplate: '{character} Mama is teaching his nephews a "completely fair and honest" dice game. (He winks at the camera.) He rolls a **fair** six-sided die. Even the great dice master can\'t cheat probability though — all 6 faces are **equally likely**.',
    paramGenerator: () => {
      const options = [
        { targets: [1, 2], label: 'a 1 or 2' },
        { targets: [3, 4], label: 'a 3 or 4' },
        { targets: [5, 6], label: 'a 5 or 6' },
        { targets: [2, 4, 6], label: 'an even number' },
        { targets: [1, 3, 5], label: 'an odd number' },
        { targets: [1], label: 'a 1' },
        { targets: [6], label: 'a 6' },
      ];
      const choice = options[Math.floor(Math.random() * options.length)];
      return { targets: choice.targets, label: choice.label, favorable: choice.targets.length, total: 6 };
    },
    storyTemplateFn: (p, charName) => `${charName} Mama is teaching his nephews a "completely fair and honest" dice game. (He winks at the camera.) He rolls a **fair** six-sided die. Even the great dice master can't cheat probability though — all 6 faces are **equally likely**. What is the **probability** of rolling ${p.label}?`,
    steps: [
      {
        prompt: 'How many **total outcomes** are possible when rolling a **fair** die?',
        computeAnswer: () => 6,
        acceptFormats: ['integer'],
        hint: 'A standard **fair** die has faces numbered 1 through 6. Each face is **equally likely** to land face-up.',
        theory: 'A **fair** six-sided die has 6 **equally likely** outcomes: 1, 2, 3, 4, 5, 6. **Fair** means no side is favored — each has the same chance.',
        formula: 'For a fair die: Total Outcomes = 6',
        miniExample: 'A fair coin has 2 equally likely outcomes (Heads, Tails). A fair die has 6.',
        visual: 'dice',
        visualParams: (p) => ({ highlight: [], total: 6 }),
      },
      {
        prompt: 'How many **desired outcomes** are there for rolling {label}?',
        computeAnswer: (p) => p.favorable,
        acceptFormats: ['integer'],
        hint: 'Count how many die faces match what we want: {label}. These are the **desired outcomes** (also called favorable outcomes).',
        theory: 'The **desired outcomes** for {label} are: {targets}. That\'s {favorable} outcome(s).',
        formula: 'Desired Outcomes = count of results that match what we want',
        miniExample: 'Want an even number on a die? Desired outcomes = {2, 4, 6} = 3 outcomes.',
        visual: 'dice',
        visualParams: (p) => ({ highlight: p.targets, total: 6 }),
      },
      {
        prompt: 'What is the **probability**? (Write as a fraction like 1/6)',
        computeAnswer: (p) => simplify(p.favorable, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: 'Divide the number of **desired outcomes** by the **total outcomes**.',
        theory: '**Probability** = **desired outcomes** / **total outcomes** = {favorable}/6. Since each outcome is **equally likely** on a **fair** die, we just count and divide!',
        formula: 'P(event) = desired outcomes / total outcomes = {favorable} / 6',
        miniExample: 'P(rolling a 3) = 1/6 ≈ 0.17 — this is **unlikely**. P(rolling less than 5) = 4/6 — this is **likely**.',
        visual: 'dice',
        visualParams: (p) => ({ highlight: p.targets, total: 6 }),
      },
    ],
  },
  {
    id: 'simple_spinner',
    concept: 'simple_probability',
    difficulty: 1,
    characterId: 'nithyananda',
    keywords: ['probability', 'total_outcomes', 'desired_outcomes', 'equally_likely', 'fair'],
    storyTemplate: '{character} installed a "Cosmic Destiny Wheel" at Kailasa. "My third eye has ALREADY seen the result," he announces dramatically. The wheel has {total} **equally likely** sections. His followers must spin it to decide today\'s ashram dinner menu.',
    paramGenerator: () => {
      const sections = [
        { color: 'red', count: 1 + Math.floor(Math.random() * 3) },
        { color: 'blue', count: 1 + Math.floor(Math.random() * 3) },
        { color: 'yellow', count: 1 + Math.floor(Math.random() * 2) },
        { color: 'green', count: 1 + Math.floor(Math.random() * 2) },
      ];
      const total = sections.reduce((s, sec) => s + sec.count, 0);
      const targetColor = sections[Math.floor(Math.random() * sections.length)].color;
      const favorable = sections.find(s => s.color === targetColor).count;
      return { sections, total, targetColor, favorable };
    },
    storyTemplateFn: (p, charName) => {
      const desc = p.sections.map(s => `${s.count} ${s.color}`).join(', ');
      return `${charName} installed a "Cosmic Destiny Wheel" at Kailasa. "My third eye has ALREADY seen the result," he announces dramatically. The wheel has ${p.total} **equally likely** sections: ${desc}. His followers must spin it to decide today's ashram dinner menu. What is the **probability** of landing on ${p.targetColor}?`;
    },
    steps: [
      {
        prompt: 'How many **total outcomes** (total sections) does the spinner have?',
        computeAnswer: (p) => p.total,
        acceptFormats: ['integer'],
        hint: 'Add up all the sections of every color to get the **total outcomes**.',
        theory: '**Total outcomes** = sum of all colored sections = {total}. Since the spinner is **fair**, each section is **equally likely**.',
        formula: 'Total Outcomes = sum of all sections',
        miniExample: 'A spinner with 3 red + 2 blue + 1 green = 6 total sections = 6 total outcomes.',
        visual: 'spinner',
        visualParams: (p) => ({ sections: p.sections, highlight: null }),
      },
      {
        prompt: 'How many sections are {targetColor}? (These are the **desired outcomes**.)',
        computeAnswer: (p) => p.favorable,
        acceptFormats: ['integer'],
        hint: 'Look at the spinner and count only the {targetColor} sections. These are your **desired outcomes**.',
        theory: 'There are {favorable} {targetColor} sections — those are the **desired outcomes**.',
        formula: 'Desired Outcomes = count of {targetColor} sections = {favorable}',
        visual: 'spinner',
        visualParams: (p) => ({ sections: p.sections, highlight: p.targetColor }),
      },
      {
        prompt: 'What is the **probability** of landing on {targetColor}? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.favorable, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Probability** = **desired outcomes** / **total outcomes**.',
        theory: 'P({targetColor}) = **desired outcomes** / **total outcomes** = {favorable}/{total}.',
        formula: 'P({targetColor}) = {favorable} / {total}',
        miniExample: 'If 2 out of 8 sections are red, P(red) = 2/8 = 1/4. That\'s **unlikely** since 1/4 < 1/2.',
        visual: 'spinner',
        visualParams: (p) => ({ sections: p.sections, highlight: p.targetColor }),
      },
    ],
  },

  // ============ COMPLEMENTARY EVENTS (concept: complementary) ============
  {
    id: 'comp_marbles',
    concept: 'complementary',
    difficulty: 1,
    characterId: 'suppandi',
    keywords: ['probability', 'complementary', 'certain', 'impossible'],
    storyTemplate: '{character}\'s new boss handed him {red} red and {other} blue marbles and said very clearly: "Whatever you do, do NOT pick a red one." {character} immediately wants to know — what exactly are his chances of messing this up?',
    paramGenerator: () => {
      const red = 2 + Math.floor(Math.random() * 5);
      const other = 3 + Math.floor(Math.random() * 6);
      return { red, other, total: red + other };
    },
    storyTemplateFn: (p, charName) => `${charName}'s new boss handed him ${p.red} red and ${p.other} blue marbles and said very clearly: "Whatever you do, do NOT pick a red one." It is **certain** that the marble will be red OR blue (no other colors exist). ${charName} immediately wants to know — what exactly are his chances of messing this up? What is the **probability** of NOT picking a red marble?`,
    steps: [
      {
        prompt: 'First, what is P(red)? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.red, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: 'P(red) = number of red marbles / total marbles.',
        theory: 'P(red) = {red}/{total}. Remember: **probability** = desired / total.',
        formula: 'P(red) = red marbles / total marbles = {red} / {total}',
        miniExample: 'In a bag of 3 red + 7 blue, P(red) = 3/10.',
        visual: 'marbles',
        visualParams: (p) => ({ red: p.red, blue: p.other, green: 0, highlight: 'red' }),
      },
      {
        prompt: 'Now, what is P(NOT red)? Use the complement rule. (Write as a fraction)',
        computeAnswer: (p) => simplify(p.other, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: 'The **complementary** rule: P(NOT A) = 1 − P(A). If picking red and NOT picking red together cover ALL possibilities, they are **complementary events**.',
        theory: 'P(NOT red) = 1 − P(red) = 1 − {red}/{total} = {other}/{total}. **Complementary events** always add up to 1 (which is **certain**). It is **impossible** for P(event) + P(NOT event) to be anything other than 1.',
        formula: 'P(NOT A) = 1 − P(A)',
        miniExample: 'If P(rain) = 3/10, then P(no rain) = 1 − 3/10 = 7/10. Rain and no rain are **complementary** — together they are **certain** (probability = 1).',
        visual: 'marbles',
        visualParams: (p) => ({ red: p.red, blue: p.other, green: 0, highlight: 'blue' }),
      },
    ],
  },
  {
    id: 'comp_dice',
    concept: 'complementary',
    difficulty: 2,
    characterId: 'shakuni',
    keywords: ['probability', 'complementary', 'fair', 'certain', 'impossible'],
    storyTemplate: '{character} bet Yudhishthira: "If I roll greater than {threshold}, you hand over your kingdom. Otherwise, I pay 100 gold coins." Before rolling his **fair** die, {character} (the master strategist) wants to calculate the probability of NOT winning — so he can plan his excuse.',
    paramGenerator: () => {
      const threshold = 2 + Math.floor(Math.random() * 4); // 2-5
      const favorable = 6 - threshold;
      return { threshold, favorable, complement: threshold, total: 6 };
    },
    storyTemplateFn: (p, charName) => `${charName} bet Yudhishthira: "If I roll greater than ${p.threshold}, you hand over your kingdom. Otherwise, I pay 100 gold coins." He rolls a **fair** die. It is **impossible** to roll a 0 or 7, and **certain** that the result will be 1–6. Before rolling, ${charName} (the master strategist) wants to calculate the probability of NOT winning — so he can plan his excuse. What is the **probability** of NOT rolling a number greater than ${p.threshold}?`,
    steps: [
      {
        prompt: 'How many outcomes are greater than {threshold}?',
        computeAnswer: (p) => p.favorable,
        acceptFormats: ['integer'],
        hint: 'List the numbers on a **fair** die (1–6) that are greater than {threshold}.',
        theory: 'Numbers greater than {threshold} on a die: count = {favorable}.',
        formula: 'Desired outcomes for "> {threshold}" = 6 − {threshold} = {favorable}',
        miniExample: 'Numbers > 3 on a die: {4, 5, 6} = 3 outcomes.',
        visual: 'dice',
        visualParams: (p) => {
          const hl = [];
          for (let i = p.threshold + 1; i <= 6; i++) hl.push(i);
          return { highlight: hl, total: 6 };
        },
      },
      {
        prompt: 'What is P(greater than {threshold})? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.favorable, 6),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Probability** = desired / total = count of numbers > {threshold} / 6.',
        theory: 'P(> {threshold}) = {favorable}/6.',
        formula: 'P(> {threshold}) = {favorable} / 6',
        visual: 'dice',
        visualParams: (p) => {
          const hl = [];
          for (let i = p.threshold + 1; i <= 6; i++) hl.push(i);
          return { highlight: hl, total: 6 };
        },
      },
      {
        prompt: 'What is P(NOT greater than {threshold})? Use the **complement** rule. (Write as a fraction)',
        computeAnswer: (p) => simplify(p.complement, 6),
        acceptFormats: ['fraction', 'decimal'],
        hint: 'Use the **complementary** rule: P(NOT A) = 1 − P(A).',
        theory: 'P(NOT > {threshold}) = 1 − {favorable}/6 = {complement}/6. "Greater than {threshold}" and "NOT greater than {threshold}" are **complementary events** — they add to 1 (**certain**).',
        formula: 'P(NOT A) = 1 − P(A) = 1 − {favorable}/6 = {complement}/6',
        miniExample: 'If P(even) = 3/6, then P(NOT even) = 1 − 3/6 = 3/6. Complementary events always sum to 1.',
        visual: 'dice',
        visualParams: (p) => {
          const hl = [];
          for (let i = 1; i <= p.threshold; i++) hl.push(i);
          return { highlight: hl, total: 6 };
        },
      },
    ],
  },
  {
    id: 'comp_spinner',
    concept: 'complementary',
    difficulty: 1,
    characterId: 'nithyananda',
    keywords: ['probability', 'complementary', 'certain', 'every_time'],
    storyTemplate: '{character} set up a "Wheel of Cosmic Enlightenment" at his ashram. It has {win} "Instant Enlightenment" sections and {lose} "Do 500 surya namaskars" sections ({total} sections total). A very nervous devotee approaches.',
    paramGenerator: () => {
      const win = 1 + Math.floor(Math.random() * 3);
      const lose = 3 + Math.floor(Math.random() * 5);
      return { win, lose, total: win + lose };
    },
    storyTemplateFn: (p, charName) => `${charName} set up a "Wheel of Cosmic Enlightenment" at his ashram. It has ${p.win} "Instant Enlightenment" sections and ${p.lose} "Do 500 surya namaskars" sections (${p.total} sections total). It is **certain** you will either win or lose **every time** you spin. A very nervous devotee approaches and asks: what is the **probability** of NOT getting instant enlightenment?`,
    steps: [
      {
        prompt: 'What is P(winning)? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.win, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: 'P(win) = winning sections / total sections.',
        theory: 'P(win) = {win}/{total}.',
        formula: 'P(win) = winning / total = {win} / {total}',
        visual: 'spinner',
        visualParams: (p) => ({ sections: [{ color: 'green', count: p.win }, { color: 'red', count: p.lose }], highlight: 'green' }),
      },
      {
        prompt: 'What is P(NOT winning)? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.lose, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Complementary events**: P(NOT A) = 1 − P(A). Winning and losing are complements — **every time** you spin, one of them is **certain** to happen.',
        theory: 'P(NOT win) = 1 − {win}/{total} = {lose}/{total}. Since you **certainly** either win or lose **every time**, these are **complementary events** that add to 1.',
        formula: 'P(NOT win) = 1 − P(win) = 1 − {win}/{total} = {lose}/{total}',
        miniExample: 'If P(winning a prize) = 2/8, then P(not winning) = 1 − 2/8 = 6/8 = 3/4.',
        visual: 'spinner',
        visualParams: (p) => ({ sections: [{ color: 'green', count: p.win }, { color: 'red', count: p.lose }], highlight: 'red' }),
      },
    ],
  },

  // ============ COMPOUND INDEPENDENT (concept: compound_independent) ============
  {
    id: 'compound_ind_coins',
    concept: 'compound_independent',
    difficulty: 2,
    characterId: 'shakuni',
    keywords: ['probability', 'independent', 'fair', 'equally_likely', 'sample_space'],
    storyTemplate: '{character} challenges Yudhishthira to yet another game. "Just two coin flips! What could go wrong?" he says innocently. He uses two **fair** coins (even {character} hasn\'t figured out how to rig coins... yet). The flips are **independent**.',
    paramGenerator: () => {
      const outcomes = ['HH', 'HT', 'TH', 'TT'];
      const target = outcomes[Math.floor(Math.random() * outcomes.length)];
      const label = target === 'HH' ? 'both heads' : target === 'TT' ? 'both tails' : target === 'HT' ? 'first heads then tails' : 'first tails then heads';
      return { target, label, total: 4 };
    },
    storyTemplateFn: (p, charName) => `${charName} challenges Yudhishthira to yet another game. "Just two coin flips! What could go wrong?" he says innocently. He uses two **fair** coins (even ${charName} hasn't figured out how to rig coins... yet). The flips are **independent** — the first coin does not affect the second. What is the **probability** of getting ${p.label}?`,
    steps: [
      {
        prompt: 'What is the **probability** of the first coin result? (Write as a fraction)',
        computeAnswer: () => [1, 2],
        acceptFormats: ['fraction', 'decimal'],
        hint: 'A **fair** coin has 2 **equally likely** sides. What is the chance of one specific side?',
        theory: 'P(heads) = P(tails) = 1/2 for a **fair** coin. Both outcomes are **equally likely**.',
        formula: 'P(specific side) = 1/2',
        miniExample: 'A fair coin: P(heads) = 1/2, P(tails) = 1/2. They are equally likely.',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'What is the **probability** of the second coin result? (Write as a fraction)',
        computeAnswer: () => [1, 2],
        acceptFormats: ['fraction', 'decimal'],
        hint: 'The second flip is **independent**. It doesn\'t matter what the first coin showed.',
        theory: 'Since the coins are **independent**, the second coin is not affected by the first. P = 1/2.',
        formula: 'For independent events: P(second) is unchanged = 1/2',
        miniExample: 'Even if the first coin is heads, P(second = heads) is still 1/2. That\'s what **independent** means!',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'What is P({label})? Multiply the probabilities. (Write as a fraction)',
        computeAnswer: () => [1, 4],
        acceptFormats: ['fraction', 'decimal'],
        hint: 'For **independent** events: P(A and B) = P(A) × P(B).',
        theory: 'P({label}) = P(first) × P(second) = 1/2 × 1/2 = 1/4. For **independent** events, we multiply. The **sample space** is {HH, HT, TH, TT} = 4 equally likely outcomes.',
        formula: 'P(A and B) = P(A) × P(B)    [independent events]',
        miniExample: 'P(heads AND heads) = 1/2 × 1/2 = 1/4. There are 4 outcomes in the sample space, and only 1 is HH.',
        visual: 'tree',
        visualParams: (p) => ({ levels: 2, labels: [['H', 'T'], ['H', 'T']], highlight: p.target }),
      },
    ],
  },
  {
    id: 'compound_ind_dice_coin',
    concept: 'compound_independent',
    difficulty: 2,
    characterId: 'shakuni',
    keywords: ['probability', 'independent', 'fair', 'sample_space'],
    storyTemplate: '{character} invented a new game called "Dice-Coin Mega Bonanza." Roll a **fair** die AND flip a **fair** coin at the same time. "More randomness means more fun!" he cackles. These are **independent** events. Everyone is suspicious but plays anyway.',
    paramGenerator: () => {
      const dieTarget = 1 + Math.floor(Math.random() * 6);
      const coinTarget = Math.random() < 0.5 ? 'heads' : 'tails';
      return { dieTarget, coinTarget, total: 12 };
    },
    storyTemplateFn: (p, charName) => `${charName} invented a new game called "Dice-Coin Mega Bonanza." Roll a **fair** die AND flip a **fair** coin at the same time. "More randomness means more fun!" he cackles. These are **independent** events. Everyone is suspicious but plays anyway. What is the **probability** of rolling a ${p.dieTarget} AND getting ${p.coinTarget}?`,
    steps: [
      {
        prompt: 'What is P(rolling a {dieTarget})? (Write as a fraction)',
        computeAnswer: () => [1, 6],
        acceptFormats: ['fraction', 'decimal'],
        hint: 'A **fair** die has 6 **equally likely** faces. Only one shows {dieTarget}.',
        theory: 'P(rolling {dieTarget}) = 1/6 on a **fair** die where all outcomes are **equally likely**.',
        formula: 'P(specific die face) = 1/6',
        visual: 'dice',
        visualParams: (p) => ({ highlight: [p.dieTarget], total: 6 }),
      },
      {
        prompt: 'What is P({coinTarget})? (Write as a fraction)',
        computeAnswer: () => [1, 2],
        acceptFormats: ['fraction', 'decimal'],
        hint: 'A **fair** coin has 2 **equally likely** sides.',
        theory: 'P({coinTarget}) = 1/2 on a **fair**, **unbiased** coin.',
        formula: 'P(specific coin side) = 1/2',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'What is P(rolling {dieTarget} AND {coinTarget})? (Write as a fraction)',
        computeAnswer: () => [1, 12],
        acceptFormats: ['fraction', 'decimal'],
        hint: 'These events are **independent**. Multiply the two probabilities.',
        theory: 'P(A and B) = P(A) × P(B) for **independent** events = 1/6 × 1/2 = 1/12. The **sample space** has 6 × 2 = 12 **equally likely** outcomes.',
        formula: 'P(A and B) = P(A) × P(B) = 1/6 × 1/2 = 1/12',
        miniExample: 'Rolling a die and flipping a coin are independent — the die doesn\'t know what the coin did! Multiply: 1/6 × 1/2 = 1/12.',
        visual: 'tree',
        visualParams: (p) => ({ levels: 2, labels: [['1','2','3','4','5','6'], ['H','T']], highlight: `${p.dieTarget}${p.coinTarget === 'heads' ? 'H' : 'T'}` }),
      },
    ],
  },
  {
    id: 'compound_ind_spinner_die',
    concept: 'compound_independent',
    difficulty: 3,
    characterId: 'nithyananda',
    keywords: ['probability', 'independent', 'fair', 'equally_likely', 'likely', 'unlikely'],
    storyTemplate: '{character} created a two-step "Cosmic Initiation Ceremony": first spin the "Chakra Color Wheel" (4 **equally likely** colors: red, blue, green, yellow), then roll the "Sacred Die of Enlightenment." "The universe has ALREADY decided the outcome!" he declares. (Spoiler: the events are actually **independent**.)',
    paramGenerator: () => {
      const colors = ['red', 'blue', 'green', 'yellow'];
      const targetColor = colors[Math.floor(Math.random() * 4)];
      const dieCondition = Math.random() < 0.5 ? 'even' : 'odd';
      return { targetColor, dieCondition, dieFavorable: 3, spinnerTotal: 4, dieTotal: 6 };
    },
    storyTemplateFn: (p, charName) => `${charName} created a two-step "Cosmic Initiation Ceremony": first spin the "Chakra Color Wheel" (4 **equally likely** colors: red, blue, green, yellow), then roll the "Sacred Die of Enlightenment" — a **fair** die. "The universe has ALREADY decided the outcome!" he declares. (Spoiler: the events are actually **independent**.) What is the **probability** of landing on ${p.targetColor} AND rolling an ${p.dieCondition} number?`,
    steps: [
      {
        prompt: 'What is P(landing on {targetColor})? (Write as a fraction)',
        computeAnswer: () => [1, 4],
        acceptFormats: ['fraction', 'decimal'],
        hint: 'The spinner has 4 **equally likely** sections. Only 1 is {targetColor}.',
        theory: 'P({targetColor}) = 1/4. This is **unlikely** since 1/4 < 1/2.',
        formula: 'P({targetColor}) = 1 / 4',
        visual: 'spinner',
        visualParams: (p) => ({ sections: [{ color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'green', count: 1 }, { color: 'yellow', count: 1 }], highlight: p.targetColor }),
      },
      {
        prompt: 'What is P(rolling an {dieCondition} number)? (Write as a fraction)',
        computeAnswer: () => [1, 2],
        acceptFormats: ['fraction', 'decimal'],
        hint: 'How many {dieCondition} numbers are on a **fair** die? Out of how many **total outcomes**?',
        theory: 'There are 3 {dieCondition} numbers out of 6 on a die. P = 3/6 = 1/2. This is **equally likely** to happen or not happen.',
        formula: 'P({dieCondition}) = 3/6 = 1/2',
        miniExample: 'Even numbers on a die: {2, 4, 6} = 3 desired outcomes. P(even) = 3/6 = 1/2.',
        visual: 'dice',
        visualParams: (p) => {
          const hl = p.dieCondition === 'even' ? [2, 4, 6] : [1, 3, 5];
          return { highlight: hl, total: 6 };
        },
      },
      {
        prompt: 'What is the combined **probability**? (Write as a fraction)',
        computeAnswer: () => [1, 8],
        acceptFormats: ['fraction', 'decimal'],
        hint: 'Multiply the two **independent** probabilities: P(color) × P(die).',
        theory: 'P(A and B) = 1/4 × 1/2 = 1/8 for **independent** events. This is **unlikely** — only a 12.5% chance!',
        formula: 'P(A and B) = P(A) × P(B) = 1/4 × 1/2 = 1/8',
        miniExample: 'When combining independent events, the result is always less likely than either event alone: 1/8 < 1/4 and 1/8 < 1/2.',
        visual: null,
        visualParams: () => ({}),
      },
    ],
  },

  // ============ COMPOUND DEPENDENT (concept: compound_dependent) ============
  {
    id: 'compound_dep_marbles',
    concept: 'compound_dependent',
    difficulty: 3,
    characterId: 'suppandi',
    keywords: ['probability', 'dependent', 'total_outcomes', 'desired_outcomes'],
    storyTemplate: '{character}\'s boss told him to pick 2 marbles from a bag with {red} red and {blue} blue marbles. "Pick one, put it in your pocket, THEN pick another," said the boss. {character} took one out and definitely did NOT put it back — these are **dependent** events! The boss sighs.',
    paramGenerator: () => {
      const red = 3 + Math.floor(Math.random() * 4);
      const blue = 3 + Math.floor(Math.random() * 4);
      return { red, blue, total: red + blue };
    },
    storyTemplateFn: (p, charName) => `${charName}'s boss told him to pick 2 marbles from a bag with ${p.red} red and ${p.blue} blue marbles. "Pick one, put it in your pocket, THEN pick another," said the boss. ${charName} took one out and definitely did NOT put it back — these are **dependent** events! The first pick changes the **total outcomes** for the second pick. The boss sighs. What is the **probability** of picking two red marbles?`,
    steps: [
      {
        prompt: 'What is P(first marble is red)? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.red, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: 'How many red (**desired outcomes**) are there out of the **total outcomes**?',
        theory: 'P(first red) = {red}/{total}. There are {red} **desired outcomes** out of {total} **total outcomes**.',
        formula: 'P(first red) = red / total = {red} / {total}',
        visual: 'marbles',
        visualParams: (p) => ({ red: p.red, blue: p.blue, green: 0, highlight: 'red' }),
      },
      {
        prompt: 'After removing one red marble, how many marbles remain in total?',
        computeAnswer: (p) => p.total - 1,
        acceptFormats: ['integer'],
        hint: 'One marble was taken out and NOT put back. This is why the events are **dependent** — the **total outcomes** changed!',
        theory: 'Without replacement: {total} − 1 = {total_minus_1} marbles remain. The **total outcomes** decreased because these are **dependent** events.',
        formula: 'New total = original total − 1 = {total} − 1 = {total_minus_1}',
        miniExample: 'In dependent events, removing an item changes the total. If you eat 1 cookie from a jar of 10, only 9 remain.',
        visual: 'marbles',
        visualParams: (p) => ({ red: p.red - 1, blue: p.blue, green: 0, highlight: 'all' }),
      },
      {
        prompt: 'What is P(second is red | first was red)? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.red - 1, p.total - 1),
        acceptFormats: ['fraction', 'decimal'],
        hint: 'Now there is one fewer red marble AND one fewer marble total. Both **desired outcomes** and **total outcomes** changed!',
        theory: 'After removing a red: {red_minus_1} red left out of {total_minus_1} total. P = {red_minus_1}/{total_minus_1}. This is a **dependent** event — the first result changed the second **probability**.',
        formula: 'P(2nd red | 1st red) = (red − 1) / (total − 1) = {red_minus_1} / {total_minus_1}',
        miniExample: 'If a bag had 5 red out of 8, after taking 1 red: P(2nd red) = 4/7 (not 5/8!).',
        visual: 'marbles',
        visualParams: (p) => ({ red: p.red - 1, blue: p.blue, green: 0, highlight: 'red' }),
      },
      {
        prompt: 'What is P(both red)? Multiply the two probabilities. (Write as a fraction)',
        computeAnswer: (p) => simplify(p.red * (p.red - 1), p.total * (p.total - 1)),
        acceptFormats: ['fraction', 'decimal'],
        hint: 'P(A then B) = P(A) × P(B|A). Multiply your two fractions.',
        theory: 'P(both red) = {red}/{total} × {red_minus_1}/{total_minus_1}. For **dependent** events: P(A then B) = P(A) × P(B given A).',
        formula: 'P(A then B) = P(A) × P(B|A)    [dependent events]',
        miniExample: 'Unlike independent events (P(A) × P(B)), dependent events use P(A) × P(B|A) because the conditions change!',
        visual: 'tree',
        visualParams: (p) => ({ levels: 2, labels: [['R', 'B'], ['R', 'B']], highlight: 'RR' }),
      },
    ],
  },
  {
    id: 'compound_dep_cards',
    concept: 'compound_dependent',
    difficulty: 3,
    characterId: 'shakuni',
    keywords: ['probability', 'dependent', 'total_outcomes', 'desired_outcomes'],
    storyTemplate: '{character} has {hearts} heart cards and {spades} spade cards ({total} total). He draws one card, quickly hides it in his turban (as one does), then draws another. No replacement — these are **dependent** events. "It\'s called strategy, not cheating!" he insists.',
    paramGenerator: () => {
      const hearts = 3 + Math.floor(Math.random() * 3);
      const spades = 3 + Math.floor(Math.random() * 3);
      const total = hearts + spades;
      return { hearts, spades, total };
    },
    storyTemplateFn: (p, charName) => `${charName} has ${p.hearts} heart cards and ${p.spades} spade cards (${p.total} total). He draws one card, quickly hides it in his turban (as one does), then draws another. No replacement — these are **dependent** events. "It's called strategy, not cheating!" he insists. What is the **probability** that both are hearts?`,
    steps: [
      {
        prompt: 'What is P(first card is a heart)? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.hearts, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: 'How many hearts (**desired outcomes**) out of total cards (**total outcomes**)?',
        theory: 'P(first heart) = {hearts}/{total}.',
        formula: 'P(1st heart) = hearts / total = {hearts} / {total}',
        visual: 'cards',
        visualParams: (p) => ({ hearts: p.hearts, spades: p.spades, highlight: 'hearts' }),
      },
      {
        prompt: 'What is P(second is heart | first was heart)? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.hearts - 1, p.total - 1),
        acceptFormats: ['fraction', 'decimal'],
        hint: 'One heart was drawn. How many hearts remain? How many total cards remain? The **total outcomes** changed — **dependent**!',
        theory: 'After drawing a heart: {hearts_minus_1} hearts out of {total_minus_1} cards. P = {hearts_minus_1}/{total_minus_1}.',
        formula: 'P(2nd heart | 1st heart) = (hearts−1)/(total−1) = {hearts_minus_1}/{total_minus_1}',
        miniExample: 'Drawing without replacement makes events **dependent**: the first draw changes what\'s available for the second.',
        visual: 'cards',
        visualParams: (p) => ({ hearts: p.hearts - 1, spades: p.spades, highlight: 'hearts' }),
      },
      {
        prompt: 'What is P(both hearts)? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.hearts * (p.hearts - 1), p.total * (p.total - 1)),
        acceptFormats: ['fraction', 'decimal'],
        hint: 'Multiply the two probabilities for **dependent** events: P(A) × P(B|A).',
        theory: 'P(both hearts) = P(first) × P(second|first) = {hearts}/{total} × {hearts_minus_1}/{total_minus_1}.',
        formula: 'P(both hearts) = P(1st) × P(2nd|1st)',
        miniExample: 'Key difference: Independent → multiply straight. Dependent → the second probability changes based on the first result.',
        visual: 'tree',
        visualParams: (p) => ({ levels: 2, labels: [['\u2665', '\u2660'], ['\u2665', '\u2660']], highlight: '\u2665\u2665' }),
      },
    ],
  },

  // ============ SAMPLE SPACE (concept: sample_space) ============
  {
    id: 'sample_two_dice',
    concept: 'sample_space',
    difficulty: 2,
    characterId: 'shakuni',
    keywords: ['probability', 'sample_space', 'total_outcomes', 'desired_outcomes', 'equally_likely', 'fair'],
    storyTemplate: '{character} slams two **fair** dice on the table. "I need a sum of {targetSum} to win the whole kingdom!" he announces dramatically. The **sample space** includes every possible pair of die results. Even {character} can\'t argue with the math.',
    paramGenerator: () => {
      const targetSum = 5 + Math.floor(Math.random() * 5);
      let ways = 0;
      const pairs = [];
      for (let a = 1; a <= 6; a++) {
        for (let b = 1; b <= 6; b++) {
          if (a + b === targetSum) { ways++; pairs.push([a, b]); }
        }
      }
      return { targetSum, ways, pairs, total: 36 };
    },
    storyTemplateFn: (p, charName) => `${charName} slams two **fair** dice on the table. "I need a sum of ${p.targetSum} to win the whole kingdom!" he announces dramatically. The **sample space** includes every possible pair of die results. Even ${charName} can't argue with the math. What is the **probability** that the sum equals ${p.targetSum}?`,
    steps: [
      {
        prompt: 'How many **total outcomes** are in the **sample space** when rolling two dice?',
        computeAnswer: () => 36,
        acceptFormats: ['integer'],
        hint: 'Each **fair** die has 6 faces. For two dice, multiply: 6 × 6.',
        theory: 'The **sample space** for two dice: 6 × 6 = 36 **total outcomes**. Every pair (die 1, die 2) is **equally likely**.',
        formula: 'Sample Space = outcomes of die 1 × outcomes of die 2 = 6 × 6 = 36',
        miniExample: 'Sample space means ALL possible results. Die 1 can be 1–6, die 2 can be 1–6, so there are 36 pairs total.',
        visual: 'table',
        visualParams: (p) => ({ type: 'dice_sum', targetSum: p.targetSum, highlight: [] }),
      },
      {
        prompt: 'How many ways can you get a sum of {targetSum}? (Count the **desired outcomes**.)',
        computeAnswer: (p) => p.ways,
        acceptFormats: ['integer'],
        hint: 'List all pairs (die1, die2) that add to {targetSum}. These are your **desired outcomes**.',
        theory: 'Pairs that sum to {targetSum}: {pairs_str}. That\'s {ways} **desired outcomes**.',
        formula: 'Desired outcomes for sum {targetSum} = {ways}',
        miniExample: 'For sum = 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 ways. Sum 7 is the most **likely** sum with two dice!',
        visual: 'table',
        visualParams: (p) => ({ type: 'dice_sum', targetSum: p.targetSum, highlight: p.pairs }),
      },
      {
        prompt: 'What is P(sum = {targetSum})? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.ways, 36),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Probability** = **desired outcomes** / **total outcomes** = {ways} / 36.',
        theory: 'P(sum = {targetSum}) = {ways}/36. We found the **desired outcomes** from the **sample space** and divided by **total outcomes**.',
        formula: 'P(sum = {targetSum}) = desired / total = {ways} / 36',
        visual: 'table',
        visualParams: (p) => ({ type: 'dice_sum', targetSum: p.targetSum, highlight: p.pairs }),
      },
    ],
  },
  {
    id: 'sample_coin_die',
    concept: 'sample_space',
    difficulty: 2,
    characterId: 'mahisha',
    keywords: ['probability', 'sample_space', 'total_outcomes', 'equally_likely'],
    storyTemplate: '"LADIES AND GENTLEMEN!" booms {character}\'s voice. "Welcome to the GRAND GAME SHOW OF THE CENTURY!" Today\'s challenge: flip a **fair** coin AND roll a **fair** die. The **sample space** has all coin-die combinations. The audience goes wild (all 12 of them).',
    paramGenerator: () => {
      const coinResult = Math.random() < 0.5 ? 'H' : 'T';
      const dieMin = 1 + Math.floor(Math.random() * 3);
      const dieFavorable = 6 - dieMin + 1;
      return { coinResult, coinLabel: coinResult === 'H' ? 'heads' : 'tails', dieMin, dieFavorable, totalSampleSpace: 12 };
    },
    storyTemplateFn: (p, charName) => `"LADIES AND GENTLEMEN!" booms ${charName}'s voice. "Welcome to the GRAND GAME SHOW OF THE CENTURY!" Today's challenge: flip a **fair** coin AND roll a **fair** die. The **sample space** has all coin-die combinations. The audience goes wild (all 12 of them). What is the **probability** of getting ${p.coinLabel} and a number ≥ ${p.dieMin}?`,
    steps: [
      {
        prompt: 'How many outcomes are in the **sample space**? (coin × die)',
        computeAnswer: () => 12,
        acceptFormats: ['integer'],
        hint: 'The **fair** coin has 2 outcomes, the **fair** die has 6. Multiply to get the **sample space** size.',
        theory: '**Sample space** = 2 × 6 = 12 **total outcomes**, all **equally likely**.',
        formula: 'Sample Space = coin outcomes × die outcomes = 2 × 6 = 12',
        miniExample: 'The sample space lists every possible combination: (H,1), (H,2), ..., (H,6), (T,1), ..., (T,6) = 12 outcomes.',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'How many **desired outcomes** match {coinLabel} AND die ≥ {dieMin}?',
        computeAnswer: (p) => p.dieFavorable,
        acceptFormats: ['integer'],
        hint: 'Fix the coin on {coinLabel}. Then count die values ≥ {dieMin}. Those are the **desired outcomes**.',
        theory: 'With {coinLabel}: die values ≥ {dieMin} are {dieMin} through 6 = {dieFavorable} **desired outcomes**.',
        formula: 'Desired outcomes = 1 (coin) × {dieFavorable} (die values ≥ {dieMin})',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'What is the **probability**? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.dieFavorable, 12),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Probability** = **desired outcomes** / **sample space** size.',
        theory: 'P = {dieFavorable}/12. We used the **sample space** to count all possibilities, then found the **desired outcomes**.',
        formula: 'P = desired / total = {dieFavorable} / 12',
        visual: null,
        visualParams: () => ({}),
      },
    ],
  },

  // ============ EXPERIMENTAL PROBABILITY (concept: experimental) ============
  {
    id: 'exp_bird_watching',
    concept: 'experimental',
    difficulty: 1,
    characterId: 'shambu',
    keywords: ['experimental_probability', 'frequency', 'typical', 'probability'],
    storyTemplate: '{character} was peacefully napping under a tree when birds started landing ON him. Too terrified to move, he just counted them with his eyes: {sparrows} sparrows, {eagles} eagles (he nearly fainted), {parrots} parrots, and {crows} crows ({total} total). "I\'ll... I\'ll call this birdwatching," he whimpered.',
    paramGenerator: () => {
      const sparrows = 8 + Math.floor(Math.random() * 15);
      const eagles = 2 + Math.floor(Math.random() * 6);
      const parrots = 5 + Math.floor(Math.random() * 10);
      const crows = 3 + Math.floor(Math.random() * 8);
      const total = sparrows + eagles + parrots + crows;
      const birds = { sparrows, eagles, parrots, crows };
      const birdNames = Object.keys(birds);
      const targetBird = birdNames[Math.floor(Math.random() * birdNames.length)];
      return { ...birds, total, targetBird, targetCount: birds[targetBird] };
    },
    storyTemplateFn: (p, charName) => `${charName} was peacefully napping under a tree when birds started landing ON him. Too terrified to move, he just counted them with his eyes and recorded the **frequency** of each type: ${p.sparrows} sparrows, ${p.eagles} eagles (he nearly fainted), ${p.parrots} parrots, and ${p.crows} crows (${p.total} total). "I'll... I'll call this birdwatching," he whimpered. Based on this real data, what is the **experimental probability** of the next bird being a ${p.targetBird.slice(0, -1)}?`,
    steps: [
      {
        prompt: 'How many total birds were observed?',
        computeAnswer: (p) => p.total,
        acceptFormats: ['integer'],
        hint: 'Add up the **frequency** of every bird type.',
        theory: 'Total observations = {sparrows} + {eagles} + {parrots} + {crows} = {total}. Each count is a **frequency** — how many times that bird was seen.',
        formula: 'Total observations = sum of all frequencies',
        miniExample: 'If you saw 5 cats and 3 dogs, total observations = 8. The **frequency** of cats is 5.',
        visual: 'table',
        visualParams: (p) => ({ type: 'frequency', data: [
          { label: 'Sparrows', count: p.sparrows },
          { label: 'Eagles', count: p.eagles },
          { label: 'Parrots', count: p.parrots },
          { label: 'Crows', count: p.crows },
        ], highlight: null }),
      },
      {
        prompt: 'How many {targetBird} were observed? (What is the **frequency**?)',
        computeAnswer: (p) => p.targetCount,
        acceptFormats: ['integer'],
        hint: 'Look at the data. The **frequency** of {targetBird} is how many times they appeared.',
        theory: '**Frequency** of {targetBird} = {targetCount}. This is the count from actual observations.',
        formula: 'Frequency of {targetBird} = {targetCount}',
        visual: 'table',
        visualParams: (p) => ({ type: 'frequency', data: [
          { label: 'Sparrows', count: p.sparrows },
          { label: 'Eagles', count: p.eagles },
          { label: 'Parrots', count: p.parrots },
          { label: 'Crows', count: p.crows },
        ], highlight: p.targetBird }),
      },
      {
        prompt: 'What is the **experimental probability**? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.targetCount, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Experimental probability** = **frequency** of event / total observations.',
        theory: '**Experimental probability**({targetBird}) = **frequency** / total = {targetCount}/{total}. This tells us what is **typical** based on real data. Unlike theoretical probability, this comes from actual observations!',
        formula: 'Experimental P = frequency / total observations = {targetCount} / {total}',
        miniExample: 'If a basketball player made 7 out of 10 free throws, experimental P(makes it) = 7/10. This is based on what **typically** happens.',
        visual: 'table',
        visualParams: (p) => ({ type: 'frequency', data: [
          { label: 'Sparrows', count: p.sparrows },
          { label: 'Eagles', count: p.eagles },
          { label: 'Parrots', count: p.parrots },
          { label: 'Crows', count: p.crows },
        ], highlight: p.targetBird }),
      },
    ],
  },
  {
    id: 'exp_food_survey',
    concept: 'experimental',
    difficulty: 1,
    characterId: 'bheema',
    keywords: ['experimental_probability', 'frequency', 'typical', 'probability'],
    storyTemplate: '{character} conducted a "Very Serious Scientific Food Survey." He asked friends their favorite food while inhaling a plate of biryani. "The data clearly shows biryani is the best," he declared, wiping his face.',
    paramGenerator: () => {
      const biryani = 10 + Math.floor(Math.random() * 10);
      const dosa = 5 + Math.floor(Math.random() * 10);
      const paneer = 4 + Math.floor(Math.random() * 8);
      const pasta = 3 + Math.floor(Math.random() * 6);
      const total = biryani + dosa + paneer + pasta;
      const foods = { biryani, dosa, paneer, pasta };
      const foodNames = Object.keys(foods);
      const targetFood = foodNames[Math.floor(Math.random() * foodNames.length)];
      return { ...foods, total, targetFood, targetCount: foods[targetFood] };
    },
    storyTemplateFn: (p, charName) => `${charName} conducted a "Very Serious Scientific Food Survey." He asked friends their favorite food while inhaling a plate of biryani. **Frequency** recorded: ${p.biryani} said biryani, ${p.dosa} said dosa, ${p.paneer} said paneer, ${p.pasta} said pasta (${p.total} total). "The data clearly shows biryani is the best," he declared, wiping his face. Based on this survey data, what is the **experimental probability** that the next person prefers ${p.targetFood}?`,
    steps: [
      {
        prompt: 'How many people were surveyed in total?',
        computeAnswer: (p) => p.total,
        acceptFormats: ['integer'],
        hint: 'Add up all the **frequencies** (counts for each food).',
        theory: 'Total surveyed = {biryani} + {dosa} + {paneer} + {pasta} = {total}.',
        formula: 'Total = sum of all frequencies',
        visual: 'table',
        visualParams: (p) => ({ type: 'frequency', data: [
          { label: 'Biryani', count: p.biryani },
          { label: 'Dosa', count: p.dosa },
          { label: 'Paneer', count: p.paneer },
          { label: 'Pasta', count: p.pasta },
        ], highlight: null }),
      },
      {
        prompt: 'What is the **experimental probability** of preferring {targetFood}? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.targetCount, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Experimental probability** = **frequency** of {targetFood} / total people surveyed.',
        theory: '**Experimental P**({targetFood}) = {targetCount}/{total}. This is based on actual survey data — it tells us what is **typical** among the people surveyed.',
        formula: 'Experimental P = frequency / total = {targetCount} / {total}',
        miniExample: 'In a class of 30, if 18 prefer pizza, experimental P(pizza) = 18/30 = 3/5. This is **likely** the preference since 3/5 > 1/2.',
        visual: 'table',
        visualParams: (p) => ({ type: 'frequency', data: [
          { label: 'Biryani', count: p.biryani },
          { label: 'Dosa', count: p.dosa },
          { label: 'Paneer', count: p.paneer },
          { label: 'Pasta', count: p.pasta },
        ], highlight: p.targetFood }),
      },
    ],
  },
  {
    id: 'exp_safari_animals',
    concept: 'experimental',
    difficulty: 2,
    characterId: 'shambu',
    keywords: ['experimental_probability', 'frequency', 'typical', 'likely', 'unlikely'],
    storyTemplate: '{character} went on "safari" and bravely recorded animal sightings from inside a triple-locked jeep with the windows rolled up. For every tiger sighting, {character} also recorded one scream (his own).',
    paramGenerator: () => {
      const deer = 12 + Math.floor(Math.random() * 10);
      const elephants = 3 + Math.floor(Math.random() * 5);
      const monkeys = 8 + Math.floor(Math.random() * 12);
      const tigers = 1 + Math.floor(Math.random() * 3);
      const total = deer + elephants + monkeys + tigers;
      return { deer, elephants, monkeys, tigers, total };
    },
    storyTemplateFn: (p, charName) => `${charName} went on "safari" and bravely recorded animal sightings from inside a triple-locked jeep with the windows rolled up. **Frequency**: ${p.deer} deer, ${p.elephants} elephants (${charName} ducked for each one), ${p.monkeys} monkeys, and ${p.tigers} tigers (${p.total} total). For every tiger sighting, ${charName} also recorded one scream (his own). Deer are **typical** — seen often. Tigers are **unlikely** — seen rarely. What is the **experimental probability** of the next sighting being an elephant?`,
    steps: [
      {
        prompt: 'What is the total number of animal sightings?',
        computeAnswer: (p) => p.total,
        acceptFormats: ['integer'],
        hint: 'Add all **frequencies**: deer + elephants + monkeys + tigers.',
        theory: 'Total = {deer} + {elephants} + {monkeys} + {tigers} = {total}.',
        formula: 'Total sightings = sum of all frequencies',
        visual: 'table',
        visualParams: (p) => ({ type: 'frequency', data: [
          { label: 'Deer', count: p.deer },
          { label: 'Elephants', count: p.elephants },
          { label: 'Monkeys', count: p.monkeys },
          { label: 'Tigers', count: p.tigers },
        ], highlight: null }),
      },
      {
        prompt: 'What is the **experimental probability** of seeing an elephant? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.elephants, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Experimental probability**(elephant) = **frequency** of elephants / total sightings.',
        theory: '**Experimental P**(elephant) = {elephants}/{total}. The most **frequently** seen animal is the most **likely** to be seen next.',
        formula: 'Experimental P(elephant) = frequency / total = {elephants} / {total}',
        miniExample: 'If out of 50 sightings, 5 were elephants, P(elephant) = 5/50 = 1/10. Elephants are **unlikely** compared to deer.',
        visual: 'table',
        visualParams: (p) => ({ type: 'frequency', data: [
          { label: 'Deer', count: p.deer },
          { label: 'Elephants', count: p.elephants },
          { label: 'Monkeys', count: p.monkeys },
          { label: 'Tigers', count: p.tigers },
        ], highlight: 'Elephants' }),
      },
    ],
  },

  // ============ THEORETICAL VS EXPERIMENTAL (concept: theoretical_vs_experimental) ============
  {
    id: 'theo_vs_exp_die',
    concept: 'theoretical_vs_experimental',
    difficulty: 2,
    characterId: 'shakuni',
    keywords: ['theoretical_probability', 'experimental_probability', 'fair', 'unbiased', 'biased', 'frequency', 'every_time'],
    storyTemplate: '{character} suspects his "lucky" die might be **biased** — he certainly HOPES it is, because he paid extra for it. He rolled it {total} times to test. If the die is truly **fair** and **unbiased**, each face should appear roughly equally. Time to find out if he got scammed.',
    paramGenerator: () => {
      const rolls = 30 + Math.floor(Math.random() * 31);
      const freq = {};
      let remaining = rolls;
      for (let face = 1; face <= 5; face++) {
        const expected = rolls / 6;
        freq[face] = Math.max(1, Math.round(expected + (Math.random() - 0.5) * expected * 0.6));
        remaining -= freq[face];
      }
      freq[6] = Math.max(1, remaining);
      const actualTotal = Object.values(freq).reduce((a, b) => a + b, 0);
      const targetFace = 1 + Math.floor(Math.random() * 6);
      return { freq, total: actualTotal, targetFace, targetFreq: freq[targetFace] };
    },
    storyTemplateFn: (p, charName) => {
      const freqStr = Object.entries(p.freq).map(([face, count]) => `${face}: ${count} times`).join(', ');
      return `${charName} suspects his "lucky" die might be **biased** — he certainly HOPES it is, because he paid extra for it. He rolled it ${p.total} times to test and recorded the **frequency** of each result: ${freqStr}. If the die is truly **fair** and **unbiased**, each face should appear roughly equally. Time to find out if he got scammed. Compare the **experimental probability** of rolling a ${p.targetFace} to the **theoretical probability**. If the die were **biased**, one number would appear far more than the others.`;
    },
    steps: [
      {
        prompt: 'What is the **theoretical probability** of rolling a {targetFace}? (Write as a fraction)',
        computeAnswer: () => [1, 6],
        acceptFormats: ['fraction', 'decimal'],
        hint: 'For a **fair**, **unbiased** die, every face has the same **theoretical probability**.',
        theory: '**Theoretical probability**(any face) = 1/6 because each of the 6 outcomes is **equally likely** on an **unbiased** die. We calculate this using math, not experiments. If the die were **biased**, this wouldn\'t be true!',
        formula: 'Theoretical P = desired outcomes / total outcomes = 1/6',
        miniExample: 'Theoretical P is based on math: a fair coin → P(H) = 1/2. We don\'t need to flip it to know this!',
        visual: 'dice',
        visualParams: (p) => ({ highlight: [p.targetFace], total: 6 }),
      },
      {
        prompt: 'What is the **experimental probability** of rolling a {targetFace}? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.targetFreq, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Experimental probability** = **frequency** of {targetFace} / total rolls.',
        theory: '**Experimental P**({targetFace}) = **frequency** / total = {targetFreq}/{total}. This is based on what actually happened — the real **frequency** from {total} rolls.',
        formula: 'Experimental P = frequency / total rolls = {targetFreq} / {total}',
        miniExample: 'If you rolled a die 60 times and got a 3 exactly 12 times, experimental P(3) = 12/60 = 1/5.',
        visual: 'table',
        visualParams: (p) => ({ type: 'frequency', data: Object.entries(p.freq).map(([face, count]) => ({ label: `Face ${face}`, count })), highlight: `Face ${p.targetFace}` }),
      },
      {
        prompt: 'Are the theoretical and experimental probabilities the same? (Type "yes" or "no")',
        computeAnswer: (p) => {
          const [en, ed] = simplify(p.targetFreq, p.total);
          return (en * 6 === ed) ? 'yes' : 'no';
        },
        acceptFormats: ['yesno'],
        hint: 'Compare your two answers. Is {targetFreq}/{total} equal to 1/6? They are usually different!',
        theory: '**Experimental** and **theoretical probabilities** are usually different! Experimental probability depends on actual **frequency** and varies **every time** you repeat the experiment. With more trials, experimental gets closer to theoretical (Law of Large Numbers). If the die is truly **unbiased** and **fair**, after thousands of rolls the experimental result will approach 1/6.',
        formula: 'As trials → ∞, Experimental P → Theoretical P (Law of Large Numbers)',
        miniExample: 'Flip a fair coin 10 times: you might get 7 heads (exp P = 0.7). Flip 10,000 times: you\'ll likely get close to 5,000 heads (exp P ≈ 0.5).',
        visual: null,
        visualParams: () => ({}),
      },
    ],
  },
  {
    id: 'theo_vs_exp_coin',
    concept: 'theoretical_vs_experimental',
    difficulty: 1,
    characterId: 'mahisha',
    keywords: ['theoretical_probability', 'experimental_probability', 'fair', 'biased', 'unbiased', 'frequency', 'every_time'],
    storyTemplate: '{character} organized the "GRAND COIN FLIPPING CHAMPIONSHIP OF ALL TIME" (his words, not ours). Using a **fair**, **unbiased** coin, {total} flips were recorded: {heads} heads and {tails} tails. "THE COIN DOES NOT CARE ABOUT YOUR FEELINGS!" {character} announced to devastated tails fans.',
    paramGenerator: () => {
      const total = 20 + Math.floor(Math.random() * 31);
      const heads = Math.round(total * (0.35 + Math.random() * 0.3));
      const tails = total - heads;
      return { total, heads, tails };
    },
    storyTemplateFn: (p, charName) => `${charName} organized the "GRAND COIN FLIPPING CHAMPIONSHIP OF ALL TIME" (his words, not ours). Using a **fair**, **unbiased** coin, ${p.total} flips were recorded: heads came up ${p.heads} times (**frequency** of heads = ${p.heads}) and tails ${p.tails} times. "THE COIN DOES NOT CARE ABOUT YOUR FEELINGS!" ${charName} announced to devastated tails fans. Compare the **theoretical** and **experimental probability** of heads.`,
    steps: [
      {
        prompt: 'What is the **theoretical probability** of heads? (Write as a fraction)',
        computeAnswer: () => [1, 2],
        acceptFormats: ['fraction', 'decimal'],
        hint: 'For a **fair**, **unbiased** coin, what is P(heads)?',
        theory: '**Theoretical P**(heads) = 1/2 for a **fair** coin. We don\'t need any experiment — just logic! If the coin were **biased**, one side would be more **likely** than the other.',
        formula: 'Theoretical P(heads) = 1/2    [for a fair coin]',
        miniExample: 'A **biased** coin might have P(heads) = 3/4. An **unbiased** (fair) coin always has P(heads) = 1/2.',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'What is the **experimental probability** of heads? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.heads, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Experimental P** = **frequency** of heads / total flips.',
        theory: '**Experimental P**(heads) = **frequency** / total = {heads}/{total}. This is what actually happened in the experiment.',
        formula: 'Experimental P(heads) = frequency of heads / total flips = {heads} / {total}',
        miniExample: 'If you flip 20 times and get 12 heads, experimental P(heads) = 12/20 = 3/5. Different from the theoretical 1/2!',
        visual: 'table',
        visualParams: (p) => ({ type: 'frequency', data: [
          { label: 'Heads', count: p.heads },
          { label: 'Tails', count: p.tails },
        ], highlight: 'Heads' }),
      },
      {
        prompt: 'Would more flips make experimental probability closer to 1/2? (Type "yes" or "no")',
        computeAnswer: () => 'yes',
        acceptFormats: ['yesno'],
        hint: 'Think about what happens as you do more and more trials. Does the **frequency** pattern stabilize?',
        theory: 'Yes! The Law of Large Numbers says: as trials increase, **experimental probability** approaches **theoretical probability**. After just 10 flips, results vary a lot. After 10,000 flips, you\'ll see the **frequency** of heads is very close to 50% **every time** you run the experiment — if the coin is truly **unbiased**.',
        formula: 'More trials → Experimental P gets closer to Theoretical P',
        miniExample: '10 flips: might get 7 heads (70%). 100 flips: might get 53 heads (53%). 10,000 flips: very close to 50%!',
        visual: null,
        visualParams: () => ({}),
      },
    ],
  },

  // ============ ADDITIONAL TEMPLATES ============
  {
    id: 'simple_socks',
    concept: 'simple_probability',
    difficulty: 1,
    characterId: 'suppandi',
    keywords: ['probability', 'total_outcomes', 'desired_outcomes', 'equally_likely', 'likely', 'unlikely'],
    storyTemplate: '{character}\'s boss said "Grab me matching socks from the drawer — but the light is broken, so you can\'t see." The drawer has {black} black socks, {white} white socks, and {striped} striped socks. {character} reaches in completely blind. Each sock is **equally likely** to be grabbed. "What\'s the worst that could happen?" (Famous last words.)',
    paramGenerator: () => {
      const black = 3 + Math.floor(Math.random() * 5);
      const white = 2 + Math.floor(Math.random() * 5);
      const striped = 1 + Math.floor(Math.random() * 3);
      const total = black + white + striped;
      const colors = ['black', 'white', 'striped'];
      const counts = { black, white, striped };
      const target = colors[Math.floor(Math.random() * 3)];
      return { black, white, striped, total, target, targetCount: counts[target] };
    },
    storyTemplateFn: (p, charName) => `${charName}'s boss said "Grab me matching socks from the drawer — but the light is broken, so you can't see." The drawer has ${p.black} black socks, ${p.white} white socks, and ${p.striped} striped socks. ${charName} reaches in completely blind. Each sock is **equally likely** to be grabbed. "What's the worst that could happen?" (Famous last words.) What is the **probability** of grabbing a ${p.target} sock?`,
    steps: [
      {
        prompt: 'How many socks (**total outcomes**) are in the drawer?',
        computeAnswer: (p) => p.total,
        acceptFormats: ['integer'],
        hint: 'Add all the socks: black + white + striped = **total outcomes**.',
        theory: '**Total outcomes** = {black} + {white} + {striped} = {total}.',
        formula: 'Total outcomes = {black} + {white} + {striped} = {total}',
        visual: 'marbles',
        visualParams: (p) => ({ red: p.black, blue: p.white, green: p.striped, highlight: 'all', labels: { red: 'Black', blue: 'White', green: 'Striped' } }),
      },
      {
        prompt: 'What is P(grabbing a {target} sock)? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.targetCount, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Probability** = **desired outcomes** / **total outcomes**.',
        theory: 'P({target}) = {targetCount}/{total}. The {target} socks are the **desired outcomes**.',
        formula: 'P({target}) = desired / total = {targetCount} / {total}',
        miniExample: 'If {targetCount} out of {total} socks are {target}, that\'s a **probability** of {targetCount}/{total}.',
        visual: 'marbles',
        visualParams: (p) => {
          const hl = p.target === 'black' ? 'red' : p.target === 'white' ? 'blue' : 'green';
          return { red: p.black, blue: p.white, green: p.striped, highlight: hl, labels: { red: 'Black', blue: 'White', green: 'Striped' } };
        },
      },
    ],
  },
  {
    id: 'simple_fruits',
    concept: 'simple_probability',
    difficulty: 1,
    characterId: 'bheema',
    keywords: ['probability', 'total_outcomes', 'desired_outcomes', 'equally_likely'],
    storyTemplate: '{character} was challenged to the "Mystery Fruit Challenge" — blindfolded and STARVING. The basket has {apples} apples, {bananas} bananas, and {oranges} oranges. Each fruit is **equally likely** to be grabbed. "I don\'t care what I grab," said {character}, "I\'m eating ALL of them."',
    paramGenerator: () => {
      const apples = 3 + Math.floor(Math.random() * 5);
      const bananas = 2 + Math.floor(Math.random() * 5);
      const oranges = 2 + Math.floor(Math.random() * 4);
      const total = apples + bananas + oranges;
      const fruits = ['apple', 'banana', 'orange'];
      const counts = { apple: apples, banana: bananas, orange: oranges };
      const target = fruits[Math.floor(Math.random() * 3)];
      return { apples, bananas, oranges, total, target, targetCount: counts[target] };
    },
    storyTemplateFn: (p, charName) => `${charName} was challenged to the "Mystery Fruit Challenge" — blindfolded and STARVING. The basket has ${p.apples} apples, ${p.bananas} bananas, and ${p.oranges} oranges. Each fruit is **equally likely** to be grabbed. "I don't care what I grab," said ${charName}, "I'm eating ALL of them." What is the **probability** of grabbing an ${p.target}?`,
    steps: [
      {
        prompt: 'How many fruits (**total outcomes**) are in the basket?',
        computeAnswer: (p) => p.total,
        acceptFormats: ['integer'],
        hint: 'Add all the fruits together to get the **total outcomes**.',
        theory: '**Total outcomes** = {apples} + {bananas} + {oranges} = {total}.',
        formula: 'Total = {apples} + {bananas} + {oranges} = {total}',
        visual: 'marbles',
        visualParams: (p) => ({ red: p.apples, blue: p.bananas, green: p.oranges, highlight: 'all', labels: { red: 'Apple', blue: 'Banana', green: 'Orange' } }),
      },
      {
        prompt: 'What is P(picking an {target})? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.targetCount, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Probability** = **desired outcomes** ({target}s) / **total outcomes**.',
        theory: 'P({target}) = **desired outcomes** / **total outcomes** = {targetCount}/{total}.',
        formula: 'P({target}) = {targetCount} / {total}',
        miniExample: 'If there are 5 apples in 12 fruits, P(apple) = 5/12. Is that **likely** or **unlikely**? Since 5/12 < 1/2, it\'s **unlikely**.',
        visual: 'marbles',
        visualParams: (p) => {
          const hl = p.target === 'apple' ? 'red' : p.target === 'banana' ? 'blue' : 'green';
          return { red: p.apples, blue: p.bananas, green: p.oranges, highlight: hl, labels: { red: 'Apple', blue: 'Banana', green: 'Orange' } };
        },
      },
    ],
  },
  {
    id: 'compound_dep_sweets',
    concept: 'compound_dependent',
    difficulty: 2,
    characterId: 'bheema',
    keywords: ['probability', 'dependent', 'total_outcomes', 'desired_outcomes'],
    storyTemplate: '{character} was asked to pick 2 sweets from a box for "quality testing." The box has {gulab} gulab jamuns and {rasgulla} rasgullas. He picks one and IMMEDIATELY eats it ("for science!"), then picks another. No replacement possible — {character}\'s stomach made these **dependent** events.',
    paramGenerator: () => {
      const gulab = 4 + Math.floor(Math.random() * 4);
      const rasgulla = 3 + Math.floor(Math.random() * 4);
      const total = gulab + rasgulla;
      return { gulab, rasgulla, total };
    },
    storyTemplateFn: (p, charName) => `${charName} was asked to pick 2 sweets from a box for "quality testing." The box has ${p.gulab} gulab jamuns and ${p.rasgulla} rasgullas. He picks one and IMMEDIATELY eats it ("for science!"), then picks another. No replacement possible — ${charName}'s stomach made these **dependent** events. What is P(both are gulab jamuns)?`,
    steps: [
      {
        prompt: 'What is P(first sweet is gulab jamun)? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.gulab, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: 'How many gulab jamuns (**desired outcomes**) out of total sweets (**total outcomes**)?',
        theory: 'P(first gulab) = {gulab}/{total}.',
        formula: 'P(1st gulab) = gulab / total = {gulab} / {total}',
        visual: 'marbles',
        visualParams: (p) => ({ red: p.gulab, blue: p.rasgulla, green: 0, highlight: 'red', labels: { red: 'Gulab Jamun', blue: 'Rasgulla' } }),
      },
      {
        prompt: 'What is P(second is gulab | first was gulab)? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.gulab - 1, p.total - 1),
        acceptFormats: ['fraction', 'decimal'],
        hint: 'One gulab jamun was eaten! How many are left? The **total outcomes** changed because these events are **dependent**.',
        theory: 'After taking 1 gulab: {gulab_minus_1} gulab jamuns left out of {total_minus_1} sweets. P = {gulab_minus_1}/{total_minus_1}.',
        formula: 'P(2nd gulab | 1st gulab) = (gulab−1)/(total−1) = {gulab_minus_1}/{total_minus_1}',
        miniExample: 'Without replacement = **dependent**. The first pick changes what\'s left for the second pick.',
        visual: 'marbles',
        visualParams: (p) => ({ red: p.gulab - 1, blue: p.rasgulla, green: 0, highlight: 'red', labels: { red: 'Gulab Jamun', blue: 'Rasgulla' } }),
      },
      {
        prompt: 'What is P(both gulab jamuns)? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.gulab * (p.gulab - 1), p.total * (p.total - 1)),
        acceptFormats: ['fraction', 'decimal'],
        hint: 'Multiply: P(first) × P(second | first) for **dependent** events.',
        theory: 'P(both gulab) = {gulab}/{total} × {gulab_minus_1}/{total_minus_1}.',
        formula: 'P(A then B) = P(A) × P(B|A)    [dependent events]',
        miniExample: 'Compare: If you put the first sweet BACK (independent), P would be different! Without replacement → dependent → probabilities change.',
        visual: 'tree',
        visualParams: (p) => ({ levels: 2, labels: [['G', 'R'], ['G', 'R']], highlight: 'GG' }),
      },
    ],
  },
  {
    id: 'sample_space_shirts_pants',
    concept: 'sample_space',
    difficulty: 1,
    characterId: 'mahisha',
    keywords: ['sample_space', 'total_outcomes', 'equally_likely'],
    storyTemplate: '{character} is organizing "Kailasa Fashion Week" (Nithyananda insisted on the name). There are {shirts} shirts ({shirtColors}) and {pants} pants ({pantColors}). Each outfit combination is **equally likely** to be chosen. "EVERY combination must be considered!" {character} shouts into a megaphone nobody asked for.',
    paramGenerator: () => {
      const shirts = 2 + Math.floor(Math.random() * 3);
      const pants = 2 + Math.floor(Math.random() * 3);
      const shirtColors = ['red', 'blue', 'green', 'white', 'black'].slice(0, shirts);
      const pantColors = ['jeans', 'khaki', 'black', 'grey', 'shorts'].slice(0, pants);
      const total = shirts * pants;
      return { shirts, pants, shirtColors, pantColors, total };
    },
    storyTemplateFn: (p, charName) => `${charName} is organizing "Kailasa Fashion Week" (Nithyananda insisted on the name). There are ${p.shirts} shirts (${p.shirtColors.join(', ')}) and ${p.pants} pants (${p.pantColors.join(', ')}). Each outfit combination is **equally likely** to be chosen. "EVERY combination must be considered!" ${charName} shouts into a megaphone nobody asked for. How many different outfits are in the **sample space**?`,
    steps: [
      {
        prompt: 'How many shirt choices are there?',
        computeAnswer: (p) => p.shirts,
        acceptFormats: ['integer'],
        hint: 'Count the number of different shirts.',
        theory: 'There are {shirts} shirt options.',
        formula: 'Shirt choices = {shirts}',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'How many pant choices are there?',
        computeAnswer: (p) => p.pants,
        acceptFormats: ['integer'],
        hint: 'Count the number of different pants.',
        theory: 'There are {pants} pant options.',
        formula: 'Pant choices = {pants}',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'How many total outfits are in the **sample space**?',
        computeAnswer: (p) => p.total,
        acceptFormats: ['integer'],
        hint: 'Multiply shirts × pants to get all combinations in the **sample space**.',
        theory: '**Sample space** = {shirts} × {pants} = {total}. Each shirt can be paired with each pant, giving {total} **equally likely** outfits. The **sample space** is the set of ALL possible outcomes.',
        formula: 'Sample Space = choices₁ × choices₂ = {shirts} × {pants} = {total}',
        miniExample: 'If you have 3 shirts and 2 pants, sample space = 3 × 2 = 6 outfits. Each combination is one outcome.',
        visual: 'tree',
        visualParams: (p) => ({ levels: 2, labels: [p.shirtColors, p.pantColors], highlight: null }),
      },
    ],
  },

  // ── Arrangements (Permutations) ──
  {
    id: 'sample_arrangements',
    concept: 'sample_space',
    difficulty: 2,
    characterId: 'mahisha',
    keywords: ['sample_space', 'total_outcomes', 'arrangements', 'factorial', 'permutation'],
    paramGenerator: () => {
      const scenarios = [
        { n: 3, items: 'singers', positions: 'performance slots', context: 'talent show' },
        { n: 4, items: 'dancers', positions: 'positions in the lineup', context: 'dance-off' },
        { n: 5, items: 'players', positions: 'positions on the team', context: 'cricket match' },
        { n: 4, items: 'dishes', positions: 'courses in the menu', context: 'grand feast' },
        { n: 3, items: 'comedians', positions: 'time slots', context: 'comedy night' },
        { n: 5, items: 'contestants', positions: 'chairs on stage', context: 'quiz show' },
      ];
      const s = scenarios[Math.floor(Math.random() * scenarios.length)];
      let factorial = 1;
      const steps_arr = [];
      for (let i = 1; i <= s.n; i++) {
        factorial *= i;
        steps_arr.push(i);
      }
      return { n: s.n, items: s.items, positions: s.positions, context: s.context, factorial, steps_arr };
    },
    storyTemplateFn: (p, charName) => `"LADIES AND GENTLEMEN!" ${charName} bellows into the mic so loudly the speakers actually cry. "Welcome to the GRANDEST ${p.context.toUpperCase()} IN ALL OF HISTORY!" There are ${p.n} different ${p.items} and ${p.n} different ${p.positions}. Each ${p.items.slice(0, -1)} must be placed in exactly one position, and no two can share a spot. "We must consider EVERY POSSIBLE arrangement!" ${charName} screams, shattering a nearby glass. In how many different ways can the ${p.n} ${p.items} be arranged?`,
    steps: [
      {
        prompt: 'How many choices are there for the **first** position?',
        computeAnswer: (p) => p.n,
        acceptFormats: ['integer'],
        hint: 'All {n} {items} are available for the first position. Nobody has been placed yet.',
        theory: 'For the first position, we can choose any of the {n} {items}. That gives us {n} choices.',
        formula: 'First position choices = {n}',
        miniExample: 'If 4 people need seats, any of the 4 can sit in seat 1 → 4 choices.',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'After filling the first position, how many choices remain for the **second**?',
        computeAnswer: (p) => p.n - 1,
        acceptFormats: ['integer'],
        hint: 'One person is already placed. How many are left to choose from?',
        theory: 'After placing one, {n} − 1 = {n} - 1 remain. Each position gets one fewer choice than the one before it.',
        formula: 'Second position choices = {n} − 1',
        miniExample: 'If 4 people fill seats in order: seat 1 has 4 choices, seat 2 has 3 choices (one person is already seated).',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'How many **total arrangements** are there for all {n} {positions}? (Multiply all the choices together.)',
        computeAnswer: (p) => p.factorial,
        acceptFormats: ['integer'],
        hint: 'Multiply: {n} × ({n}−1) × ({n}−2) × ... × 1. This is called {n} factorial, or {n}!',
        theory: 'Total arrangements = {n}! = {n} × ({n}−1) × ... × 1 = {factorial}. When arranging {n} different items in {n} positions, the **sample space** has {n}! outcomes. This is called a **permutation** — the order matters!',
        formula: 'Arrangements = n! = n × (n−1) × (n−2) × ... × 1',
        miniExample: '3 people in 3 chairs: 3! = 3 × 2 × 1 = 6 arrangements. 4 people: 4! = 4 × 3 × 2 × 1 = 24.',
        visual: null,
        visualParams: () => ({}),
      },
    ],
  },

  // ── Distribution across targets ──
  {
    id: 'sample_distribution',
    concept: 'sample_space',
    difficulty: 2,
    characterId: 'shakuni',
    keywords: ['sample_space', 'total_outcomes', 'distribution', 'independent'],
    paramGenerator: () => {
      const scenarios = [
        { items: 2, targets: 4, itemName: 'arrows', targetName: 'rings on a target', emoji: '🎯' },
        { items: 2, targets: 3, itemName: 'coins', targetName: 'boxes', emoji: '🪙' },
        { items: 3, targets: 2, itemName: 'marbles', targetName: 'cups', emoji: '🥤' },
        { items: 2, targets: 5, itemName: 'dice', targetName: 'scoring zones', emoji: '🎲' },
        { items: 3, targets: 3, itemName: 'gems', targetName: 'treasure chests', emoji: '💎' },
        { items: 2, targets: 6, itemName: 'tokens', targetName: 'slots on the board', emoji: '🎰' },
      ];
      const s = scenarios[Math.floor(Math.random() * scenarios.length)];
      const totalOutcomes = Math.pow(s.targets, s.items);
      return { items: s.items, targets: s.targets, itemName: s.itemName, targetName: s.targetName, emoji: s.emoji, totalOutcomes };
    },
    storyTemplateFn: (p, charName) => `${charName} Mama has invented yet another "totally fair" game. ${p.emoji} There are ${p.items} ${p.itemName} and ${p.targets} ${p.targetName}. Each ${p.itemName.slice(0, -1)} can land in ANY of the ${p.targets} ${p.targetName} — independently of the others. "The math is very simple," he says with a suspicious grin, "if you know what you're doing." How many different ways can the ${p.items} ${p.itemName} be distributed across the ${p.targets} ${p.targetName}?`,
    steps: [
      {
        prompt: 'How many choices does the **first** {itemName} have? (How many {targetName} can it go to?)',
        computeAnswer: (p) => p.targets,
        acceptFormats: ['integer'],
        hint: 'The first one can land in any of the {targets} {targetName}.',
        theory: 'The first {itemName} has {targets} possible {targetName} to land in.',
        formula: 'Choices for first item = {targets}',
        miniExample: 'If there are 4 rings on a target, an arrow can hit any of the 4 → 4 choices.',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'How many choices does the **second** {itemName} have? (Can it go to the same place as the first?)',
        computeAnswer: (p) => p.targets,
        acceptFormats: ['integer'],
        hint: 'Each one lands **independently** — it can go to ANY of the {targets} {targetName}, even the same one as before.',
        theory: 'The second {itemName} ALSO has {targets} choices. Unlike arrangements, items CAN share the same spot — each choice is **independent**.',
        formula: 'Choices for each item = {targets} (items are independent)',
        miniExample: 'Two arrows at a 4-ring target: arrow 2 can hit any ring, even the same ring as arrow 1 → still 4 choices.',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'How many **total ways** can {items} {itemName} be distributed across {targets} {targetName}?',
        computeAnswer: (p) => p.totalOutcomes,
        acceptFormats: ['integer'],
        hint: 'Each of the {items} {itemName} has {targets} choices. Multiply: {targets} × {targets} × ... ({items} times).',
        theory: 'Total ways = {targets}^{items} = {totalOutcomes}. When each item independently chooses from {targets} options, we multiply {targets} by itself {items} times. The **sample space** has {totalOutcomes} outcomes.',
        formula: 'Total distributions = (number of targets)^(number of items) = {targets}^{items} = {totalOutcomes}',
        miniExample: '2 arrows on 4 rings: 4² = 16 ways. 3 coins in 2 boxes: 2³ = 8 ways.',
        visual: null,
        visualParams: () => ({}),
      },
    ],
  },

  // ── Arrangements with probability ──
  {
    id: 'sample_arrange_probability',
    concept: 'sample_space',
    difficulty: 3,
    characterId: 'nithyananda',
    keywords: ['sample_space', 'total_outcomes', 'desired_outcomes', 'arrangements', 'factorial', 'probability'],
    paramGenerator: () => {
      const scenarios = [
        { n: 4, items: 'crystals', positions: 'pedestals', special: ['the golden crystal', 'the silver crystal'], specialPositions: ['pedestal 1', 'pedestal 4'] },
        { n: 4, items: 'sacred books', positions: 'shelves', special: ['How I Created the Universe', 'Third Eye Activation Manual'], specialPositions: ['shelf 1', 'shelf 2'] },
        { n: 3, items: 'meditation cushions', positions: 'spots in the hall', special: ['the diamond cushion'], specialPositions: ['the center spot'] },
        { n: 5, items: 'disciples', positions: 'seats at the cosmic table', special: ['Disciple #1', 'Disciple #2'], specialPositions: ['the seat to his left', 'the seat to his right'] },
      ];
      const s = scenarios[Math.floor(Math.random() * scenarios.length)];
      let factorial = 1;
      for (let i = 2; i <= s.n; i++) factorial *= i;
      // Desired: specific items in specific positions, rest can be anywhere
      const remaining = s.n - s.special.length;
      let remainFact = 1;
      for (let i = 2; i <= remaining; i++) remainFact *= i;
      return {
        n: s.n, items: s.items, positions: s.positions,
        special: s.special, specialPositions: s.specialPositions,
        numSpecial: s.special.length, remaining: remaining,
        factorial, remainFact, desired: remainFact,
      };
    },
    storyTemplateFn: (p, charName) => {
      const specialDesc = p.special.map((s, i) => `${s} is on ${p.specialPositions[i]}`).join(' AND ');
      return `${charName} is arranging ${p.n} different ${p.items} on ${p.n} ${p.positions}. "The cosmic energy DEMANDS a specific arrangement!" he declares while adjusting his third eye. Each arrangement is **equally likely** (the universe hasn't decided yet). If ${p.n} ${p.items} are placed randomly, what is the **probability** that ${specialDesc}?`;
    },
    steps: [
      {
        prompt: 'How many **total arrangements** are possible for {n} {items} in {n} {positions}?',
        computeAnswer: (p) => p.factorial,
        acceptFormats: ['integer'],
        hint: '{n} {items} in {n} {positions} → multiply {n} × ({n}−1) × ... × 1 = {n}!',
        theory: 'Total arrangements = {n}! = {factorial}. Each arrangement is one outcome in the **sample space**.',
        formula: 'Total arrangements = n! = {n}! = {factorial}',
        miniExample: '4 books on 4 shelves: 4! = 4 × 3 × 2 × 1 = 24 total arrangements.',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'If the special items are fixed in their required positions, how many ways can the **remaining** {items} be arranged?',
        computeAnswer: (p) => p.remainFact,
        acceptFormats: ['integer'],
        hint: 'Fix the special items in place. The remaining {n} − {numSpecial} = {remaining} items can be arranged in any order.',
        theory: 'With {numSpecial} special items locked in place, the remaining {remaining} items can be arranged in {remaining}! = {remainFact} ways. These are the **desired outcomes**.',
        formula: 'Desired arrangements = (n − fixed)! = {remaining}! = {remainFact}',
        miniExample: 'If 2 of 4 items are fixed, remaining 2 can be arranged in 2! = 2 ways.',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'What is the **probability** of this specific arrangement? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.desired, p.factorial),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Probability** = **desired outcomes** / **total outcomes** = {desired} / {factorial}.',
        theory: 'P = desired / total = {desired}/{factorial}. We used the **sample space** (all {factorial} arrangements) and counted the ones matching our condition ({desired}).',
        formula: 'P = desired arrangements / total arrangements = {desired} / {factorial}',
        miniExample: 'P(specific book on shelf 1) = remaining arrangements / total = 3! / 4! = 6/24 = 1/4.',
        visual: null,
        visualParams: () => ({}),
      },
    ],
  },

  // ── Distribution with probability ──
  {
    id: 'sample_distribute_probability',
    concept: 'sample_space',
    difficulty: 3,
    characterId: 'shambu',
    keywords: ['sample_space', 'total_outcomes', 'desired_outcomes', 'distribution', 'probability'],
    paramGenerator: () => {
      const scenarios = [
        { items: 2, targets: 4, itemName: 'butterflies', targetName: 'flowers', desiredDesc: 'both land on the same flower', desiredCount: 4 },
        { items: 2, targets: 3, itemName: 'birds', targetName: 'branches', desiredDesc: 'both sit on the same branch', desiredCount: 3 },
        { items: 2, targets: 6, itemName: 'frogs', targetName: 'lily pads', desiredDesc: 'both hop onto the same lily pad', desiredCount: 6 },
        { items: 2, targets: 5, itemName: 'monkeys', targetName: 'trees', desiredDesc: 'both climb the same tree', desiredCount: 5 },
      ];
      const s = scenarios[Math.floor(Math.random() * scenarios.length)];
      const totalOutcomes = Math.pow(s.targets, s.items);
      return { ...s, totalOutcomes };
    },
    storyTemplateFn: (p, charName) => `${charName} is photographing wildlife (from behind his triple-locked jeep, obviously). He spots ${p.items} ${p.itemName} that each independently choose one of ${p.targets} ${p.targetName}. "PLEASE don't come this way," he whispers, camera shaking. Each ${p.itemName.slice(0, -1)} picks a ${p.targetName.slice(0, -1)} at random — all ${p.targetName} are **equally likely**. What is the **probability** that ${p.desiredDesc}?`,
    steps: [
      {
        prompt: 'How many **total outcomes** are in the **sample space**?',
        computeAnswer: (p) => p.totalOutcomes,
        acceptFormats: ['integer'],
        hint: 'Each of the {items} {itemName} can go to any of {targets} {targetName}. Multiply: {targets} × {targets}.',
        theory: 'Total outcomes = {targets}^{items} = {totalOutcomes}. Each {itemName} independently chooses from {targets} {targetName}.',
        formula: 'Sample space = {targets}^{items} = {totalOutcomes}',
        miniExample: '2 items choosing from 4 options: 4 × 4 = 16 total outcomes.',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'How many **desired outcomes** have {desiredDesc}?',
        computeAnswer: (p) => p.desiredCount,
        acceptFormats: ['integer'],
        hint: 'If both must be on the SAME one — how many {targetName} could that shared one be?',
        theory: 'They can both be on {targetName} #1, or both on #2, ... or both on #{targets}. That gives {desiredCount} **desired outcomes**.',
        formula: 'Desired outcomes (both same) = number of {targetName} = {desiredCount}',
        miniExample: '2 birds on 3 branches, both on same: (1,1), (2,2), (3,3) = 3 desired outcomes.',
        visual: null,
        visualParams: () => ({}),
      },
      {
        prompt: 'What is the **probability** that {desiredDesc}? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.desiredCount, p.totalOutcomes),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Probability** = **desired outcomes** / **total outcomes**.',
        theory: 'P = {desiredCount}/{totalOutcomes}. From the **sample space** of {totalOutcomes} outcomes, {desiredCount} have both on the same spot.',
        formula: 'P = desired / total = {desiredCount} / {totalOutcomes}',
        miniExample: 'P(2 birds same branch out of 3) = 3/9 = 1/3.',
        visual: null,
        visualParams: () => ({}),
      },
    ],
  },

  // ============ SURVEYING (concept: surveying) ============
  {
    id: 'survey_food_preference',
    concept: 'surveying',
    difficulty: 1,
    characterId: 'bheema',
    keywords: ['survey', 'population', 'sample', 'proportion', 'experimental_probability'],
    storyTemplateFn: (p, charName) => {
      return `${charName} conducted a **survey** at the school food festival. Between bites of samosa (he personally ate 47), he managed to ask ${p.total} students about their favourite snack: ${p.samosa} chose samosa, ${p.chaat} chose chaat, ${p.vada_pav} chose vada pav, and ${p.jalebi} chose jalebi. The school has ${p.population} students total (the **population**). These ${p.total} students are a **sample** from the **population**. "This is PURELY scientific research!" he declared with crumbs on his face.`;
    },
    paramGenerator: () => {
      const samosa = 8 + Math.floor(Math.random() * 10);
      const chaat = 5 + Math.floor(Math.random() * 8);
      const vada_pav = 4 + Math.floor(Math.random() * 7);
      const jalebi = 3 + Math.floor(Math.random() * 6);
      const total = samosa + chaat + vada_pav + jalebi;
      const multiplier = [5, 10, 15, 20][Math.floor(Math.random() * 4)];
      const population = total * multiplier;
      const foods = { samosa, chaat, vada_pav, jalebi };
      const foodNames = Object.keys(foods);
      const targetFood = foodNames[Math.floor(Math.random() * foodNames.length)];
      const targetCount = foods[targetFood];
      const targetLabel = targetFood === 'vada_pav' ? 'vada pav' : targetFood;
      const predictedCount = targetCount * multiplier;
      return { samosa, chaat, vada_pav, jalebi, total, population, targetFood, targetLabel, targetCount, predictedCount };
    },
    steps: [
      {
        prompt: 'How many students were in the **sample** (surveyed)?',
        computeAnswer: (p) => p.total,
        acceptFormats: ['integer'],
        hint: 'The **sample** is the group that was actually asked. Add up all the students who responded to the **survey**.',
        theory: 'The **sample** size = {samosa} + {chaat} + {vada_pav} + {jalebi} = {total}. This is the number of students actually surveyed, not the entire **population** of {population}.',
        formula: 'Sample size = sum of all responses',
        miniExample: 'If you survey 40 students out of a school of 500, the **sample** is 40 and the **population** is 500.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Samosa', count: p.samosa },
            { label: 'Chaat', count: p.chaat },
            { label: 'Vada Pav', count: p.vada_pav },
            { label: 'Jalebi', count: p.jalebi },
          ],
          highlight: null,
        }),
      },
      {
        prompt: 'What **proportion** of the **sample** chose {targetLabel}? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.targetCount, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Proportion** = count who chose {targetLabel} / total surveyed.',
        theory: '**Proportion** of {targetLabel} = {targetCount}/{total}. This **proportion** from the **sample** can be used to make **predictions** about the entire **population**.',
        formula: 'Proportion = frequency of choice / sample size = {targetCount} / {total}',
        miniExample: 'If 12 out of 40 students chose biryani, the proportion = 12/40 = 3/10.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Samosa', count: p.samosa },
            { label: 'Chaat', count: p.chaat },
            { label: 'Vada Pav', count: p.vada_pav },
            { label: 'Jalebi', count: p.jalebi },
          ],
          highlight: p.targetLabel.charAt(0).toUpperCase() + p.targetLabel.slice(1),
        }),
      },
      {
        prompt: 'If the school has {population} students (**population**), how many would you **predict** prefer {targetLabel}?',
        computeAnswer: (p) => p.predictedCount,
        acceptFormats: ['integer'],
        hint: 'Multiply the **proportion** from the **sample** by the **population** size. **Prediction** = proportion x population.',
        theory: '**Prediction** = **proportion** x **population** = ({targetCount}/{total}) x {population} = {predictedCount}. We use the **sample** results to estimate what the entire **population** would say.',
        formula: 'Predicted count = (sample proportion) x population size',
        miniExample: 'If 3/10 of a sample likes dosa, and the school has 300 students, predicted dosa lovers = (3/10) x 300 = 90.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'survey_transport',
    concept: 'surveying',
    difficulty: 2,
    characterId: 'mahisha',
    keywords: ['survey', 'population', 'sample', 'proportion', 'prediction'],
    storyTemplateFn: (p, charName) => {
      return `${charName} is organizing "THE MOST EPIC SPORTS EVENT IN RECORDED HUMAN HISTORY" and needs to arrange transport. He **surveyed** ${p.total} participants about how they travel to school: ${p.bus} by bus, ${p.auto} by auto-rickshaw, ${p.cycle} by cycle, and ${p.walk} walk. The event expects ${p.population} participants (the **population**). "IF EVEN ONE PERSON IS LEFT WITHOUT A RIDE, I WILL NEVER FORGIVE MYSELF!" he screams. This **survey** of ${p.total} people is a **sample**.`;
    },
    paramGenerator: () => {
      const bus = 10 + Math.floor(Math.random() * 10);
      const auto = 6 + Math.floor(Math.random() * 8);
      const cycle = 4 + Math.floor(Math.random() * 6);
      const walk = 3 + Math.floor(Math.random() * 5);
      const total = bus + auto + cycle + walk;
      const multiplier = [5, 10, 15][Math.floor(Math.random() * 3)];
      const population = total * multiplier;
      const busPredict = bus * multiplier;
      const unsurveyed = population - total;
      return { bus, auto, cycle, walk, total, population, busPredict, unsurveyed };
    },
    steps: [
      {
        prompt: 'What **proportion** of the **sample** takes the bus? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.bus, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Proportion** = bus riders / total **sample** size.',
        theory: '**Proportion**(bus) = {bus}/{total}. The **survey** collected data from a **sample** of {total} people.',
        formula: 'Proportion = bus riders / sample size = {bus} / {total}',
        miniExample: 'If 20 out of 50 people ride a bus, proportion = 20/50 = 2/5.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Bus', count: p.bus },
            { label: 'Auto', count: p.auto },
            { label: 'Cycle', count: p.cycle },
            { label: 'Walk', count: p.walk },
          ],
          highlight: 'Bus',
        }),
      },
      {
        prompt: 'Out of {population} expected participants, how many would you **predict** need bus transport?',
        computeAnswer: (p) => p.busPredict,
        acceptFormats: ['integer'],
        hint: '**Prediction** = **proportion** from the **sample** x **population** size. Multiply ({bus}/{total}) x {population}.',
        theory: '**Predicted** bus riders = ({bus}/{total}) x {population} = {busPredict}. We assume the **sample** is **representative** of the **population**.',
        formula: 'Prediction = (sample proportion) x population',
        miniExample: 'If 2/5 of a sample rides a bus and 250 people are coming, predicted bus riders = (2/5) x 250 = 100.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Bus', count: p.bus },
            { label: 'Auto', count: p.auto },
            { label: 'Cycle', count: p.cycle },
            { label: 'Walk', count: p.walk },
          ],
          highlight: 'Bus',
        }),
      },
      {
        prompt: 'How many participants does the **survey** NOT account for? (population minus sample)',
        computeAnswer: (p) => p.unsurveyed,
        acceptFormats: ['integer'],
        hint: 'The **sample** is smaller than the **population**. Subtract: **population** - **sample** size.',
        theory: 'Unaccounted = {population} - {total} = {unsurveyed}. A **survey** only reaches the **sample**, not the whole **population**. That is why we make **predictions** to estimate the rest.',
        formula: 'Unsurveyed = Population - Sample = {population} - {total}',
        miniExample: 'If 40 out of 500 are surveyed, 500 - 40 = 460 people were not asked.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'survey_bird_habitat',
    concept: 'surveying',
    difficulty: 1,
    characterId: 'shambu',
    keywords: ['survey', 'population', 'sample', 'proportion', 'frequency'],
    storyTemplateFn: (p, charName) => {
      return `${charName} was hiding behind a bush (a butterfly had startled him) when his boss called: "Do a bird **survey**!" Still trembling, ${charName} counted birds from his hiding spot: ${p.parrots} parrots, ${p.mynas} mynas, ${p.kingfishers} kingfishers, and ${p.sparrows} sparrows (${p.total} total from the **sample** area). The reserve estimates ${p.population} birds total in the whole area (the **population**). "Does this count as fieldwork?" he whispered into his walkie-talkie.`;
    },
    paramGenerator: () => {
      const parrots = 6 + Math.floor(Math.random() * 8);
      const mynas = 8 + Math.floor(Math.random() * 10);
      const kingfishers = 2 + Math.floor(Math.random() * 4);
      const sparrows = 10 + Math.floor(Math.random() * 10);
      const total = parrots + mynas + kingfishers + sparrows;
      const multiplier = [10, 15, 20, 25][Math.floor(Math.random() * 4)];
      const population = total * multiplier;
      const parrotPredict = parrots * multiplier;
      return { parrots, mynas, kingfishers, sparrows, total, population, parrotPredict };
    },
    steps: [
      {
        prompt: 'What is the total number of birds in the **sample** (the birds counted)?',
        computeAnswer: (p) => p.total,
        acceptFormats: ['integer'],
        hint: 'The **sample** is the group actually observed. Add up all the **frequency** counts.',
        theory: '**Sample** total = {parrots} + {mynas} + {kingfishers} + {sparrows} = {total}. The **sample** is a small part of the **population** of {population} birds in the entire reserve.',
        formula: 'Sample size = sum of all observed birds',
        miniExample: 'If you count 30 birds in one area of a park that has 1000 birds total, your **sample** is 30.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Parrots', count: p.parrots },
            { label: 'Mynas', count: p.mynas },
            { label: 'Kingfishers', count: p.kingfishers },
            { label: 'Sparrows', count: p.sparrows },
          ],
          highlight: null,
        }),
      },
      {
        prompt: 'What **proportion** of the **sample** are parrots? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.parrots, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Proportion** = **frequency** of parrots / total **sample** size.',
        theory: '**Proportion**(parrots) = {parrots}/{total}. This **proportion** from the **sample** can help us **predict** how many parrots are in the whole reserve.',
        formula: 'Proportion = parrot count / sample size = {parrots} / {total}',
        miniExample: 'If 8 out of 40 birds are kingfishers, proportion = 8/40 = 1/5.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Parrots', count: p.parrots },
            { label: 'Mynas', count: p.mynas },
            { label: 'Kingfishers', count: p.kingfishers },
            { label: 'Sparrows', count: p.sparrows },
          ],
          highlight: 'Parrots',
        }),
      },
      {
        prompt: 'If the reserve has {population} birds, how many parrots would you **predict** in the whole **population**?',
        computeAnswer: (p) => p.parrotPredict,
        acceptFormats: ['integer'],
        hint: '**Prediction** = (**proportion** from **sample**) x **population** size.',
        theory: '**Predicted** parrots = ({parrots}/{total}) x {population} = {parrotPredict}. We multiply the **sample proportion** by the **population** to make a **prediction**.',
        formula: 'Prediction = (sample proportion) x population',
        miniExample: 'If 1/5 of a sample are parrots and there are 500 birds total, predicted parrots = (1/5) x 500 = 100.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },

  // ============ SAMPLING (concept: sampling) ============
  {
    id: 'sampling_cricket_preference',
    concept: 'sampling',
    difficulty: 1,
    characterId: 'mahisha',
    keywords: ['sample', 'population', 'proportion', 'prediction', 'representative'],
    storyTemplateFn: (p, charName) => {
      return `${charName} is planning "THE TOURNAMENT TO END ALL TOURNAMENTS" and needs to know which sport to feature. He selects a **sample** of ${p.total} students from a school of ${p.population} students (the **population**). In the **sample**: ${p.cricket} prefer cricket, ${p.football} prefer football, ${p.kabaddi} prefer kabaddi, and ${p.badminton} prefer badminton. "THE PEOPLE HAVE SPOKEN!" he shouts.`;
    },
    paramGenerator: () => {
      const cricket = 12 + Math.floor(Math.random() * 10);
      const football = 6 + Math.floor(Math.random() * 8);
      const kabaddi = 4 + Math.floor(Math.random() * 6);
      const badminton = 3 + Math.floor(Math.random() * 5);
      const total = cricket + football + kabaddi + badminton;
      const multiplier = [5, 10, 15, 20][Math.floor(Math.random() * 4)];
      const population = total * multiplier;
      const cricketPredict = cricket * multiplier;
      const footballPredict = football * multiplier;
      return { cricket, football, kabaddi, badminton, total, population, cricketPredict, footballPredict };
    },
    steps: [
      {
        prompt: 'What **proportion** of the **sample** prefers cricket? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.cricket, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Proportion** = cricket lovers / total **sample** size.',
        theory: '**Proportion**(cricket) = {cricket}/{total}. This tells us the fraction of the **sample** that chose cricket.',
        formula: 'Proportion = cricket fans / sample = {cricket} / {total}',
        miniExample: 'If 15 out of 30 sampled students like cricket, proportion = 15/30 = 1/2.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Cricket', count: p.cricket },
            { label: 'Football', count: p.football },
            { label: 'Kabaddi', count: p.kabaddi },
            { label: 'Badminton', count: p.badminton },
          ],
          highlight: 'Cricket',
        }),
      },
      {
        prompt: 'In the full **population** of {population} students, how many do you **predict** would prefer cricket?',
        computeAnswer: (p) => p.cricketPredict,
        acceptFormats: ['integer'],
        hint: '**Prediction** = **proportion** x **population**. Scale up from the **sample** to the full group.',
        theory: '**Predicted** cricket fans = ({cricket}/{total}) x {population} = {cricketPredict}. We scale the **sample** result up to the **population**.',
        formula: 'Prediction = (sample proportion) x population',
        miniExample: 'If 1/2 of a sample of 40 likes cricket and the school has 400 students, prediction = (1/2) x 400 = 200.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'How many students in the **population** would you **predict** prefer football?',
        computeAnswer: (p) => p.footballPredict,
        acceptFormats: ['integer'],
        hint: 'Use the same method: **proportion** of football in **sample** x **population** size.',
        theory: '**Predicted** football fans = ({football}/{total}) x {population} = {footballPredict}. The same **sample** data lets us make **predictions** for any category!',
        formula: 'Prediction = ({football}/{total}) x {population} = {footballPredict}',
        miniExample: 'From one sample, you can predict multiple things: how many like cricket, football, etc.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Cricket', count: p.cricket },
            { label: 'Football', count: p.football },
            { label: 'Kabaddi', count: p.kabaddi },
            { label: 'Badminton', count: p.badminton },
          ],
          highlight: 'Football',
        }),
      },
    ],
  },
  {
    id: 'sampling_candy_quality',
    concept: 'sampling',
    difficulty: 2,
    characterId: 'suppandi',
    keywords: ['sample', 'population', 'proportion', 'prediction'],
    storyTemplateFn: (p, charName) => {
      return `${charName} got a new job at a candy factory! Boss said: "Randomly pick some candies and check if they're good." ${charName} picked a **sample** of ${p.total} from a batch of ${p.population} candies. He sorted them: ${p.good} perfect, ${p.soft} too soft, and ${p.broken} broken. "How do I test them, boss?" "Check their shape!" "Oh. I thought you meant taste them." (He had already eaten 3.)`;
    },
    paramGenerator: () => {
      const good = 15 + Math.floor(Math.random() * 15);
      const soft = 3 + Math.floor(Math.random() * 5);
      const broken = 2 + Math.floor(Math.random() * 4);
      const total = good + soft + broken;
      const multiplier = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
      const population = total * multiplier;
      const brokenPredict = broken * multiplier;
      const goodPredict = good * multiplier;
      return { good, soft, broken, total, population, brokenPredict, goodPredict };
    },
    steps: [
      {
        prompt: 'What **proportion** of the **sample** candies are broken? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.broken, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Proportion** = broken candies / total **sample**.',
        theory: '**Proportion**(broken) = {broken}/{total}. This fraction from the **sample** estimates the defect rate in the whole batch.',
        formula: 'Proportion(broken) = broken / sample = {broken} / {total}',
        miniExample: 'If 4 out of 25 sampled items are defective, proportion = 4/25.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Perfect', count: p.good },
            { label: 'Too Soft', count: p.soft },
            { label: 'Broken', count: p.broken },
          ],
          highlight: 'Broken',
        }),
      },
      {
        prompt: 'In the full batch of {population} candies, how many broken candies do you **predict**?',
        computeAnswer: (p) => p.brokenPredict,
        acceptFormats: ['integer'],
        hint: '**Prediction** = (broken **proportion**) x **population**. Scale up from the **sample**.',
        theory: '**Predicted** broken = ({broken}/{total}) x {population} = {brokenPredict}. The **sample** helps the factory estimate defects in the full **population** (batch).',
        formula: 'Predicted broken = ({broken}/{total}) x {population} = {brokenPredict}',
        miniExample: 'If 2/25 are broken in a sample, and the batch is 500, predicted broken = (2/25) x 500 = 40.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'How many perfect candies do you **predict** in the full batch of {population}?',
        computeAnswer: (p) => p.goodPredict,
        acceptFormats: ['integer'],
        hint: 'Find the **proportion** of perfect candies in the **sample**, then multiply by {population}.',
        theory: '**Predicted** perfect = ({good}/{total}) x {population} = {goodPredict}. From one **sample**, we can **predict** counts for every category in the **population**.',
        formula: 'Predicted perfect = ({good}/{total}) x {population} = {goodPredict}',
        miniExample: 'If 20 out of 25 sampled candies are perfect, proportion = 20/25 = 4/5. In a batch of 500: (4/5) x 500 = 400 perfect.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Perfect', count: p.good },
            { label: 'Too Soft', count: p.soft },
            { label: 'Broken', count: p.broken },
          ],
          highlight: 'Perfect',
        }),
      },
    ],
  },
  {
    id: 'sampling_wildlife_count',
    concept: 'sampling',
    difficulty: 2,
    characterId: 'shambu',
    keywords: ['sample', 'population', 'proportion', 'prediction', 'representative'],
    storyTemplateFn: (p, charName) => {
      return `${charName} is helping with a wildlife census. Step 1: researchers tagged and released ${p.tagged} deer. Step 2: they asked ${charName} to go recapture some. "RECAPTURE?! I barely survived the first time!" he yelped. Despite his protests, they captured a **sample** of ${p.sampleSize} deer and found ${p.taggedInSample} had tags. Using this **sample**, they want to **predict** the total deer **population** in the forest.`;
    },
    paramGenerator: () => {
      // Pick taggedInSample first, then derive clean values
      const taggedInSample = 2 + Math.floor(Math.random() * 5); // 2-6
      const multiplier = 4 + Math.floor(Math.random() * 4);     // 4-7
      const sampleSize = taggedInSample * multiplier;            // always divisible
      const tagged = taggedInSample * (3 + Math.floor(Math.random() * 4)); // 3x-6x
      const estimatedPop = (tagged * sampleSize) / taggedInSample; // clean integer
      return { tagged, sampleSize, taggedInSample, population: estimatedPop, estimatedPop };
    },
    steps: [
      {
        prompt: 'What **proportion** of the recaptured **sample** has tags? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.taggedInSample, p.sampleSize),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Proportion** = tagged deer in **sample** / total deer in **sample**.',
        theory: '**Proportion**(tagged in sample) = {taggedInSample}/{sampleSize}. If the **sample** is **representative**, this **proportion** should match the proportion of tagged deer in the whole **population**.',
        formula: 'Proportion(tagged) = tagged in sample / sample size = {taggedInSample} / {sampleSize}',
        miniExample: 'If 4 out of 20 recaptured fish have tags, proportion = 4/20 = 1/5.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Tagged', count: p.taggedInSample },
            { label: 'Untagged', count: p.sampleSize - p.taggedInSample },
          ],
          highlight: 'Tagged',
        }),
      },
      {
        prompt: 'Using the proportion, estimate the total deer **population**. (total tagged x sample size / tagged in sample)',
        computeAnswer: (p) => p.estimatedPop,
        acceptFormats: ['integer'],
        hint: 'Total **population** = (total tagged x sample size) / tagged in sample = ({tagged} x {sampleSize}) / {taggedInSample}.',
        theory: 'Estimated **population** = ({tagged} x {sampleSize}) / {taggedInSample} = {estimatedPop}. This capture-recapture method uses the **sample** **proportion** to estimate the **population** size.',
        formula: 'Estimated Population = (total tagged x sample size) / tagged in sample',
        miniExample: 'If 30 fish were tagged, and 5 out of 20 recaptured have tags: population = (30 x 20) / 5 = 120 fish.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },

  // ============ BIASED SAMPLING (concept: biased_sampling) ============
  {
    id: 'biased_lunch_survey',
    concept: 'biased_sampling',
    difficulty: 2,
    characterId: 'bheema',
    keywords: ['biased_sample', 'sample', 'population', 'proportion', 'representative', 'prediction'],
    storyTemplateFn: (p, charName) => {
      return `${charName} wants to know the favourite lunch of ALL students in the school (**population**: ${p.population} students). But being ${charName}, he only asked ${p.total} students standing in the **vegetarian counter** line (because that's where HE was standing). Results: ${p.paneer} chose paneer, ${p.dal} chose dal rice, ${p.chole} chose chole bhature, and ${p.chicken} chose chicken biryani. This is a **biased sample** — only veg counter students were asked!`;
    },
    paramGenerator: () => {
      const paneer = 10 + Math.floor(Math.random() * 8);
      const dal = 8 + Math.floor(Math.random() * 6);
      const chole = 5 + Math.floor(Math.random() * 5);
      const chicken = 1 + Math.floor(Math.random() * 3);
      const total = paneer + dal + chole + chicken;
      const multiplier = [10, 15, 20][Math.floor(Math.random() * 3)];
      const population = total * multiplier;
      const chickenPredict = chicken * multiplier;
      return { paneer, dal, chole, chicken, total, population, chickenPredict };
    },
    steps: [
      {
        prompt: 'Is this a **biased sample**? (Type "yes" or "no")',
        computeAnswer: () => 'yes',
        acceptFormats: ['yesno'],
        hint: 'Think about WHO was surveyed. Were they chosen from the entire **population** or from a specific subgroup?',
        theory: 'Yes, this is a **biased sample**. Only students at the vegetarian counter were asked. Students who eat non-vegetarian food are under-represented. A **biased sample** does NOT fairly represent the whole **population**.',
        formula: 'Biased sample = some members of population had NO chance (or LESS chance) of being selected',
        miniExample: 'Asking only basketball players "What is your favourite sport?" gives a biased sample — they will likely say basketball!',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What **proportion** of this sample chose chicken biryani? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.chicken, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Proportion** = chicken lovers / total **sample**. Note: this proportion is likely lower than the true population proportion because of the **bias**.',
        theory: '**Proportion**(chicken) = {chicken}/{total}. Because the **sample** is **biased** (only vegetarian counter students), this number is probably LOWER than the true proportion in the **population**.',
        formula: 'Proportion = {chicken} / {total}',
        miniExample: 'If you survey only morning people about sleep habits, you will get a biased proportion — it will not represent night owls.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Paneer', count: p.paneer },
            { label: 'Dal Rice', count: p.dal },
            { label: 'Chole', count: p.chole },
            { label: 'Chicken', count: p.chicken },
          ],
          highlight: 'Chicken',
        }),
      },
      {
        prompt: 'Using this biased data, the **prediction** for chicken lovers in {population} students would be {chickenPredict}. Is this prediction likely accurate? (Type "yes" or "no")',
        computeAnswer: () => 'no',
        acceptFormats: ['yesno'],
        hint: 'Remember, the **sample** came only from the vegetarian counter. Would this **represent** the whole school fairly?',
        theory: 'No! This **prediction** ({chickenPredict} chicken lovers out of {population}) is likely TOO LOW because the **biased sample** under-represented non-vegetarian students. A **biased sample** leads to unreliable **predictions**.',
        formula: 'Biased sample leads to unreliable predictions',
        miniExample: 'If you only survey students near the library, you might predict everyone loves reading. That would be wrong because the sample is **biased**.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'biased_game_poll',
    concept: 'biased_sampling',
    difficulty: 2,
    characterId: 'shakuni',
    keywords: ['biased_sample', 'sample', 'population', 'proportion', 'representative'],
    storyTemplateFn: (p, charName) => {
      return `${charName} wants to PROVE that board games are the most popular hobby in school (**population**: ${p.population}). His "totally unbiased" strategy: poll ${p.total} students... at the **Board Games Club** meeting. "What could possibly be wrong with that?" he smirks. Results: ${p.yes} said they play board games regularly and ${p.no} said they do not. This is a **sample** from the Board Games Club only!`;
    },
    paramGenerator: () => {
      const yes = 18 + Math.floor(Math.random() * 10);
      const no = 2 + Math.floor(Math.random() * 3);
      const total = yes + no;
      const multiplier = [10, 20, 25][Math.floor(Math.random() * 3)];
      const population = total * multiplier;
      const biasedPredict = yes * multiplier;
      return { yes, no, total, population, biasedPredict };
    },
    steps: [
      {
        prompt: 'What **proportion** of this **sample** plays board games regularly? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.yes, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Proportion** = "yes" count / total **sample**.',
        theory: '**Proportion**(plays board games) = {yes}/{total}. This looks very high! But remember WHERE the **sample** was taken...',
        formula: 'Proportion = yes / sample size = {yes} / {total}',
        miniExample: 'If 22 out of 25 people at a cricket match say they like cricket, that does not mean 88% of ALL people like cricket!',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Yes (plays)', count: p.yes },
            { label: 'No (does not)', count: p.no },
          ],
          highlight: 'Yes (plays)',
        }),
      },
      {
        prompt: 'Is this **sample** **representative** of all {population} students? (Type "yes" or "no")',
        computeAnswer: () => 'no',
        acceptFormats: ['yesno'],
        hint: 'The **sample** was taken from the Board Games Club. Would non-club members have had a chance to be surveyed?',
        theory: 'No! This is a **biased sample**. People at the Board Games Club are far more likely to play board games than the average student. A **representative** sample must give EVERY student in the **population** an equal chance of being selected.',
        formula: 'A sample is representative ONLY if every population member has an equal chance of being selected',
        miniExample: 'Surveying fish lovers at a seafood restaurant does not represent the whole city.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'The biased **prediction** says {biasedPredict} out of {population} students play board games. Calculate this number: ({yes}/{total}) x {population}',
        computeAnswer: (p) => p.biasedPredict,
        acceptFormats: ['integer'],
        hint: 'Calculate: ({yes}/{total}) x {population}. Even though this is mathematically correct from the **sample**, the **sample** is **biased**.',
        theory: 'The math gives us ({yes}/{total}) x {population} = {biasedPredict}. But because the **sample** is **biased** (from Board Games Club only), this number is almost certainly TOO HIGH. The actual number would be much lower.',
        formula: 'Biased prediction = ({yes}/{total}) x {population} = {biasedPredict} (but unreliable!)',
        miniExample: 'A biased sample always pushes predictions in one direction. Club-based sampling overestimates club-related interests.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'biased_online_review',
    concept: 'biased_sampling',
    difficulty: 3,
    characterId: 'nithyananda',
    keywords: ['biased_sample', 'sample', 'population', 'proportion', 'prediction', 'representative'],
    storyTemplateFn: (p, charName) => {
      return `${charName} published his bestseller "How I Created the Universe (And You Can Too!)." Out of ${p.population} people who bought it, only ${p.total} wrote online reviews. The results: ${p.fivestar} gave 5 stars ("Changed my cosmic DNA!"), ${p.fourstar} gave 4 stars, ${p.threestar} gave 3 stars, and ${p.onestar} gave 1 star ("I want a refund for my consciousness"). People who feel very strongly tend to review more — this is a **biased sample**!`;
    },
    paramGenerator: () => {
      const fivestar = 12 + Math.floor(Math.random() * 8);
      const fourstar = 3 + Math.floor(Math.random() * 3);
      const threestar = 2 + Math.floor(Math.random() * 3);
      const onestar = 8 + Math.floor(Math.random() * 6);
      const total = fivestar + fourstar + threestar + onestar;
      const multiplier = [20, 25, 30, 40][Math.floor(Math.random() * 4)];
      const population = total * multiplier;
      const fivestarPredict = fivestar * multiplier;
      return { fivestar, fourstar, threestar, onestar, total, population, fivestarPredict };
    },
    steps: [
      {
        prompt: 'What **proportion** of reviewers gave 5 stars? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.fivestar, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Proportion** = number of 5-star reviews / total reviews.',
        theory: '**Proportion**(5-star) = {fivestar}/{total}. But remember — only people with strong opinions usually write reviews, so this **sample** is **biased**!',
        formula: 'Proportion(5-star) = {fivestar} / {total}',
        miniExample: 'If 20 out of 50 reviewers give 5 stars, proportion = 20/50 = 2/5.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: '5 Stars', count: p.fivestar },
            { label: '4 Stars', count: p.fourstar },
            { label: '3 Stars', count: p.threestar },
            { label: '1 Star', count: p.onestar },
          ],
          highlight: '5 Stars',
        }),
      },
      {
        prompt: 'What fraction of the **population** ({population} buyers) actually wrote a review? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.total, p.population),
        acceptFormats: ['fraction', 'decimal'],
        hint: 'Fraction = number of reviewers (**sample**) / total buyers (**population**).',
        theory: 'Reviewer fraction = {total}/{population}. Only a small portion of buyers reviewed. This is called self-selection bias — the **sample** selected ITSELF. People with moderate opinions often do not bother reviewing.',
        formula: 'Review rate = reviewers / buyers = {total} / {population}',
        miniExample: 'If 40 out of 1000 buyers write reviews, that is only 4% — a very small and likely biased sample.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'Is the **prediction** that {fivestarPredict} out of {population} buyers loved the book (5 stars) likely reliable? (Type "yes" or "no")',
        computeAnswer: () => 'no',
        acceptFormats: ['yesno'],
        hint: 'The reviewers are NOT a **representative** sample. People with strong opinions are overrepresented.',
        theory: 'No! Online reviews are a classic **biased sample**. People who feel strongly are more likely to review. The silent majority with moderate opinions is not **represented**. A proper **unbiased sample** would require randomly surveying buyers.',
        formula: 'Self-selection bias means extreme opinions are overrepresented, leading to unreliable predictions',
        miniExample: 'Restaurant review sites often show mostly 5-star and 1-star reviews. The 3-star "it was okay" crowd rarely bothers writing.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: '5 Stars', count: p.fivestar },
            { label: '4 Stars', count: p.fourstar },
            { label: '3 Stars', count: p.threestar },
            { label: '1 Star', count: p.onestar },
          ],
          highlight: null,
        }),
      },
    ],
  },

  // ============ UNBIASED SAMPLING (concept: unbiased_sampling) ============
  {
    id: 'unbiased_class_lottery',
    concept: 'unbiased_sampling',
    difficulty: 1,
    characterId: 'mahisha',
    keywords: ['unbiased_sample', 'random_sampling', 'sample', 'population', 'proportion', 'prediction', 'representative'],
    storyTemplateFn: (p, charName) => {
      return `For ONCE, ${charName} does things properly. To find the favourite event at his school fest, he puts ALL ${p.population} student names in a box and draws ${p.total} names by **random sampling** — every student had an **equal chance** of being picked. This is an **unbiased sample**! Results: ${p.dance} chose dance, ${p.drama} chose drama, ${p.music} chose music, and ${p.art} chose art. "SEE? I CAN BE SCIENTIFIC!" he announces proudly.`;
    },
    paramGenerator: () => {
      const dance = 8 + Math.floor(Math.random() * 8);
      const drama = 5 + Math.floor(Math.random() * 6);
      const music = 6 + Math.floor(Math.random() * 7);
      const art = 4 + Math.floor(Math.random() * 5);
      const total = dance + drama + music + art;
      const multiplier = [5, 10, 15, 20][Math.floor(Math.random() * 4)];
      const population = total * multiplier;
      const dancePredict = dance * multiplier;
      return { dance, drama, music, art, total, population, dancePredict };
    },
    steps: [
      {
        prompt: 'Is this an **unbiased sample**? (Type "yes" or "no")',
        computeAnswer: () => 'yes',
        acceptFormats: ['yesno'],
        hint: 'Was every student in the **population** equally likely to be chosen? Were names drawn randomly from ALL students?',
        theory: 'Yes! This is an **unbiased sample** because every student had an **equal chance** of being selected through **random sampling**. No group was favoured or excluded.',
        formula: 'Unbiased sample = every member of population has an EQUAL chance of being selected',
        miniExample: 'Drawing names from a hat with ALL names = **random sampling** = **unbiased**. Asking only your friends = **biased**.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What **proportion** of the **sample** chose dance? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.dance, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Proportion** = dance lovers / total **sample**.',
        theory: '**Proportion**(dance) = {dance}/{total}. Because this is an **unbiased sample**, this **proportion** should be close to the true proportion in the **population**.',
        formula: 'Proportion = dance / sample = {dance} / {total}',
        miniExample: 'If 10 out of 40 randomly sampled students choose dance, proportion = 10/40 = 1/4.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Dance', count: p.dance },
            { label: 'Drama', count: p.drama },
            { label: 'Music', count: p.music },
            { label: 'Art', count: p.art },
          ],
          highlight: 'Dance',
        }),
      },
      {
        prompt: 'How many of the {population} students would you **predict** prefer dance?',
        computeAnswer: (p) => p.dancePredict,
        acceptFormats: ['integer'],
        hint: '**Prediction** = **proportion** x **population**. Because the sample is **unbiased**, this prediction is reliable!',
        theory: '**Predicted** dance fans = ({dance}/{total}) x {population} = {dancePredict}. Because this is an **unbiased sample** from **random sampling**, we can trust this **prediction**!',
        formula: 'Prediction = (sample proportion) x population',
        miniExample: 'An unbiased sample of 50 from a school of 500: if 1/4 chose dance, prediction = (1/4) x 500 = 125.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'unbiased_fruit_inspection',
    concept: 'unbiased_sampling',
    difficulty: 2,
    characterId: 'bheema',
    keywords: ['unbiased_sample', 'random_sampling', 'sample', 'population', 'proportion', 'prediction', 'representative'],
    storyTemplateFn: (p, charName) => {
      return `${charName} is at the mango market. A crate has ${p.population} mangoes (the **population**). To check quality, ${charName} closes his eyes and randomly picks ${p.total} mangoes from DIFFERENT parts of the crate — top, middle, and bottom. This **random sampling** gives an **unbiased sample**. Results: ${p.ripe} ripe, ${p.unripe} unripe, and ${p.overripe} overripe. (He also ate 3 mangoes "for additional research.")`;
    },
    paramGenerator: () => {
      const ripe = 12 + Math.floor(Math.random() * 10);
      const unripe = 4 + Math.floor(Math.random() * 5);
      const overripe = 2 + Math.floor(Math.random() * 4);
      const total = ripe + unripe + overripe;
      const multiplier = [10, 15, 20, 25][Math.floor(Math.random() * 4)];
      const population = total * multiplier;
      const ripePredict = ripe * multiplier;
      return { ripe, unripe, overripe, total, population, ripePredict };
    },
    steps: [
      {
        prompt: 'What **proportion** of the **sample** mangoes are ripe? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.ripe, p.total),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Proportion** = ripe mangoes / total **sample**.',
        theory: '**Proportion**(ripe) = {ripe}/{total}. Since this is an **unbiased sample** using **random sampling** from all parts of the crate, this **proportion** should be **representative** of the whole crate.',
        formula: 'Proportion(ripe) = ripe / sample = {ripe} / {total}',
        miniExample: 'If 15 out of 20 randomly sampled mangoes are ripe, proportion = 15/20 = 3/4.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Ripe', count: p.ripe },
            { label: 'Unripe', count: p.unripe },
            { label: 'Overripe', count: p.overripe },
          ],
          highlight: 'Ripe',
        }),
      },
      {
        prompt: 'How many ripe mangoes do you **predict** in the crate of {population}?',
        computeAnswer: (p) => p.ripePredict,
        acceptFormats: ['integer'],
        hint: '**Prediction** = (ripe **proportion**) x **population**.',
        theory: '**Predicted** ripe = ({ripe}/{total}) x {population} = {ripePredict}. The **random sampling** method makes this **prediction** trustworthy.',
        formula: 'Predicted ripe = ({ripe}/{total}) x {population} = {ripePredict}',
        miniExample: 'If 3/4 of a random sample is ripe and the crate has 200 mangoes, predicted ripe = (3/4) x 200 = 150.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'If mangoes were only picked from the TOP of the crate, would the sample be **unbiased**? (Type "yes" or "no")',
        computeAnswer: () => 'no',
        acceptFormats: ['yesno'],
        hint: 'Would mangoes at the top represent ALL mangoes in the crate? Are mangoes at the bottom equally likely to be picked?',
        theory: 'No! Picking only from the top would be a **biased sample**. The top mangoes might be riper (placed for display) or less ripe (recently added). **Random sampling** from all parts ensures every mango has an **equal chance** of being selected.',
        formula: 'Unbiased = every item has equal chance. Top-only = items at bottom have ZERO chance = biased!',
        miniExample: 'At a fruit stand, the shopkeeper puts the best mangoes on top. Sampling only from the top overestimates quality!',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'unbiased_vs_biased_comparison',
    concept: 'unbiased_sampling',
    difficulty: 3,
    characterId: 'nithyananda',
    keywords: ['unbiased_sample', 'biased_sample', 'random_sampling', 'sample', 'population', 'proportion', 'prediction', 'representative'],
    storyTemplateFn: (p, charName) => {
      return `${charName} wants to predict whether students believe in astrology. He tries TWO methods:\n\n**Method A (Biased):** He asks ${p.biasedTotal} students at his "Cosmic Consciousness Workshop": ${p.biasedYes} say yes, ${p.biasedNo} say no.\n\n**Method B (Unbiased):** He uses **random sampling** to pick ${p.unbiasedTotal} students from the whole school roll (${p.population} students): ${p.unbiasedYes} say yes, ${p.unbiasedNo} say no.\n\n"I prefer Method A's results," he says. "They feel more... cosmically aligned." Which method gives a more reliable **prediction**?`;
    },
    paramGenerator: () => {
      const biasedYes = 18 + Math.floor(Math.random() * 8);
      const biasedNo = 2 + Math.floor(Math.random() * 3);
      const biasedTotal = biasedYes + biasedNo;
      const unbiasedYes = 8 + Math.floor(Math.random() * 6);
      const unbiasedNo = 12 + Math.floor(Math.random() * 8);
      const unbiasedTotal = unbiasedYes + unbiasedNo;
      // population must be divisible by BOTH biasedTotal and unbiasedTotal
      const lcm = (a, b) => (a * b) / gcd(a, b);
      const base = lcm(biasedTotal, unbiasedTotal);
      const multiplier = Math.max(5, Math.ceil(200 / base));
      const population = base * multiplier;
      const biasedPredict = (biasedYes / biasedTotal) * population;
      const unbiasedPredict = (unbiasedYes / unbiasedTotal) * population;
      return {
        population, biasedYes, biasedNo, biasedTotal,
        unbiasedYes, unbiasedNo, unbiasedTotal,
        biasedPredict, unbiasedPredict,
      };
    },
    steps: [
      {
        prompt: 'What is the **proportion** of "yes" in Method B (the **unbiased** random sample)? (Write as a fraction)',
        computeAnswer: (p) => simplify(p.unbiasedYes, p.unbiasedTotal),
        acceptFormats: ['fraction', 'decimal'],
        hint: '**Proportion** = "yes" responses / total in the **unbiased sample** (Method B).',
        theory: '**Proportion**(yes, Method B) = {unbiasedYes}/{unbiasedTotal}. Because Method B used **random sampling** from the whole school, this is an **unbiased sample** and gives a more **representative** proportion.',
        formula: 'Proportion(yes, unbiased) = {unbiasedYes} / {unbiasedTotal}',
        miniExample: 'A random sample of 30 students: 10 say yes. Proportion = 10/30 = 1/3.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Yes (random)', count: p.unbiasedYes },
            { label: 'No (random)', count: p.unbiasedNo },
          ],
          highlight: 'Yes (random)',
        }),
      },
      {
        prompt: 'Using Method B, how many students in the **population** of {population} would you **predict** believe in astrology?',
        computeAnswer: (p) => p.unbiasedPredict,
        acceptFormats: ['integer'],
        hint: '**Prediction** = **proportion** from **unbiased sample** x **population** size.',
        theory: '**Predicted** believers (Method B) = ({unbiasedYes}/{unbiasedTotal}) x {population} = {unbiasedPredict}. This is the more reliable **prediction** because it comes from an **unbiased**, **representative** sample.',
        formula: 'Prediction = ({unbiasedYes}/{unbiasedTotal}) x {population} = {unbiasedPredict}',
        miniExample: 'If 1/3 of a random sample says yes, and the school has 600 students, prediction = (1/3) x 600 = 200.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'Method A (**biased**) would predict {biasedPredict} believers. Method B (**unbiased**) predicts {unbiasedPredict}. Type the more trustworthy prediction:',
        computeAnswer: (p) => p.unbiasedPredict,
        acceptFormats: ['integer'],
        hint: 'Method A surveyed the Astrology Club (a **biased sample**). Method B used **random sampling** (an **unbiased sample**). Which is more **representative**?',
        theory: 'Method B ({unbiasedPredict}) is more trustworthy. Method A (**biased sample** from Astrology Club) predicted {biasedPredict} — way too high because club members are much more likely to believe. Always prefer **random sampling** for reliable **predictions**!',
        formula: 'Unbiased (random) sample gives reliable prediction. Biased sample gives misleading prediction.',
        miniExample: 'Asking Cricket Club vs. random students "Do you like cricket?" gives very different results. The random sample is trustworthy.',
        visual: 'table',
        visualParams: (p) => ({
          type: 'frequency',
          data: [
            { label: 'Club Yes', count: p.biasedYes },
            { label: 'Club No', count: p.biasedNo },
            { label: 'Random Yes', count: p.unbiasedYes },
            { label: 'Random No', count: p.unbiasedNo },
          ],
          highlight: null,
        }),
      },
    ],
  },
];

export function getTemplatesByConcept(concept) {
  return questionTemplates.filter(t => t.concept === concept);
}

export function getTemplateById(id) {
  return questionTemplates.find(t => t.id === id);
}

export const concepts = [
  { id: 'simple_probability', name: 'Simple Probability', description: 'P(event) = desired outcomes / total outcomes' },
  { id: 'complementary', name: 'Complementary Events', description: 'P(not A) = 1 - P(A)' },
  { id: 'compound_independent', name: 'Compound Independent Events', description: 'P(A and B) = P(A) × P(B)' },
  { id: 'compound_dependent', name: 'Compound Dependent Events', description: 'P(A then B) without replacement' },
  { id: 'sample_space', name: 'Sample Space', description: 'Listing/counting all outcomes' },
  { id: 'experimental', name: 'Experimental Probability', description: 'Frequency-based probability from data' },
  { id: 'theoretical_vs_experimental', name: 'Theoretical vs Experimental', description: 'Understanding the difference' },
  { id: 'surveying', name: 'Surveying', description: 'Collecting data and interpreting survey results' },
  { id: 'sampling', name: 'Sampling', description: 'Using samples to make predictions about populations' },
  { id: 'biased_sampling', name: 'Biased Sampling', description: 'Identifying non-representative samples' },
  { id: 'unbiased_sampling', name: 'Unbiased Sampling', description: 'Random sampling where every member has equal chance' },
];

export default questionTemplates;
