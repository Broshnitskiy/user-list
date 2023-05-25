import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import styles from './UserInfoItem.module.scss';
import { ModalComponent } from '../modal/Modal';
import { deleteUser } from '../../firebase/deleteUser';
import { editUser } from '../../firebase/editUser';

export const UserInfoItem = ({ user }) => {
  const { date, email, number, userId, firstName, lastName } = user;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    deleteUser(userId);
  };

  const onSubmit = (newUser, resetInput) => {
    editUser(userId, newUser);
    resetInput();
    handleClose();
  };

  return (
    <li className={styles.userInfoItem}>
      <ListGroup horizontal as="ul">
        <ListGroup.Item variant="info" as="li">
          Name:
          <p>
            {firstName} {lastName}
          </p>
        </ListGroup.Item>
        <ListGroup.Item variant="info" as="li">
          Phone number: <p>{number}</p>
        </ListGroup.Item>
        <ListGroup.Item variant="info" as="li">
          Email:
          <p>{email}</p>
        </ListGroup.Item>
        <ListGroup.Item variant="info" as="li">
          Birthday:<p>{date}</p>
        </ListGroup.Item>
        <Button variant="warning" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="info" onClick={handleShow}>
          Edit
        </Button>
      </ListGroup>
      <ModalComponent
        show={show}
        handleClose={handleClose}
        onSubmit={onSubmit}
        user={user}
      />
    </li>
  );
};
