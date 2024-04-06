// CreateLessonPage.tsx
import React, { useState } from 'react';
import './CreateLessonPage.css';

const CreateLessonPage = () => {
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonContent, setLessonContent] = useState('');

  const handleCreateLesson = (event: React.FormEvent<HTMLFormElement>) => {
    // Implement your logic to send the lesson data to the backend
    event.preventDefault();
    console.log('Creating lesson:', lessonTitle, lessonContent);
    // Reset form fields after creating lesson
    // setLessonTitle('');
    // setLessonContent('');
  };

  return (
    <div className="container">
      <h2>Create Lesson</h2>
      <form onSubmit={handleCreateLesson}>
        <div className="form-group">
          <label htmlFor="lessonTitle">Lesson Title:</label>
          <input
            type="text"
            id="lessonTitle"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lessonContent">Lesson Content:</label>
          <textarea
            id="lessonContent"
            value={lessonContent}
            onChange={(e) => setLessonContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Lesson</button>
      </form>
    </div>
  );
};

export default CreateLessonPage;
