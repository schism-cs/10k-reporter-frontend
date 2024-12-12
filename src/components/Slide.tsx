import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface SlideProps {
    slide: {
        title: string;
        content: string[];
        table_caption?: string;
        table?: string;
        recommendations?: string[];
        slide_type: string;
    };
}

export const Slide: React.FC<SlideProps> = ({ slide }) => {
    return (
        <div className="slide">
            <h2 className="slide-title">
                <ReactMarkdown >{slide.title}</ReactMarkdown>
            </h2>

            <div className="slide-content">
                {slide.content && (
                    <div className="slide-text-container">
                        {slide.content.map((text, index) => (
                            <div key={index} className="slide-text">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
                            </div>
                        ))}
                    </div>
                )}

                {slide.table && (
                    <div className="slide-table-container">
                        {slide.table_caption && (
                            <p className="table-caption">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{slide.table_caption}</ReactMarkdown>
                            </p>
                        )}
                        <div className="table-wrapper">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{slide.table}</ReactMarkdown>
                        </div>
                    </div>
                )}

                {slide.recommendations && slide.recommendations.length > 0 && (
                    <div className="recommendations">
                        <h3>Recommendations</h3>
                        <ul>
                            {slide.recommendations.map((rec, index) => (
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