import { Outlet, useNavigate } from 'react-router-dom';
import './root.scss';
import { useEffect } from 'react';
import { deleteCookie, getCookie } from 'auth/cookie.service';
import { Header } from 'components/header/header';

export default function Root() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      if (getCookie('token')) {
        deleteCookie('token');
        navigate('/auth?mode=signin');
      }
    }, parseInt(process.env.TOKEN_EXPIRATION_TIME || ''));
  }, []);

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
