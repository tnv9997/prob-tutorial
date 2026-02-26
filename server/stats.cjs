const express = require('express');
const { stmts } = require('./db.cjs');

const router = express.Router();

// All concepts for ensuring complete mastery data
const ALL_CONCEPTS = [
  'simple_probability',
  'complementary',
  'compound_independent',
  'compound_dependent',
  'sample_space',
  'experimental',
  'theoretical_vs_experimental',
  'surveying',
  'sampling',
  'biased_sampling',
  'unbiased_sampling',
];

// ── Simple middleware: always use default user ────────────────
router.use((req, _res, next) => {
  req.userId = 1;
  next();
});

// ── Get mastery data ──────────────────────────────────────────
router.get('/mastery', (req, res) => {
  const rows = stmts.getMastery.all(req.userId);
  const mastery = {};

  // Initialize all concepts
  for (const concept of ALL_CONCEPTS) {
    mastery[concept] = {
      totalAttempts: 0,
      correctFirst: 0,
      correctWithHelp: 0,
      failed: 0,
      masteryScore: 0,
    };
  }

  // Fill in from DB
  for (const row of rows) {
    const total = row.total_attempts || 0;
    mastery[row.concept] = {
      totalAttempts: total,
      correctFirst: row.correct_first || 0,
      correctWithHelp: row.correct_with_help || 0,
      failed: row.failed || 0,
      masteryScore: total > 0
        ? (row.correct_first * 1.0 + row.correct_with_help * 0.5) / total
        : 0,
    };
  }

  res.json(mastery);
});

// ── Record a step result ──────────────────────────────────────
router.post('/step-result', (req, res) => {
  const { conceptId, result } = req.body;

  if (!conceptId || !result) {
    return res.status(400).json({ error: 'conceptId and result are required.' });
  }

  if (!['first', 'withHelp', 'failed'].includes(result)) {
    return res.status(400).json({ error: 'result must be first, withHelp, or failed.' });
  }

  const correctFirst = result === 'first' ? 1 : 0;
  const correctWithHelp = result === 'withHelp' ? 1 : 0;
  const failed = result === 'failed' ? 1 : 0;

  stmts.upsertMastery.run(req.userId, conceptId, correctFirst, correctWithHelp, failed);

  res.json({ success: true });
});

// ── Record question history ───────────────────────────────────
router.post('/history', (req, res) => {
  const { templateId, concept, characterId, stepResults,
    difficulty, timeTakenMs, totalSteps, correctFirstCount, correctWithHelpCount, failedCount } = req.body;

  stmts.addHistory.run(
    req.userId,
    templateId || '',
    concept || '',
    characterId || '',
    JSON.stringify(stepResults || []),
    difficulty || 1,
    timeTakenMs || 0,
    totalSteps || 0,
    correctFirstCount || 0,
    correctWithHelpCount || 0,
    failedCount || 0
  );

  res.json({ success: true });
});

// ── Get detailed history (for RL selector) ────────────────────
router.get('/detailed-history', (req, res) => {
  const limit = parseInt(req.query.limit) || 200;
  const rows = stmts.getDetailedHistory.all(req.userId, limit);

  const history = rows.map(h => ({
    id: h.id,
    timestamp: h.created_at,
    templateId: h.template_id,
    concept: h.concept,
    characterId: h.character_id,
    stepResults: JSON.parse(h.step_results || '[]'),
    difficulty: h.difficulty || 1,
    timeTakenMs: h.time_taken_ms || 0,
    totalSteps: h.total_steps || 0,
    correctFirstCount: h.correct_first_count || 0,
    correctWithHelpCount: h.correct_with_help_count || 0,
    failedCount: h.failed_count || 0,
  }));

  res.json(history);
});

// ── Get overall stats (for dashboard) ─────────────────────────
router.get('/overall', (req, res) => {
  const masteryRows = stmts.getMastery.all(req.userId);
  const historyRows = stmts.getHistory.all(req.userId);

  const mastery = {};
  let totalSteps = 0;
  let correctFirstTotal = 0;

  for (const concept of ALL_CONCEPTS) {
    mastery[concept] = {
      totalAttempts: 0,
      correctFirst: 0,
      correctWithHelp: 0,
      failed: 0,
      masteryScore: 0,
    };
  }

  for (const row of masteryRows) {
    const total = row.total_attempts || 0;
    mastery[row.concept] = {
      totalAttempts: total,
      correctFirst: row.correct_first || 0,
      correctWithHelp: row.correct_with_help || 0,
      failed: row.failed || 0,
      masteryScore: total > 0
        ? (row.correct_first * 1.0 + row.correct_with_help * 0.5) / total
        : 0,
    };
    totalSteps += total;
    correctFirstTotal += row.correct_first || 0;
  }

  const conceptMeta = [
    { id: 'simple_probability', name: 'Simple Probability', description: 'P(event) = desired outcomes / total outcomes' },
    { id: 'complementary', name: 'Complementary Events', description: 'P(not A) = 1 - P(A)' },
    { id: 'compound_independent', name: 'Compound Independent Events', description: 'P(A and B) = P(A) x P(B)' },
    { id: 'compound_dependent', name: 'Compound Dependent Events', description: 'P(A then B) without replacement' },
    { id: 'sample_space', name: 'Sample Space', description: 'Listing/counting all outcomes' },
    { id: 'experimental', name: 'Experimental Probability', description: 'Frequency-based probability from data' },
    { id: 'theoretical_vs_experimental', name: 'Theoretical vs Experimental', description: 'Understanding the difference' },
    { id: 'surveying', name: 'Surveying', description: 'Collecting data and interpreting survey results' },
    { id: 'sampling', name: 'Sampling', description: 'Using samples to make predictions about populations' },
    { id: 'biased_sampling', name: 'Biased Sampling', description: 'Identifying non-representative samples' },
    { id: 'unbiased_sampling', name: 'Unbiased Sampling', description: 'Random sampling where every member has equal chance' },
  ];

  const conceptStats = conceptMeta.map(c => ({
    ...c,
    ...mastery[c.id],
  }));

  const history = historyRows.map(h => ({
    timestamp: h.created_at,
    templateId: h.template_id,
    concept: h.concept,
    characterId: h.character_id,
    stepResults: JSON.parse(h.step_results || '[]'),
  }));

  res.json({
    totalQuestions: historyRows.length,
    totalSteps,
    correctFirstTotal,
    overallAccuracy: totalSteps > 0 ? correctFirstTotal / totalSteps : 0,
    conceptStats,
    history,
  });
});

// ── Reset all progress ────────────────────────────────────────
router.post('/reset', (req, res) => {
  stmts.deleteMastery.run(req.userId);
  stmts.deleteHistory.run(req.userId);
  res.json({ success: true });
});

module.exports = router;
