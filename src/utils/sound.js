let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function playDing() {
  try {
    const ctx = getAudioContext();
    // Two-tone celebratory ding
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const start = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.25, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
      osc.start(start);
      osc.stop(start + 0.5);
    });
  } catch {
    // Audio not available - silently ignore
  }
}

export function playLevelUp() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'triangle';
      const start = ctx.currentTime + i * 0.1;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.2, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);
      osc.start(start);
      osc.stop(start + 0.6);
    });
  } catch {
    // Audio not available
  }
}

const firstTryPhrases = [
  "Excellent work!",
  "You nailed it!",
  "Brilliant! Keep going!",
  "Perfect answer!",
  "You're on fire!",
  "Fantastic!",
  "Super smart!",
  "Way to go!",
  "Outstanding!",
  "Math champion!",
  "First try, nice!",
  "You're a natural!",
  "Spot on!",
  "Crushed it!",
  "Amazing!",
];

const withHelpPhrases = [
  "You got it!",
  "There you go!",
  "Nice recovery!",
  "That's the way!",
  "Good job figuring it out!",
  "Now you've got it!",
  "Great thinking!",
  "Well done!",
  "Persistence pays off!",
  "Keep it up!",
];

export function getEncouragement(result) {
  const list = result === 'first' ? firstTryPhrases : withHelpPhrases;
  return list[Math.floor(Math.random() * list.length)];
}
