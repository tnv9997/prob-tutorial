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
    xLabel: 'Bird Type',
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
    xLabel: 'Food Type',
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
    xLabel: 'Animal Type',
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
    xLabel: 'Die Face',
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
    xLabel: 'Outcome',
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
    xLabel: 'Snack',
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
    xLabel: 'Transport',
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
    xLabel: 'Bird Species',
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
    xLabel: 'Sport',
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
    xLabel: 'Condition',
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
    xLabel: 'Status',
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
    xLabel: 'Food',
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
    xLabel: 'Response',
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
    xLabel: 'Rating',
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
    xLabel: 'Event',
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
    xLabel: 'Ripeness',
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
    xLabel: 'Sample',
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
  // ============ FREQUENCY TABLES (concept: frequency_table) — Ch 11-1 ============
  {
    id: 'freq_table_animal_lengths',
    xLabel: 'Length (in.)',
    concept: 'frequency_table',
    difficulty: 1,
    characterId: 'shambu',
    keywords: ['frequency_table_kw', 'interval', 'frequency'],
    storyTemplateFn: (p, charName) => `${charName} is studying lizards in the desert! He recorded the lengths (in inches) of ${p.total} lizards and organized the data in the **frequency table** shown below.`,
    storyVisual: 'histogram',
    storyVisualParams: (p) => ({
      intervals: [
        { label: '1.0–2.9', count: p.freq1 },
        { label: '3.0–4.9', count: p.freq2 },
        { label: '5.0–6.9', count: p.freq3 },
        { label: '7.0–8.9', count: p.freq4 },
      ],
      highlight: null,
    }),
    paramGenerator: () => {
      const freq1 = 3 + Math.floor(Math.random() * 5);
      const freq2 = 4 + Math.floor(Math.random() * 6);
      const freq3 = 2 + Math.floor(Math.random() * 5);
      const freq4 = 1 + Math.floor(Math.random() * 4);
      const total = freq1 + freq2 + freq3 + freq4;
      const middleTwo = freq2 + freq3;
      const pct = Math.round((middleTwo / total) * 100);
      return { freq1, freq2, freq3, freq4, total, middleTwo, pct };
    },
    steps: [
      {
        prompt: 'How many lizards did {character} record in total?',
        computeAnswer: (p) => p.total,
        acceptFormats: ['integer'],
        hint: 'Add the **frequencies** from all intervals: {freq1} + {freq2} + {freq3} + {freq4}.',
        theory: 'The total is the sum of all **frequencies** in the table. Total = {freq1} + {freq2} + {freq3} + {freq4} = {total}.',
        formula: 'Total = sum of all frequencies',
        miniExample: 'If a table has frequencies 5, 8, 3, then total = 5 + 8 + 3 = 16.',
        visual: 'histogram',
        visualParams: (p) => ({
          intervals: [
            { label: '1.0–2.9', count: p.freq1 },
            { label: '3.0–4.9', count: p.freq2 },
            { label: '5.0–6.9', count: p.freq3 },
            { label: '7.0–8.9', count: p.freq4 },
          ],
          highlight: null,
        }),
      },
      {
        prompt: 'How many lizards had lengths from 3.0 to 6.9 inches? (Add the two middle intervals.)',
        computeAnswer: (p) => p.middleTwo,
        acceptFormats: ['integer'],
        hint: 'The **intervals** 3.0–4.9 and 5.0–6.9 cover 3.0 to 6.9. Add their **frequencies**.',
        theory: 'Lizards from 3.0 to 6.9 inches = frequency of 3.0–4.9 + frequency of 5.0–6.9 = {freq2} + {freq3} = {middleTwo}.',
        formula: 'Combined frequency = sum of frequencies for selected intervals',
        miniExample: 'If interval A has 7 items and interval B has 4, together they have 7 + 4 = 11 items.',
        visual: 'histogram',
        visualParams: (p) => ({
          intervals: [
            { label: '1.0–2.9', count: p.freq1 },
            { label: '3.0–4.9', count: p.freq2 },
            { label: '5.0–6.9', count: p.freq3 },
            { label: '7.0–8.9', count: p.freq4 },
          ],
          highlight: 1,
        }),
      },
      {
        prompt: 'What percent of all lizard lengths are from 3.0 to 6.9 inches? (Round to the nearest whole number.)',
        computeAnswer: (p) => p.pct,
        acceptFormats: ['integer'],
        hint: 'Percent = (combined frequency / total) × 100 = ({middleTwo} / {total}) × 100.',
        theory: 'Percent = ({middleTwo} / {total}) × 100 = {pct}%. This tells us {pct}% of all lizards had lengths in that range.',
        formula: 'Percent = (part / total) × 100',
        miniExample: 'If 6 out of 20 lizards are in an interval, percent = (6/20) × 100 = 30%.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'freq_table_book_prices',
    xLabel: 'Price ($)',
    concept: 'frequency_table',
    difficulty: 1,
    characterId: 'suppandi',
    keywords: ['frequency_table_kw', 'interval', 'frequency'],
    storyTemplateFn: (p, charName) => `${charName}'s boss sent him to organize a used book sale. He sorted ${p.total} books by price into the **frequency table** shown below. "See boss, all sorted!"`,
    storyVisual: 'histogram',
    storyVisualParams: (p) => ({
      intervals: [
        { label: '$1–$1.99', count: p.f1 },
        { label: '$2–$2.99', count: p.f2 },
        { label: '$3–$3.99', count: p.f3 },
        { label: '$4–$4.99', count: p.f4 },
        { label: '$5–$5.99', count: p.f5 },
      ],
      highlight: null,
    }),
    paramGenerator: () => {
      const f1 = 2 + Math.floor(Math.random() * 4);
      const f2 = 3 + Math.floor(Math.random() * 5);
      const f3 = 4 + Math.floor(Math.random() * 5);
      const f4 = 2 + Math.floor(Math.random() * 4);
      const f5 = 1 + Math.floor(Math.random() * 3);
      const total = f1 + f2 + f3 + f4 + f5;
      const freqs = [f1, f2, f3, f4, f5];
      const maxFreq = Math.max(...freqs);
      const maxIdx = freqs.indexOf(maxFreq);
      const labels = ['$1–$1.99', '$2–$2.99', '$3–$3.99', '$4–$4.99', '$5–$5.99'];
      return { f1, f2, f3, f4, f5, total, maxFreq, mostCommonLabel: labels[maxIdx], mostCommonAnswer: maxIdx + 1 };
    },
    steps: [
      {
        prompt: 'How many books are at the sale in total?',
        computeAnswer: (p) => p.total,
        acceptFormats: ['integer'],
        hint: 'Add all the **frequencies**: {f1} + {f2} + {f3} + {f4} + {f5}.',
        theory: 'Total books = {f1} + {f2} + {f3} + {f4} + {f5} = {total}. The total frequency counts every item in the data set.',
        formula: 'Total = sum of all frequencies',
        miniExample: 'Frequencies of 3, 5, 2 gives total = 3 + 5 + 2 = 10.',
        visual: 'histogram',
        visualParams: (p) => ({
          intervals: [
            { label: '$1–$1.99', count: p.f1 },
            { label: '$2–$2.99', count: p.f2 },
            { label: '$3–$3.99', count: p.f3 },
            { label: '$4–$4.99', count: p.f4 },
            { label: '$5–$5.99', count: p.f5 },
          ],
          highlight: null,
        }),
      },
      {
        prompt: 'What is the highest frequency (the count for the most common price interval)?',
        computeAnswer: (p) => p.maxFreq,
        acceptFormats: ['integer'],
        hint: 'Look at the **frequency** for each interval. Which one has the most books?',
        theory: 'The highest frequency is {maxFreq}, which is the {mostCommonLabel} interval. This is the most common price range.',
        formula: 'Most common interval = the interval with the highest frequency',
        miniExample: 'If frequencies are 3, 7, 5, the highest frequency is 7.',
        visual: 'histogram',
        visualParams: (p) => ({
          intervals: [
            { label: '$1–$1.99', count: p.f1 },
            { label: '$2–$2.99', count: p.f2 },
            { label: '$3–$3.99', count: p.f3 },
            { label: '$4–$4.99', count: p.f4 },
            { label: '$5–$5.99', count: p.f5 },
          ],
          highlight: p.mostCommonLabel,
        }),
      },
    ],
  },
  {
    id: 'freq_table_test_scores',
    xLabel: 'Score',
    concept: 'frequency_table',
    difficulty: 2,
    characterId: 'mahisha',
    keywords: ['frequency_table_kw', 'interval', 'frequency'],
    storyTemplateFn: (p, charName) => `${charName} organized a math quiz competition! He recorded ${p.total} students' scores in the **frequency table** shown below.`,
    storyVisual: 'histogram',
    storyVisualParams: (p) => ({
      intervals: [
        { label: '50–59', count: p.f1 },
        { label: '60–69', count: p.f2 },
        { label: '70–79', count: p.f3 },
        { label: '80–89', count: p.f4 },
        { label: '90–100', count: p.f5 },
      ],
      highlight: null,
    }),
    paramGenerator: () => {
      const f1 = 1 + Math.floor(Math.random() * 3);
      const f2 = 3 + Math.floor(Math.random() * 4);
      const f3 = 5 + Math.floor(Math.random() * 5);
      const f4 = 3 + Math.floor(Math.random() * 5);
      const f5 = 1 + Math.floor(Math.random() * 4);
      const total = f1 + f2 + f3 + f4 + f5;
      const above80 = f4 + f5;
      const pctAbove80 = Math.round((above80 / total) * 100);
      return { f1, f2, f3, f4, f5, total, above80, pctAbove80 };
    },
    steps: [
      {
        prompt: 'How many students scored 80 or above?',
        computeAnswer: (p) => p.above80,
        acceptFormats: ['integer'],
        hint: 'Add the frequencies for the 80–89 and 90–100 intervals.',
        theory: 'Students scoring 80+ = {f4} (80–89) + {f5} (90–100) = {above80}.',
        formula: 'Count in range = sum of frequencies for those intervals',
        miniExample: 'If 80–89 has 6 students and 90–100 has 3, then 80+ = 6 + 3 = 9 students.',
        visual: 'histogram',
        visualParams: (p) => ({
          intervals: [
            { label: '50–59', count: p.f1 },
            { label: '60–69', count: p.f2 },
            { label: '70–79', count: p.f3 },
            { label: '80–89', count: p.f4 },
            { label: '90–100', count: p.f5 },
          ],
          highlight: 3,
        }),
      },
      {
        prompt: 'What percent of students scored 80 or above? (Round to the nearest whole number.)',
        computeAnswer: (p) => p.pctAbove80,
        acceptFormats: ['integer'],
        hint: 'Percent = (students scoring 80+ / total students) × 100.',
        theory: 'Percent = ({above80} / {total}) × 100 = {pctAbove80}%.',
        formula: 'Percent = (part / total) × 100',
        miniExample: 'If 9 out of 25 students scored 80+, percent = (9/25) × 100 = 36%.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },

  // ============ HISTOGRAMS (concept: histogram) — Ch 11-2 ============
  {
    id: 'histogram_game_scores',
    xLabel: 'Score',
    concept: 'histogram',
    difficulty: 1,
    characterId: 'shakuni',
    keywords: ['histogram_kw', 'interval', 'frequency'],
    storyTemplateFn: (p, charName) => `${charName} Mama is analyzing scores from a board game tournament! The winning scores are shown in the **histogram** below.`,
    storyVisual: 'histogram',
    storyVisualParams: (p) => ({
      intervals: [
        { label: '0–9', count: p.f1 },
        { label: '10–19', count: p.f2 },
        { label: '20–29', count: p.f3 },
        { label: '30–39', count: p.f4 },
        { label: '40–49', count: p.f5 },
      ],
      highlight: null,
    }),
    paramGenerator: () => {
      const f1 = 1 + Math.floor(Math.random() * 3);
      const f2 = 3 + Math.floor(Math.random() * 5);
      const f3 = 5 + Math.floor(Math.random() * 6);
      const f4 = 3 + Math.floor(Math.random() * 5);
      const f5 = 1 + Math.floor(Math.random() * 3);
      const total = f1 + f2 + f3 + f4 + f5;
      const above30 = f4 + f5;
      return { f1, f2, f3, f4, f5, total, above30 };
    },
    steps: [
      {
        prompt: 'How many total games are shown in the **histogram**?',
        computeAnswer: (p) => p.total,
        acceptFormats: ['integer'],
        hint: 'A **histogram** shows frequencies using bar heights. Add all the frequencies together.',
        theory: 'Total games = {f1} + {f2} + {f3} + {f4} + {f5} = {total}. In a **histogram**, each bar represents one **interval**.',
        formula: 'Total = sum of all bar heights (frequencies)',
        miniExample: 'If bars show 2, 5, 8, 4, then total = 2 + 5 + 8 + 4 = 19.',
        visual: 'histogram',
        visualParams: (p) => ({
          intervals: [
            { label: '0–9', count: p.f1 },
            { label: '10–19', count: p.f2 },
            { label: '20–29', count: p.f3 },
            { label: '30–39', count: p.f4 },
            { label: '40–49', count: p.f5 },
          ],
          highlight: null,
        }),
      },
      {
        prompt: 'How many games had a winning score of 30 or more?',
        computeAnswer: (p) => p.above30,
        acceptFormats: ['integer'],
        hint: 'Add the frequencies for the 30–39 and 40–49 **intervals**.',
        theory: 'Games with score 30+ = {f4} (30–39) + {f5} (40–49) = {above30}.',
        formula: 'Count above threshold = sum of frequencies for intervals at or above threshold',
        miniExample: 'If 30–39 has 6 games and 40–49 has 2, then 30+ = 6 + 2 = 8 games.',
        visual: 'histogram',
        visualParams: (p) => ({
          intervals: [
            { label: '0–9', count: p.f1 },
            { label: '10–19', count: p.f2 },
            { label: '20–29', count: p.f3 },
            { label: '30–39', count: p.f4 },
            { label: '40–49', count: p.f5 },
          ],
          highlight: 3,
        }),
      },
    ],
  },
  {
    id: 'histogram_ages',
    xLabel: 'Age',
    concept: 'histogram',
    difficulty: 1,
    characterId: 'mahisha',
    keywords: ['histogram_kw', 'interval', 'frequency'],
    storyTemplateFn: (p, charName) => `${charName} is organizing a community event! He made a **histogram** of attendee ages, shown below.`,
    storyVisual: 'histogram',
    storyVisualParams: (p) => ({
      intervals: [
        { label: '10–19', count: p.f1 },
        { label: '20–29', count: p.f2 },
        { label: '30–39', count: p.f3 },
        { label: '40–49', count: p.f4 },
        { label: '50–59', count: p.f5 },
      ],
      highlight: null,
    }),
    paramGenerator: () => {
      const f1 = 4 + Math.floor(Math.random() * 6);
      const f2 = 6 + Math.floor(Math.random() * 8);
      const f3 = 5 + Math.floor(Math.random() * 7);
      const f4 = 3 + Math.floor(Math.random() * 5);
      const f5 = 2 + Math.floor(Math.random() * 4);
      const total = f1 + f2 + f3 + f4 + f5;
      const freqs = [f1, f2, f3, f4, f5];
      const maxFreq = Math.max(...freqs);
      const minFreq = Math.min(...freqs);
      const diff = maxFreq - minFreq;
      return { f1, f2, f3, f4, f5, total, maxFreq, minFreq, diff };
    },
    steps: [
      {
        prompt: 'What is the frequency of the tallest bar in the **histogram**?',
        computeAnswer: (p) => p.maxFreq,
        acceptFormats: ['integer'],
        hint: 'The tallest bar has the greatest **frequency**. Compare all the bar heights.',
        theory: 'The tallest bar has a frequency of {maxFreq}. This means the most people fall in that age **interval**.',
        formula: 'Tallest bar = highest frequency',
        miniExample: 'If bars have heights 4, 9, 6, the tallest bar has frequency 9.',
        visual: 'histogram',
        visualParams: (p) => ({
          intervals: [
            { label: '10–19', count: p.f1 },
            { label: '20–29', count: p.f2 },
            { label: '30–39', count: p.f3 },
            { label: '40–49', count: p.f4 },
            { label: '50–59', count: p.f5 },
          ],
          highlight: null,
        }),
      },
      {
        prompt: 'What is the difference between the highest and lowest frequency?',
        computeAnswer: (p) => p.diff,
        acceptFormats: ['integer'],
        hint: 'Find the tallest and shortest bars, then subtract: {maxFreq} − {minFreq}.',
        theory: 'Difference = highest frequency − lowest frequency = {maxFreq} − {minFreq} = {diff}.',
        formula: 'Difference = max frequency − min frequency',
        miniExample: 'If highest bar = 12 and lowest = 3, difference = 12 − 3 = 9.',
        visual: 'histogram',
        visualParams: (p) => ({
          intervals: [
            { label: '10–19', count: p.f1 },
            { label: '20–29', count: p.f2 },
            { label: '30–39', count: p.f3 },
            { label: '40–49', count: p.f4 },
            { label: '50–59', count: p.f5 },
          ],
          highlight: null,
        }),
      },
    ],
  },
  {
    id: 'histogram_temperatures',
    xLabel: 'Temperature (°F)',
    concept: 'histogram',
    difficulty: 2,
    characterId: 'shambu',
    keywords: ['histogram_kw', 'interval', 'frequency'],
    storyTemplateFn: (p, charName) => `${charName} tracked daily high temperatures (°F) while camping for ${p.total} days. His **histogram** is shown below.`,
    storyVisual: 'histogram',
    storyVisualParams: (p) => ({
      intervals: [
        { label: '60–69°F', count: p.f1 },
        { label: '70–79°F', count: p.f2 },
        { label: '80–89°F', count: p.f3 },
        { label: '90–99°F', count: p.f4 },
      ],
      highlight: null,
    }),
    paramGenerator: () => {
      const f1 = 2 + Math.floor(Math.random() * 4);
      const f2 = 4 + Math.floor(Math.random() * 6);
      const f3 = 5 + Math.floor(Math.random() * 6);
      const f4 = 1 + Math.floor(Math.random() * 4);
      const total = f1 + f2 + f3 + f4;
      const below80 = f1 + f2;
      const pctBelow80 = Math.round((below80 / total) * 100);
      return { f1, f2, f3, f4, total, below80, pctBelow80 };
    },
    steps: [
      {
        prompt: 'On how many days was the temperature below 80°F?',
        computeAnswer: (p) => p.below80,
        acceptFormats: ['integer'],
        hint: 'Temperatures below 80°F fall in the 60–69 and 70–79 **intervals**.',
        theory: 'Days below 80°F = {f1} (60–69) + {f2} (70–79) = {below80}.',
        formula: 'Count in range = sum of matching interval frequencies',
        miniExample: 'If 60–69 has 3 days and 70–79 has 7 days, below 80°F = 3 + 7 = 10 days.',
        visual: 'histogram',
        visualParams: (p) => ({
          intervals: [
            { label: '60–69°F', count: p.f1 },
            { label: '70–79°F', count: p.f2 },
            { label: '80–89°F', count: p.f3 },
            { label: '90–99°F', count: p.f4 },
          ],
          highlight: 0,
        }),
      },
      {
        prompt: 'What percent of the days had temperatures below 80°F? (Round to nearest whole number.)',
        computeAnswer: (p) => p.pctBelow80,
        acceptFormats: ['integer'],
        hint: 'Percent = (days below 80 / total days) × 100 = ({below80} / {total}) × 100.',
        theory: 'Percent = ({below80} / {total}) × 100 = {pctBelow80}%.',
        formula: 'Percent = (part / total) × 100',
        miniExample: 'If 10 out of 28 days were below 80°F, percent = (10/28) × 100 ≈ 36%.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },

  // ============ CIRCLE GRAPHS (concept: circle_graph) — Ch 11-3 ============
  {
    id: 'circle_energy_sources',
    concept: 'circle_graph',
    difficulty: 1,
    characterId: 'nithyananda',
    keywords: ['circle_graph_kw'],
    storyTemplateFn: (p, charName) => `${charName} is studying a **circle graph** showing energy sources for a city, shown below. The "Other" category is the remaining percent.`,
    storyVisual: 'circle_graph',
    storyVisualParams: (p) => ({
      segments: [
        { label: 'Solar', percent: p.solar, color: '#EAB308' },
        { label: 'Wind', percent: p.wind, color: '#3B82F6' },
        { label: 'Coal', percent: p.coal, color: '#6B7280' },
        { label: 'Gas', percent: p.gas, color: '#F97316' },
        { label: 'Other', percent: Math.max(1, p.other), color: '#22C55E' },
      ],
      highlight: null,
    }),
    paramGenerator: () => {
      const solar = 10 + Math.floor(Math.random() * 15);
      const wind = 10 + Math.floor(Math.random() * 15);
      const coal = 15 + Math.floor(Math.random() * 15);
      const gas = 15 + Math.floor(Math.random() * 15);
      const other = 100 - solar - wind - coal - gas;
      const solarDeg = Math.round((solar / 100) * 360);
      return { solar, wind, coal, gas, other: Math.max(1, other), solarDeg };
    },
    steps: [
      {
        prompt: 'What percent does the "Other" category represent in the **circle graph**?',
        computeAnswer: (p) => Math.max(1, p.other),
        acceptFormats: ['integer'],
        hint: 'All sections of a **circle graph** must add up to 100%. Subtract the known percentages from 100.',
        theory: 'Other = 100% − {solar}% − {wind}% − {coal}% − {gas}% = {other}%. A **circle graph** always totals 100%.',
        formula: 'Missing % = 100% − sum of all known percentages',
        miniExample: 'If three categories are 30%, 25%, and 20%, the missing one = 100 − 30 − 25 − 20 = 25%.',
        visual: 'circle_graph',
        visualParams: (p) => ({
          segments: [
            { label: 'Solar', percent: p.solar, color: '#EAB308' },
            { label: 'Wind', percent: p.wind, color: '#3B82F6' },
            { label: 'Coal', percent: p.coal, color: '#6B7280' },
            { label: 'Gas', percent: p.gas, color: '#F97316' },
            { label: 'Other', percent: Math.max(1, p.other), color: '#22C55E' },
          ],
          highlight: 'Other',
        }),
      },
      {
        prompt: 'How many degrees does the Solar section take up in the circle? (Round to the nearest whole number.)',
        computeAnswer: (p) => p.solarDeg,
        acceptFormats: ['integer'],
        hint: 'A full circle is 360°. Degrees = (percent / 100) × 360.',
        theory: 'Solar degrees = ({solar} / 100) × 360 = {solarDeg}°. Each 1% of a **circle graph** = 3.6°.',
        formula: 'Degrees = (percent / 100) × 360',
        miniExample: 'If a section is 25%, its degrees = (25/100) × 360 = 90°.',
        visual: 'circle_graph',
        visualParams: (p) => ({
          segments: [
            { label: 'Solar', percent: p.solar, color: '#EAB308' },
            { label: 'Wind', percent: p.wind, color: '#3B82F6' },
            { label: 'Coal', percent: p.coal, color: '#6B7280' },
            { label: 'Gas', percent: p.gas, color: '#F97316' },
            { label: 'Other', percent: Math.max(1, p.other), color: '#22C55E' },
          ],
          highlight: 'Solar',
        }),
      },
    ],
  },
  {
    id: 'circle_time_spent',
    concept: 'circle_graph',
    difficulty: 1,
    characterId: 'suppandi',
    keywords: ['circle_graph_kw'],
    storyTemplateFn: (p, charName) => `${charName}'s boss asked him to make a **circle graph** of how he spends his day, shown below. The rest of the time is "Thinking about marbles."`,
    storyVisual: 'circle_graph',
    storyVisualParams: (p) => ({
      segments: [
        { label: 'Sleeping', percent: p.sleep, color: '#6366F1' },
        { label: 'Working', percent: p.work, color: '#F97316' },
        { label: 'Eating', percent: p.eat, color: '#EAB308' },
        { label: 'Playing', percent: p.play, color: '#22C55E' },
        { label: 'Marbles', percent: Math.max(1, p.marbles), color: '#EC4899' },
      ],
      highlight: null,
    }),
    paramGenerator: () => {
      const sleep = 30 + Math.floor(Math.random() * 8);
      const work = 20 + Math.floor(Math.random() * 10);
      const eat = 8 + Math.floor(Math.random() * 7);
      const play = 10 + Math.floor(Math.random() * 8);
      const marbles = 100 - sleep - work - eat - play;
      const workDeg = Math.round((work / 100) * 360);
      return { sleep, work, eat, play, marbles: Math.max(1, marbles), workDeg };
    },
    steps: [
      {
        prompt: 'What percent of the day does {character} spend "Thinking about marbles"?',
        computeAnswer: (p) => Math.max(1, p.marbles),
        acceptFormats: ['integer'],
        hint: 'All categories in a **circle graph** add to 100%. Subtract the others from 100.',
        theory: 'Marbles = 100 − {sleep} − {work} − {eat} − {play} = {marbles}%.',
        formula: 'Missing % = 100 − sum of known %',
        miniExample: 'If Sleep=33%, Work=25%, Eat=10%, Play=12%, then Missing = 100−33−25−10−12 = 20%.',
        visual: 'circle_graph',
        visualParams: (p) => ({
          segments: [
            { label: 'Sleeping', percent: p.sleep, color: '#6366F1' },
            { label: 'Working', percent: p.work, color: '#F97316' },
            { label: 'Eating', percent: p.eat, color: '#EAB308' },
            { label: 'Playing', percent: p.play, color: '#22C55E' },
            { label: 'Marbles', percent: Math.max(1, p.marbles), color: '#EC4899' },
          ],
          highlight: 'Marbles',
        }),
      },
      {
        prompt: 'How many degrees does the "Working" section span? (Round to nearest whole number.)',
        computeAnswer: (p) => p.workDeg,
        acceptFormats: ['integer'],
        hint: 'Degrees = (percent / 100) × 360 = ({work} / 100) × 360.',
        theory: 'Working degrees = ({work} / 100) × 360 = {workDeg}°.',
        formula: 'Degrees = (percent / 100) × 360',
        miniExample: 'If a section is 20%, degrees = (20/100) × 360 = 72°.',
        visual: 'circle_graph',
        visualParams: (p) => ({
          segments: [
            { label: 'Sleeping', percent: p.sleep, color: '#6366F1' },
            { label: 'Working', percent: p.work, color: '#F97316' },
            { label: 'Eating', percent: p.eat, color: '#EAB308' },
            { label: 'Playing', percent: p.play, color: '#22C55E' },
            { label: 'Marbles', percent: Math.max(1, p.marbles), color: '#EC4899' },
          ],
          highlight: 'Working',
        }),
      },
    ],
  },
  {
    id: 'circle_food_budget',
    concept: 'circle_graph',
    difficulty: 2,
    characterId: 'bheema',
    keywords: ['circle_graph_kw'],
    storyTemplateFn: (p, charName) => `${charName} made a **circle graph** of his monthly food budget of $${p.budget}, shown below. Snacks make up the rest.`,
    storyVisual: 'circle_graph',
    storyVisualParams: (p) => ({
      segments: [
        { label: 'Grains', percent: p.grains, color: '#D97706' },
        { label: 'Veggies', percent: p.veg, color: '#22C55E' },
        { label: 'Fruits', percent: p.fruit, color: '#EF4444' },
        { label: 'Sweets', percent: p.sweets, color: '#EC4899' },
        { label: 'Snacks', percent: Math.max(1, p.snacks), color: '#8B5CF6' },
      ],
      highlight: null,
    }),
    paramGenerator: () => {
      const grains = 25 + Math.floor(Math.random() * 10);
      const veg = 15 + Math.floor(Math.random() * 10);
      const fruit = 10 + Math.floor(Math.random() * 8);
      const sweets = 10 + Math.floor(Math.random() * 10);
      const snacks = 100 - grains - veg - fruit - sweets;
      const budget = 200 + Math.floor(Math.random() * 6) * 50;
      const sweetsDollars = Math.round((sweets / 100) * budget);
      return { grains, veg, fruit, sweets, snacks: Math.max(1, snacks), budget, sweetsDollars };
    },
    steps: [
      {
        prompt: 'What percent goes to Snacks?',
        computeAnswer: (p) => Math.max(1, p.snacks),
        acceptFormats: ['integer'],
        hint: 'The **circle graph** totals 100%. Subtract all known categories.',
        theory: 'Snacks = 100 − {grains} − {veg} − {fruit} − {sweets} = {snacks}%.',
        formula: 'Missing % = 100 − sum of known %',
        miniExample: 'If categories total 85%, the missing one is 100 − 85 = 15%.',
        visual: 'circle_graph',
        visualParams: (p) => ({
          segments: [
            { label: 'Grains', percent: p.grains, color: '#D97706' },
            { label: 'Veggies', percent: p.veg, color: '#22C55E' },
            { label: 'Fruits', percent: p.fruit, color: '#EF4444' },
            { label: 'Sweets', percent: p.sweets, color: '#EC4899' },
            { label: 'Snacks', percent: Math.max(1, p.snacks), color: '#8B5CF6' },
          ],
          highlight: 'Snacks',
        }),
      },
      {
        prompt: 'How many dollars does {character} spend on Sweets?',
        computeAnswer: (p) => p.sweetsDollars,
        acceptFormats: ['integer'],
        hint: 'Dollars = (percent / 100) × total budget = ({sweets} / 100) × {budget}.',
        theory: 'Sweets spending = ({sweets} / 100) × ${budget} = ${sweetsDollars}.',
        formula: 'Amount = (percent / 100) × total',
        miniExample: 'If Sweets is 15% of a $300 budget, amount = (15/100) × 300 = $45.',
        visual: 'circle_graph',
        visualParams: (p) => ({
          segments: [
            { label: 'Grains', percent: p.grains, color: '#D97706' },
            { label: 'Veggies', percent: p.veg, color: '#22C55E' },
            { label: 'Fruits', percent: p.fruit, color: '#EF4444' },
            { label: 'Sweets', percent: p.sweets, color: '#EC4899' },
            { label: 'Snacks', percent: Math.max(1, p.snacks), color: '#8B5CF6' },
          ],
          highlight: 'Sweets',
        }),
      },
    ],
  },

  // ============ CENTRAL TENDENCY (concept: central_tendency) — Ch 11-4 ============
  {
    id: 'central_prices',
    xLabel: 'Price ($)',
    concept: 'central_tendency',
    difficulty: 1,
    characterId: 'suppandi',
    keywords: ['mean', 'median', 'mode', 'range'],
    storyTemplateFn: (p, charName) => `${charName}'s boss asked him to find the average price of backpacks in the store. The prices (in dollars) are shown below. "Average? I'll just pick the middle one!" said ${charName}. Let's help him do it properly.`,
    storyVisual: 'table',
    storyVisualParams: (p) => ({ type: 'frequency', data: p.data.map(v => ({ label: '$' + v, count: v })) }),
    paramGenerator: () => {
      const n = 5;
      const data = [];
      for (let i = 0; i < n; i++) data.push(20 + Math.floor(Math.random() * 30));
      data.sort((a, b) => a - b);
      const sum = data.reduce((s, v) => s + v, 0);
      const mean = Math.round(sum / n * 10) / 10;
      const median = data[Math.floor(n / 2)];
      const rangeVal = data[n - 1] - data[0];
      return { data, n, sum, mean, median, rangeVal };
    },
    steps: [
      {
        prompt: 'What is the sum of all the prices?',
        computeAnswer: (p) => p.sum,
        acceptFormats: ['integer'],
        hint: 'Add all the values: {data}.',
        theory: 'Sum = {data} added together = {sum}. The sum is the first step in calculating the **mean**.',
        formula: 'Sum = add all data values',
        miniExample: 'If prices are 20, 30, 40, the sum = 20 + 30 + 40 = 90.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is the **mean** (average) price? (Round to one decimal if needed, e.g. 34.5)',
        computeAnswer: (p) => p.mean,
        acceptFormats: ['decimal', 'integer'],
        hint: '**Mean** = sum / number of values = {sum} / {n}.',
        theory: '**Mean** = {sum} / {n} = {mean}. The **mean** is the "balance point" of the data.',
        formula: 'Mean = sum of values / number of values',
        miniExample: 'If sum = 90 and there are 3 values, mean = 90/3 = 30.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is the **range** of the prices?',
        computeAnswer: (p) => p.rangeVal,
        acceptFormats: ['integer'],
        hint: '**Range** = highest value − lowest value.',
        theory: '**Range** = {data} → max is {data[' + 'n-1' + ']} and min is {data[0]}, so **range** = ' + '{rangeVal}.',
        formula: 'Range = maximum − minimum',
        miniExample: 'If prices go from $20 to $48, range = 48 − 20 = $28.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'central_quiz_scores',
    xLabel: 'Score',
    concept: 'central_tendency',
    difficulty: 1,
    characterId: 'mahisha',
    keywords: ['mean', 'median', 'mode'],
    storyTemplateFn: (p, charName) => `${charName} recorded quiz scores for 7 students, shown below. He needs to find the **median** score to give an award to the "middle" student.`,
    storyVisual: 'table',
    storyVisualParams: (p) => ({ type: 'frequency', data: p.data.map(v => ({ label: String(v), count: v })) }),
    paramGenerator: () => {
      const data = [];
      for (let i = 0; i < 7; i++) data.push(5 + Math.floor(Math.random() * 11));
      data.sort((a, b) => a - b);
      const median = data[3];
      const sum = data.reduce((s, v) => s + v, 0);
      const mean = Math.round(sum / 7 * 10) / 10;
      return { data, median, sum, mean };
    },
    steps: [
      {
        prompt: 'The scores in order are: {data}. What is the **median**?',
        computeAnswer: (p) => p.median,
        acceptFormats: ['integer'],
        hint: 'The **median** is the middle value when data is in order. With 7 values, the middle one is the 4th.',
        theory: 'With 7 values in order, the **median** is the 4th value = {median}. For an odd number of values, the **median** is simply the middle one.',
        formula: 'For n values: median is at position (n + 1) / 2',
        miniExample: 'Data: 3, 5, 7, 9, 11 → median = 7 (the 3rd value out of 5).',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is the **mean** score? (Round to one decimal.)',
        computeAnswer: (p) => p.mean,
        acceptFormats: ['decimal', 'integer'],
        hint: '**Mean** = sum of all scores / number of students = {sum} / 7.',
        theory: '**Mean** = {sum} / 7 = {mean}. Compare this to the **median** ({median}) — they may differ!',
        formula: 'Mean = sum / count',
        miniExample: 'Scores 6, 8, 10 → mean = 24/3 = 8.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'central_animal_data',
    xLabel: 'Length (in.)',
    concept: 'central_tendency',
    difficulty: 2,
    characterId: 'shambu',
    keywords: ['mean', 'median', 'mode', 'range'],
    storyTemplateFn: (p, charName) => `${charName} measured the lengths (in inches) of ${p.n} fish he caught, shown below. He wants to describe this data using **measures of central tendency**.`,
    storyVisual: 'table',
    storyVisualParams: (p) => ({ type: 'frequency', data: p.data.map(v => ({ label: v + '"', count: v })) }),
    paramGenerator: () => {
      const n = 8;
      const base = 8 + Math.floor(Math.random() * 5);
      const data = [];
      // Ensure at least one repeated value for mode
      const modeVal = base + Math.floor(Math.random() * 5);
      data.push(modeVal, modeVal);
      for (let i = 2; i < n; i++) data.push(base + Math.floor(Math.random() * 12));
      data.sort((a, b) => a - b);
      const sum = data.reduce((s, v) => s + v, 0);
      const mean = Math.round(sum / n * 10) / 10;
      const median = Math.round(((data[3] + data[4]) / 2) * 10) / 10;
      const rangeVal = data[n - 1] - data[0];
      // Find mode
      const freq = {};
      data.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
      const maxF = Math.max(...Object.values(freq));
      const mode = Number(Object.keys(freq).find(k => freq[k] === maxF));
      return { data, n, sum, mean, median, rangeVal, mode };
    },
    steps: [
      {
        prompt: 'What is the **mean** length? (Round to one decimal.)',
        computeAnswer: (p) => p.mean,
        acceptFormats: ['decimal', 'integer'],
        hint: '**Mean** = sum of all lengths / count. Sum = {sum}, count = {n}.',
        theory: '**Mean** = {sum} / {n} = {mean} inches.',
        formula: 'Mean = sum / count',
        miniExample: 'Fish lengths 8, 10, 12 → mean = 30/3 = 10 inches.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is the **median** length? (With {n} values, average the two middle ones.)',
        computeAnswer: (p) => p.median,
        acceptFormats: ['decimal', 'integer'],
        hint: 'With {n} (even) values sorted, the **median** is the average of the 4th and 5th values.',
        theory: '**Median** = (4th + 5th value) / 2 = {median}. With an even count, average the two middle values.',
        formula: 'Median (even n) = (value at n/2 + value at n/2 + 1) / 2',
        miniExample: 'Data: 3, 5, 7, 9 → median = (5 + 7) / 2 = 6.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is the **mode** of the data?',
        computeAnswer: (p) => p.mode,
        acceptFormats: ['integer'],
        hint: 'The **mode** is the value that appears most often. Look for repeated numbers in: {data}.',
        theory: 'The **mode** is {mode} because it appears more often than any other value in the data set.',
        formula: 'Mode = value with highest frequency',
        miniExample: 'Data: 5, 7, 7, 8, 10 → mode = 7 (appears twice).',
        visual: null,
        visualParams: () => null,
      },
    ],
  },

  // ============ MEASURES OF VARIATION (concept: measures_of_variation) — Ch 11-5 ============
  {
    id: 'variation_animal_weights',
    xLabel: 'Weight (lb)',
    concept: 'measures_of_variation',
    difficulty: 2,
    characterId: 'shambu',
    keywords: ['range', 'quartile', 'interquartile_range', 'median'],
    storyTemplateFn: (p, charName) => `${charName} weighed ${p.n} wild cats (in pounds), shown below. He wants to describe the spread using **measures of variation**.`,
    storyVisual: 'table',
    storyVisualParams: (p) => ({ type: 'frequency', data: p.data.map(v => ({ label: v + ' lb', count: v })) }),
    paramGenerator: () => {
      const n = 8;
      const data = [];
      for (let i = 0; i < n; i++) data.push(5 + Math.floor(Math.random() * 45));
      data.sort((a, b) => a - b);
      const rangeVal = data[n - 1] - data[0];
      const median = Math.round(((data[3] + data[4]) / 2) * 10) / 10;
      const lowerHalf = data.slice(0, 4);
      const upperHalf = data.slice(4);
      const q1 = Math.round(((lowerHalf[1] + lowerHalf[2]) / 2) * 10) / 10;
      const q3 = Math.round(((upperHalf[1] + upperHalf[2]) / 2) * 10) / 10;
      const iqr = Math.round((q3 - q1) * 10) / 10;
      return { data, n, rangeVal, median, q1, q3, iqr };
    },
    steps: [
      {
        prompt: 'What is the **range** of the weights?',
        computeAnswer: (p) => p.rangeVal,
        acceptFormats: ['integer'],
        hint: '**Range** = maximum − minimum = {data[7]} − {data[0]}.',
        theory: '**Range** = {data[7]} − {data[0]} = {rangeVal}. The **range** tells how spread out the entire data set is.',
        formula: 'Range = max − min',
        miniExample: 'Data: 5, 12, 20, 35, 48 → range = 48 − 5 = 43.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is Q1 (the first **quartile**)? Data: {data}',
        computeAnswer: (p) => p.q1,
        acceptFormats: ['decimal', 'integer'],
        hint: 'Q1 is the **median** of the lower half of the data (first 4 values). Average the 2nd and 3rd values of the lower half.',
        theory: 'Lower half: {data[0]}, {data[1]}, {data[2]}, {data[3]}. Q1 = ({data[1]} + {data[2]}) / 2 = {q1}.',
        formula: 'Q1 = median of the lower half of the sorted data',
        miniExample: 'Lower half: 5, 8, 12, 15 → Q1 = (8 + 12) / 2 = 10.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is the **interquartile range** (IQR)? Q1 = {q1}, Q3 = {q3}.',
        computeAnswer: (p) => p.iqr,
        acceptFormats: ['decimal', 'integer'],
        hint: '**IQR** = Q3 − Q1 = {q3} − {q1}.',
        theory: '**IQR** = Q3 − Q1 = {q3} − {q1} = {iqr}. The IQR measures the spread of the middle 50% of the data.',
        formula: 'IQR = Q3 − Q1',
        miniExample: 'If Q1 = 10 and Q3 = 25, IQR = 25 − 10 = 15.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'variation_temperatures',
    xLabel: 'Temperature (°F)',
    concept: 'measures_of_variation',
    difficulty: 2,
    characterId: 'nithyananda',
    keywords: ['range', 'quartile', 'interquartile_range', 'outlier'],
    storyTemplateFn: (p, charName) => `${charName} recorded 8 daily temperatures (°F), shown below. "The stars tell me there is an unusual value here!" Let's use **measures of variation** to investigate.`,
    storyVisual: 'table',
    storyVisualParams: (p) => ({ type: 'frequency', data: p.data.map(v => ({ label: v + '°', count: v })) }),
    paramGenerator: () => {
      const data = [];
      const base = 65 + Math.floor(Math.random() * 10);
      for (let i = 0; i < 7; i++) data.push(base + Math.floor(Math.random() * 15));
      // Add an outlier
      const outlierVal = base + 35 + Math.floor(Math.random() * 10);
      data.push(outlierVal);
      data.sort((a, b) => a - b);
      const median = Math.round(((data[3] + data[4]) / 2) * 10) / 10;
      const lH = data.slice(0, 4);
      const uH = data.slice(4);
      const q1 = Math.round(((lH[1] + lH[2]) / 2) * 10) / 10;
      const q3 = Math.round(((uH[1] + uH[2]) / 2) * 10) / 10;
      const iqr = Math.round((q3 - q1) * 10) / 10;
      const upperFence = q3 + 1.5 * iqr;
      const lowerFence = q1 - 1.5 * iqr;
      const outliers = data.filter(v => v > upperFence || v < lowerFence);
      const hasOutlier = outliers.length > 0 ? 'yes' : 'no';
      return { data, median, q1, q3, iqr, outlierVal, hasOutlier, upperFence: Math.round(upperFence * 10) / 10 };
    },
    steps: [
      {
        prompt: 'What is the **median** temperature?',
        computeAnswer: (p) => p.median,
        acceptFormats: ['decimal', 'integer'],
        hint: 'With 8 values sorted, the **median** is the average of the 4th and 5th values.',
        theory: '**Median** = (4th + 5th values) / 2 = {median}°F.',
        formula: 'Median (even n) = average of two middle values',
        miniExample: 'Data: 60, 62, 68, 70, 72, 75, 78, 95 → median = (70+72)/2 = 71.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is the IQR? (Q1 = {q1}, Q3 = {q3})',
        computeAnswer: (p) => p.iqr,
        acceptFormats: ['decimal', 'integer'],
        hint: '**IQR** = Q3 − Q1.',
        theory: '**IQR** = {q3} − {q1} = {iqr}.',
        formula: 'IQR = Q3 − Q1',
        miniExample: 'Q1 = 65, Q3 = 78 → IQR = 78 − 65 = 13.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'Is there an **outlier** in this data? (yes or no). An outlier is above Q3 + 1.5 × IQR = {upperFence}.',
        computeAnswer: (p) => p.hasOutlier,
        acceptFormats: ['yes/no'],
        hint: 'Check if any value is greater than {upperFence} (= Q3 + 1.5 × IQR). The highest value is {data[7]}.',
        theory: 'Upper fence = Q3 + 1.5 × IQR = {q3} + 1.5 × {iqr} = {upperFence}. Since {data[7]} > {upperFence}, {hasOutlier}, there is an **outlier**!',
        formula: 'Outlier if value > Q3 + 1.5 × IQR or value < Q1 − 1.5 × IQR',
        miniExample: 'If Q3 = 78, IQR = 13, upper fence = 78 + 19.5 = 97.5. A value of 100 would be an outlier.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'variation_race_times',
    xLabel: 'Time (s)',
    concept: 'measures_of_variation',
    difficulty: 2,
    characterId: 'mahisha',
    keywords: ['range', 'quartile', 'interquartile_range', 'five_number_summary'],
    storyTemplateFn: (p, charName) => `${charName} timed ${p.n} runners (in seconds), shown below. He needs the **five-number summary** to make a box plot.`,
    storyVisual: 'table',
    storyVisualParams: (p) => ({ type: 'frequency', data: p.data.map(v => ({ label: v + 's', count: v })) }),
    paramGenerator: () => {
      const n = 10;
      const data = [];
      for (let i = 0; i < n; i++) data.push(50 + Math.floor(Math.random() * 40));
      data.sort((a, b) => a - b);
      const min = data[0];
      const max = data[n - 1];
      const median = (data[4] + data[5]) / 2;
      const lH = data.slice(0, 5);
      const uH = data.slice(5);
      const q1 = lH[2];
      const q3 = uH[2];
      const iqr = q3 - q1;
      return { data, n, min, max, median, q1, q3, iqr };
    },
    steps: [
      {
        prompt: 'What is the **range** of the running times?',
        computeAnswer: (p) => p.max - p.min,
        acceptFormats: ['integer'],
        hint: '**Range** = max − min = {max} − {min}.',
        theory: '**Range** = {max} − {min} = ' + '{iqr}. Wait — the range is max − min which is {max} − {min}.',
        formula: 'Range = maximum − minimum',
        miniExample: 'Times: 52, 60, 78 → range = 78 − 52 = 26 seconds.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is Q1 (first **quartile**)? The sorted data has {n} values — Q1 is the median of the first 5.',
        computeAnswer: (p) => p.q1,
        acceptFormats: ['integer', 'decimal'],
        hint: 'Lower half: first 5 values. The middle (3rd) value of these 5 is Q1.',
        theory: 'Lower half: {data[0]}, {data[1]}, {data[2]}, {data[3]}, {data[4]}. Q1 = {q1} (the 3rd value).',
        formula: 'Q1 = median of the lower half',
        miniExample: 'Lower half: 50, 55, 58, 62, 65 → Q1 = 58 (middle value).',
        visual: 'box_plot',
        visualParams: (p) => ({
          min: p.min, q1: p.q1, median: p.median, q3: p.q3, max: p.max,
          highlight: 'iqr',
        }),
      },
      {
        prompt: 'What is the **IQR**? (Q1 = {q1}, Q3 = {q3})',
        computeAnswer: (p) => p.iqr,
        acceptFormats: ['integer'],
        hint: '**IQR** = Q3 − Q1 = {q3} − {q1}.',
        theory: '**IQR** = {q3} − {q1} = {iqr}. The IQR represents the spread of the middle 50% of runners.',
        formula: 'IQR = Q3 − Q1',
        miniExample: 'Q1 = 55, Q3 = 72 → IQR = 72 − 55 = 17.',
        visual: 'box_plot',
        visualParams: (p) => ({
          min: p.min, q1: p.q1, median: p.median, q3: p.q3, max: p.max,
          highlight: 'iqr',
        }),
      },
    ],
  },

  // ============ BOX-AND-WHISKER PLOTS (concept: box_and_whisker) — Ch 11-6 ============
  {
    id: 'box_ages',
    xLabel: 'Age (years)',
    concept: 'box_and_whisker',
    difficulty: 1,
    characterId: 'mahisha',
    keywords: ['box_and_whisker_kw', 'five_number_summary', 'quartile', 'median'],
    storyTemplateFn: (p, charName) => `${charName} made a **box-and-whisker plot** of the ages of ${p.n} children signed up for swimming, shown below.`,
    storyVisual: 'box_plot',
    storyVisualParams: (p) => ({
      min: p.min, q1: p.q1, median: p.median, q3: p.q3, max: p.max,
      highlight: null,
    }),
    paramGenerator: () => {
      const n = 10;
      const data = [];
      for (let i = 0; i < n; i++) data.push(7 + Math.floor(Math.random() * 10));
      data.sort((a, b) => a - b);
      const min = data[0];
      const max = data[n - 1];
      const median = (data[4] + data[5]) / 2;
      const q1 = data[2];
      const q3 = data[7];
      const iqr = q3 - q1;
      const rangeVal = max - min;
      return { data, n, min, max, median, q1, q3, iqr, rangeVal };
    },
    steps: [
      {
        prompt: 'What is the **range** of the ages?',
        computeAnswer: (p) => p.rangeVal,
        acceptFormats: ['integer'],
        hint: '**Range** = Max − Min. Look at the ends of the whiskers.',
        theory: '**Range** = {max} − {min} = {rangeVal}. The whiskers stretch from the minimum to the maximum.',
        formula: 'Range = Max − Min',
        miniExample: 'If whiskers go from 7 to 16, range = 16 − 7 = 9.',
        visual: 'box_plot',
        visualParams: (p) => ({
          min: p.min, q1: p.q1, median: p.median, q3: p.q3, max: p.max,
          highlight: 'range',
        }),
      },
      {
        prompt: 'What is the **interquartile range** (IQR)?',
        computeAnswer: (p) => p.iqr,
        acceptFormats: ['integer'],
        hint: '**IQR** = Q3 − Q1 = {q3} − {q1}. The IQR is the width of the box.',
        theory: '**IQR** = {q3} − {q1} = {iqr}. The box in a **box-and-whisker plot** shows the middle 50% of the data.',
        formula: 'IQR = Q3 − Q1',
        miniExample: 'If Q1 = 9 and Q3 = 14, IQR = 14 − 9 = 5.',
        visual: 'box_plot',
        visualParams: (p) => ({
          min: p.min, q1: p.q1, median: p.median, q3: p.q3, max: p.max,
          highlight: 'iqr',
        }),
      },
      {
        prompt: 'What is the **median** age shown on the box plot?',
        computeAnswer: (p) => p.median,
        acceptFormats: ['integer', 'decimal'],
        hint: 'The **median** is the line inside the box.',
        theory: 'The **median** = {median}. It divides the data into two equal halves. On the box plot, it is the vertical line inside the box.',
        formula: 'Median = the line inside the box',
        miniExample: 'The red/bold line inside the box shows the median value.',
        visual: 'box_plot',
        visualParams: (p) => ({
          min: p.min, q1: p.q1, median: p.median, q3: p.q3, max: p.max,
          highlight: 'median',
        }),
      },
    ],
  },
  {
    id: 'box_prices',
    xLabel: 'Price ($)',
    concept: 'box_and_whisker',
    difficulty: 2,
    characterId: 'suppandi',
    keywords: ['box_and_whisker_kw', 'quartile', 'interquartile_range', 'median'],
    storyTemplateFn: (p, charName) => `${charName} made a **box-and-whisker plot** of bicycle prices at a sale, shown below. "Boss, the box tells us everything!"`,
    storyVisual: 'box_plot',
    storyVisualParams: (p) => ({
      min: p.min, q1: p.q1, median: p.median, q3: p.q3, max: p.max,
      highlight: null,
    }),
    paramGenerator: () => {
      const min = 100 + Math.floor(Math.random() * 20) * 5;
      const q1 = min + 10 + Math.floor(Math.random() * 5) * 5;
      const median = q1 + 10 + Math.floor(Math.random() * 5) * 5;
      const q3 = median + 10 + Math.floor(Math.random() * 5) * 5;
      const max = q3 + 15 + Math.floor(Math.random() * 5) * 5;
      const iqr = q3 - q1;
      const pctBelow = 50; // by definition, 50% is below median
      return { min, q1, median, q3, max, iqr, pctBelow };
    },
    steps: [
      {
        prompt: 'What is the IQR of the bicycle prices?',
        computeAnswer: (p) => p.iqr,
        acceptFormats: ['integer'],
        hint: 'IQR = Q3 − Q1 = ${q3} − ${q1}.',
        theory: 'IQR = ${q3} − ${q1} = ${iqr}. The box spans from Q1 to Q3.',
        formula: 'IQR = Q3 − Q1',
        miniExample: 'If Q1 = $130 and Q3 = $170, IQR = $170 − $130 = $40.',
        visual: 'box_plot',
        visualParams: (p) => ({
          min: p.min, q1: p.q1, median: p.median, q3: p.q3, max: p.max,
          highlight: 'iqr',
        }),
      },
      {
        prompt: 'What percent of the data falls below the **median**? (This is always the same for any box plot.)',
        computeAnswer: () => 50,
        acceptFormats: ['integer'],
        hint: 'By definition, the **median** splits the data in half.',
        theory: 'Exactly 50% of the data falls below the **median** and 50% above. That is the definition of **median**!',
        formula: 'Median → 50% below, 50% above',
        miniExample: 'No matter the data, the median always has 50% on each side.',
        visual: 'box_plot',
        visualParams: (p) => ({
          min: p.min, q1: p.q1, median: p.median, q3: p.q3, max: p.max,
          highlight: 'median',
        }),
      },
    ],
  },
  {
    id: 'box_compare',
    xLabel: 'Score',
    concept: 'box_and_whisker',
    difficulty: 2,
    characterId: 'shakuni',
    keywords: ['box_and_whisker_kw', 'quartile', 'interquartile_range', 'range'],
    storyTemplateFn: (p, charName) => `${charName} Mama is comparing scores from two board games using **box-and-whisker plots**. Game A is shown below. Game B: Min=${p.bMin}, Q1=${p.bQ1}, Median=${p.bMed}, Q3=${p.bQ3}, Max=${p.bMax}.`,
    storyVisual: 'box_plot',
    storyVisualParams: (p) => ({
      min: p.aMin, q1: p.aQ1, median: p.aMed, q3: p.aQ3, max: p.aMax,
      highlight: null,
    }),
    paramGenerator: () => {
      const aMin = 10 + Math.floor(Math.random() * 10);
      const aQ1 = aMin + 5 + Math.floor(Math.random() * 5);
      const aMed = aQ1 + 5 + Math.floor(Math.random() * 5);
      const aQ3 = aMed + 5 + Math.floor(Math.random() * 5);
      const aMax = aQ3 + 5 + Math.floor(Math.random() * 10);
      const bMin = 15 + Math.floor(Math.random() * 10);
      const bQ1 = bMin + 3 + Math.floor(Math.random() * 5);
      const bMed = bQ1 + 3 + Math.floor(Math.random() * 8);
      const bQ3 = bMed + 3 + Math.floor(Math.random() * 5);
      const bMax = bQ3 + 3 + Math.floor(Math.random() * 8);
      const aRange = aMax - aMin;
      const bRange = bMax - bMin;
      const greaterRange = aRange >= bRange ? aRange : bRange;
      const aIqr = aQ3 - aQ1;
      const bIqr = bQ3 - bQ1;
      return { aMin, aQ1, aMed, aQ3, aMax, bMin, bQ1, bMed, bQ3, bMax, aRange, bRange, greaterRange, aIqr, bIqr };
    },
    steps: [
      {
        prompt: 'What is the **range** of Game A?',
        computeAnswer: (p) => p.aRange,
        acceptFormats: ['integer'],
        hint: '**Range** of Game A = Max − Min = {aMax} − {aMin}.',
        theory: 'Game A **range** = {aMax} − {aMin} = {aRange}.',
        formula: 'Range = Max − Min',
        miniExample: 'If Game A goes from 10 to 42, range = 42 − 10 = 32.',
        visual: 'box_plot',
        visualParams: (p) => ({
          min: p.aMin, q1: p.aQ1, median: p.aMed, q3: p.aQ3, max: p.aMax,
          highlight: 'range',
        }),
      },
      {
        prompt: 'What is the IQR of Game B?',
        computeAnswer: (p) => p.bIqr,
        acceptFormats: ['integer'],
        hint: 'Game B IQR = Q3 − Q1 = {bQ3} − {bQ1}.',
        theory: 'Game B IQR = {bQ3} − {bQ1} = {bIqr}. A smaller IQR means scores are more consistent.',
        formula: 'IQR = Q3 − Q1',
        miniExample: 'Q1 = 20, Q3 = 35 → IQR = 35 − 20 = 15.',
        visual: 'box_plot',
        visualParams: (p) => ({
          min: p.bMin, q1: p.bQ1, median: p.bMed, q3: p.bQ3, max: p.bMax,
          highlight: 'iqr',
        }),
      },
    ],
  },

  // ============ STEM-AND-LEAF PLOTS (concept: stem_and_leaf) — Ch 11-7 ============
  {
    id: 'stem_leaf_scores',
    concept: 'stem_and_leaf',
    difficulty: 1,
    characterId: 'shakuni',
    keywords: ['stem_and_leaf_kw', 'median', 'range'],
    storyTemplateFn: (p, charName) => `${charName} Mama recorded scores from a card game tournament in the **stem-and-leaf plot** shown below.`,
    storyVisual: 'stem_leaf',
    storyVisualParams: (p) => ({ stems: p.stems, highlight: null }),
    paramGenerator: () => {
      const n = 11;
      const data = [];
      for (let i = 0; i < n; i++) data.push(55 + Math.floor(Math.random() * 30));
      data.sort((a, b) => a - b);
      const min = data[0];
      const max = data[n - 1];
      const median = data[5];
      const rangeVal = max - min;
      // Build stem-leaf structure
      const stemMap = {};
      data.forEach(v => {
        const stem = Math.floor(v / 10);
        const leaf = v % 10;
        if (!stemMap[stem]) stemMap[stem] = [];
        stemMap[stem].push(leaf);
      });
      const stems = Object.keys(stemMap).sort((a, b) => a - b).map(s => ({
        stem: Number(s),
        leaves: stemMap[s].sort((a, b) => a - b),
      }));
      return { data, n, min, max, median, rangeVal, stems };
    },
    steps: [
      {
        prompt: 'How many data values are in the **stem-and-leaf plot**? (Count all the leaves.)',
        computeAnswer: (p) => p.n,
        acceptFormats: ['integer'],
        hint: 'Each leaf represents one data value. Count all the leaf digits across all stems.',
        theory: 'Total values = total number of leaves = {n}. Each leaf is one data point.',
        formula: 'Count = total number of leaves',
        miniExample: 'If stem 5 has leaves 3, 7, 8 and stem 6 has leaves 1, 4, the total is 5 values.',
        visual: 'stem_leaf',
        visualParams: (p) => ({ stems: p.stems, highlight: null }),
      },
      {
        prompt: 'What is the **median** of the data? (With {n} values, the median is the 6th value.)',
        computeAnswer: (p) => p.median,
        acceptFormats: ['integer'],
        hint: 'Read the data in order from the **stem-and-leaf plot** and find the 6th value (middle of 11).',
        theory: 'The 6th value in order is {median}. In a **stem-and-leaf plot**, data is already sorted!',
        formula: 'Median of 11 values = 6th value',
        miniExample: 'With 11 values, median is at position (11+1)/2 = 6th.',
        visual: 'stem_leaf',
        visualParams: (p) => ({ stems: p.stems, highlight: null }),
      },
      {
        prompt: 'What is the **range** of the data?',
        computeAnswer: (p) => p.rangeVal,
        acceptFormats: ['integer'],
        hint: '**Range** = largest value − smallest value = {max} − {min}.',
        theory: '**Range** = {max} − {min} = {rangeVal}. Read the first leaf and last leaf from the plot.',
        formula: 'Range = max − min',
        miniExample: 'If data goes from 55 to 84, range = 84 − 55 = 29.',
        visual: 'stem_leaf',
        visualParams: (p) => ({ stems: p.stems, highlight: null }),
      },
    ],
  },
  {
    id: 'stem_leaf_prices',
    concept: 'stem_and_leaf',
    difficulty: 1,
    characterId: 'bheema',
    keywords: ['stem_and_leaf_kw', 'median', 'mode'],
    storyTemplateFn: (p, charName) => `${charName} listed food item prices (in dollars) in the **stem-and-leaf plot** shown below.`,
    storyVisual: 'stem_leaf',
    storyVisualParams: (p) => ({ stems: p.stems, highlight: null }),
    paramGenerator: () => {
      const n = 9;
      const data = [];
      const modeVal = 20 + Math.floor(Math.random() * 20);
      data.push(modeVal, modeVal);
      for (let i = 2; i < n; i++) data.push(15 + Math.floor(Math.random() * 30));
      data.sort((a, b) => a - b);
      const min = data[0];
      const max = data[n - 1];
      const median = data[4];
      // Build stems
      const stemMap = {};
      data.forEach(v => {
        const stem = Math.floor(v / 10);
        const leaf = v % 10;
        if (!stemMap[stem]) stemMap[stem] = [];
        stemMap[stem].push(leaf);
      });
      const stems = Object.keys(stemMap).sort((a, b) => a - b).map(s => ({
        stem: Number(s),
        leaves: stemMap[s].sort((a, b) => a - b),
      }));
      return { data, n, min, max, median, modeVal, stems };
    },
    steps: [
      {
        prompt: 'What is the **median** price? (With {n} values, it is the 5th value.)',
        computeAnswer: (p) => p.median,
        acceptFormats: ['integer'],
        hint: 'Read all values in order from the **stem-and-leaf plot**. The 5th out of 9 is the **median**.',
        theory: '**Median** = {median}. The data in a stem-and-leaf plot is already in order!',
        formula: 'Median of 9 values = 5th value',
        miniExample: 'Data: 15, 18, 22, 25, 28, 30, 33, 38, 42 → median = 28.',
        visual: 'stem_leaf',
        visualParams: (p) => ({ stems: p.stems, highlight: null }),
      },
      {
        prompt: 'What is the **mode** (the value that appears most often)?',
        computeAnswer: (p) => p.modeVal,
        acceptFormats: ['integer'],
        hint: 'Look for a leaf digit that appears more than once on the same stem.',
        theory: '**Mode** = {modeVal} because it appears more than once. In a stem-and-leaf plot, repeated leaves on the same stem indicate the **mode**.',
        formula: 'Mode = value with highest frequency',
        miniExample: 'If stem 2 has leaves 5, 5, 8, then 25 appears twice — mode candidate.',
        visual: 'stem_leaf',
        visualParams: (p) => ({ stems: p.stems, highlight: null }),
      },
    ],
  },
  {
    id: 'stem_leaf_general',
    concept: 'stem_and_leaf',
    difficulty: 2,
    characterId: 'mahisha',
    keywords: ['stem_and_leaf_kw', 'median', 'range', 'mean'],
    storyTemplateFn: (p, charName) => `${charName} organized test scores for ${p.n} athletes into the **stem-and-leaf plot** shown below.`,
    storyVisual: 'stem_leaf',
    storyVisualParams: (p) => ({ stems: p.stems, highlight: null }),
    paramGenerator: () => {
      const n = 10;
      const data = [];
      for (let i = 0; i < n; i++) data.push(60 + Math.floor(Math.random() * 35));
      data.sort((a, b) => a - b);
      const min = data[0];
      const max = data[n - 1];
      const median = (data[4] + data[5]) / 2;
      const rangeVal = max - min;
      const sum = data.reduce((s, v) => s + v, 0);
      const mean = Math.round(sum / n * 10) / 10;
      const stemMap = {};
      data.forEach(v => {
        const stem = Math.floor(v / 10);
        const leaf = v % 10;
        if (!stemMap[stem]) stemMap[stem] = [];
        stemMap[stem].push(leaf);
      });
      const stems = Object.keys(stemMap).sort((a, b) => a - b).map(s => ({
        stem: Number(s),
        leaves: stemMap[s].sort((a, b) => a - b),
      }));
      return { data, n, min, max, median, rangeVal, sum, mean, stems };
    },
    steps: [
      {
        prompt: 'What is the **range** of the scores?',
        computeAnswer: (p) => p.rangeVal,
        acceptFormats: ['integer'],
        hint: '**Range** = last value − first value in the **stem-and-leaf plot**.',
        theory: '**Range** = {max} − {min} = {rangeVal}.',
        formula: 'Range = max − min',
        miniExample: 'From 62 to 94, range = 94 − 62 = 32.',
        visual: 'stem_leaf',
        visualParams: (p) => ({ stems: p.stems, highlight: null }),
      },
      {
        prompt: 'What is the **median**? (With {n} values, average the 5th and 6th.)',
        computeAnswer: (p) => p.median,
        acceptFormats: ['decimal', 'integer'],
        hint: 'Count to the 5th and 6th values in the plot, then average them.',
        theory: '**Median** = (5th + 6th values) / 2 = {median}.',
        formula: 'Median (even n) = (n/2-th + (n/2+1)-th) / 2',
        miniExample: '10 values: median = average of 5th and 6th values.',
        visual: 'stem_leaf',
        visualParams: (p) => ({ stems: p.stems, highlight: null }),
      },
    ],
  },

  // ============ APPROPRIATE DISPLAY (concept: appropriate_display) — Ch 11-8 ============
  {
    id: 'display_choose_intervals',
    concept: 'appropriate_display',
    difficulty: 1,
    characterId: 'nithyananda',
    keywords: ['data_display', 'histogram_kw', 'circle_graph_kw', 'box_and_whisker_kw'],
    storyTemplate: '{character} has data about shoe prices arranged by price intervals ($0–$29, $30–$59, $60–$89, $90–$119) with the number of shoes in each interval. Which display is best? Type: 1 for Histogram, 2 for Circle Graph, 3 for Box Plot, 4 for Stem-and-Leaf.',
    paramGenerator: () => ({ answer: 1 }),
    steps: [
      {
        prompt: 'Data is organized by **intervals** with frequencies. Best display? (1=Histogram, 2=Circle Graph, 3=Box Plot, 4=Stem-and-Leaf)',
        computeAnswer: () => 1,
        acceptFormats: ['integer'],
        hint: 'A **histogram** shows frequency data organized by equal **intervals** with bars that touch.',
        theory: 'The best display is a **histogram** (answer: 1). Histograms are specifically designed to show frequencies across equal intervals, with bars touching to show continuous data.',
        formula: 'Interval frequency data → Histogram',
        miniExample: 'Shoe prices in ranges like $0–$29, $30–$59 → use a histogram to show how many shoes fall in each price range.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'display_choose_parts',
    concept: 'appropriate_display',
    difficulty: 1,
    characterId: 'bheema',
    keywords: ['data_display', 'circle_graph_kw'],
    storyTemplate: '{character} wants to show what fraction of his monthly food budget goes to each food category (rice, vegetables, fruit, sweets, snacks). The data shows **parts of a whole** that add up to 100%. Which display? Type: 1 for Histogram, 2 for Circle Graph, 3 for Box Plot, 4 for Stem-and-Leaf.',
    paramGenerator: () => ({ answer: 2 }),
    steps: [
      {
        prompt: 'Data shows **parts of a whole** (percentages that total 100%). Best display? (1=Histogram, 2=Circle Graph, 3=Box Plot, 4=Stem-and-Leaf)',
        computeAnswer: () => 2,
        acceptFormats: ['integer'],
        hint: 'A **circle graph** (pie chart) is designed to show how parts make up a whole.',
        theory: 'The best display is a **circle graph** (answer: 2). Circle graphs show how each category contributes to the total (100%). Each slice represents a percentage of the whole.',
        formula: 'Parts of a whole → Circle Graph (Pie Chart)',
        miniExample: 'Budget: Rice 30%, Veggies 25%, Fruit 15%, Sweets 20%, Snacks 10% → use a circle graph.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'display_choose_spread',
    concept: 'appropriate_display',
    difficulty: 1,
    characterId: 'shakuni',
    keywords: ['data_display', 'box_and_whisker_kw', 'five_number_summary'],
    storyTemplate: '{character} Mama wants to show the spread and quartiles of game scores — specifically the minimum, Q1, median, Q3, and maximum. Which display is best? Type: 1 for Histogram, 2 for Circle Graph, 3 for Box Plot, 4 for Stem-and-Leaf.',
    paramGenerator: () => ({ answer: 3 }),
    steps: [
      {
        prompt: 'Data needs to show **quartiles, median, and spread** (five-number summary). Best display? (1=Histogram, 2=Circle Graph, 3=Box Plot, 4=Stem-and-Leaf)',
        computeAnswer: () => 3,
        acceptFormats: ['integer'],
        hint: 'A **box-and-whisker plot** is specifically designed to show the **five-number summary**.',
        theory: 'The best display is a **box-and-whisker plot** (answer: 3). It shows the five-number summary: minimum, Q1, median, Q3, maximum — perfect for comparing spread and identifying outliers.',
        formula: 'Five-number summary / quartile data → Box-and-Whisker Plot',
        miniExample: 'To compare the spread of two teams\' scores, a box plot shows quartiles and range at a glance.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },

  // ============ EARNINGS AND BUDGETS (concept: earnings_and_budgets) — Unit 7, Lesson 27-1 ============
  {
    id: 'earnings_hourly_pay',
    concept: 'earnings_and_budgets',
    difficulty: 1,
    characterId: 'suppandi',
    keywords: ['gross_pay', 'net_pay', 'tax'],
    storyTemplateFn: (p, charName) => `${charName} got a job at a shop earning $${p.wage} per hour. He works ${p.hours} hours this week. His boss says ${p.taxRate}% of his earnings go to **tax**. "${p.taxRate}% of my money disappears?!" ${charName} exclaims. "Where does it GO?" Help ${charName} figure out his **gross pay**, **tax** amount, and **net pay**.`,
    paramGenerator: () => {
      const wage = 40 + Math.floor(Math.random() * 11) * 5;   // 40–90 in steps of 5
      const hours = 8 + Math.floor(Math.random() * 13);        // 8–20
      const taxRate = 10 + Math.floor(Math.random() * 4) * 5;  // 10, 15, 20, or 25
      const gross = wage * hours;
      const taxAmt = Math.round(gross * taxRate / 100);
      const net = gross - taxAmt;
      return { wage, hours, taxRate, gross, taxAmt, net };
    },
    steps: [
      {
        prompt: 'What is {character}\'s **gross pay** (total earnings before deductions)? Write the amount in $.',
        computeAnswer: (p) => p.gross,
        acceptFormats: ['integer'],
        hint: '**Gross pay** = hourly wage × hours worked.',
        theory: '**Gross pay** is the total money earned BEFORE any **deductions**. Gross pay = ${wage} × {hours} = ${gross}.',
        formula: 'Gross Pay = wage × hours',
        miniExample: 'If you earn $50/hour and work 10 hours, gross pay = $50 × 10 = $500.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'How much **tax** does {character} pay? ($)',
        computeAnswer: (p) => p.taxAmt,
        acceptFormats: ['integer'],
        hint: '**Tax** amount = **gross pay** × tax rate. Convert the percentage to a decimal first.',
        theory: '**Tax** = **gross pay** × rate = ${gross} × {taxRate}% = ${gross} × {taxRate}/100 = ${taxAmt}.',
        formula: 'Tax = Gross Pay × (tax rate / 100)',
        miniExample: 'If gross pay is $500 and tax rate is 10%, tax = $500 × 0.10 = $50.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is {character}\'s **net pay** (take-home pay after tax)? ($)',
        computeAnswer: (p) => p.net,
        acceptFormats: ['integer'],
        hint: '**Net pay** = **gross pay** − **tax**. This is the amount {character} actually takes home.',
        theory: '**Net pay** = **gross pay** − **tax** = ${gross} − ${taxAmt} = ${net}.',
        formula: 'Net Pay = Gross Pay − Tax',
        miniExample: 'If gross pay is $500 and tax is $50, net pay = $500 − $50 = $450.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'earnings_weekly_budget',
    concept: 'earnings_and_budgets',
    difficulty: 1,
    characterId: 'bheema',
    keywords: ['budget_kw', 'gross_pay', 'net_pay', 'circle_graph_kw'],
    storyTemplateFn: (p, charName) => `${charName} earns $${p.income} per week from the palace kitchen. He creates a **budget** to manage his money: ${p.foodPct}% on Food, ${p.savingsPct}% on Savings, and the rest on "Weapons & Gym Equipment," shown below.`,
    storyVisual: 'circle_graph',
    storyVisualParams: (p) => ({
      segments: [
        { label: 'Food', percent: p.foodPct, color: '#F97316' },
        { label: 'Savings', percent: p.savingsPct, color: '#22C55E' },
        { label: 'Weapons & Gym', percent: p.otherPct, color: '#6366F1' },
      ],
      highlight: null,
    }),
    paramGenerator: () => {
      const income = (8 + Math.floor(Math.random() * 13)) * 100;  // 800–2000
      const foodPct = 30 + Math.floor(Math.random() * 4) * 5;      // 30, 35, 40, or 45
      const savingsPct = 15 + Math.floor(Math.random() * 4) * 5;   // 15, 20, 25, or 30
      const otherPct = 100 - foodPct - savingsPct;
      const foodAmt = Math.round(income * foodPct / 100);
      const savingsAmt = Math.round(income * savingsPct / 100);
      const otherAmt = income - foodAmt - savingsAmt;
      return { income, foodPct, savingsPct, otherPct, foodAmt, savingsAmt, otherAmt };
    },
    steps: [
      {
        prompt: 'How much does {character} spend on Food? ($)',
        computeAnswer: (p) => p.foodAmt,
        acceptFormats: ['integer'],
        hint: 'Food amount = income × food percentage. Convert the percentage to a decimal.',
        theory: 'Food = ${income} × {foodPct}% = ${income} × {foodPct}/100 = ${foodAmt}. A **budget** allocates income into categories.',
        formula: 'Category amount = income × (percent / 100)',
        miniExample: 'If income is $1000 and food is 40%, food amount = $1000 × 0.40 = $400.',
        visual: 'circle_graph',
        visualParams: (p) => ({
          segments: [
            { label: 'Food', percent: p.foodPct, color: '#F97316' },
            { label: 'Savings', percent: p.savingsPct, color: '#22C55E' },
            { label: 'Weapons & Gym', percent: p.otherPct, color: '#6366F1' },
          ],
          highlight: 'Food',
        }),
      },
      {
        prompt: 'How much does {character} put into Savings? ($)',
        computeAnswer: (p) => p.savingsAmt,
        acceptFormats: ['integer'],
        hint: 'Savings amount = income × savings percentage.',
        theory: 'Savings = ${income} × {savingsPct}% = ${savingsAmt}.',
        formula: 'Savings = income × (savings% / 100)',
        miniExample: 'If income is $1000 and savings is 20%, savings amount = $1000 × 0.20 = $200.',
        visual: 'circle_graph',
        visualParams: (p) => ({
          segments: [
            { label: 'Food', percent: p.foodPct, color: '#F97316' },
            { label: 'Savings', percent: p.savingsPct, color: '#22C55E' },
            { label: 'Weapons & Gym', percent: p.otherPct, color: '#6366F1' },
          ],
          highlight: 'Savings',
        }),
      },
      {
        prompt: 'How much is left for Weapons & Gym? ($)',
        computeAnswer: (p) => p.otherAmt,
        acceptFormats: ['integer'],
        hint: 'The remaining amount = income − food − savings. All **budget** categories must add up to the total income.',
        theory: 'Remaining = ${income} − ${foodAmt} − ${savingsAmt} = ${otherAmt}. In a **budget**, all categories add to 100% of income.',
        formula: 'Remaining = Income − Food − Savings',
        miniExample: 'If income is $1000, food is $400, savings is $200, remaining = $1000 − $400 − $200 = $400.',
        visual: 'circle_graph',
        visualParams: (p) => ({
          segments: [
            { label: 'Food', percent: p.foodPct, color: '#F97316' },
            { label: 'Savings', percent: p.savingsPct, color: '#22C55E' },
            { label: 'Weapons & Gym', percent: p.otherPct, color: '#6366F1' },
          ],
          highlight: 'Weapons & Gym',
        }),
      },
    ],
  },
  {
    id: 'earnings_deductions',
    concept: 'earnings_and_budgets',
    difficulty: 2,
    characterId: 'mahisha',
    keywords: ['gross_pay', 'net_pay', 'deduction', 'tax'],
    storyTemplateFn: (p, charName) => `${charName} organized a grand festival and earned $${p.gross} in total. But there are **deductions**: ${p.taxRate}% goes to the demon council **tax**, and $${p.insurance} goes to "Battle Damage Insurance." "Why do I even bother conquering kingdoms?!" he grumbles. Find his **net pay**.`,
    paramGenerator: () => {
      const gross = (20 + Math.floor(Math.random() * 31)) * 100;  // 2000–5000
      const taxRate = 10 + Math.floor(Math.random() * 3) * 5;      // 10, 15, or 20
      const insurance = (1 + Math.floor(Math.random() * 5)) * 50;  // 50–250
      const taxAmt = Math.round(gross * taxRate / 100);
      const totalDeductions = taxAmt + insurance;
      const net = gross - totalDeductions;
      return { gross, taxRate, insurance, taxAmt, totalDeductions, net };
    },
    steps: [
      {
        prompt: 'How much does {character} pay in **tax** to the demon council? ($)',
        computeAnswer: (p) => p.taxAmt,
        acceptFormats: ['integer'],
        hint: '**Tax** = **gross pay** × tax rate. Convert the percentage to a decimal.',
        theory: '**Tax** = ${gross} × {taxRate}% = ${gross} × {taxRate}/100 = ${taxAmt}.',
        formula: 'Tax = Gross Pay × (tax rate / 100)',
        miniExample: 'If gross pay is $3000 and tax rate is 15%, tax = $3000 × 0.15 = $450.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What are the total **deductions** (tax + insurance)? ($)',
        computeAnswer: (p) => p.totalDeductions,
        acceptFormats: ['integer'],
        hint: 'Total **deductions** = **tax** amount + insurance.',
        theory: 'Total **deductions** = ${taxAmt} (tax) + ${insurance} (insurance) = ${totalDeductions}. **Deductions** are amounts subtracted from **gross pay**.',
        formula: 'Total Deductions = Tax + Insurance',
        miniExample: 'If tax is $450 and insurance is $100, total deductions = $450 + $100 = $550.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is {character}\'s **net pay** after all deductions? ($)',
        computeAnswer: (p) => p.net,
        acceptFormats: ['integer'],
        hint: '**Net pay** = **gross pay** − total **deductions**.',
        theory: '**Net pay** = ${gross} − ${totalDeductions} = ${net}. **Net pay** is what you actually take home.',
        formula: 'Net Pay = Gross Pay − Total Deductions',
        miniExample: 'If gross pay is $3000 and total deductions are $550, net pay = $3000 − $550 = $2450.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },

  // ============ FINANCIAL PLANNING (concept: financial_planning) — Unit 7, Lesson 27-2 ============
  {
    id: 'finance_simple_interest',
    concept: 'financial_planning',
    difficulty: 1,
    characterId: 'shambu',
    keywords: ['simple_interest', 'principal'],
    storyTemplateFn: (p, charName) => `${charName} wants to buy a new camera for his wildlife photography. He deposits $${p.principal} in a savings account that pays ${p.rate}% **simple interest** per year. He plans to leave it for ${p.time} year${p.time > 1 ? 's' : ''}. "If the jungle animals can be patient, so can I!" he says.`,
    paramGenerator: () => {
      const principal = (5 + Math.floor(Math.random() * 16)) * 100;  // 500–2000
      const rate = 4 + Math.floor(Math.random() * 7);                 // 4–10%
      const time = 1 + Math.floor(Math.random() * 5);                 // 1–5 years
      const interest = Math.round(principal * rate * time / 100);
      const total = principal + interest;
      return { principal, rate, time, interest, total };
    },
    steps: [
      {
        prompt: 'What is the **principal** (P), rate (r), and time (t)? Enter the **principal** amount. ($)',
        computeAnswer: (p) => p.principal,
        acceptFormats: ['integer'],
        hint: 'The **principal** is the original amount deposited or invested — before any interest.',
        theory: 'The **principal** (P) is the starting amount: ${principal}. The rate (r) is {rate}%, and the time (t) is {time} year(s). These are the three values needed for **simple interest**.',
        formula: 'I = P × r × t (identify P, r, t first)',
        miniExample: 'If you deposit $1000 at 5% for 3 years: P = $1000, r = 5%, t = 3.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'Calculate the **simple interest** earned. Use I = P × r × t. ($)',
        computeAnswer: (p) => p.interest,
        acceptFormats: ['integer'],
        hint: '**Simple interest** = **principal** × rate × time. Remember to convert the percentage to a decimal (divide by 100).',
        theory: 'I = P × r × t = ${principal} × {rate}/100 × {time} = ${interest}. **Simple interest** is calculated only on the original **principal**.',
        formula: 'I = P × r × t = {principal} × {rate}/100 × {time}',
        miniExample: 'I = $1000 × 0.05 × 3 = $150.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is the total amount in the account after {time} year(s)? ($)',
        computeAnswer: (p) => p.total,
        acceptFormats: ['integer'],
        hint: 'Total = **principal** + **simple interest**.',
        theory: 'Total = P + I = ${principal} + ${interest} = ${total}.',
        formula: 'Total Amount = Principal + Interest',
        miniExample: 'If P = $1000 and I = $150, total = $1000 + $150 = $1150.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'finance_compound_interest',
    concept: 'financial_planning',
    difficulty: 2,
    characterId: 'shakuni',
    keywords: ['compound_interest', 'principal', 'simple_interest'],
    storyTemplateFn: (p, charName) => `${charName} Mama won $${p.principal} in a dice tournament and invested it at ${p.rate}% **compound interest** per year (compounded annually). "Watch my money grow — exponentially!" he cackles. Find the amount after 2 years.`,
    paramGenerator: () => {
      const principal = (5 + Math.floor(Math.random() * 16)) * 100;  // 500–2000
      const rate = 5 + Math.floor(Math.random() * 6);                 // 5–10%
      const amtAfter1 = Math.round(principal * (1 + rate / 100));
      const amtAfter2 = Math.round(amtAfter1 * (1 + rate / 100));
      const totalInterest = amtAfter2 - principal;
      return { principal, rate, amtAfter1, amtAfter2, totalInterest };
    },
    steps: [
      {
        prompt: 'What is the **principal** and annual rate? Enter the **principal**. ($)',
        computeAnswer: (p) => p.principal,
        acceptFormats: ['integer'],
        hint: 'The **principal** is the original amount invested — ${principal}.',
        theory: 'P = ${principal}, r = {rate}%. With **compound interest**, interest each year is calculated on the NEW balance (principal + previous interest), not just the original **principal**.',
        formula: 'A = P × (1 + r/100) for each year',
        miniExample: 'If you invest $1000 at 10% compound interest, after year 1 you have $1100, and year 2 interest is on $1100.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'How much is in the account after Year 1? ($)',
        computeAnswer: (p) => p.amtAfter1,
        acceptFormats: ['integer'],
        hint: 'After Year 1: Amount = **principal** × (1 + rate/100).',
        theory: 'Year 1: A = ${principal} × (1 + {rate}/100) = ${principal} × {expr} = ${amtAfter1}. This becomes the new balance for Year 2.',
        formula: 'Amount after Year 1 = P × (1 + r/100)',
        miniExample: '$1000 at 10%: Year 1 = $1000 × 1.10 = $1100.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'How much is in the account after Year 2? ($)',
        computeAnswer: (p) => p.amtAfter2,
        acceptFormats: ['integer'],
        hint: 'After Year 2: take the Year 1 amount and multiply by (1 + rate/100) again. This is **compound interest** — interest on interest!',
        theory: 'Year 2: A = ${amtAfter1} × (1 + {rate}/100) = ${amtAfter2}. Notice: **compound interest** earned more than **simple interest** would have (${totalInterest} vs ${simpleWouldBe}) because interest was earned on interest.',
        formula: 'Amount after Year 2 = Year 1 Amount × (1 + r/100)',
        miniExample: '$1100 at 10%: Year 2 = $1100 × 1.10 = $1210. Simple interest would give only $1200.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'finance_savings_goal',
    concept: 'financial_planning',
    difficulty: 1,
    characterId: 'nithyananda',
    keywords: ['simple_interest', 'principal', 'budget_kw'],
    storyTemplateFn: (p, charName) => `${charName} wants to buy a "Cosmic Crystal Ball" that costs $${p.goal}. He already has $${p.saved} saved. He plans to save $${p.monthly} every month. "The universe will provide... but a **budget** helps too!" he admits.`,
    paramGenerator: () => {
      const goal = (10 + Math.floor(Math.random() * 21)) * 100;     // 1000–3000
      const saved = (1 + Math.floor(Math.random() * 5)) * 100;       // 100–500
      const needed = goal - saved;
      const monthly = (1 + Math.floor(Math.random() * 4)) * 50;      // 50–200
      const months = Math.ceil(needed / monthly);
      const totalSaved = saved + months * monthly;
      return { goal, saved, needed, monthly, months, totalSaved };
    },
    steps: [
      {
        prompt: 'How much more does {character} need to save? ($)',
        computeAnswer: (p) => p.needed,
        acceptFormats: ['integer'],
        hint: 'Amount needed = goal − amount already saved.',
        theory: 'Needed = ${goal} − ${saved} = ${needed}. A **budget** helps plan how to reach a savings goal.',
        formula: 'Amount Needed = Goal − Already Saved',
        miniExample: 'If a bike costs $2000 and you have $500, you need $2000 − $500 = $1500 more.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'If he saves ${monthly} per month, how many months will it take? (Round up to a whole number.)',
        computeAnswer: (p) => p.months,
        acceptFormats: ['integer'],
        hint: 'Months = amount needed ÷ monthly savings. Round UP because you can\'t save for a partial month.',
        theory: 'Months = ${needed} ÷ ${monthly} = {months} months (rounded up). Always round up — you need COMPLETE months to reach the goal.',
        formula: 'Months = ⌈Amount Needed / Monthly Savings⌉',
        miniExample: 'If you need $1500 and save $200/month: 1500 ÷ 200 = 7.5 → round up to 8 months.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is the total amount saved after {months} months (including what he already had)? ($)',
        computeAnswer: (p) => p.totalSaved,
        acceptFormats: ['integer'],
        hint: 'Total = amount already saved + (monthly savings × number of months).',
        theory: 'Total = ${saved} + (${monthly} × {months}) = ${totalSaved}. This is ${excess} more than the goal, which is fine — extra savings!',
        formula: 'Total = Already Saved + (Monthly × Months)',
        miniExample: 'If you have $500, save $200/month for 8 months: total = $500 + $1600 = $2100.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },

  // ============ MEAN ABSOLUTE DEVIATION (concept: mean_absolute_deviation) — Activity 26 ============
  {
    id: 'mad_calculate',
    xLabel: 'Price ($)',
    concept: 'mean_absolute_deviation',
    difficulty: 1,
    characterId: 'suppandi',
    keywords: ['mean', 'mad_kw'],
    storyTemplateFn: (p, charName) => `${charName}'s boss asked him to find out how much prices vary at the shop. The prices (in $) of ${p.n} items are shown below. "They're all different!" said ${charName}. Let's help him calculate the **Mean Absolute Deviation**.`,
    storyVisual: 'table',
    storyVisualParams: (p) => ({ type: 'frequency', data: p.data.map(v => ({ label: '$' + v, count: v })) }),
    paramGenerator: () => {
      const n = 5;
      const data = [];
      for (let i = 0; i < n; i++) data.push(10 + Math.floor(Math.random() * 40));
      data.sort((a, b) => a - b);
      const sum = data.reduce((s, v) => s + v, 0);
      const mean = Math.round(sum / n * 10) / 10;
      const absDevs = data.map(v => Math.round(Math.abs(v - mean) * 10) / 10);
      const sumAbsDevs = Math.round(absDevs.reduce((s, v) => s + v, 0) * 10) / 10;
      const mad = Math.round(sumAbsDevs / n * 10) / 10;
      return { data, n, sum, mean, absDevs, sumAbsDevs, mad };
    },
    steps: [
      {
        prompt: 'What is the **mean** of the prices? (Round to one decimal if needed.)',
        computeAnswer: (p) => p.mean,
        acceptFormats: ['decimal', 'integer'],
        hint: '**Mean** = sum of all values / count = {sum} / {n}.',
        theory: '**Mean** = {sum} / {n} = {mean}. This is the center of the data — now we measure how far each value is from it.',
        formula: 'Mean = sum of values / number of values',
        miniExample: 'If prices are 10, 20, 30, mean = 60/3 = 20.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is the sum of the absolute deviations from the mean? (Round to one decimal.)',
        computeAnswer: (p) => p.sumAbsDevs,
        acceptFormats: ['decimal', 'integer'],
        hint: 'Find |each value − mean| and add them up. The deviations are: {absDevs}.',
        theory: 'Absolute deviations: {absDevs}. Sum = {sumAbsDevs}. Each deviation tells how far a value is from the **mean**.',
        formula: 'Sum of |each value − mean|',
        miniExample: 'If mean = 20 and data is 10, 20, 30: deviations are |10−20| + |20−20| + |30−20| = 10 + 0 + 10 = 20.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is the **MAD** (Mean Absolute Deviation)? (Round to one decimal.)',
        computeAnswer: (p) => p.mad,
        acceptFormats: ['decimal', 'integer'],
        hint: '**MAD** = sum of absolute deviations / number of values = {sumAbsDevs} / {n}.',
        theory: '**MAD** = {sumAbsDevs} / {n} = {mad}. On average, each price is about ${mad} away from the mean.',
        formula: 'MAD = sum of |each value − mean| / count',
        miniExample: 'If sum of deviations = 20 and there are 3 values, MAD = 20/3 ≈ 6.7.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'mad_compare_means',
    xLabel: 'Score',
    concept: 'mean_absolute_deviation',
    difficulty: 1,
    characterId: 'mahisha',
    keywords: ['mean', 'mad_kw'],
    storyTemplateFn: (p, charName) => `${charName} is comparing the battle scores of two demon army teams. Team A scored: ${p.dataA.join(', ')}. Team B scored: ${p.dataB.join(', ')}. He wants to know which team performed better on average.`,
    storyVisual: 'table',
    storyVisualParams: (p) => ({ type: 'frequency', data: p.dataA.map((v, i) => ({ label: 'A' + (i + 1) + ': ' + v, count: v })).concat(p.dataB.map((v, i) => ({ label: 'B' + (i + 1) + ': ' + v, count: v }))) }),
    paramGenerator: () => {
      const nA = 5;
      const nB = 5;
      const dataA = [];
      const dataB = [];
      for (let i = 0; i < nA; i++) dataA.push(50 + Math.floor(Math.random() * 40));
      for (let i = 0; i < nB; i++) dataB.push(50 + Math.floor(Math.random() * 40));
      dataA.sort((a, b) => a - b);
      dataB.sort((a, b) => a - b);
      const sumA = dataA.reduce((s, v) => s + v, 0);
      const sumB = dataB.reduce((s, v) => s + v, 0);
      const meanA = Math.round(sumA / nA * 10) / 10;
      const meanB = Math.round(sumB / nB * 10) / 10;
      const diffMeans = Math.round(Math.abs(meanA - meanB) * 10) / 10;
      return { dataA, dataB, nA, nB, sumA, sumB, meanA, meanB, diffMeans };
    },
    steps: [
      {
        prompt: 'What is the **mean** score for Team A? (Round to one decimal.)',
        computeAnswer: (p) => p.meanA,
        acceptFormats: ['decimal', 'integer'],
        hint: '**Mean** of Team A = sum of Team A scores / number of scores = {sumA} / {nA}.',
        theory: '**Mean** of Team A = {sumA} / {nA} = {meanA}.',
        formula: 'Mean = sum / count',
        miniExample: 'Scores 60, 70, 80 → mean = 210/3 = 70.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is the **mean** score for Team B? (Round to one decimal.)',
        computeAnswer: (p) => p.meanB,
        acceptFormats: ['decimal', 'integer'],
        hint: '**Mean** of Team B = sum of Team B scores / number of scores = {sumB} / {nB}.',
        theory: '**Mean** of Team B = {sumB} / {nB} = {meanB}.',
        formula: 'Mean = sum / count',
        miniExample: 'Scores 55, 65, 75 → mean = 195/3 = 65.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is the **difference** between the two means? (Use |mean A − mean B|, round to one decimal.)',
        computeAnswer: (p) => p.diffMeans,
        acceptFormats: ['decimal', 'integer'],
        hint: 'Difference = |{meanA} − {meanB}|.',
        theory: 'Difference of means = |{meanA} − {meanB}| = {diffMeans}. This tells us how far apart the two teams\' averages are.',
        formula: 'Difference of means = |mean₁ − mean₂|',
        miniExample: 'If mean A = 72 and mean B = 65, difference = |72 − 65| = 7.',
        visual: null,
        visualParams: () => null,
      },
    ],
  },
  {
    id: 'mad_interpret_difference',
    xLabel: 'Count',
    concept: 'mean_absolute_deviation',
    difficulty: 2,
    characterId: 'shambu',
    keywords: ['mean', 'mad_kw'],
    storyTemplateFn: (p, charName) => `${charName} counted wildlife at two parks over ${p.n} days. Park A counts: ${p.dataA.join(', ')}. Park B counts: ${p.dataB.join(', ')}. He wants to know if the difference in averages is meaningful by comparing it to the **MAD**.`,
    storyVisual: 'table',
    storyVisualParams: (p) => ({ type: 'frequency', data: p.dataA.map((v, i) => ({ label: 'A' + (i + 1) + ': ' + v, count: v })).concat(p.dataB.map((v, i) => ({ label: 'B' + (i + 1) + ': ' + v, count: v }))) }),
    paramGenerator: () => {
      const n = 6;
      const dataA = [];
      const dataB = [];
      for (let i = 0; i < n; i++) dataA.push(10 + Math.floor(Math.random() * 30));
      for (let i = 0; i < n; i++) dataB.push(10 + Math.floor(Math.random() * 30));
      dataA.sort((a, b) => a - b);
      dataB.sort((a, b) => a - b);
      const sumA = dataA.reduce((s, v) => s + v, 0);
      const sumB = dataB.reduce((s, v) => s + v, 0);
      const meanA = Math.round(sumA / n * 10) / 10;
      const meanB = Math.round(sumB / n * 10) / 10;
      const diffMeans = Math.round(Math.abs(meanA - meanB) * 10) / 10;
      // Compute MAD for combined / use Park A's MAD as the reference
      const absDevsA = dataA.map(v => Math.round(Math.abs(v - meanA) * 10) / 10);
      const madA = Math.round(absDevsA.reduce((s, v) => s + v, 0) / n * 10) / 10;
      // Express difference as multiple of MAD (round to 1 decimal)
      const madMultiple = madA > 0 ? Math.round(diffMeans / madA * 10) / 10 : 0;
      return { dataA, dataB, n, sumA, sumB, meanA, meanB, diffMeans, madA, madMultiple };
    },
    steps: [
      {
        prompt: 'What is the **difference of means** between Park A and Park B? (Round to one decimal.)',
        computeAnswer: (p) => p.diffMeans,
        acceptFormats: ['decimal', 'integer'],
        hint: 'Find mean of each park first: Mean A = {sumA}/{n} = {meanA}, Mean B = {sumB}/{n} = {meanB}. Then find |Mean A − Mean B|.',
        theory: 'Mean A = {meanA}, Mean B = {meanB}. Difference = |{meanA} − {meanB}| = {diffMeans}.',
        formula: 'Difference of means = |mean₁ − mean₂|',
        miniExample: 'If Park A mean = 22 and Park B mean = 18, difference = |22 − 18| = 4.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'What is the **MAD** of Park A\'s data? (Round to one decimal.)',
        computeAnswer: (p) => p.madA,
        acceptFormats: ['decimal', 'integer'],
        hint: 'Find |each Park A value − mean A|, add them up, and divide by {n}. Mean A = {meanA}.',
        theory: 'MAD of Park A = sum of |each value − {meanA}| / {n} = {madA}. This measures the typical spread in Park A\'s data.',
        formula: 'MAD = sum of |each value − mean| / count',
        miniExample: 'If mean = 20 and data is 15, 20, 25: MAD = (5 + 0 + 5) / 3 ≈ 3.3.',
        visual: null,
        visualParams: () => null,
      },
      {
        prompt: 'Express the difference of means as a multiple of the MAD. (Round to one decimal.)',
        computeAnswer: (p) => p.madMultiple,
        acceptFormats: ['decimal', 'integer'],
        hint: 'Multiple = difference of means / MAD = {diffMeans} / {madA}.',
        theory: 'Multiple = {diffMeans} / {madA} = {madMultiple} MADs. If this is 2 or more, the difference is likely meaningful; if less than 1, the difference may just be due to variability.',
        formula: 'Difference in MADs = difference of means / MAD',
        miniExample: 'If difference = 8 and MAD = 4, the difference is 8/4 = 2 MADs — a meaningful gap.',
        visual: null,
        visualParams: () => null,
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
  { id: 'frequency_table', name: 'Frequency Tables', description: 'Organizing data into tables with intervals and counts' },
  { id: 'histogram', name: 'Histograms', description: 'Bar graphs showing data in contiguous intervals' },
  { id: 'circle_graph', name: 'Circle Graphs', description: 'Pie charts showing parts of a whole as percentages' },
  { id: 'central_tendency', name: 'Measures of Central Tendency', description: 'Mean, median, mode, and range' },
  { id: 'measures_of_variation', name: 'Measures of Variation', description: 'Quartiles, IQR, and outliers' },
  { id: 'box_and_whisker', name: 'Box-and-Whisker Plots', description: 'Displaying the five-number summary' },
  { id: 'stem_and_leaf', name: 'Stem-and-Leaf Plots', description: 'Organizing data using place value digits' },
  { id: 'appropriate_display', name: 'Select Appropriate Display', description: 'Choosing the best graph for different data' },
  { id: 'earnings_and_budgets', name: 'Earnings & Budgets', description: 'Gross pay, net pay, taxes, and budgeting' },
  { id: 'financial_planning', name: 'Financial Planning', description: 'Simple interest, compound interest, and savings goals' },
  { id: 'mean_absolute_deviation', name: 'Mean Absolute Deviation', description: 'MAD and comparing data sets' },
];

export default questionTemplates;
