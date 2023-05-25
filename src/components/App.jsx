import { useEffect, useState } from 'react';
import { firebaseConfig } from '../firebase/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import { Container } from './container/Container';
import { UserInfoItem } from './user-info-item/UserInfoItem';
import { ModalComponent } from './modal/Modal';
import toast from 'react-hot-toast';
import { addUser } from '../firebase/addUser';
import { getAllUsers } from '../firebase/getAllUsers';
import Button from 'react-bootstrap/Button';

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
const usersRef = ref(database, 'users');

export const App = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAllUsers(usersRef, setUsers);
  }, []);

  const onSubmit = (newUser, resetInput) => {
    const isExistName = users.find(
      user =>
        user.lastName.toLocaleLowerCase() ===
        newUser.lastName.toLocaleLowerCase()
    );

    const isExistEmail = users.find(user => user.email === newUser.email);
    const isExistNumber = users.find(user => user.number === newUser.number);

    if (isExistName) {
      toast.error(`User last name is already in users`);
      return;
    }
    if (isExistEmail) {
      toast.error(`User email is already in users`);
      return;
    }
    if (isExistNumber) {
      toast.error(`User number is already exist`);
      return;
    }
    addUser(newUser, usersRef);
    resetInput();
    handleClose();
  };

  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>User List</h1>
      {users && <h2>Total: {users.length} users</h2>}
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ marginBottom: '12px' }}
      >
        + ADD NEW USER +
      </Button>
      <ModalComponent
        show={show}
        handleClose={handleClose}
        onSubmit={onSubmit}
      />
      {users && (
        <ul>
          {users.map(user => (
            <UserInfoItem key={user.userId} user={user} />
          ))}
        </ul>
      )}
    </Container>
  );
};
