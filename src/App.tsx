import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ReportDisplay from './components/ReportDisplay';
import { HomePage } from './components/HomePage';
import { ReportProvider } from './context/ReportContext';

const App = () => {
  return (
    <ReportProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportDisplay />} />
        </Routes>
      </BrowserRouter>
    </ReportProvider>
  );
}

export default App;
