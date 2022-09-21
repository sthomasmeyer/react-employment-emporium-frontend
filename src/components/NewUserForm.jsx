import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/NewUserForm.css';

const NewUserForm = () => {
  const INITIAL_STATE = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isRegistered, setIsRegistered] = useState(false);

  let navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value
    }));
  };

  async function registerNewUser(data) {
    try {
      let newUserToken = await axios.post(
        `http://localhost:8000/auth/register`,
        data
      );
      if (newUserToken) {
        localStorage.setItem('registered', true);
        verifySuccessfulRegistration();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function verifySuccessfulRegistration() {
    try {
      let registrationSuccess = await localStorage.getItem('registered');
      if (registrationSuccess) {
        console.log(`The Registration was successful: ${registrationSuccess}`);
        setIsRegistered(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const captureInput = (evt) => {
    evt.preventDefault();
    registerNewUser({ ...formData });
    setFormData(INITIAL_STATE);
  };

  if (isRegistered) {
    navigate('/');
  }

  return (
    <div className='NewUserForm'>
      <h1>New Account</h1>
      <div className='NewUserForm-main'>
        <form onSubmit={captureInput}>
          <div>
            <label htmlFor='username'>Username: </label>
            <input
              type='text'
              id='username'
              name='username'
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='password'>Password: </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='firstName'>First Name: </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='lastName'>Last Name: </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='email'>Email Address: </label>
            <input
              type='text'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button>Create</button>
        </form>
        <div className='NewUserForm-back-to-login'>
          Already have an account?{' '}
          <button id='back-to-login-btn' onClick={() => navigate('/')}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewUserForm;
