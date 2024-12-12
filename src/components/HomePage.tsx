import { useNavigate } from "react-router-dom";
import { useReport } from "../context/ReportContext";

export const HomePage = () => {
  const navigate = useNavigate();
  const { isLoading, generateReport } = useReport();

  const handleReportGeneration = async (reportType: 'cfo' | 'ceo' | 'coo') => {
    try {
      await generateReport(reportType);
      navigate('/report');
    } catch (error) {
      // Error is already logged in context
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">LLM Report Generator 📊</h1>
        
        <div className="button-grid">
          <button 
            className="report-button"
            onClick={() => handleReportGeneration('cfo')}
            disabled={isLoading !== null}
          >
            {isLoading === 'cfo' ? (
              <div className="spinner"></div>
            ) : '💼 CFO Report'}
          </button>
          
          <button 
            className="report-button"
            onClick={() => handleReportGeneration('ceo')}
            disabled={isLoading !== null}
          >
            {isLoading === 'ceo' ? (
              <div className="spinner"></div>
            ) : '👔 CEO Report'}
          </button>
          
          <button 
            className="report-button"
            onClick={() => handleReportGeneration('coo')}
            disabled={isLoading !== null}
          >
            {isLoading === 'coo' ? (
              <div className="spinner"></div>
            ) : '🔧 COO Report'}
          </button>
        </div>
      </div>
    </div>
  );
}