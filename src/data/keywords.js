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
  mean: {
    term: 'Mean',
    definition: 'The average of a data set. Add all the values and divide by how many values there are. Mean = sum of values / number of values.',
  },
  median: {
    term: 'Median',
    definition: 'The middle value when data is arranged in order from least to greatest. If there are two middle values, the median is their average.',
  },
  mode: {
    term: 'Mode',
    definition: 'The value that appears MOST OFTEN in a data set. A data set can have one mode, more than one mode, or no mode at all.',
  },
  range: {
    term: 'Range',
    definition: 'The difference between the greatest and least values in a data set. Range = maximum − minimum. It tells how spread out the data is.',
  },
  frequency_table_kw: {
    term: 'Frequency Table',
    definition: 'A table that shows how often each value or interval occurs in a data set. Each row has a category/interval, a tally, and a frequency (count).',
  },
  histogram_kw: {
    term: 'Histogram',
    definition: 'A bar graph that shows the frequency of data in equal intervals. The bars touch each other (no gaps) because the intervals are continuous.',
  },
  circle_graph_kw: {
    term: 'Circle Graph',
    definition: 'A graph (also called a pie chart) that shows data as parts of a whole. Each section represents a percentage, and all sections add up to 100%.',
  },
  quartile: {
    term: 'Quartile',
    definition: 'Values that divide an ordered data set into four equal parts. Q1 is the median of the lower half, Q2 is the overall median, Q3 is the median of the upper half.',
  },
  interquartile_range: {
    term: 'Interquartile Range (IQR)',
    definition: 'The range of the middle 50% of data. IQR = Q3 − Q1. A smaller IQR means the middle data is clustered closely together.',
  },
  outlier: {
    term: 'Outlier',
    definition: 'A data value that is much greater or much less than most of the data. A value is an outlier if it is more than 1.5 × IQR below Q1 or above Q3.',
  },
  box_and_whisker_kw: {
    term: 'Box-and-Whisker Plot',
    definition: 'A display that shows the five-number summary (minimum, Q1, median, Q3, maximum) of a data set. The box shows the middle 50%, and the whiskers extend to the extremes.',
  },
  stem_and_leaf_kw: {
    term: 'Stem-and-Leaf Plot',
    definition: 'A display where each data value is split into a stem (leading digits) and a leaf (last digit). It shows the shape of the data while keeping the original values.',
  },
  interval: {
    term: 'Interval',
    definition: 'A range of values used to group data. For example, 10–19, 20–29, etc. Intervals should be equal in size and should not overlap.',
  },
  five_number_summary: {
    term: 'Five-Number Summary',
    definition: 'The five key values that describe a data set: minimum, first quartile (Q1), median (Q2), third quartile (Q3), and maximum.',
  },
  data_display: {
    term: 'Data Display',
    definition: 'A visual way to show data — such as a histogram, circle graph, box plot, stem-and-leaf plot, or line graph. Different displays work best for different types of data.',
  },
  gross_pay: {
    term: 'Gross Pay',
    definition: 'Total earnings before any deductions are taken out. Gross pay = hourly wage × hours worked (or the full salary amount).',
  },
  net_pay: {
    term: 'Net Pay',
    definition: 'Take-home pay after all deductions (taxes, insurance, etc.) are subtracted from gross pay. Net pay = gross pay − total deductions.',
  },
  tax: {
    term: 'Tax',
    definition: 'A percentage of income paid to the government. Tax amount = gross pay × tax rate. Common types include income tax and sales tax.',
  },
  deduction: {
    term: 'Deduction',
    definition: 'An amount subtracted from gross pay before you receive your paycheck. Examples include taxes, health insurance, and retirement contributions.',
  },
  budget_kw: {
    term: 'Budget',
    definition: 'A plan for how to spend and save money. A budget divides income into categories (needs, wants, savings) that should add up to 100% of income.',
  },
  simple_interest: {
    term: 'Simple Interest',
    definition: 'Interest earned only on the original principal amount. Formula: I = P × r × t, where P = principal, r = annual rate (as a decimal), t = time in years.',
  },
  compound_interest: {
    term: 'Compound Interest',
    definition: 'Interest earned on the principal PLUS previously earned interest. Each period, interest is calculated on the new, larger balance. Money grows faster than with simple interest.',
  },
  principal: {
    term: 'Principal',
    definition: 'The original amount of money invested or borrowed, before any interest is added. In the formula I = P × r × t, P stands for principal.',
  },
};

export function getKeywordDefs(keywordIds) {
  return keywordIds
    .map(id => keywords[id])
    .filter(Boolean);
}

export default keywords;
