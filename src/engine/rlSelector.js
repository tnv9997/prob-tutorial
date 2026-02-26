import { getMasteryData, getDetailedHistory } from './mastery.js';
import { generateQuestion } from './generator.js';
import questionTemplates, { concepts } from '../data/questionTemplates.js';

// Track recently used templates to avoid repetition
const recentTemplates = [];
const MAX_RECENT = 5;

/**
 * UCB1-inspired adaptive question selection.
 * Fetches mastery + recent history, scores each concept,
 * picks via softmax, then selects a template with novelty bonus.
 */
export async function selectAndGenerateQuestion() {
  // Fetch mastery and history in parallel
  const [mastery, history] = await Promise.all([
    getMasteryData(),
    getDetailedHistory(200),
  ]);

  const totalQuestions = history.length;

  // ── 1. Score each concept ──────────────────────────────────
  const conceptScores = concepts.map(concept => {
    const m = mastery[concept.id] || { masteryScore: 0, totalAttempts: 0 };
    const conceptHistory = history.filter(h => h.concept === concept.id);

    // Base need: concepts with low mastery score get higher need
    const baseNeed = Math.pow(1 - (m.masteryScore || 0), 1.5);

    // Recency-weighted failure rate
    let recentFailRate = 0;
    if (conceptHistory.length > 0) {
      let weightedFails = 0;
      let weightSum = 0;
      conceptHistory.forEach((h, idx) => {
        const recencyWeight = 1 / (idx + 1); // More recent = higher weight
        const failed = h.failedCount || 0;
        const total = h.totalSteps || 1;
        weightedFails += (failed / total) * recencyWeight;
        weightSum += recencyWeight;
      });
      recentFailRate = weightSum > 0 ? weightedFails / weightSum : 0;
    }

    // Slow-answer penalty: if average time > 45s, penalize (indicates struggling)
    let slowPenalty = 0;
    const recentWithTime = conceptHistory.filter(h => h.timeTakenMs > 0).slice(0, 10);
    if (recentWithTime.length > 0) {
      const avgTime = recentWithTime.reduce((s, h) => s + h.timeTakenMs, 0) / recentWithTime.length;
      if (avgTime > 45000) {
        slowPenalty = Math.min(0.3, (avgTime - 45000) / 60000);
      }
    }

    // Spaced repetition bonus: mastered concepts resurface after 15+ questions
    let spacedBonus = 0;
    if (m.masteryScore >= 0.7 && conceptHistory.length > 0) {
      // Find how many questions ago this concept was last seen
      const lastSeenIdx = history.findIndex(h => h.concept === concept.id);
      const questionsSince = lastSeenIdx >= 0 ? lastSeenIdx : totalQuestions;
      if (questionsSince >= 15) {
        spacedBonus = Math.min(0.4, (questionsSince - 15) * 0.05);
      }
    }

    // UCB exploration term: favor less-attempted concepts
    let explorationBonus = 0;
    if (totalQuestions > 0) {
      const conceptAttempts = Math.max(1, conceptHistory.length);
      explorationBonus = 0.3 * Math.sqrt(Math.log(totalQuestions + 1) / conceptAttempts);
    }

    // Novelty bonus for never-seen concepts
    const noveltyBonus = m.totalAttempts === 0 ? 0.5 : 0;

    const score = baseNeed + recentFailRate * 0.4 + slowPenalty + spacedBonus + explorationBonus + noveltyBonus;

    return {
      conceptId: concept.id,
      score: Math.max(0.05, score), // Minimum floor so nothing is completely excluded
    };
  });

  // ── 2. Softmax concept selection with decreasing temperature ──
  // Temperature decreases as we get more data — more exploitative over time
  const temperature = Math.max(0.3, 1.0 - totalQuestions * 0.02);

  const maxScore = Math.max(...conceptScores.map(c => c.score));
  const expScores = conceptScores.map(c => ({
    ...c,
    exp: Math.exp((c.score - maxScore) / temperature),
  }));
  const expSum = expScores.reduce((s, c) => s + c.exp, 0);
  const probs = expScores.map(c => ({ ...c, prob: c.exp / expSum }));

  // Weighted random selection
  let rand = Math.random();
  let selectedConcept = probs[probs.length - 1].conceptId;
  for (const c of probs) {
    rand -= c.prob;
    if (rand <= 0) {
      selectedConcept = c.conceptId;
      break;
    }
  }

  // ── 3. Template selection ──────────────────────────────────
  const available = questionTemplates.filter(t => t.concept === selectedConcept);
  if (available.length === 0) {
    // Fallback to any template
    const fallback = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
    trackTemplate(fallback.id);
    return generateQuestion(fallback);
  }

  // Score each template
  const conceptHistory = history.filter(h => h.concept === selectedConcept);
  const templateScores = available.map(t => {
    // Avoid recently used templates
    const recentPenalty = recentTemplates.includes(t.id) ? -2 : 0;

    // Prefer templates where the student has failed more
    const templateHistory = conceptHistory.filter(h => h.templateId === t.id);
    let failBonus = 0;
    if (templateHistory.length > 0) {
      const totalFails = templateHistory.reduce((s, h) => s + (h.failedCount || 0), 0);
      const totalSteps = templateHistory.reduce((s, h) => s + (h.totalSteps || 1), 0);
      failBonus = totalSteps > 0 ? (totalFails / totalSteps) * 0.5 : 0;
    }

    // Novelty bonus for templates not yet seen
    const noveltyBonus = templateHistory.length === 0 ? 1.0 : 0;

    return {
      template: t,
      score: 1.0 + failBonus + noveltyBonus + recentPenalty,
    };
  });

  // Pick template: softmax with low temperature for more focused selection
  const tMaxScore = Math.max(...templateScores.map(t => t.score));
  const tExpScores = templateScores.map(t => ({
    ...t,
    exp: Math.exp((t.score - tMaxScore) / 0.5),
  }));
  const tExpSum = tExpScores.reduce((s, t) => s + t.exp, 0);

  let tRand = Math.random();
  let selectedTemplate = tExpScores[tExpScores.length - 1].template;
  for (const t of tExpScores) {
    tRand -= t.exp / tExpSum;
    if (tRand <= 0) {
      selectedTemplate = t.template;
      break;
    }
  }

  trackTemplate(selectedTemplate.id);
  return generateQuestion(selectedTemplate);
}

function trackTemplate(templateId) {
  recentTemplates.unshift(templateId);
  if (recentTemplates.length > MAX_RECENT) {
    recentTemplates.pop();
  }
}
