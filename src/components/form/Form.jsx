import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const FormComponent = ({ onSubmitUser, user }) => {
  const [firstName, setFirstName] = useState(
    user?.firstName ? user.firstName : ''
  );
  const [lastName, setLastName] = useState(user?.lastName ? user.lastName : '');
  const [number, setNumber] = useState(user?.number ? user.number : '');
  const [email, setEmail] = useState(user?.email ? user.email : '');
  const [date, setDate] = useState(user?.date ? user.date : '');

  const resetInput = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setNumber('');
    setDate('');
  };

  const handleChange = e => {
    switch (e.target.name) {
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value.toLocaleLowerCase());
        break;
      case 'date':
        setDate(e.target.value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      number,
      email,
      date,
    };

    onSubmitUser(newUser, resetInput);
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label> First name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          placeholder="Your first name"
          pattern="^[A-Za-zА-Яа-я' -]+$"
          title="Name may contain only letters, apostrophe. For example Adrian, Jacob, Mercer, Charles"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          placeholder="Your last name"
          pattern="^[A-Za-zА-Яа-я' -]+$"
          title="Name may contain only letters, apostrophe. For example Adrian, Jacob, Mercer, Charles"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formNumber">
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          type="number"
          name="number"
          value={number}
          onChange={handleChange}
          placeholder="+380999999999"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be +380(XX)XXX-XX-XX)"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Your email here"
          onChange={handleChange}
          value={email}
          pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
          title="Please enter a valid email address"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Your birthday</Form.Label>
        <Form.Control
          type="date"
          name="date"
          onChange={handleChange}
          value={date}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
