import './App.css';
import ReportDisplay from './components/ReportDisplay';
import { HomePage } from './components/HomePage';
import { ReportProvider } from './context/ReportContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
