import { onValue } from 'firebase/database';

export const getAllUsers = (usersRef, setUsers) => {
  onValue(
    usersRef,
    snapshot => {
      const usersObj = snapshot.val();
      const usersArray = Object.keys(usersObj)
        .map(userId => ({
          userId,
          ...usersObj[userId],
        }))
        .reverse();
      setUsers(usersArray);
    },
    error => {
      console.error('Failed to fetch users:', error);
    }
  );
};

// export const getAllUsers = usersRef => {
//   return new Promise((resolve, reject) => {
//     onValue(
//       usersRef,
//       snapshot => {
//         const usersObj = snapshot.val();
//         const usersArray = Object.keys(usersObj).map(userId => ({
//           userId,
//           ...usersObj[userId],
//         }));
//         resolve(usersArray);
//       },
//       error => {
//         console.error('Failed to fetch users:', error);
//         reject(error);
//       }
//     );
//   });
// };
