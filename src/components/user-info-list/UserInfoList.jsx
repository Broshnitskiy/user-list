// import styles from './UserInfoList.module.scss';
import { UserInfoItem } from '../user-info-item/UserInfoItem';

export const UserInfoList = ({ filter, currentPageUsers, users }) => {
  const normalizedFilter = filter.toLowerCase();
  const findUsers = users.filter(
    user =>
      user.firstName.toLowerCase().includes(normalizedFilter) ||
      user.lastName.toLowerCase().includes(normalizedFilter)
  );

  return (
    <>
      {filter ? (
        <ul>
          {findUsers.length !== 0 ? (
            findUsers.map(userData => (
              <UserInfoItem key={userData.userId} user={userData} />
            ))
          ) : (
            <li>Nothing found</li>
          )}
        </ul>
      ) : (
        <ul>
          {currentPageUsers.length !== 0 &&
            currentPageUsers.map(userData => (
              <UserInfoItem key={userData.userId} user={userData} />
            ))}
        </ul>
      )}
    </>
  );
};
