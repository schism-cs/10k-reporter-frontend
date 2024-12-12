import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReport } from '../context/ReportContext';
import { EditableSlide } from './EditableSlide';
import { ReportPDF } from './ReportPDF';

function ReportDisplay() {
  const navigate = useNavigate();
  const { reportData, clearReport, updateSlide } = useReport();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPDF, setShowPDF] = useState(false);

  const handleBack = () => {
    clearReport();
    navigate('/');
  };

  if (!reportData) {
    navigate('/');
    return null;
  }

  const totalSlides = reportData.slides.length;

  const goToNextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(curr => curr + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(curr => curr - 1);
    }
  };

  /* if (showPDF) {
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReportPDF slides={reportData.slides} />
      </div>
    );
  } */

  return (
    <div className="presentation-container">
      <div className="slide-container">
        <EditableSlide 
          slide={reportData.slides[currentSlide]} 
          onSave={(updatedSlide) => updateSlide(currentSlide, updatedSlide)}
        />
        
        <div className="presentation-controls">
          <div className="slide-controls">
            <button 
              className="nav-button"
              onClick={goToPrevSlide}
              disabled={currentSlide === 0}
            >
              ← Previous
            </button>
            
            <span className="slide-counter">
              {currentSlide + 1} / {totalSlides}
            </span>
            
            <button 
              className="nav-button"
              onClick={goToNextSlide}
              disabled={currentSlide === totalSlides - 1}
            >
              Next →
            </button>
          </div>

          <div className="action-buttons">
            <button 
              className="exit-button"
              onClick={handleBack}
            >
              Exit Presentation
            </button>

            <button 
              className="pdf-button"
              onClick={() => setShowPDF(true)}
            >
              📥 View PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportDisplay; 