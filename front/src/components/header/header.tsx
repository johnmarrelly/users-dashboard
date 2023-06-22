import { deleteCookie, getCookie } from 'auth/cookie.service';
import './header.scss';
import { useApiHttp } from 'hooks/use-api-http';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
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
      navigate('/');
    }
    if (link === '/users-dashboard') {
      navigate('/users-dashboard');
    }
    if (link === '/auth?mode=signin') {
      navigate('auth?mode=signin');
    }

    if (link === '/auth?mode=signout') {
      navigate('auth?mode=signout');
      onLogOut();
    }
  };
  return (
    <div>
      <ul className='horizontal-list'>
        <li className='header-link'>
          <a href='/' onClick={(e) => handleOnclick(e, '/')}>
            Home
          </a>
        </li>
        <li className='header-link'>
          <a href='/' onClick={(e) => handleOnclick(e, '/users-dashboard')}>
            Users Dashboard
          </a>
        </li>
        <li className='header-link'>
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
