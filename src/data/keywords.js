const keywords = {
  probability: {
    term: 'Probability',
    definition: 'A number between 0 and 1 that tells us how likely an event is to happen. The closer to 1, the more likely; the closer to 0, the less likely.',
  },
  total_outcomes: {
    term: 'Total Outcomes',
    definition: 'The complete count of ALL possible results in an experiment. For example, a die has 6 total outcomes.',
  },
  desired_outcomes: {
    term: 'Desired Outcomes',
    definition: 'The number of results that match what we are looking for (also called "favorable outcomes"). If we want an even number on a die, the desired outcomes are 2, 4, 6 = three outcomes.',
  },
  equally_likely: {
    term: 'Equally Likely',
    definition: 'When every outcome has the exact same chance of happening. Each face of a fair die is equally likely (each has a 1/6 chance).',
  },
  fair: {
    term: 'Fair',
    definition: 'A fair object (die, coin, spinner) means every outcome is equally likely. No outcome is favored over another.',
  },
  likely: {
    term: 'Likely',
    definition: 'An event with a probability greater than 1/2 (more than 50%). It will probably happen. Example: rolling a number less than 5 on a die (P = 4/6 ≈ 67%).',
  },
  unlikely: {
    term: 'Unlikely',
    definition: 'An event with a probability less than 1/2 (less than 50%). It probably won\'t happen. Example: rolling a 6 on a die (P = 1/6 ≈ 17%).',
  },
  certain: {
    term: 'Certain',
    definition: 'An event that will ALWAYS happen. It has a probability of exactly 1 (100%). Example: rolling a number between 1 and 6 on a standard die.',
  },
  impossible: {
    term: 'Impossible',
    definition: 'An event that can NEVER happen. It has a probability of exactly 0. Example: rolling a 7 on a standard six-sided die.',
  },
  frequency: {
    term: 'Frequency',
    definition: 'How many times something actually happened in an experiment. If you flip a coin 20 times and get heads 11 times, the frequency of heads is 11.',
  },
  biased: {
    term: 'Biased',
    definition: 'An object is biased if some outcomes are more likely than others. A weighted die that lands on 6 more often is biased.',
  },
  unbiased: {
    term: 'Unbiased',
    definition: 'Same as "fair" — all outcomes are equally likely. An unbiased coin has a 50/50 chance of heads or tails.',
  },
  typical: {
    term: 'Typical',
    definition: 'What normally or usually happens. In experimental probability, a typical result is one that matches the most common frequency.',
  },
  every_time: {
    term: 'Every Time',
    definition: 'If something happens every time, its probability is 1 (certain). If it never happens, its probability is 0 (impossible).',
  },
  sample_space: {
    term: 'Sample Space',
    definition: 'The set of ALL possible outcomes of an experiment. For a coin flip, the sample space is {Heads, Tails}. For a die roll, it\'s {1, 2, 3, 4, 5, 6}.',
  },
  complementary: {
    term: 'Complementary Events',
    definition: 'Two events are complementary if they cover ALL possible outcomes and don\'t overlap. P(A) + P(not A) = 1 always.',
  },
  independent: {
    term: 'Independent Events',
    definition: 'Two events are independent when the outcome of one does NOT affect the outcome of the other. Example: flipping a coin and rolling a die.',
  },
  dependent: {
    term: 'Dependent Events',
    definition: 'Two events are dependent when the outcome of one CHANGES the probability of the other. Example: drawing cards without replacing them.',
  },
  experimental_probability: {
    term: 'Experimental Probability',
    definition: 'Probability calculated from actual experiments or observations: P = frequency of event / total trials.',
  },
  theoretical_probability: {
    term: 'Theoretical Probability',
    definition: 'Probability calculated using math and logic (not experiments): P = desired outcomes / total outcomes. Assumes all outcomes are equally likely.',
  },
  survey: {
    term: 'Survey',
    definition: 'A method of collecting data by asking questions to a group of people. Survey results help us understand what a population thinks or prefers.',
  },
  population: {
    term: 'Population',
    definition: 'The ENTIRE group we want to learn about. For example, "all students in a school" or "all people in a city." It is usually too large to ask everyone.',
  },
  sample: {
    term: 'Sample',
    definition: 'A smaller group chosen FROM the population. We study the sample and use the results to make predictions about the whole population.',
  },
  biased_sample: {
    term: 'Biased Sample',
    definition: 'A sample that does NOT fairly represent the population. Some groups are over-represented or under-represented, making results misleading.',
  },
  unbiased_sample: {
    term: 'Unbiased Sample',
    definition: 'A sample where every member of the population has an EQUAL chance of being selected. Also called a representative sample. Results are more trustworthy.',
  },
  random_sampling: {
    term: 'Random Sampling',
    definition: 'A method of selecting a sample where every member of the population has an equal chance of being chosen. Drawing names from a hat is an example.',
  },
  representative: {
    term: 'Representative',
    definition: 'A sample is representative when it has similar characteristics to the population. A representative sample allows us to make accurate predictions.',
  },
  prediction: {
    term: 'Prediction',
    definition: 'Using data from a sample to estimate what would happen in the whole population. If 3 out of 10 sampled students prefer cricket, we predict about 30% of ALL students do.',
  },
  proportion: {
    term: 'Proportion',
    definition: 'The part compared to the whole, written as a fraction, decimal, or percentage. If 15 out of 50 students like mango, the proportion is 15/50 = 3/10 = 30%.',
  },
  arrangements: {
    term: 'Arrangements',
    definition: 'The different ways to place items in order. For 3 items, there are 3! = 6 arrangements. Arrangements matter when the ORDER of items is important.',
  },
  factorial: {
    term: 'Factorial',
    definition: 'n! (read "n factorial") means multiplying all whole numbers from n down to 1. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120. By definition, 0! = 1.',
  },
  permutation: {
    term: 'Permutation',
    definition: 'A selection where ORDER MATTERS. Choosing and arranging r items from n: nPr = n! / (n−r)!. Rearranging the same items counts as a different permutation.',
  },
};

export function getKeywordDefs(keywordIds) {
  return keywordIds
    .map(id => keywords[id])
    .filter(Boolean);
}

export default keywords;
