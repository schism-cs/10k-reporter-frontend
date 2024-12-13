import { useNavigate } from "react-router-dom";
import { useReport } from "../context/ReportContext";

interface ReportButtonProps {
    tag: string
    text: string
    isLoading: string | null
    handleClick: Function
}

export const ReportButton: React.FC<ReportButtonProps> = (props: ReportButtonProps) => {

    return (
        <button
            className="report-button"
            onClick={() => props.handleClick(props.tag)}
            disabled={props.isLoading !== null}
        >
            {props.isLoading === props.tag ? (
                <div className="spinner"></div>
            ) : props.text}
        </button>
    )
}


export const HomePage = () => {
    const navigate = useNavigate();
    const { isLoading, generateReport } = useReport();

    const handleReportGeneration = async (reportType: 'cfo' | 'ceo' | 'coo') => {
        await generateReport(reportType);
        navigate('/report');
    };

    return (
        <div className="App">
            <div className="container">
                <h1 className="title">LLM Report Generator 📊</h1>

                <div className="button-grid">

                    <ReportButton tag="cfo" text="💼 CFO Report" handleClick={handleReportGeneration} isLoading={isLoading} />
                    <ReportButton tag="ceo" text="👔 CEO Report" handleClick={handleReportGeneration} isLoading={isLoading} />
                    <ReportButton tag="coo" text="🔧 COO Report" handleClick={handleReportGeneration} isLoading={isLoading} />

                </div>
            </div>
        </div>
    );
}