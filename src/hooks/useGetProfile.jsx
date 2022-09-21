import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_API_URL = 'http://localhost:8000/users';

const useGetProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  let username = localStorage.getItem('username');
  let token = localStorage.getItem('token');

  useEffect(() => {
    async function getUserData() {
      let user = await axios.get(`${BASE_API_URL}/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(user.data);
      setUserData(user.data);
      setIsLoading(false);
    }
    getUserData();
  }, [username, token]);

  if (isLoading) {
    return null;
  }

  return userData;
};

export default useGetProfile;
