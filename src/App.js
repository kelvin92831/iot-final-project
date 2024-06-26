import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ApiPage from './ApiPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api" element={<ApiPage />} />
      </Routes>
    </Router>
  );
}

export default App;
