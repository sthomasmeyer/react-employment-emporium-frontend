import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginForm.css';

const LoginForm = () => {
  const INITIAL_STATE = {
    username: '',
    password: ''
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value
    }));
  };

  async function loginUser(data) {
    try {
      let userToken = await axios.post(
        `http://localhost:8000/auth/token`,
        data
      );
      if (userToken) {
        console.log(`[success] username: ${data.username} is logged in`);
        localStorage.setItem('token', userToken.data.token);
        localStorage.setItem('username', data.username);
        verifyAuthentication();
        return userToken.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function verifyAuthentication() {
    try {
      let token = await localStorage.getItem('token');
      if (token) {
        console.log(`[success] JWT: ${token}`);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const captureInput = (evt) => {
    evt.preventDefault();
    loginUser({ ...formData });
    setFormData(INITIAL_STATE);
  };

  useEffect(() => {
    verifyAuthentication();
  }, []);

  if (isAuthenticated) {
    navigate('/companies');
  }

  return (
    <div className='LoginForm'>
      <div className='LoginForm-main'>
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
          <button>Login</button>
        </form>
      </div>
      <div className='LoginForm-create-account'>
        New to The Employment Emporium?{' '}
        <button
          id='create-account-btn'
          onClick={() => navigate('/create-account')}
        >
          Create an Account
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
