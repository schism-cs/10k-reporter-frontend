import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SlideData } from '../context/ReportContext';



export const Slide: React.FC<SlideData> = ({ title, slide_type, content, recommendations, table, table_caption }) => {
    return (
        <div className="slide">
            <h2 className="slide-title">
                <ReactMarkdown >{title}</ReactMarkdown>
            </h2>

            <div className="slide-content">
                {content && (
                    <div className="slide-text-container">
                        {content.map((text, index) => (
                            <div key={index} className="slide-text">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
                            </div>
                        ))}
                    </div>
                )}

                {table && (
                    <div className="slide-table-container">
                        {table_caption && (
                            <p className="table-caption">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{table_caption}</ReactMarkdown>
                            </p>
                        )}
                        <div className="table-wrapper">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{table}</ReactMarkdown>
                        </div>
                    </div>
                )}

                {recommendations && recommendations.length > 0 && (
                    <div className="recommendations">
                        <h3>Recommendations</h3>
                        <ul>
                            {recommendations.map((rec, index) => (
                                <li key={index}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{rec}</ReactMarkdown>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}; 