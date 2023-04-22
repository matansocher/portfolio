import { useState } from 'react';
import { Auth } from '.';

export default function ProtectedRoute({ children }) {
  const defaultIsAuthState = process.env.REACT_APP_RUN_ENV === 'dev';
  // const defaultIsAuthState = process.env.REACT_APP_RUN_ENV !== 'dev';
  const [isAuth, setIsAuth] = useState(defaultIsAuthState);

  if (!isAuth) {
    return <Auth setIsAuth={setIsAuth} />;
  }

  return children;
};