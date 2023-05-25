import { push } from 'firebase/database';
import toast from 'react-hot-toast';

export const addUser = (newUser, usersRef) => {
  push(usersRef, newUser)
    .then(() => {
      toast.success('User added successfully');
    })
    .catch(error => {
      console.error('Failed to add user:', error);
      toast.error('Failed to add user:', error);
    });
};
