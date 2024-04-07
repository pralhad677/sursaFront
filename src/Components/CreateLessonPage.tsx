// CreateLessonPage.tsx
import React, { useContext, useState } from 'react';
import './CreateLessonPage.css';
import { DataContext } from '../App';
import { postDataWithToken } from './authLessoon';

const CreateLessonPage = () => {
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonContent, setLessonContent] = useState('');
    const [data,setData] = useState({lessonTitle,lessonContent})
  const handleCreateLesson = (event: React.FormEvent<HTMLFormElement>) => {
    // Implement your logic to send the lesson data to the backend
    event.preventDefault();
    console.log('Creating lesson:', lessonTitle, lessonContent);
    setData({lessonTitle,lessonContent})
    // setLessonContent
    // Reset form fields after creating lesson
    // setLessonTitle('');
    // setLessonContent('');
  };
  React.useEffect(()=>{
    if(lessonContent !=="" && lessonTitle!=="")
    postDataWithToken(data).then(response => {
          console.log('response',response)
          // Handle success
        })
        .catch(error => {
          console.log('error',error)
        });;
  },[data])

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
