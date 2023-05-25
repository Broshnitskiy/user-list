// import styles from './UserInfoList.module.scss';
import { UserInfoItem } from '../user-info-item/UserInfoItem';

export const UserInfoList = ({ filter, users }) => {
  const normalizedFilter = filter.toLowerCase();
  const findUsers = users.filter(
    user =>
      user.firstName.toLowerCase().includes(normalizedFilter) ||
      user.lastName.toLowerCase().includes(normalizedFilter)
  );

  return (
    <ul>
      {findUsers.length !== 0 ? (
        findUsers.map(userData => (
          <UserInfoItem key={userData.userId} user={userData} />
        ))
      ) : (
        <li>Nothing found</li>
      )}
    </ul>
  );
};
