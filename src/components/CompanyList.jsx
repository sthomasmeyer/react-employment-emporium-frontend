import React from 'react';
import {
  Outlet,
  NavLink,
  useSearchParams,
  useLocation
} from 'react-router-dom';
import useCompanyList from '../hooks/useCompanyList';
import NavBar from './NavBar';
import '../styles/CompanyList.css';

const QueryNavLink = ({ to, ...props }) => {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
};

const CompanyList = () => {
  const companies = useCompanyList();

  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className='CompanyList'>
      <NavBar />
      <div className='CompanyList-banner'>
        <h1>A Comprehensive List of Companies</h1>
      </div>
      <div className='CompanyList-main'>
        <div id='co-list-left-col' className='CompanyList-element'>
          <nav>
            <div id='co-list-search-bar'>
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
              {companies ? (
                companies.companies
                  .filter((company) => {
                    let filter = searchParams.get('filter');
                    if (!filter) return true;
                    let name = company.name.toLowerCase();
                    return name.startsWith(filter.toLowerCase());
                  })
                  .map((company) => (
                    <li key={company.handle}>
                      <QueryNavLink to={`/companies/${company.handle}`}>
                        <strong>{company.name}</strong>
                      </QueryNavLink>
                    </li>
                  ))
              ) : (
                <li>Loading...</li>
              )}
            </ul>
          </nav>
        </div>
        <div id='co-list-right-col' className='CompanyList-element'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
