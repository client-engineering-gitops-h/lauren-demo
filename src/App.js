import React from 'react';
import './styles/DigitalMesh.css';
import Dashboard from './components/Dashboard';
import Topbar from './components/Topbar';
import HertzMap from './components/HertzMap';

function App() {
  return (
    
    <div className="DigitalMesh">
      <Topbar/>
      <Dashboard />
      <div className='map-container'>
        <HertzMap />
      </div>
      
    </div>
  );
}

export default App;
