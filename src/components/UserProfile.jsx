import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetProfile from '../hooks/useGetProfile';
import UpdateUserForm from './UpdateUserForm';
import NavBar from './NavBar';
import '../styles/UserProfile.css';

const UserProfile = () => {
  // Call the custom [useGetProfile] Hook to capture the active-user's account...
  // information from the database. Note, this is *only* called one time -->
  // when this [UserProfile] component is rendered.
  const profile = useGetProfile();

  let navigate = useNavigate();

  const [userInfo, setUserInfo] = useState([]);

  // This [useEffect] Hook only runs when the 'profile' variable is declared.

  // Technically it is set to re-run when a change in the state of that variable...
  // is detected, but its state is never altered after the initial declaration.
  useEffect(() => {
    // This [if]-statement is vital bc it effectively waits for the [useGetProfile]...
    // Hook to be executed. Without it, the 'profile' variable would be undefined.
    if (profile) {
      setUserInfo({
        firstName: profile.user.firstName,
        lastName: profile.user.lastName,
        email: profile.user.email
      });
    }
  }, [profile]);

  // This function is meant to be passed to the [UpdateUserForm] child of this...
  // [UserProfile] parent component.
  const updateProfile = (updatedInfo) => {
    setUserInfo({
      firstName: updatedInfo.firstName,
      lastName: updatedInfo.lastName,
      email: updatedInfo.email
    });
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className='UserProfile'>
      <NavBar />
      <div className='UserProfile-banner'>
        <h1>Account Info</h1>
      </div>
      <div className='UserProfile-main'>
        <div className='UserProfile-user-info'>
          {userInfo ? (
            <ul>
              <li>
                First Name: <strong>{userInfo.firstName}</strong>
              </li>
              <li>
                Last Name: <strong>{userInfo.lastName}</strong>
              </li>
              <li>
                Email Address: <strong>{userInfo.email}</strong>
              </li>
            </ul>
          ) : (
            <h3>Loading...</h3>
          )}
          <button id='logout-btn' type='submit' onClick={logout}>
            Logout
          </button>
        </div>
        <div className='UserProfile-form'>
          <UpdateUserForm updateProfile={updateProfile} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
