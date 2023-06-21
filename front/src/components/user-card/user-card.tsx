import { useApiHttp } from 'hooks/use-api-http';
import './user-card.scss';

interface IUserDetails {
  userId?: string;
  username?: string;
  loginTime?: string;
  lastUpdate?: string;
  lastLogin?: string;
  userIp?: string;
}

export const UserCard = ({
  onData,
  userData,
  disableTable,
}: {
  disableTable?: boolean;
  userData?: any;
  onData?: (data: any) => void;
}) => {
  const { id: userId } = userData ?? {};
  const { error, isLoading, sendRequest } = useApiHttp();

  const onUserClick = () => {
    sendRequest({
      endPoint: `/users/${userId}`,
      method: 'GET',
      applyData: (res) => {
        onData?.(res.data);
      },
    });
  };

  return (
    <div className='card-wrapper' onClick={onUserClick}>
      <table className={`user-table${disableTable ? ' disabled' : ''}`}>
        <tr>
          {Object.keys(userData ?? {}).map((key: string, index) => (
            <th key={`${key}-col-${index}`}>{key}</th>
          ))}
        </tr>
        <tr>
          {Object.keys(userData ?? {}).map((key: string, index) => (
            <td key={`${(userData as any)[key]}-row-${index}`}>
              {`${(userData as any)[key]}`}
            </td>
          ))}
        </tr>
      </table>
    </div>
  );
};
