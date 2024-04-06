import React, { useRef } from 'react';
import './CreateLessonPage.css';

interface LessonData {
  lessonTitle: string;
  lessonContent: string;
}

const CreateLessonPage = () => {
  const lessonTitleRef = useRef<HTMLInputElement>(null);
  const lessonContentRef = useRef<HTMLTextAreaElement>(null);
  const errorsRef = useRef<Record<string, string>>({}); // Ref to store validation errors

  const validateForm = (): boolean => {
    errorsRef.current = {}; // Clear existing errors before validation

    let isValid = true;

    if (!lessonTitleRef.current?.value) {
      isValid = false;
      errorsRef.current.lessonTitle = 'Please enter a lesson title.';
    }

    if (!lessonContentRef.current?.value) {
      isValid = false;
      errorsRef.current.lessonContent = 'Please enter lesson content.';
    }

    return isValid;
  };

  const handleCreateLesson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log('Creating lesson:', lessonTitleRef.current!.value, lessonContentRef.current!.value);
    // Implement your logic to send the lesson data to the backend
    // Reset form fields after creating lesson (optional)
    lessonTitleRef.current!.value = '';
    lessonContentRef.current!.value = '';
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
            ref={lessonTitleRef}
            required
          />
          {errorsRef.current.lessonTitle && (
            <p className="error-message">{errorsRef.current.lessonTitle}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lessonContent">Lesson Content:</label>
          <textarea id="lessonContent" ref={lessonContentRef} required />
          {errorsRef.current.lessonContent && (
            <p className="error-message">{errorsRef.current.lessonContent}</p>
          )}
        </div>
        <button type="submit">Create Lesson</button>
      </form>
    </div>
  );
};

export default CreateLessonPage;
