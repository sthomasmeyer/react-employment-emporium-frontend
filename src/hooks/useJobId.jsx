import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_API_URL = 'http://localhost:8000';

const useJobId = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState([]);

  let params = useParams();

  useEffect(() => {
    let jobId = params.id;
    console.log(`Selected Job ID: ${jobId}`);

    async function getJob(jobId) {
      let job = await axios.get(`${BASE_API_URL}/jobs/${jobId}`);
      console.log(job.data);
      setJob(job.data);
      setIsLoading(false);
    }
    getJob(jobId);
  }, [id, params.id]);

  if (isLoading) {
    return null;
  }

  return job;
};

export default useJobId;
