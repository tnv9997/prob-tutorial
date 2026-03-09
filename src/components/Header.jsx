import React from 'react';

export default function Header({ currentView, onNavigate }) {
  return (
    <header className="header">
      <div className="header-title">
        <span className="header-icon">🎯</span>
        <h1>CAASP Prep</h1>
        <span className="header-subtitle">7th Grade CAASP</span>
      </div>
      <nav className="header-nav">
        <button
          className={`nav-btn ${currentView === 'practice' ? 'active' : ''}`}
          onClick={() => onNavigate('practice')}
        >
          Practice
        </button>
        <button
          className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => onNavigate('dashboard')}
        >
          Dashboard
        </button>
      </nav>
    </header>
  );
}
