import { api } from '../utils/api.js';
import { concepts } from '../data/questionTemplates.js';

/**
 * Get mastery data for all concepts from the server.
 */
export async function getMasteryData() {
  try {
    const data = await api.get('/api/stats/mastery');
    // Ensure all concepts exist
    for (const concept of concepts) {
      if (!data[concept.id]) {
        data[concept.id] = {
          totalAttempts: 0,
          correctFirst: 0,
          correctWithHelp: 0,
          failed: 0,
          masteryScore: 0,
        };
      }
    }
    return data;
  } catch {
    // Fallback: return empty mastery if server is unavailable
    const data = {};
    for (const concept of concepts) {
      data[concept.id] = {
        totalAttempts: 0,
        correctFirst: 0,
        correctWithHelp: 0,
        failed: 0,
        masteryScore: 0,
      };
    }
    return data;
  }
}

/**
 * Record the result of a completed step.
 * @param {string} conceptId
 * @param {'first' | 'withHelp' | 'failed'} result
 */
export async function recordStepResult(conceptId, result) {
  try {
    await api.post('/api/stats/step-result', { conceptId, result });
  } catch (err) {
    console.error('Failed to record step result:', err);
  }
}

/**
 * Record a completed question in history with enriched data.
 * @param {object} question - The question object
 * @param {Array<{result: string, attempts: number, timeMs: number}>} stepResults - Enriched step results
 * @param {number} timeTakenMs - Total time spent on the question
 */
export async function recordQuestionHistory(question, stepResults, timeTakenMs) {
  try {
    const correctFirstCount = stepResults.filter(r => r.result === 'first').length;
    const correctWithHelpCount = stepResults.filter(r => r.result === 'withHelp').length;
    const failedCount = stepResults.filter(r => r.result === 'failed').length;

    await api.post('/api/stats/history', {
      templateId: question.templateId,
      concept: question.concept,
      characterId: question.character.id,
      stepResults,
      difficulty: question.difficulty || 1,
      timeTakenMs: timeTakenMs || 0,
      totalSteps: question.steps.length,
      correctFirstCount,
      correctWithHelpCount,
      failedCount,
    });
  } catch (err) {
    console.error('Failed to record history:', err);
  }
}

/**
 * Get detailed history entries for RL-based selection.
 * @param {number} limit - Max entries to fetch (default 200)
 */
export async function getDetailedHistory(limit = 200) {
  try {
    return await api.get(`/api/stats/detailed-history?limit=${limit}`);
  } catch {
    return [];
  }
}

/**
 * Get overall stats for the dashboard.
 */
export async function getOverallStats() {
  try {
    return await api.get('/api/stats/overall');
  } catch {
    return {
      totalQuestions: 0,
      totalSteps: 0,
      correctFirstTotal: 0,
      overallAccuracy: 0,
      conceptStats: concepts.map(c => ({
        ...c,
        totalAttempts: 0,
        correctFirst: 0,
        correctWithHelp: 0,
        failed: 0,
        masteryScore: 0,
      })),
      history: [],
    };
  }
}

/**
 * Reset all user progress.
 */
export async function resetProgress() {
  await api.post('/api/stats/reset', {});
}
