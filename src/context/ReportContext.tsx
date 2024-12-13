import { createContext, useContext, useState, ReactNode } from 'react';

type ReportType = 'cfo' | 'ceo' | 'coo';

export interface SlideData {
  title: string;
  content?: string[];
  table_caption?: string;
  table?: string;
  recommendations?: string[];
  slide_type: string;
}

interface ReportContext {
  isLoading: string | null;
  reportData: { slides: SlideData[] } | null;
  generateReport: (reportType: ReportType) => Promise<void>;
  clearReport: () => void;
  updateSlide: (slideIndex: number, updatedSlide: SlideData) => void;
}

const ReportContext = createContext<ReportContext | undefined>(undefined);

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [reportData, setReportData] = useState<{ slides: SlideData[] } | null>(null);

  const generateReport = async (reportType: ReportType) => {
    setIsLoading(reportType);

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT || "https://reporter-backend-535785258273.europe-west3.run.app/generate_report", {
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