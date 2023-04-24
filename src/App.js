import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import CovidData from './components/CovidData';
import CovidDetails from './components/CovidDetails';
import Navbar from './components/Navbar';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<CovidData />} />
      <Route path="/covid/:id" element={<CovidDetails />} />
    </Routes>
  </>
);

export default App;
