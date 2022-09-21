import React, { useState } from 'react';
import useJobId from '../hooks/useJobId';
import NavBar from './NavBar';
import '../styles/Job.css';
import axios from 'axios';

const Job = ({ id }) => {
  const job = useJobId(id);

  let username = localStorage.getItem('username');
  let token = localStorage.getItem('token');

  const [hasApplied, setHasApplied] = useState(false);

  async function submitApplication(username, jobId, token) {
    let applicationStatus = await axios.post(
      `http://localhost:8000/users/${username}/jobs/${jobId}`,
      null,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(applicationStatus.data);
    applicationStatus.data ? setHasApplied(true) : setHasApplied(false);
    return applicationStatus.data;
  }

  if (!job) return <h3>Loading...</h3>;

  if (job) {
    return (
      <div className='Job'>
        <NavBar />
        <div className='Job-main'>
          <div className='Job-banner'>
            <h2>{job.job.title}</h2>
            {hasApplied ? (
              <p id='application-submitted-msg'>[applied]</p>
            ) : null}
          </div>

          <div className='Job-job-details'>
            <div id='job-left-col'>
              <p>
                <strong>{job.job.company.name}</strong>
              </p>
            </div>
            <div id='job-right-col'>
              {job.job.salary ? (
                <p id='job-salary'>
                  Salary: <strong>${job.job.salary}</strong>
                </p>
              ) : (
                <strong>NA</strong>
              )}
              {job.job.equity ? (
                <p id='job-equity'>
                  Equity: <strong>{(job.job.equity * 100).toFixed(2)}</strong>
                </p>
              ) : (
                <p>
                  Equity: <strong>0%</strong>
                </p>
              )}
            </div>
          </div>
          {hasApplied ? null : (
            <button
              id='submit-application-btn'
              onClick={() => submitApplication(username, job.job.id, token)}
            >
              Submit Application
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default Job;
