import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SlideData } from '../context/ReportContext';
import { Slide } from './Slide';

interface EditableSlideProps {
  slide: SlideData;
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
                rows={2}
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
                rows={10}
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
    <div className="slide-container">
      <Slide {...slide}/>

      <button className="edit-button" onClick={handleEdit}>
        ✏️ Edit Slide
      </button>
    </div>
  );
}; 