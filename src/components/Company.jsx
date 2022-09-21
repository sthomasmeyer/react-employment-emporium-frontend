import React from 'react';
import { Link } from 'react-router-dom';
import useCompanyHandle from '../hooks/useCompanyHandle';
import '../styles/Company.css';

const Company = ({ handle }) => {
  const company = useCompanyHandle(handle);

  return (
    <div className='Company'>
      {company ? <h3>{company.company.name}</h3> : <h3>Loading...</h3>}
      {company ? <p>{company.company.description}</p> : null}
      <ul>
        {company
          ? company.company.jobs.map((job) => (
              <li key={job.id}>
                <Link to={`/jobs/${job.id}`}>
                  <strong>{job.title}</strong>
                </Link>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Company;
