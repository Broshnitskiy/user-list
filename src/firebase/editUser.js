import { ref, update } from 'firebase/database';
import { database } from '../components/App';
import toast from 'react-hot-toast';

export const editUser = (userId, updatedUser) => {
  const userRef = ref(database, `users/${userId}`);
  update(userRef, updatedUser)
    .then(() => {
      toast.success('User updated successfully');
    })
    .catch(error => {
      console.error('Failed to update user:', error);
      toast.error('Failed to update user:', error);
    });
};
