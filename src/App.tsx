// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './Components/Home';
import LoginPage from './Components/Login';
import SignupPage from './Components/Signup';
import DashboardPage from './Components/Dashboard';
import CreateLessonPage from './Components/CreateLessonPage'; // New import

function App() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>('true');

  const handleLogin = (email: string, password: string) => {
    // Implement your login logic here, for demo purpose just setting a user
    setLoggedInUser(email);
  };

  const handleSignup = (email: string, password: string) => {
    // Implement your signup logic here, for demo purpose just setting a user
    setLoggedInUser(email);
  };

  return (
    <Router>
      <div className="App">
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
              {loggedInUser && ( // Only show create lesson link if user is logged in
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
      </div>
    </Router>
  );
}

export default App;
