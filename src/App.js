import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Feedback from './pages/Feedback';
import Prediction from './pages/Prediction';
import Report from './pages/Report';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/report" element={<Report />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;