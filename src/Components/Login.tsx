import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from React Router DOM
import './login.css';

interface LoginProps {
  handleLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ handleLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [visited, setVisited] = useState(false); // State to track if the user has visited the login page before
  const navigate = useNavigate(); // Hook to perform navigation

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = {};

    if (!email) {
      isValid = false;
      (newErrors as any).email = 'Please enter valid email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValid = false;
      (newErrors as any).email = 'Invalid email format';
    }

    if (!password) {
      isValid = false;
      (newErrors as any).password = 'Please enter your password';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    handleLogin(email, password);
    console.log('email:', email);
    console.log('password:', password);
  };

  // Function to handle signup navigation
  const handleSignupNavigation = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  // Check if the user has visited the login page before
  if (!visited) {
    // If not visited, set visited to true to indicate the user has visited
    setVisited(true);
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      {/* Render the h1 element and the signup navigation link if it's the first visit */}
     
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        {visited && (
        <div className="signup-container">
          <p>Don't have an account?</p>
          <Link to="/signup">Signup</Link>
        </div>
      )}
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
