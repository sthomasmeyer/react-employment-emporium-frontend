import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_API_URL = 'http://localhost:8000';

const useCompanyHandle = (handle) => {
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState([]);

  let params = useParams();

  useEffect(() => {
    let companyHandle = params.handle;
    console.log(companyHandle);

    async function getCompany(companyHandle) {
      let company = await axios.get(
        `${BASE_API_URL}/companies/${companyHandle}`
      );
      console.log(company.data);
      setCompany(company.data);
      setIsLoading(false);
    }
    getCompany(companyHandle);
  }, [handle, params.handle]);

  if (isLoading) {
    return null;
  }

  return company;
};

export default useCompanyHandle;
