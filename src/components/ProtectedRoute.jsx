import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ component }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tokenExists, setTokenExists] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    async function seekToken() {
      let token = await localStorage.getItem('token');
      if (token) {
        console.log(`JWT Identified: ${token}`);
        setTokenExists(true);
        setIsLoading(false);
      } else {
        console.log(`[failure] no JWT identified`);
      }
    }
    seekToken();
  }, []);

  if (isLoading) {
    return (
      <h3>
        <i>Loading...</i>
      </h3>
    );
  }

  return tokenExists ? { ...component } : navigate('/');
};

export default ProtectedRoute;
