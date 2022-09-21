import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UserProfile.css';

const UpdateUserForm = ({ updateProfile }) => {
  // Create an 'INITIAL_STATE' variable w/ key-value pairs aligned to the...
  // <input> elements in the <form>.
  const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: ''
  };

  // Declare a new state variable 'formData' w/ the [useState()] Hook.
  const [formData, setFormData] = useState(INITIAL_STATE);

  // Update the local state w/ the current state of the input elements.
  const handleChange = (evt) => {
    // Each <input> element has a [name] property (+) a [value] property aligned...
    // to either: 1) the default initial state, or 2) the info that the user has...
    // chosen to populate the target field with.

    // JavaScript's *object destructuring* syntax makes it possible to unpack specific...
    // properties from objects into unique variables. In this case we are capturing...
    // the [name] (+) [value] properties from the [evt.target] object, or, more...
    // specifically the <input> element that we call this function on.
    const { name, value } = evt.target;

    // Execute the [setFormData()] function to update the current state. Note, the...
    // arbitrarily named 'data' object contains key-value pairs aligned to the...
    // initial state object passed to the [useState()] Hook.
    setFormData((data) => ({
      ...data,
      [name]: value
    }));
  };

  let username = localStorage.getItem('username');
  let token = localStorage.getItem('token');

  async function updateUser(data) {
    try {
      let updateUserInfo = await axios.patch(
        `http://localhost:8000/users/${username}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateUserInfo
        ? console.log(`${username}'s profile has been updated.`)
        : console.log(`[failure] no update has been made`);
    } catch (err) {
      console.log(err);
    }
  }

  // This function is designed to be called on form submission. It updates the...
  // database, and sends all of the information contained in the form's current...
  // state to the parent component.
  const captureInput = (evt) => {
    evt.preventDefault();
    updateUser({ ...formData });
    updateProfile({ ...formData });
    // Reset the form to its initial state.
    setFormData(INITIAL_STATE);
  };

  return (
    <div className='UpdateUserForm'>
      <h3>Update Account Info</h3>
      <form onSubmit={captureInput}>
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
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
