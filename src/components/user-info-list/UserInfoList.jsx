// import styles from './UserInfoList.module.scss';
import { UserInfoItem } from '../user-info-item/UserInfoItem';

export const UserInfoList = (filter, users) => {
  const normalizedFilter = filter.toLowerCase();
  const findUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(normalizedFilter)
  );

  return (
    <ul>
      {findUsers.map(userData => (
        <UserInfoItem key={userData.userId} user={userData} />
      ))}
    </ul>
  );
};
