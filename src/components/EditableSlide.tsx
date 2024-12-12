import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface EditableSlideProps {
  slide: {
    title: string;
    content?: string[];
    table_caption?: string;
    table?: string;
    recommendations?: string[];
    slide_type: string;
  };
  onSave: (updatedSlide: EditableSlideProps['slide']) => void;
}

export const EditableSlide: React.FC<EditableSlideProps> = ({ slide, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSlide, setEditedSlide] = useState(slide);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editedSlide);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSlide(slide);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="slide editing">
        <div className="edit-form">
          <input
            className="edit-title"
            value={editedSlide.title}
            onChange={(e) => setEditedSlide({ ...editedSlide, title: e.target.value })}
          />
          
          <div className="edit-content">
            {editedSlide.content?.map((text, index) => (
              <textarea
                key={index}
                value={text}
                onChange={(e) => {
                  const newContent = [...(editedSlide.content || [])];
                  newContent[index] = e.target.value;
                  setEditedSlide({ ...editedSlide, content: newContent });
                }}
              />
            ))}
          </div>

          {editedSlide.table && (
            <div className="edit-table">
              <input
                value={editedSlide.table_caption || ''}
                onChange={(e) => setEditedSlide({ ...editedSlide, table_caption: e.target.value })}
                placeholder="Table Caption"
              />
              <textarea
                value={editedSlide.table}
                onChange={(e) => setEditedSlide({ ...editedSlide, table: e.target.value })}
              />
            </div>
          )}

          {editedSlide.recommendations && (
            <div className="edit-recommendations">
              {editedSlide.recommendations.map((rec, index) => (
                <textarea
                  key={index}
                  value={rec}
                  onChange={(e) => {
                    const newRecs = [...editedSlide.recommendations!];
                    newRecs[index] = e.target.value;
                    setEditedSlide({ ...editedSlide, recommendations: newRecs });
                  }}
                />
              ))}
            </div>
          )}

          <div className="edit-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="slide">
      <h2 className="slide-title">
        <ReactMarkdown>{slide.title}</ReactMarkdown>
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

      <button className="edit-button" onClick={handleEdit}>
        ✏️ Edit Slide
      </button>
    </div>
  );
}; 