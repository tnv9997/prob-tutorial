function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

/**
 * Parse a user's answer string into a normalized value.
 * Returns { type, value } or null if unparseable.
 */
function parseAnswer(input) {
  const trimmed = input.trim().toLowerCase();

  // Yes/No
  if (['yes', 'y'].includes(trimmed)) return { type: 'yesno', value: 'yes' };
  if (['no', 'n'].includes(trimmed)) return { type: 'yesno', value: 'no' };

  // Fraction: "3/10", "3 / 10"
  const fracMatch = trimmed.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (fracMatch) {
    const num = parseInt(fracMatch[1]);
    const den = parseInt(fracMatch[2]);
    if (den === 0) return null;
    const g = gcd(Math.abs(num), Math.abs(den));
    return { type: 'fraction', value: [num / g, den / g], decimal: num / den };
  }

  // Percentage: "50%", "33.3%"
  const pctMatch = trimmed.match(/^(-?[\d.]+)\s*%$/);
  if (pctMatch) {
    const pct = parseFloat(pctMatch[1]);
    if (isNaN(pct)) return null;
    return { type: 'percentage', value: pct, decimal: pct / 100 };
  }

  // Decimal or integer: "0.5", "3", "36"
  const num = parseFloat(trimmed);
  if (!isNaN(num) && trimmed.match(/^-?[\d.]+$/)) {
    if (Number.isInteger(num)) {
      return { type: 'integer', value: num, decimal: num };
    }
    return { type: 'decimal', value: num, decimal: num };
  }

  return null;
}

/**
 * Check if user's answer matches the expected answer.
 * expectedAnswer can be:
 *  - a number (integer)
 *  - [numerator, denominator] (fraction)
 *  - a string ('yes' / 'no')
 */
export function validateAnswer(userInput, expectedAnswer, acceptFormats) {
  const parsed = parseAnswer(userInput);
  if (!parsed) return { correct: false, parsed: null };

  // Yes/No comparison
  if (typeof expectedAnswer === 'string') {
    if (parsed.type !== 'yesno') return { correct: false, parsed };
    return { correct: parsed.value === expectedAnswer.toLowerCase(), parsed };
  }

  // Integer comparison
  if (typeof expectedAnswer === 'number') {
    if (parsed.type === 'integer' || parsed.type === 'decimal') {
      return { correct: Math.abs(parsed.value - expectedAnswer) < 0.001, parsed };
    }
    // Also accept fraction that equals the integer
    if (parsed.type === 'fraction') {
      return { correct: Math.abs(parsed.decimal - expectedAnswer) < 0.001, parsed };
    }
    return { correct: false, parsed };
  }

  // Fraction comparison [num, den]
  if (Array.isArray(expectedAnswer)) {
    const [expNum, expDen] = expectedAnswer;
    const expDecimal = expNum / expDen;

    if (parsed.type === 'fraction') {
      // Compare simplified fractions
      const g1 = gcd(Math.abs(parsed.value[0]), Math.abs(parsed.value[1]));
      const g2 = gcd(Math.abs(expNum), Math.abs(expDen));
      const match = (parsed.value[0] / g1 === expNum / g2) && (parsed.value[1] / g1 === expDen / g2);
      return { correct: match, parsed };
    }

    if (parsed.type === 'decimal' || parsed.type === 'percentage' || parsed.type === 'integer') {
      return { correct: Math.abs(parsed.decimal - expDecimal) < 0.01, parsed };
    }

    return { correct: false, parsed };
  }

  return { correct: false, parsed };
}

/**
 * Format an expected answer for display.
 */
export function formatAnswer(answer) {
  if (typeof answer === 'string') return answer;
  if (typeof answer === 'number') return String(answer);
  if (Array.isArray(answer)) return `${answer[0]}/${answer[1]}`;
  return String(answer);
}
