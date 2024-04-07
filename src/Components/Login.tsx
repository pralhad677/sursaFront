import React, { useState , createContext, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataContext } from '../App';

interface LoginProps {
  handleLogin: (email: string, password: string) => void;
}

interface DataTye {
  email: string;
  password: string;
}
 
const Login: React.FC<LoginProps> = ({ handleLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [visited, setVisited] = useState(false);
  const [data, setData] = useState<DataTye>({ email: '', password: '' });
  const [authMessage, setAuthMessage] = useState('');

  const navigate = useNavigate();
  const dataContext = useContext(DataContext);
 console.log('dataContext',dataContext)
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = {};

    if (!email) {
      isValid = false;
      (newErrors as any).email = 'Please enter a valid email address';
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
    setData({ email, password });
  };

  const handleSignupNavigation = () => {
    navigate('/signup');
  };

  async function fetchData(email: string, password: string) {
    try {
      const response = await axios.post('https://localhost:7237/api/User/login', { email, password });
      const data: string = await response.data;
      
      if (data.startsWith("unA")) {
        setAuthMessage('Unauthorized');
      } else {
        console.log('token',data)
        if(sessionStorage.getItem('token')){
          sessionStorage.removeItem('token')
        }
        sessionStorage.setItem('token', data); 
        dataContext?.setData(true)
        setAuthMessage('Authenticated');
      }
    } catch (error) {
      console.log('error', error);
      setAuthMessage('Error occurred during authentication');
    }
  }

  React.useEffect(() => {
    if (data.email !== "" && data.password !== "") {
      fetchData(data.email, data.password);
    }
  }, [data]);
if(authMessage === 'Authenticated'){
  setTimeout(() => {
    
    navigate('/create-lesson');
  }, 4000);
}
console.log('authMessage',authMessage)
  return (
    <div className="form-container">
      <h2>Login</h2>
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
        {true && (
          <div className="signup-container">
            <p>Don't have an account?</p>
            <Link to="/signup">Signup</Link>
          </div>
        )}
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
      <div style={{ marginTop: '10px',marginLeft:"100px", color: authMessage === 'Unauthorized' ? 'red' : 'green' }}>{authMessage}</div>
    </div>
  );
};

export default Login;
