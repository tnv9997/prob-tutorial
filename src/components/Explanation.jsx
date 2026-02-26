import React from 'react';
import Visual from './Visual.jsx';
import { getKeywordDefs } from '../data/keywords.js';

/** Parse **bold** markers into <strong> elements */
function renderBoldText(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      return <strong key={i} className="keyword-highlight">{inner}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function Explanation({ type, text, visual, visualParams, answer, formula, miniExample, keywords }) {
  const config = {
    hint: { label: 'Hint', className: 'explanation-hint', icon: '💡' },
    theory: { label: 'Concept Review', className: 'explanation-theory', icon: '📖' },
    answer: { label: 'Answer Revealed', className: 'explanation-answer', icon: '✅' },
  };

  const { label, className, icon } = config[type] || config.hint;
  const keywordDefs = keywords ? getKeywordDefs(keywords) : [];

  return (
    <div className={`explanation ${className}`}>
      <div className="explanation-header">
        <span>{icon}</span>
        <strong>{label}</strong>
      </div>

      <p className="explanation-text">{renderBoldText(text)}</p>

      {answer && (
        <p className="explanation-answer-text">
          The correct answer is: <strong>{answer}</strong>
        </p>
      )}

      {formula && (
        <div className="formula-box">
          <div className="formula-label">Formula</div>
          <div className="formula-content">{renderBoldText(formula)}</div>
        </div>
      )}

      {miniExample && (
        <div className="mini-example">
          <div className="mini-example-label">Mini Example</div>
          <div className="mini-example-content">{renderBoldText(miniExample)}</div>
        </div>
      )}

      {visual && visualParams && (
        <div className="explanation-visual">
          <Visual type={visual} params={visualParams} />
        </div>
      )}

      {type === 'theory' && keywordDefs.length > 0 && (
        <div className="keyword-glossary">
          <div className="keyword-glossary-label">Key Vocabulary</div>
          {keywordDefs.map(kw => (
            <div key={kw.term} className="keyword-entry">
              <span className="keyword-term">{kw.term}:</span>{' '}
              <span className="keyword-def">{kw.definition}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
