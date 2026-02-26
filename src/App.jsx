import { useState } from 'react';
import Header from './components/Header.jsx';
import QuestionScreen from './components/QuestionScreen.jsx';
import Dashboard from './components/Dashboard.jsx';
import FormulasSidebar from './components/FormulasSidebar.jsx';

export default function App() {
  const [view, setView] = useState('practice');

  return (
    <div className="app">
      <Header currentView={view} onNavigate={setView} />
      {view === 'practice' ? (
        <div className="practice-layout">
          <main className="main-content">
            <QuestionScreen />
          </main>
          <FormulasSidebar />
        </div>
      ) : (
        <main className="main-content">
          <Dashboard />
        </main>
      )}
    </div>
  );
}
