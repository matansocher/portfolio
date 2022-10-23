import './Auth.scss';
import axios from 'axios';
import { useState } from 'react';
import config from '../../config';
import assets from '../../assets';

export default function Auth({ setIsAuth }) {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isPasswordValid = async (userPassword) => {
    try {
      if (process.env.REACT_APP_RUN_ENV === 'dev') {
        return true;
      }

      const response = await axios.post(`${config.PORTFOLIO_BACKEND}/${config.PASSWORD_ENDPOINT}`, { password: userPassword });
      const { isPasswordCorrect } = response.data;
      return isPasswordCorrect || false;
    } catch(err) {
      return false
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    const isPasswordCorrect = await isPasswordValid(password);
    if (isPasswordCorrect) {
      setIsAuth(true);
    } else {
      setErrorMessage('Wrong password, please try again');
    }
  }

  return (
    <div className="auth">
      <img className="bg" alt="background" src={assets.homeMainBg} />
      <div className="auth-content">
        <h2>Hello there :)</h2>
        <p>Just one small thing....</p>
        <form onSubmit={handleSubmit}>
          <label>Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <input type="submit" value="Enter" />
        </form>
        <p className="error-message">{errorMessage}</p>
      </div>
    </div>
  );
}
