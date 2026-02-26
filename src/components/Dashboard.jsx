import React, { useState, useEffect, useCallback } from 'react';
import { getOverallStats, resetProgress } from '../engine/mastery.js';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getOverallStats();
      setStats(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      await resetProgress();
      refresh();
    }
  };

  if (loading || !stats) {
    return (
      <div className="dashboard">
        <h2>Your Progress</h2>
        <p style={{ textAlign: 'center', color: '#6B7280', padding: '40px' }}>Loading stats...</p>
      </div>
    );
  }

  const { totalQuestions, totalSteps, overallAccuracy, conceptStats } = stats;

  return (
    <div className="dashboard">
      <h2>Your Progress</h2>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-value">{totalQuestions}</div>
          <div className="stat-label">Questions Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalSteps}</div>
          <div className="stat-label">Steps Answered</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{Math.round(overallAccuracy * 100)}%</div>
          <div className="stat-label">First-Try Accuracy</div>
        </div>
      </div>

      <h3>Concept Mastery</h3>
      <div className="mastery-list">
        {conceptStats.map(concept => {
          const pct = Math.round(concept.masteryScore * 100);
          const barColor = pct >= 70 ? '#22C55E' : pct >= 40 ? '#EAB308' : '#EF4444';
          const level = pct >= 80 ? 'Mastered' : pct >= 50 ? 'Developing' : pct > 0 ? 'Needs Practice' : 'Not Started';

          return (
            <div key={concept.id} className="mastery-item">
              <div className="mastery-header">
                <div>
                  <div className="mastery-name">{concept.name}</div>
                  <div className="mastery-description">{concept.description}</div>
                </div>
                <div className="mastery-level" style={{ color: barColor }}>{level}</div>
              </div>
              <div className="mastery-bar-bg">
                <div className="mastery-bar-fill" style={{ width: `${pct}%`, backgroundColor: barColor }} />
              </div>
              <div className="mastery-stats">
                <span>First try: {concept.correctFirst}</span>
                <span>With help: {concept.correctWithHelp}</span>
                <span>Revealed: {concept.failed}</span>
                <span>Score: {pct}%</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-actions">
        <button className="btn-secondary" onClick={refresh}>Refresh</button>
        <button className="btn-danger" onClick={handleReset}>Reset All Progress</button>
      </div>
    </div>
  );
}
