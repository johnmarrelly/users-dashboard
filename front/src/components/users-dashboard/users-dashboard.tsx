import { Popup } from 'components/popup/popup';
import { UserCard } from 'components/user-card/user-card';
import { useApiHttp } from 'hooks/use-api-http';
import { useNavigateDeleteCookie } from 'hooks/use-navigate-delete-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UsersDashboard() {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { error, isLoading, sendRequest } = useApiHttp();
  const [usersData, setUsersData] = useState([]);
  const [popupUserData, setPopupUserData] = useState([]);
  const { execute } = useNavigateDeleteCookie();

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOnData = (data: any) => {
    setIsPopupOpen(!isPopupOpen);
    sendRequest({
      endPoint: `/user-logins/${data.id}`,
      method: 'GET',
      applyData: (res) => {
        setPopupUserData(res.data);
      },
    });
  };

  useEffect(() => {
    const endPoint = '/users/logged-in';
    const method = 'GET';

    const fetchData = () => {
      sendRequest({
        endPoint,
        method,
        applyData: (res) => {
          setUsersData(res.data);
        },
      });
    };

    fetchData();

    if (error?.response?.status === 401) {
      execute('/auth?mode=signin', 'token');
    }

    const interval = setInterval(
      fetchData,
      parseInt(process.env.REACT_APP_REFRESH_TIME || '')
    );

    return () => {
      clearInterval(interval);
    };
  }, [error, sendRequest]);

  return (
    <div className='wrapper'>
      {usersData?.map((userData: any) => {
        return (
          <UserCard
            key={userData.id}
            onData={handleOnData}
            userData={userData}
          />
        );
      })}
      {isPopupOpen && (
        <Popup onClose={handleClosePopup} header='User Details'>
          <UserCard disableTable={true} userData={popupUserData}></UserCard>
        </Popup>
      )}
    </div>
  );
}
