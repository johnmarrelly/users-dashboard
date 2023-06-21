import { deleteCookie, getCookie } from 'auth/cookie.service';
import './header.scss';
import { useApiHttp } from 'hooks/use-api-http';

export const Header = () => {
  const { sendRequest, error, isLoading } = useApiHttp();
  const hasToken = getCookie('token');
  console.log({ hasToken });
  const onLogOut = () => {
    sendRequest({
      endPoint: '/auth/signout',
      method: 'POST',
      applyData: (res: any) => {},
    });
    deleteCookie('token');
  };
  return (
    <div>
      <ul className='horizontal-list'>
        <li className='header-link'>
          <a href='/'>Home</a>
        </li>
        <li className='header-link'>
          <a href='/users-dashboard'>Users Dashboard</a>
        </li>
        <li className='header-link'>
          <a
            href={`/${!hasToken ? 'auth?mode=signin' : ''}`}
            onClick={onLogOut}
          >
            {!hasToken ? 'sign in' : 'Log Out'}
          </a>
        </li>
      </ul>
    </div>
  );
};
