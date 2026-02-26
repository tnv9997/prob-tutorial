import React, { useState, useCallback, useRef } from 'react';
import CharacterBadge from './CharacterBadge.jsx';
import Visual from './Visual.jsx';
import StepPrompt from './StepPrompt.jsx';
import CountdownTimer from './CountdownTimer.jsx';
import Calculator from './Calculator.jsx';
import ConceptPopover from './ConceptPopover.jsx';
import { selectAndGenerateQuestion } from '../engine/selector.js';
import { recordStepResult, recordQuestionHistory } from '../engine/mastery.js';
import { concepts, getTemplateById } from '../data/questionTemplates.js';
import { generateQuestion } from '../engine/generator.js';
import { playLevelUp } from '../utils/sound.js';
import { matchKeyword } from '../data/conceptExplanations.js';

export default function QuestionScreen() {
  const [question, setQuestion] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepResults, setStepResults] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insertValue, setInsertValue] = useState(null);
  const [insertTrigger, setInsertTrigger] = useState(0);
  const [activeKeyword, setActiveKeyword] = useState(null);
  const questionStartRef = useRef(null);
  const timerRef = useRef(null);

  const generateNew = useCallback(async () => {
    setLoading(true);
    try {
      const q = await selectAndGenerateQuestion();
      setQuestion(q);
      setCurrentStep(0);
      setStepResults([]);
      setShowSummary(false);
      questionStartRef.current = Date.now();
    } finally {
      setLoading(false);
    }
  }, []);

  const retryQuestion = useCallback(() => {
    const template = getTemplateById(question.templateId);
    const q = generateQuestion(template, question.params);
    setQuestion(q);
    setCurrentStep(0);
    setStepResults([]);
    setShowSummary(false);
    questionStartRef.current = Date.now();
  }, [question]);

  const handleStepComplete = useCallback(async (stepResult) => {
    if (!question) return;

    // Record mastery for this step (fire and forget)
    recordStepResult(question.concept, stepResult.result);

    const newResults = [...stepResults, stepResult];
    setStepResults(newResults);

    if (currentStep + 1 < question.steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Question complete — compute total time
      const timeTakenMs = timerRef.current?.getElapsedMs() || (Date.now() - (questionStartRef.current || Date.now()));
      recordQuestionHistory(question, newResults, timeTakenMs);
      playLevelUp();
      setShowSummary(true);
    }
  }, [question, currentStep, stepResults]);

  if (!question) {
    return (
      <div className="question-screen empty-state">
        <div className="empty-icon">🎲</div>
        <h2>Ready to Practice?</h2>
        <p>Test your probability skills with fun story problems!</p>
        <button className="btn-primary btn-large" onClick={generateNew} disabled={loading}>
          {loading ? 'Loading...' : 'Start a Question'}
        </button>
      </div>
    );
  }

  if (showSummary) {
    const conceptName = concepts.find(c => c.id === question.concept)?.name || question.concept;
    const firstTry = stepResults.filter(r => r.result === 'first').length;
    const withHelp = stepResults.filter(r => r.result === 'withHelp').length;
    const failed = stepResults.filter(r => r.result === 'failed').length;
    const score = Math.round(((firstTry * 1.0 + withHelp * 0.5) / stepResults.length) * 100);

    return (
      <div className="question-screen summary">
        <div className="summary-card">
          <h2>Question Complete!</h2>
          <CharacterBadge character={question.character} />
          <div className="summary-concept">{conceptName}</div>
          <div className="summary-score">
            <div className="score-circle" style={{
              background: `conic-gradient(${score >= 70 ? '#22C55E' : score >= 40 ? '#EAB308' : '#EF4444'} ${score * 3.6}deg, #E5E7EB ${score * 3.6}deg)`
            }}>
              <span>{score}%</span>
            </div>
          </div>
          <div className="summary-details">
            <div className="summary-row correct">
              <span>Correct on first try</span>
              <span>{firstTry} / {stepResults.length}</span>
            </div>
            <div className="summary-row help">
              <span>Correct with help</span>
              <span>{withHelp} / {stepResults.length}</span>
            </div>
            <div className="summary-row failed">
              <span>Answer revealed</span>
              <span>{failed} / {stepResults.length}</span>
            </div>
          </div>
          {score < 100 ? (
            <>
              <p className="retry-message">Great effort! Try this one again to get every step right.</p>
              <button className="btn-primary btn-large" onClick={retryQuestion}>
                Try Again
              </button>
              <button className="btn-secondary" onClick={generateNew} style={{ marginTop: 8 }}>
                Skip to New Question
              </button>
            </>
          ) : (
            <button className="btn-primary btn-large" onClick={generateNew}>
              Next Question
            </button>
          )}
        </div>
      </div>
    );
  }

  const step = question.steps[currentStep];
  const progress = ((currentStep) / question.steps.length) * 100;

  // Show calculator if any step uses fraction or decimal formats
  const needsCalculator = question.steps.some(s =>
    s.acceptFormats && (s.acceptFormats.includes('fraction') || s.acceptFormats.includes('decimal'))
  );

  const handleCalcInsert = (value) => {
    setInsertValue(value);
    setInsertTrigger(t => t + 1);
  };

  /** Parse **bold** markers in text — clickable if keyword matches */
  const renderBoldText = (text, onKeywordClick) => {
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
  };

  return (
    <div className="question-screen">
      <div className="question-top-bar">
        <div className="question-progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <CountdownTimer key={question.id} ref={timerRef} />
      </div>

      <CharacterBadge character={question.character} />

      <div className="story-box">
        <p className="story-text">{renderBoldText(question.story, setActiveKeyword)}</p>
        {question.storyVisual && question.storyVisualParams && (
          <div className="story-visual">
            <Visual type={question.storyVisual} params={question.storyVisualParams} />
          </div>
        )}
      </div>

      <StepPrompt
        key={currentStep}
        step={step}
        stepNumber={currentStep + 1}
        totalSteps={question.steps.length}
        onComplete={handleStepComplete}
        questionKeywords={question.keywords}
        insertValue={insertValue}
        insertTrigger={insertTrigger}
        onKeywordClick={setActiveKeyword}
      />

      {needsCalculator && (
        <div className="calculator-wrapper">
          <Calculator onInsert={handleCalcInsert} />
        </div>
      )}

      <div className="question-actions">
        <button className="btn-secondary" onClick={generateNew}>
          Skip to New Question
        </button>
      </div>

      {activeKeyword && (
        <ConceptPopover keywordId={activeKeyword} onClose={() => setActiveKeyword(null)} />
      )}
    </div>
  );
}
