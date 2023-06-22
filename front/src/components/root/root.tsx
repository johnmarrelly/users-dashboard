import { Outlet, useNavigate } from 'react-router-dom';
import './root.scss';
import { createContext, useEffect, useState } from 'react';
import { deleteCookie, getCookie } from 'auth/cookie.service';
import { Header } from 'components/header/header';
import { useNavigateDeleteCookie } from 'hooks/use-navigate-delete-cookie';

export const MyContext = createContext({
  data: {},
  setData: (data: any) => data,
});

export default function Root() {
  const [data, setData] = useState({ username: '' });
  const navigate = useNavigate();
  const { execute } = useNavigateDeleteCookie();

  useEffect(() => {
    const tokenExpirationTime = parseInt(
      process.env.TOKEN_EXPIRATION_TIME || ''
    );
    if (isNaN(tokenExpirationTime) || tokenExpirationTime <= 0) {
      return;
    }

    const timeoutId = setTimeout(() => {
      console.log('entered here');
      if (getCookie('token')) {
        execute('/auth?mode=signin', 'token');
      }
    }, tokenExpirationTime);

    return () => {
      deleteCookie('token');
      clearTimeout(timeoutId);
    };
  }, [navigate, execute]);

  return (
    <MyContext.Provider value={{ data, setData }}>
      <div className='root-container'>
        <div className='header'>
          <Header data={data}></Header>
        </div>
        <div className='main'>
          <Outlet />
        </div>
        <div className='footer'></div>
      </div>
    </MyContext.Provider>
  );
}
