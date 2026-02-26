import React, { useState, useRef, useEffect } from 'react';
import Explanation from './Explanation.jsx';
import Visual from './Visual.jsx';
import { validateAnswer, formatAnswer } from '../engine/validator.js';
import { playDing, getEncouragement } from '../utils/sound.js';
import { matchKeyword } from '../data/conceptExplanations.js';

/** Parse **bold** markers in prompt text — clickable if keyword matches */
function renderBoldText(text, onKeywordClick) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      const kwId = onKeywordClick ? matchKeyword(inner) : null;
      if (kwId) {
        return (
          <span key={i} className="keyword-highlight keyword-clickable"
            onClick={() => onKeywordClick(kwId)}>{inner}</span>
        );
      }
      return <strong key={i} className="keyword-highlight">{inner}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function StepPrompt({ step, stepNumber, totalSteps, onComplete, questionKeywords, insertValue, insertTrigger, onKeywordClick }) {
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef(null);
  const stepStartRef = useRef(Date.now());

  useEffect(() => {
    setInput('');
    setAttempts(0);
    setFeedback(null);
    setExplanation(null);
    setCompleted(false);
    stepStartRef.current = Date.now();
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [step]);

  // Handle calculator insert
  useEffect(() => {
    if (insertValue != null && insertTrigger > 0) {
      setInput(String(insertValue));
      inputRef.current?.focus();
    }
  }, [insertTrigger]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (completed || !input.trim()) return;

    const result = validateAnswer(input.trim(), step.answer, step.acceptFormats);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (result.correct) {
      const resultType = newAttempts === 1 ? 'first' : 'withHelp';
      const encouragement = getEncouragement(resultType);
      const timeMs = Date.now() - stepStartRef.current;

      // Play celebratory ding
      playDing();

      setFeedback({ correct: true, message: encouragement });
      setCompleted(true);
      setTimeout(() => onComplete({ result: resultType, attempts: newAttempts, timeMs }), 1500);
    } else {
      if (newAttempts === 1) {
        setFeedback({ correct: false, message: 'Not quite. Here\'s a hint:' });
        setExplanation({
          type: 'hint',
          text: step.hint,
          formula: step.formula,
          miniExample: step.miniExample,
        });
      } else if (newAttempts === 2) {
        setFeedback({ correct: false, message: 'Still not right. Let\'s review the concept:' });
        setExplanation({
          type: 'theory',
          text: step.theory,
          formula: step.formula,
          miniExample: step.miniExample,
          keywords: questionKeywords,
        });
      } else {
        const formatted = formatAnswer(step.answer);
        const timeMs = Date.now() - stepStartRef.current;
        setFeedback({ correct: false, message: 'Let me show you the answer:' });
        setExplanation({
          type: 'answer',
          text: step.theory,
          answer: formatted,
          formula: step.formula,
          miniExample: step.miniExample,
          keywords: questionKeywords,
        });
        setCompleted(true);
        setTimeout(() => onComplete({ result: 'failed', attempts: newAttempts, timeMs }), 2500);
      }
      setInput('');
    }
  };

  const feedbackClass = feedback
    ? feedback.correct ? 'feedback-correct' : `feedback-wrong attempt-${attempts}`
    : '';

  return (
    <div className="step-prompt">
      <div className="step-header">
        <span className="step-badge">Step {stepNumber} of {totalSteps}</span>
        <div className="step-attempts">
          {[1, 2, 3].map(n => (
            <span key={n} className={`attempt-dot ${n <= attempts ? (completed && feedback?.correct ? 'used-correct' : 'used-wrong') : ''}`} />
          ))}
        </div>
      </div>

      <p className="step-question">{renderBoldText(step.prompt, onKeywordClick)}</p>

      {step.visual && step.visualParams && (
        <div className="step-visual">
          <Visual type={step.visual} params={step.visualParams} />
        </div>
      )}

      {feedback && (
        <div className={`feedback ${feedbackClass}`}>
          {feedback.correct && <span className="feedback-icon">🎉</span>}
          {feedback.message}
        </div>
      )}

      {explanation && (
        <Explanation
          type={explanation.type}
          text={explanation.text}
          visual={step.visual}
          visualParams={step.visualParams}
          answer={explanation.answer}
          formula={explanation.formula}
          miniExample={explanation.miniExample}
          keywords={explanation.keywords}
          onKeywordClick={onKeywordClick}
        />
      )}

      {!completed && (
        <form className="step-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
            className="step-input"
            autoFocus
          />
          <button type="submit" className="step-submit">
            Check
          </button>
        </form>
      )}

      {completed && feedback?.correct && (
        <div className="step-complete-indicator">
          Moving to next step...
        </div>
      )}
    </div>
  );
}
