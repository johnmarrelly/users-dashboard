import { Outlet, useNavigate } from 'react-router-dom';
import './root.scss';
import { useEffect } from 'react';
import { deleteCookie, getCookie } from 'auth/cookie.service';
import { Header } from 'components/header/header';

export default function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenExpirationTime = parseInt(
      process.env.TOKEN_EXPIRATION_TIME || ''
    );
    if (isNaN(tokenExpirationTime) || tokenExpirationTime <= 0) {
      return;
    }

    const timeoutId = setTimeout(() => {
      if (getCookie('token')) {
        console.log('inside settimeout');
        deleteCookie('token');
        navigate('/auth?mode=signin');
      }
    }, tokenExpirationTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [process.env.TOKEN_EXPIRATION_TIME, navigate]);

  return (
    <div className='root-container'>
      <div className='header'>
        <Header></Header>
      </div>
      <div className='main'>
        <Outlet />
      </div>
      <div className='footer'></div>
    </div>
  );
}
