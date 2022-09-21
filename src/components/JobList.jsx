import React from 'react';
import { NavLink, useSearchParams, useLocation } from 'react-router-dom';
import useJobList from '../hooks/useJobList';
import NavBar from '../components/NavBar';
import '../styles/JobList.css';

const QueryNavLink = ({ to, ...props }) => {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
};

const JobList = () => {
  const jobs = useJobList();

  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className='JobList'>
      <NavBar />

      <div className='JobList-banner'>
        <h1>Jobby Job Jobs</h1>
      </div>

      <div className='JobList-main'>
        <nav>
          <div id='job-list-search-bar'>
            <strong>Search: </strong>
            <input
              value={searchParams.get('filter') || ''}
              onChange={(evt) => {
                let filter = evt.target.value;
                filter ? setSearchParams({ filter }) : setSearchParams({});
              }}
            />
          </div>
          <ul>
            {jobs ? (
              jobs.jobs
                .filter((job) => {
                  let filter = searchParams.get('filter');
                  if (!filter) return true;
                  let title = job.title.toLowerCase();
                  return title.startsWith(filter.toLowerCase());
                })
                .map((job) => (
                  <li key={job.id}>
                    <QueryNavLink
                      style={{ textDecoration: 'none' }}
                      to={`/jobs/${job.id}`}
                    >
                      <div className='JobList-job'>
                        <h3>{job.title}</h3>
                        <div className='JobList-job-details'>
                          <div id='job-list-left-col'>
                            <p>
                              <strong>{job.companyName}</strong>
                            </p>
                          </div>
                          <div id='job-list-right-col'>
                            <p id='job-list-salary'>
                              Salary:{' '}
                              {job.salary ? (
                                <strong>${job.salary}</strong>
                              ) : (
                                <strong>NA</strong>
                              )}
                            </p>
                            <p id='job-list-equity'>
                              Equity:{' '}
                              {job.equity ? (
                                <strong>
                                  {(job.equity * 100).toFixed(2)}%
                                </strong>
                              ) : (
                                <strong>0%</strong>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </QueryNavLink>
                  </li>
                ))
            ) : (
              <li>Loading...</li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default JobList;
