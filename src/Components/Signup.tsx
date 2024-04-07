import React, { useState,useEffect } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

interface SignupProps {
  handleSignup: (email: string, password: string) => void;
}
interface  DataTye{
  email:string
  password:string
}

const Signup: React.FC<SignupProps> = ({ handleSignup }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({}); // Object for error messages
  const [visited, setVisited] = useState(false); // State to track if the user has visited the login page before
  const navigate = useNavigate(); // Hook to perform navigation
  const [data,setData] = useState<DataTye>({email,password});
  
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = {};

    if (!email) {
      isValid = false;
      (newErrors as any).email = 'Please enter your email address';
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
 
    setData({email,password});
    console.log('email:', email);
    console.log('password:', password);
  };
  if (!visited) {
    // If not visited, set visited to true to indicate the user has visited
    setVisited(true);
  }
  // console.log('data',data)   
  async function fetchData() {
    console.log('useeffect') 
    // console.log(data)
  
  try{
    // https://localhost:7237/api/User/create
      const response = await axios.post('https://localhost:7237/api/User/create',{email,password});
      console.log('resonse',response)
      const data = await response.data;
      console.log('created  user',data)
       
    }
    catch(error){
      console.error('Error:', error);
    }
    
  }
 useEffect(()=>{
  if(data.email !=="" && data.password!==""){

    fetchData();
  }
  },[data])
  return (
    <div className="form-container">
      <h2>Sign Up</h2>
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
        {visited && (
        <div className="signup-container">
          <p>Already have an account?</p>
          <Link to="/login">login</Link>
        </div>
      )}
        <div className="form-group">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
