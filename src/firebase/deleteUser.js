import { ref, remove } from 'firebase/database';
import { database } from '../components/App';
import toast from 'react-hot-toast';

export const deleteUser = userId => {
  const userRef = ref(database, `users/${userId}`);
  remove(userRef)
    .then(() => {
      toast.success('User deleted successfully');
    })
    .catch(error => {
      console.error('Failed to delete user:', error);
      toast.error('Failed to delete user:', error);
    });
};
