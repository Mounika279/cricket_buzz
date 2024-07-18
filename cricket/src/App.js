// App.js

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerDetails from './components/players';
import Teams from './components/league';
import MatchList from './components/score';
import MatchDetails from './components/viewdetails';



function App() {
  return (
    <div style={{ backgroundColor: 'rgba(144, 238, 144, 0.4)' }}>
      <Router>
        <div>
          <PlayerDetails/>
          <Teams/>
      
          <Routes>
            <Route exact path="/" element={<MatchList/>} />
            <Route path="/matchdetails/:matchId" element={<MatchDetails/>} /> 
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
