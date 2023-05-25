import Form from 'react-bootstrap/Form';
import styles from './Filter.module.scss';

export const Filter = ({ filter, setFilter }) => {
  const handleChange = e => {
    setFilter(e.target.value);
  };
  return (
    <div className={styles.formWrapper}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Find user by name</Form.Label>
        <Form.Control
          type="text"
          name="filter"
          value={filter}
          onChange={handleChange}
          placeholder="user name"
        />
      </Form.Group>
    </div>
  );
};
