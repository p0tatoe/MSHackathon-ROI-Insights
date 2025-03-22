import { useState } from 'react';
import './App.css';
import Chat from './components/Chat.jsx';
import ROI from './components/ROI';
import Analyze from './components/Analyze.jsx';
import Dashboard from './components/Dashboard.jsx';
import Planning from './components/Planning.jsx';
import Sidebar from './components/Sidebar'; // Import your Sidebar component

function App() {
  const [currentView, setCurrentView] = useState('chat');
  
  const navItems = [
    { icon: '📂', label: 'Projects' },
    { icon: '⬇️', label: 'Import Project' },
    { icon: '⬆️', label: 'Export Project' },
    { icon: '📩', label: 'Share' },
    { icon: '👤', label: 'Account' },
    { icon: '💵', label: 'Solomon Bucks' },
    { icon: '⚙️', label: 'Settings' },
    { icon: '🔧', label: 'Help' },
    // ... more navigation items
  ];

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
              style={{borderTopLeftRadius: '8px',
                borderBottomLeftRadius: '8px',}}
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
              Diagrams
            </button>
            <button
              className={currentView === 'dashboard' ? 'active' : ''}
              onClick={() => setCurrentView('dashboard')}
            >
              Research
            </button>
            <button
              style={{borderTopRightRadius: '8px',
              borderBottomRightRadius: '8px',}}
              className={currentView === 'planning' ? 'active' : ''}
              onClick={() => setCurrentView('planning')}
            >
              Planning
            </button>
          </div>
        </nav>
      </div>
      
      <div className="main-container">
        <Sidebar items={navItems} setCurrentView={setCurrentView} currentView={currentView} />
        <main className="content">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;