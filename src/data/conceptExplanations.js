import keywords from './keywords.js';

/**
 * Rich explanation data for each keyword.
 * Each entry has: term, definition, visual config (optional), and a worked example.
 */
const conceptExplanations = {
  probability: {
    term: keywords.probability.term,
    definition: keywords.probability.definition,
    visual: 'dice',
    visualParams: { highlight: [2, 4, 6] },
    example: {
      title: 'Example',
      text: 'What is the probability of rolling an even number on a die?',
      solution: 'Even numbers: 2, 4, 6 → 3 desired outcomes out of 6 total. P = 3/6 = 1/2.',
    },
  },
  total_outcomes: {
    term: keywords.total_outcomes.term,
    definition: keywords.total_outcomes.definition,
    visual: 'dice',
    visualParams: { highlight: [1, 2, 3, 4, 5, 6] },
    example: {
      title: 'Example',
      text: 'How many total outcomes when you roll a standard die?',
      solution: 'A standard die has faces 1, 2, 3, 4, 5, 6 → 6 total outcomes.',
    },
  },
  desired_outcomes: {
    term: keywords.desired_outcomes.term,
    definition: keywords.desired_outcomes.definition,
    visual: 'dice',
    visualParams: { highlight: [1, 3, 5] },
    example: {
      title: 'Example',
      text: 'You want to roll an odd number. What are the desired outcomes?',
      solution: 'Odd numbers on a die: 1, 3, 5 → 3 desired outcomes.',
    },
  },
  equally_likely: {
    term: keywords.equally_likely.term,
    definition: keywords.equally_likely.definition,
    visual: 'dice',
    visualParams: { highlight: [] },
    example: {
      title: 'Example',
      text: 'Are the outcomes of a fair die equally likely?',
      solution: 'Yes! Each face has P = 1/6. All six outcomes share the same chance.',
    },
  },
  fair: {
    term: keywords.fair.term,
    definition: keywords.fair.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'Is a standard coin fair?',
      solution: 'Yes — heads and tails each have P = 1/2. Neither side is favored.',
    },
  },
  likely: {
    term: keywords.likely.term,
    definition: keywords.likely.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'Is rolling less than 5 on a die likely?',
      solution: 'Numbers less than 5: 1, 2, 3, 4 → P = 4/6 ≈ 67%. Since 67% > 50%, this is likely.',
    },
  },
  unlikely: {
    term: keywords.unlikely.term,
    definition: keywords.unlikely.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'Is rolling a 6 on a die unlikely?',
      solution: 'P(6) = 1/6 ≈ 17%. Since 17% < 50%, rolling a 6 is unlikely.',
    },
  },
  certain: {
    term: keywords.certain.term,
    definition: keywords.certain.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'What is the probability of rolling 1–6 on a standard die?',
      solution: 'Every face is between 1 and 6, so P = 6/6 = 1. This event is certain.',
    },
  },
  impossible: {
    term: keywords.impossible.term,
    definition: keywords.impossible.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'What is the probability of rolling a 7 on a standard die?',
      solution: 'There is no 7 on a standard die, so P = 0/6 = 0. This event is impossible.',
    },
  },
  frequency: {
    term: keywords.frequency.term,
    definition: keywords.frequency.definition,
    visual: 'table',
    visualParams: {
      type: 'frequency',
      data: [
        { label: 'Heads', count: 11 },
        { label: 'Tails', count: 9 },
      ],
      highlight: 'Heads',
    },
    example: {
      title: 'Example',
      text: 'You flip a coin 20 times and get heads 11 times.',
      solution: 'The frequency of heads is 11, and the frequency of tails is 9.',
    },
  },
  biased: {
    term: keywords.biased.term,
    definition: keywords.biased.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'A spinner has 5 red sections and 1 blue section. Is it biased?',
      solution: 'Yes — red is much more likely (5/6) than blue (1/6). The spinner is biased toward red.',
    },
  },
  unbiased: {
    term: keywords.unbiased.term,
    definition: keywords.unbiased.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'A coin has P(heads) = 0.5 and P(tails) = 0.5. Is it unbiased?',
      solution: 'Yes — both outcomes are equally likely, so the coin is unbiased (fair).',
    },
  },
  typical: {
    term: keywords.typical.term,
    definition: keywords.typical.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'In 50 coin flips you get heads 24 times. Is that typical?',
      solution: 'Expected heads ≈ 25. Getting 24 is very close, so yes — that is a typical result.',
    },
  },
  every_time: {
    term: keywords.every_time.term,
    definition: keywords.every_time.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'A bag has only red marbles. Will you draw red every time?',
      solution: 'Yes — P(red) = 1 because every marble is red. It happens every time.',
    },
  },
  sample_space: {
    term: keywords.sample_space.term,
    definition: keywords.sample_space.definition,
    visual: 'tree',
    visualParams: { levels: 1, labels: [['H', 'T']] },
    example: {
      title: 'Example',
      text: 'What is the sample space when flipping a coin?',
      solution: 'Sample space = {Heads, Tails}. There are 2 possible outcomes.',
    },
  },
  complementary: {
    term: keywords.complementary.term,
    definition: keywords.complementary.definition,
    visual: 'spinner',
    visualParams: {
      sections: [
        { color: 'blue', count: 3 },
        { color: 'red', count: 5 },
      ],
      highlight: 'blue',
    },
    example: {
      title: 'Example',
      text: 'P(rain) = 0.3. What is P(no rain)?',
      solution: 'Rain and no rain are complementary. P(no rain) = 1 − 0.3 = 0.7.',
    },
  },
  independent: {
    term: keywords.independent.term,
    definition: keywords.independent.definition,
    visual: 'tree',
    visualParams: { levels: 2, labels: [['H', 'T'], ['1', '2', '3', '4', '5', '6']] },
    example: {
      title: 'Example',
      text: 'You flip a coin and roll a die. Are these independent?',
      solution: 'Yes — the coin result does not affect the die. P(H and 3) = 1/2 × 1/6 = 1/12.',
    },
  },
  dependent: {
    term: keywords.dependent.term,
    definition: keywords.dependent.definition,
    visual: 'marbles',
    visualParams: { red: 3, blue: 2, highlight: 'red' },
    example: {
      title: 'Example',
      text: 'A bag has 3 red and 2 blue marbles. You draw one without replacing it, then draw again.',
      solution: 'After drawing 1 red, only 2 red and 2 blue remain. The probabilities changed — these are dependent events.',
    },
  },
  experimental_probability: {
    term: keywords.experimental_probability.term,
    definition: keywords.experimental_probability.definition,
    visual: 'table',
    visualParams: {
      type: 'frequency',
      data: [
        { label: 'Heads', count: 28 },
        { label: 'Tails', count: 22 },
      ],
      highlight: 'Heads',
    },
    example: {
      title: 'Example',
      text: 'You flip a coin 50 times and get heads 28 times.',
      solution: 'Experimental P(heads) = 28/50 = 0.56. This is based on actual results, not theory.',
    },
  },
  theoretical_probability: {
    term: keywords.theoretical_probability.term,
    definition: keywords.theoretical_probability.definition,
    visual: 'dice',
    visualParams: { highlight: [2, 4, 6] },
    example: {
      title: 'Example',
      text: 'What is the theoretical probability of rolling an even number?',
      solution: 'Even outcomes: 2, 4, 6 → 3 out of 6. Theoretical P = 3/6 = 1/2 = 0.5.',
    },
  },
  survey: {
    term: keywords.survey.term,
    definition: keywords.survey.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'A teacher asks 30 students their favorite subject.',
      solution: 'This is a survey. The 30 students are the sample. Their answers become data for analysis.',
    },
  },
  population: {
    term: keywords.population.term,
    definition: keywords.population.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'You want to know the favorite sport of all 500 students at your school.',
      solution: 'The population is all 500 students. Since asking everyone is hard, you might survey a sample instead.',
    },
  },
  sample: {
    term: keywords.sample.term,
    definition: keywords.sample.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'You survey 40 students out of 500 at your school.',
      solution: 'The 40 students are the sample. You use their answers to make predictions about all 500.',
    },
  },
  biased_sample: {
    term: keywords.biased_sample.term,
    definition: keywords.biased_sample.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'You survey only students in the soccer club about their favorite sport.',
      solution: 'This is biased — soccer players are over-represented. The sample doesn\'t reflect the whole school.',
    },
  },
  unbiased_sample: {
    term: keywords.unbiased_sample.term,
    definition: keywords.unbiased_sample.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'You randomly select 40 names from the entire school roster.',
      solution: 'Every student had an equal chance of being picked. This is an unbiased (representative) sample.',
    },
  },
  random_sampling: {
    term: keywords.random_sampling.term,
    definition: keywords.random_sampling.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'A teacher puts all 200 student names in a hat and draws 20.',
      solution: 'Each name had an equal chance. This random sampling method produces an unbiased sample.',
    },
  },
  representative: {
    term: keywords.representative.term,
    definition: keywords.representative.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'A school is 60% girls and 40% boys. A sample of 50 has 30 girls and 20 boys.',
      solution: 'The sample has 60% girls and 40% boys — it matches the school. This sample is representative.',
    },
  },
  prediction: {
    term: keywords.prediction.term,
    definition: keywords.prediction.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: '3 out of 10 sampled students prefer cricket. There are 200 students total.',
      solution: 'Proportion = 3/10 = 30%. Prediction: 30% of 200 = 60 students prefer cricket.',
    },
  },
  proportion: {
    term: keywords.proportion.term,
    definition: keywords.proportion.definition,
    visual: 'circle_graph',
    visualParams: {
      segments: [
        { label: 'Yes', percent: 30 },
        { label: 'No', percent: 70 },
      ],
    },
    example: {
      title: 'Example',
      text: '15 out of 50 students like mango ice cream.',
      solution: 'Proportion = 15/50 = 3/10 = 0.30 = 30%.',
    },
  },
  arrangements: {
    term: keywords.arrangements.term,
    definition: keywords.arrangements.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'How many ways can you arrange the letters A, B, C?',
      solution: '3! = 3 × 2 × 1 = 6 arrangements: ABC, ACB, BAC, BCA, CAB, CBA.',
    },
  },
  factorial: {
    term: keywords.factorial.term,
    definition: keywords.factorial.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'Calculate 5!',
      solution: '5! = 5 × 4 × 3 × 2 × 1 = 120.',
    },
  },
  permutation: {
    term: keywords.permutation.term,
    definition: keywords.permutation.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'Choose and arrange 2 letters from A, B, C, D.',
      solution: '4P2 = 4!/(4−2)! = 24/2 = 12 permutations.',
    },
  },
  mean: {
    term: keywords.mean.term,
    definition: keywords.mean.definition,
    visual: 'table',
    visualParams: {
      type: 'frequency',
      data: [
        { label: '4', count: 4 },
        { label: '8', count: 8 },
        { label: '6', count: 6 },
        { label: '10', count: 10 },
        { label: '12', count: 12 },
      ],
    },
    example: {
      title: 'Example',
      text: 'Find the mean of 4, 8, 6, 10, 12.',
      solution: 'Sum = 4 + 8 + 6 + 10 + 12 = 40. Mean = 40 ÷ 5 = 8.',
    },
  },
  median: {
    term: keywords.median.term,
    definition: keywords.median.definition,
    visual: 'table',
    visualParams: {
      type: 'frequency',
      data: [
        { label: '3', count: 3 },
        { label: '5', count: 5 },
        { label: '7', count: 7 },
        { label: '9', count: 9 },
        { label: '11', count: 11 },
      ],
      highlight: '7',
    },
    example: {
      title: 'Example',
      text: 'Find the median of 9, 3, 7, 11, 5.',
      solution: 'Order: 3, 5, 7, 9, 11. The middle value is 7. Median = 7.',
    },
  },
  mode: {
    term: keywords.mode.term,
    definition: keywords.mode.definition,
    visual: 'table',
    visualParams: {
      type: 'frequency',
      data: [
        { label: '2', count: 1 },
        { label: '4', count: 3 },
        { label: '5', count: 2 },
        { label: '7', count: 1 },
      ],
      highlight: '4',
    },
    example: {
      title: 'Example',
      text: 'Find the mode of 4, 2, 4, 5, 4, 7, 5.',
      solution: '4 appears 3 times (most often). Mode = 4.',
    },
  },
  range: {
    term: keywords.range.term,
    definition: keywords.range.definition,
    visual: 'box_plot',
    visualParams: { min: 3, q1: 5, median: 7, q3: 9, max: 11, highlight: 'range' },
    example: {
      title: 'Example',
      text: 'Find the range of 3, 5, 7, 9, 11.',
      solution: 'Range = maximum − minimum = 11 − 3 = 8.',
    },
  },
  frequency_table_kw: {
    term: keywords.frequency_table_kw.term,
    definition: keywords.frequency_table_kw.definition,
    visual: 'table',
    visualParams: {
      type: 'frequency',
      data: [
        { label: 'Red', count: 5 },
        { label: 'Blue', count: 8 },
        { label: 'Green', count: 3 },
      ],
    },
    example: {
      title: 'Example',
      text: 'Students picked their favorite color: 5 red, 8 blue, 3 green.',
      solution: 'The frequency table shows each color and its count. Blue has the highest frequency (8).',
    },
  },
  histogram_kw: {
    term: keywords.histogram_kw.term,
    definition: keywords.histogram_kw.definition,
    visual: 'histogram',
    visualParams: {
      intervals: [
        { label: '0–9', count: 2 },
        { label: '10–19', count: 5 },
        { label: '20–29', count: 8 },
        { label: '30–39', count: 4 },
        { label: '40–49', count: 1 },
      ],
    },
    example: {
      title: 'Example',
      text: 'Test scores are grouped into intervals. Which interval has the most students?',
      solution: 'The 20–29 interval has 8 students — the tallest bar. Bars touch because the data is continuous.',
    },
  },
  circle_graph_kw: {
    term: keywords.circle_graph_kw.term,
    definition: keywords.circle_graph_kw.definition,
    visual: 'circle_graph',
    visualParams: {
      segments: [
        { label: 'Soccer', percent: 40 },
        { label: 'Basketball', percent: 25 },
        { label: 'Tennis', percent: 20 },
        { label: 'Other', percent: 15 },
      ],
    },
    example: {
      title: 'Example',
      text: 'A circle graph shows favorite sports: Soccer 40%, Basketball 25%, Tennis 20%, Other 15%.',
      solution: 'All sections total 100%. Soccer is the largest section (40%), so it is the most popular.',
    },
  },
  quartile: {
    term: keywords.quartile.term,
    definition: keywords.quartile.definition,
    visual: 'box_plot',
    visualParams: { min: 2, q1: 5, median: 8, q3: 12, max: 15, highlight: 'iqr' },
    example: {
      title: 'Example',
      text: 'Data: 2, 4, 5, 7, 8, 10, 12, 14, 15. Find Q1, Q2, Q3.',
      solution: 'Q2 (median) = 8. Lower half: 2,4,5,7 → Q1 = 4.5. Upper half: 10,12,14,15 → Q3 = 13.',
    },
  },
  interquartile_range: {
    term: keywords.interquartile_range.term,
    definition: keywords.interquartile_range.definition,
    visual: 'box_plot',
    visualParams: { min: 2, q1: 5, median: 8, q3: 12, max: 15, highlight: 'iqr' },
    example: {
      title: 'Example',
      text: 'Q1 = 5, Q3 = 12. Find the IQR.',
      solution: 'IQR = Q3 − Q1 = 12 − 5 = 7. The middle 50% of data spans 7 units.',
    },
  },
  outlier: {
    term: keywords.outlier.term,
    definition: keywords.outlier.definition,
    visual: 'box_plot',
    visualParams: { min: 10, q1: 15, median: 20, q3: 25, max: 28, outliers: [2, 45] },
    example: {
      title: 'Example',
      text: 'Data: 2, 10, 15, 18, 20, 22, 25, 28, 45. Q1=15, Q3=25, IQR=10.',
      solution: 'Lower fence = 15 − 1.5×10 = 0. Upper fence = 25 + 1.5×10 = 40. So 45 is an outlier (above 40).',
    },
  },
  box_and_whisker_kw: {
    term: keywords.box_and_whisker_kw.term,
    definition: keywords.box_and_whisker_kw.definition,
    visual: 'box_plot',
    visualParams: { min: 4, q1: 8, median: 12, q3: 16, max: 20 },
    example: {
      title: 'Example',
      text: 'Five-number summary: Min=4, Q1=8, Median=12, Q3=16, Max=20.',
      solution: 'The box goes from Q1(8) to Q3(16). The line inside is the median(12). Whiskers extend to 4 and 20.',
    },
  },
  stem_and_leaf_kw: {
    term: keywords.stem_and_leaf_kw.term,
    definition: keywords.stem_and_leaf_kw.definition,
    visual: 'stem_leaf',
    visualParams: {
      stems: [
        { stem: 4, leaves: [2, 5, 7] },
        { stem: 5, leaves: [1, 3, 3, 8] },
        { stem: 6, leaves: [0, 4] },
      ],
    },
    example: {
      title: 'Example',
      text: 'Data: 42, 45, 47, 51, 53, 53, 58, 60, 64.',
      solution: 'Stem 4 → leaves 2, 5, 7. Stem 5 → leaves 1, 3, 3, 8. Stem 6 → leaves 0, 4. Key: 5|3 = 53.',
    },
  },
  interval: {
    term: keywords.interval.term,
    definition: keywords.interval.definition,
    visual: 'histogram',
    visualParams: {
      intervals: [
        { label: '10–19', count: 3 },
        { label: '20–29', count: 6 },
        { label: '30–39', count: 4 },
      ],
      highlight: 1,
    },
    example: {
      title: 'Example',
      text: 'Data is grouped: 10–19, 20–29, 30–39. Each interval has a width of 10.',
      solution: 'Intervals must be equal in size and not overlap. The interval 20–29 contains values from 20 to 29.',
    },
  },
  five_number_summary: {
    term: keywords.five_number_summary.term,
    definition: keywords.five_number_summary.definition,
    visual: 'box_plot',
    visualParams: { min: 4, q1: 8, median: 12, q3: 16, max: 20 },
    example: {
      title: 'Example',
      text: 'Find the five-number summary of 4, 6, 8, 10, 12, 14, 16, 18, 20.',
      solution: 'Min=4, Q1=7, Median=12, Q3=17, Max=20. These five values summarize the data.',
    },
  },
  data_display: {
    term: keywords.data_display.term,
    definition: keywords.data_display.definition,
    visual: null,
    visualParams: null,
    example: {
      title: 'Example',
      text: 'Which data display is best for showing parts of a whole?',
      solution: 'A circle graph (pie chart) is best for showing parts of a whole, since sections add to 100%.',
    },
  },
};

/**
 * Build a lookup map from lowercase display text → keyword ID.
 * This allows matching "mean" → "mean", "box-and-whisker plot" → "box_and_whisker_kw", etc.
 */
const termToId = {};
Object.entries(keywords).forEach(([id, kw]) => {
  termToId[kw.term.toLowerCase()] = id;
});

/**
 * Match display text (from **bold** markers) to a keyword ID.
 * Case-insensitive lookup against keyword term names.
 */
export function matchKeyword(displayText) {
  if (!displayText) return null;
  const lower = displayText.toLowerCase().trim();
  return termToId[lower] || null;
}

/**
 * Get the rich explanation data for a keyword ID.
 */
export function getConceptExplanation(keywordId) {
  return conceptExplanations[keywordId] || null;
}

export default conceptExplanations;
