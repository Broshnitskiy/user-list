import { useEffect, useState } from 'react';
import { firebaseConfig } from '../firebase/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import { Container } from './container/Container';
import { ModalComponent } from './modal/Modal';
import { Filter } from './filter/Filter';
import { UserInfoList } from './user-info-list/UserInfoList';
import toast from 'react-hot-toast';
import { addUser } from '../firebase/addUser';
import { getAllUsers } from '../firebase/getAllUsers';
import Button from 'react-bootstrap/Button';
import styles from './App.module.scss';
import Pagination from 'react-bootstrap/Pagination';

// Під’єднання до firebase Database
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
const usersRef = ref(database, 'users');

// Основний компонент
export const App = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAllUsers(usersRef, setUsers);
  }, []);

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentPageUsers = users.slice(startIndex, endIndex);

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
    <section>
      <Container>
        <h1 className={styles.title}>User List</h1>
        <div className={styles.addBtn}>
          {users && <h2>Total users: {totalUsers} </h2>}
          <Button variant="primary" onClick={handleShow}>
            + ADD NEW USER +
          </Button>
        </div>
        {users?.length !== 0 ? (
          <Filter filter={filter} setFilter={setFilter} />
        ) : (
          <p>No saved contacts</p>
        )}
        {/* {users?.length !== 0 && <UserInfoList filter={filter} users={users} />} */}

        {users?.length !== 0 && (
          <div>
            <UserInfoList
              filter={filter}
              currentPageUsers={currentPageUsers}
              users={users}
            />

            {!filter && users.length > 6 && (
              <div className={styles.paginationWrapper}>
                <Pagination>
                  <Pagination.First
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />

                  {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}

                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </div>
        )}
        <ModalComponent
          show={show}
          handleClose={handleClose}
          onSubmit={onSubmit}
        />
      </Container>
    </section>
  );
};
