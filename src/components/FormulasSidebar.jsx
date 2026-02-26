import React, { useState } from 'react';

const FORMULA_SECTIONS = [
  {
    title: 'Basic Probability',
    formulas: [
      'P(event) = desired outcomes / total outcomes',
      'Total Outcomes = count of ALL possible results',
    ],
  },
  {
    title: 'Complementary Events',
    formulas: [
      'P(not A) = 1 \u2212 P(A)',
      'P(A) + P(not A) = 1',
    ],
  },
  {
    title: 'Compound Independent',
    formulas: [
      'P(A and B) = P(A) \u00D7 P(B)',
      'One event does NOT affect the other',
    ],
  },
  {
    title: 'Compound Dependent',
    formulas: [
      'P(A then B) = P(A) \u00D7 P(B|A)',
      'Without replacement: total & desired both change',
    ],
  },
  {
    title: 'Sample Space',
    formulas: [
      'Sample Space = choices\u2081 \u00D7 choices\u2082',
      'Arrangements: n! = n \u00D7 (n\u22121) \u00D7 ... \u00D7 1',
      'Distributions: targets^items (each independent)',
      'Total outcomes for 2 dice = 6 \u00D7 6 = 36',
    ],
  },
  {
    title: 'Experimental Probability',
    formulas: [
      'Experimental P = frequency / total trials',
      'More trials \u2192 closer to Theoretical P',
    ],
  },
  {
    title: 'Surveying & Sampling',
    formulas: [
      'Proportion = frequency / sample size',
      'Prediction = proportion \u00D7 population',
      'Est. Population = (tagged \u00D7 sample) / tagged in sample',
    ],
  },
  {
    title: 'Biased vs Unbiased',
    formulas: [
      'Unbiased = every member has equal chance',
      'Biased = some members have less/no chance',
      'Biased sample \u2192 unreliable predictions',
    ],
  },
  {
    title: 'Frequency Tables & Histograms',
    formulas: [
      'Frequency = count in an interval',
      'Relative Freq = frequency / total',
      'Percent = (part / total) \u00D7 100',
    ],
  },
  {
    title: 'Circle Graphs',
    formulas: [
      'Degrees = (percent / 100) \u00D7 360',
      'All sections sum to 100% (360\u00B0)',
      'Missing % = 100 \u2212 sum of known %',
    ],
  },
  {
    title: 'Central Tendency',
    formulas: [
      'Mean = sum of values / count',
      'Median = middle value (sorted data)',
      'Mode = most frequent value',
      'Range = max \u2212 min',
    ],
  },
  {
    title: 'Variation & Box Plots',
    formulas: [
      'Q1 = median of lower half',
      'Q3 = median of upper half',
      'IQR = Q3 \u2212 Q1',
      'Outlier if < Q1\u22121.5\u00D7IQR or > Q3+1.5\u00D7IQR',
    ],
  },
];

export default function FormulasSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="formulas-toggle-btn"
        onClick={() => setOpen(!open)}
        type="button"
      >
        {open ? 'Hide Formulas' : 'Formulas'}
      </button>
      <aside className={`formulas-sidebar ${open ? 'formulas-open' : ''}`}>
        <div className="formulas-header">
          <span className="formulas-title">Formula Reference</span>
        </div>
        <div className="formulas-content">
          {FORMULA_SECTIONS.map((section) => (
            <div key={section.title} className="formula-section">
              <div className="formula-section-title">{section.title}</div>
              {section.formulas.map((f, i) => (
                <div key={i} className="formula-item">{f}</div>
              ))}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
