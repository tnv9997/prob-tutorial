import React, { useEffect } from 'react';
import Visual from './Visual.jsx';
import { getConceptExplanation } from '../data/conceptExplanations.js';

export default function ConceptPopover({ keywordId, onClose }) {
  const data = getConceptExplanation(keywordId);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!data) return null;

  return (
    <div className="concept-overlay" onClick={onClose}>
      <div className="concept-popover" onClick={(e) => e.stopPropagation()}>
        <div className="concept-header">
          <h3>{data.term}</h3>
          <button className="concept-close" onClick={onClose}>&times;</button>
        </div>

        <p className="concept-definition">{data.definition}</p>

        {data.visual && data.visualParams && (
          <div className="concept-visual">
            <Visual type={data.visual} params={data.visualParams} />
          </div>
        )}

        {data.example && (
          <div className="concept-example">
            <div className="concept-example-title">{data.example.title}</div>
            <p className="concept-example-text">{data.example.text}</p>
            <p className="concept-solution">{data.example.solution}</p>
          </div>
        )}
      </div>
    </div>
  );
}
