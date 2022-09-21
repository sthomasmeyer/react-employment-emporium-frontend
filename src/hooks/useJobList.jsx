import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_API_URL = 'http://localhost:8000';

const useJobList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    async function getAllJobs() {
      let jobs = await axios.get(`${BASE_API_URL}/jobs`);
      setJobList(jobs.data);
      setIsLoading(false);
    }
    getAllJobs();
  }, []);

  if (isLoading) {
    return null;
  }

  return jobList;
};

export default useJobList;
