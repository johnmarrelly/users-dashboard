import { deleteCookie, getCookie } from 'auth/cookie.service';
import './header.scss';
import { useApiHttp } from 'hooks/use-api-http';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Header = ({ data }: { data: any }) => {
  const [activeLink, setActiveLink] = useState('');
  const navigate = useNavigate();
  const { sendRequest } = useApiHttp();
  const hasToken = getCookie('token');
  const onLogOut = () => {
    sendRequest({
      endPoint: '/auth/signout',
      method: 'POST',
      applyData: (res: any) => {},
    });
    deleteCookie('token');
  };

  const handleOnclick = (e: any, link: string) => {
    e.preventDefault();
    if (link === '/') {
      setActiveLink('/');
      navigate('/');
    }
    if (link === '/users-dashboard') {
      setActiveLink('/users-dashboard');
      navigate('/users-dashboard');
    }
    if (link === '/auth?mode=signin') {
      setActiveLink('/auth?mode=signin');
      navigate('auth?mode=signin');
    }

    if (link === '/auth?mode=signout') {
      setActiveLink('/auth?mode=signout');
      navigate('auth?mode=signin');
      onLogOut();
    }
  };
  return (
    <div>
      <ul className='horizontal-list'>
        <li className='header-user-name'>
          {data?.username && hasToken ? `Welcome ${data?.username}` : null}
        </li>
        <li className={`header-link ${activeLink === '/' ? 'selected' : ''}`}>
          <a href='/' onClick={(e) => handleOnclick(e, '/')}>
            Home
          </a>
        </li>
        <li
          className={`header-link ${
            activeLink === '/users-dashboard' ? 'selected' : ''
          }`}
        >
          <a href='/' onClick={(e) => handleOnclick(e, '/users-dashboard')}>
            Users Dashboard
          </a>
        </li>
        <li
          className={`header-link ${
            ['/auth?mode=signin', '/auth?mode=signout'].includes(activeLink)
              ? 'selected'
              : ''
          }`}
        >
          <a
            href='/'
            onClick={(e) =>
              handleOnclick(
                e,
                `/${!hasToken ? 'auth?mode=signin' : 'auth?mode=signout'}`
              )
            }
          >
            {!hasToken ? 'sign in' : 'Log Out'}
          </a>
        </li>
      </ul>
    </div>
  );
};
