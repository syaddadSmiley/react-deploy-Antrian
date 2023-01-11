import './App.css';
import io from 'socket.io-client';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Antrian from './components/Antrian';
import Login from './components/Login';
import DashboardPerawat from './components/DashboardPerawat';
import DashboardKasir from './components/DashboardKasir';
import CetakAntrian from './components/CetakAntrian';

// const socket = io.connect("http://192.168.5.228:3001/");
function App() {

  useEffect(() => {
    document.title = 'Antrian';
  }, []);

  return (

    <div className="App">
  
      <Routes>
        <Route exact path="/" element={<Antrian />} />
        <Route exact path="/login" element={<Login />} /> 
        <Route exact path="/dashboard_prwt" element={<DashboardPerawat />} />
        <Route exact path="/dashboard_kasir" element={<DashboardKasir />} />
        <Route exact path='/client' element={<CetakAntrian />} />
      </Routes>

    </div>
  );
}

export default App;
