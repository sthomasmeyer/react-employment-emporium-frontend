import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_API_URL = 'http://localhost:8000';

const useCompanyList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    async function getAllCompanies() {
      let companies = await axios.get(`${BASE_API_URL}/companies`);
      setCompanyList(companies.data);
      setIsLoading(false);
    }
    getAllCompanies();
  }, []);

  if (isLoading) {
    return null;
  }

  return companyList;
};

export default useCompanyList;
