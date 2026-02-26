const MASTERY_KEY = 'prob_tutorial_mastery';
const HISTORY_KEY = 'prob_tutorial_history';

export function loadMastery() {
  try {
    const data = localStorage.getItem(MASTERY_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveMastery(mastery) {
  localStorage.setItem(MASTERY_KEY, JSON.stringify(mastery));
}

export function loadHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveHistory(history) {
  // Keep only last 100 entries
  const trimmed = history.slice(-100);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function clearAll() {
  localStorage.removeItem(MASTERY_KEY);
  localStorage.removeItem(HISTORY_KEY);
}
