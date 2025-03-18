import { useState } from 'react';
import './App.css';
import Chat from './components/Chat.jsx';
import ROI from './components/ROI';
import Analyze from './components/Analyze.jsx';
import Dashboard from './components/Dashboard.jsx';
import Planning from './components/Planning.jsx';

function App() {
  const [currentView, setCurrentView] = useState('chat');

  const renderView = () => {
    switch (currentView) {
      case 'chat':
        return <Chat/>;
      case 'roi':
        return <ROI/>;
      case 'analyze':
        return <Analyze/>;
      case 'dashboard':
        return <Dashboard/>;
      case 'planning':
        return <Planning/>;
      default:
        return <Chat />;
    }
  };

  return (
    <div className="app-container">
      <div class="header">

        <div class="header-left"> 
          <div class="header-logo"></div>
          <div class="header-title">Solomon</div>
        </div>

        <nav className="navbar">
          <div className="nav-buttons">
            <button 
              className={currentView === 'chat' ? 'active' : ''} 
              onClick={() => setCurrentView('chat')}
            >
              Chat
            </button>
            <button 
              className={currentView === 'roi' ? 'active' : ''} 
              onClick={() => setCurrentView('roi')}
            >
              ROI Calculator
            </button>
            <button 
              className={currentView === 'analyze' ? 'active' : ''} 
              onClick={() => setCurrentView('analyze')}
            >
              Analyze
            </button>
            <button 
              className={currentView === 'dashboard' ? 'active' : ''} 
              onClick={() => setCurrentView('dashboard')}
            >
              Research
            </button>
            <button 
              className={currentView === 'planning' ? 'active' : ''} 
              onClick={() => setCurrentView('planning')}
            >
              Planning
            </button>
          </div>
        </nav>
        <div class="header-right">
      
        </div>

      </div>

      <main className="content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
