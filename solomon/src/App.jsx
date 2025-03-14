import { useState } from 'react';
import './App.css';
import Chat from './components/Chat.jsx';
import ROI from './components/ROI';
import SWOT from './components/SWOT';
import Dashboard from './components/Dashboard.jsx';

function App() {
  const [currentView, setCurrentView] = useState('chat');

  const renderView = () => {
    switch (currentView) {
      case 'chat':
        return <Chat />;
      case 'roi':
        return <ROI />;
      case 'swot':
        return <SWOT />;
      case 'dashboard':
        return <Dashboard/>;
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
              className={currentView === 'swot' ? 'active' : ''} 
              onClick={() => setCurrentView('swot')}
            >
              SWOT
            </button>
            <button 
              className={currentView === 'dashboard' ? 'active' : ''} 
              onClick={() => setCurrentView('dashboard')}
            >
              Dashboard
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
