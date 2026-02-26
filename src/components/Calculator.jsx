import React, { useState } from 'react';

export default function Calculator({ onInsert }) {
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState('0');
  const [pending, setPending] = useState(null);
  const [operator, setOperator] = useState(null);
  const [resetNext, setResetNext] = useState(false);

  const clear = () => {
    setDisplay('0');
    setPending(null);
    setOperator(null);
    setResetNext(false);
  };

  const appendDigit = (d) => {
    if (resetNext) {
      setDisplay(d);
      setResetNext(false);
    } else {
      setDisplay(display === '0' && d !== '.' ? d : display + d);
    }
  };

  const appendDecimal = () => {
    if (resetNext) {
      setDisplay('0.');
      setResetNext(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const appendFraction = () => {
    if (resetNext) {
      setDisplay('');
      setResetNext(false);
    }
    if (!display.includes('/')) {
      setDisplay(display + '/');
    }
  };

  const compute = (a, op, b) => {
    const na = parseFloat(a);
    const nb = parseFloat(b);
    if (isNaN(na) || isNaN(nb)) return '0';
    switch (op) {
      case '+': return String(na + nb);
      case '-': return String(na - nb);
      case '*': return String(na * nb);
      case '/': return nb !== 0 ? String(na / nb) : 'Error';
      default: return String(nb);
    }
  };

  const handleOperator = (op) => {
    if (pending !== null && operator && !resetNext) {
      const result = compute(pending, operator, display);
      setDisplay(result);
      setPending(result);
    } else {
      setPending(display);
    }
    setOperator(op);
    setResetNext(true);
  };

  const handleEquals = () => {
    if (pending !== null && operator) {
      const result = compute(pending, operator, display);
      setDisplay(result);
      setPending(null);
      setOperator(null);
      setResetNext(true);
    }
  };

  const handleUseAnswer = () => {
    onInsert(display);
  };

  if (!open) {
    return (
      <button className="calc-toggle-btn" onClick={() => setOpen(true)} type="button">
        Calculator
      </button>
    );
  }

  const buttons = [
    ['7', '8', '9', { label: '\u00F7', action: () => handleOperator('/') }],
    ['4', '5', '6', { label: '\u00D7', action: () => handleOperator('*') }],
    ['1', '2', '3', { label: '-', action: () => handleOperator('-') }],
    ['0', '.', 'a/b', { label: '+', action: () => handleOperator('+') }],
  ];

  return (
    <div className="calculator-panel">
      <div className="calc-header">
        <span className="calc-title">Calculator</span>
        <button className="calc-close" onClick={() => setOpen(false)} type="button">X</button>
      </div>
      <div className="calc-display">{display}</div>
      <div className="calc-grid">
        {buttons.map((row, ri) =>
          row.map((btn, ci) => {
            if (typeof btn === 'string') {
              if (btn === '.') {
                return <button key={`${ri}-${ci}`} className="calc-btn" onClick={appendDecimal} type="button">.</button>;
              }
              if (btn === 'a/b') {
                return <button key={`${ri}-${ci}`} className="calc-btn calc-frac" onClick={appendFraction} type="button">a/b</button>;
              }
              return <button key={`${ri}-${ci}`} className="calc-btn" onClick={() => appendDigit(btn)} type="button">{btn}</button>;
            }
            return <button key={`${ri}-${ci}`} className="calc-btn calc-op" onClick={btn.action} type="button">{btn.label}</button>;
          })
        )}
      </div>
      <div className="calc-actions">
        <button className="calc-btn calc-clear" onClick={clear} type="button">C</button>
        <button className="calc-btn calc-equals" onClick={handleEquals} type="button">=</button>
        <button className="calc-btn calc-use" onClick={handleUseAnswer} type="button">Use Answer</button>
      </div>
    </div>
  );
}
