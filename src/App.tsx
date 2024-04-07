// App.tsx
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './Components/Home';
import LoginPage from './Components/Login';
import SignupPage from './Components/Signup';
import DashboardPage from './Components/Dashboard';
import CreateLessonPage from './Components/CreateLessonPage'; // New import
import './App.css'
interface DataContextProps {
  data: boolean;
  setData: React.Dispatch<React.SetStateAction<boolean>>;
}
 
export   const DataContext = createContext<DataContextProps | undefined>(undefined);
function App() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>('true');
  const [parentData, setParentData] = useState<boolean>(false);
 

  const handleLogin = (email: string, password: string) => {
   
    setLoggedInUser(email);
  };

  const handleSignup = (email: string, password: string) => {
 
    setLoggedInUser(email);
  };

  return (
    <Router>
      <div className="App">
      <DataContext.Provider value={{ data: parentData, setData: setParentData }}>
        <header>
          <nav className="navbar">
            <ul>
              {/* <li>
                <NavLink to="/" className="nav-link" end>Home</NavLink>
              </li> */}
              <li>
                <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
              </li>
              <li>
                <NavLink to="/login" className="nav-link">Login</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
              </li>
              {parentData && ( // Only show create lesson link if user is logged in
                <li>
                  <NavLink to="/create-lesson" className="nav-link">Create Lesson</NavLink>
                </li>
              )}
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={<SignupPage handleSignup={handleSignup} />}
          />
          <Route
            path="/login"
            element={<LoginPage handleLogin={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={loggedInUser ? <DashboardPage user={loggedInUser} /> : null}
          />
          <Route
            path="/create-lesson"
            element={<CreateLessonPage />} // Render create lesson component
          />
      
        </Routes>
        </DataContext.Provider>
      </div>

    </Router>
  );
}

export default App;
