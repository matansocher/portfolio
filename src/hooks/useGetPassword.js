import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function useGetPassword() {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const isPasswordValid = (userPassword) => {
      axios.post(`${config.PORTFOLIO_BACKEND}/${config.PASSWORD_ENDPOINT}`, { password: userPassword })
        .then((res) => {
          const { isPasswordCorrect } = res.data;
          if (isPasswordCorrect) {
            setPassed(true);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
    //
    if (process.env.REACT_APP_RUN_ENV === 'dev') {
      setPassed(true);
      return;
    }
    // 
    if (passed) {
      return;
    }
    const userPassword = prompt('Please enter a password');
    // 
    isPasswordValid(userPassword);
  }, []);

  return { isAuthenticated: passed };
}
