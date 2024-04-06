import React, { useState } from 'react';
import './login.css';

interface LoginProps {
  handleLogin: (email: string, password: string) => void;
}
// interface ErrorState {
//     email?: string; // Optional email error message
//     password?: string; // Optional password error message
//   }
  

const Login: React.FC<LoginProps> = ({ handleLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({}); // Object for error messages
//   const [errors, setErrors] = useState<ErrorState>({});
//   const [errors, setErrors] = useState<Record<string, string>>({});


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
      return; // Prevent submission if there are errors
    }

    // Call the login function passed from parent component
    handleLogin(email, password);
    console.log('email:', email);
    console.log('password:', password);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {/* {Object.keys(errors).length > 0 && (
        <ul className="error-messages">
          {Object.entries(errors).map(([field, message]) => (
            <li key={field}>{message}</li>
          ))}
        </ul>
      )} */}
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
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
