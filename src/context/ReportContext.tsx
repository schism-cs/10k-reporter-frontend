import React, { createContext, useContext, useState, ReactNode } from 'react';

type ReportType = 'cfo' | 'ceo' | 'coo';

interface SlideData {
  title: string;
  content?: string[];
  table_caption?: string;
  table?: string;
  recommendations?: string[];
  slide_type: string;
}

interface ReportContextType {
  isLoading: string | null;
  reportData: { slides: SlideData[] } | null;
  generateReport: (reportType: ReportType) => Promise<void>;
  clearReport: () => void;
  updateSlide: (slideIndex: number, updatedSlide: SlideData) => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [reportData, setReportData] = useState<{ slides: SlideData[] } | null>(null);

  const generateReport = async (reportType: ReportType) => {
    setIsLoading(reportType);
    try {
      const response = await fetch('http://127.0.0.1:8000/generate_report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          report_type: reportType
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setReportData(data);
      return data;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    } finally {
      setIsLoading(null);
    }
  };

  const updateSlide = (slideIndex: number, updatedSlide: SlideData) => {
    if (reportData) {
      const newSlides = [...reportData.slides];
      newSlides[slideIndex] = updatedSlide;
      setReportData({ ...reportData, slides: newSlides });
    }
  };

  const clearReport = () => {
    setReportData(null);
  };

  return (
    <ReportContext.Provider value={{ isLoading, reportData, generateReport, clearReport, updateSlide }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
}; 