import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '../styles/NavBar.css';

let companyShorthand = '\u{33C7}';
let briefcase = '\u{1F4BC}';
let businessPerson = '\u{1F574}';

const NavBar = () => {
  return (
    <div className='NavBar'>
      <nav>
        <ul>
          <li>
            <div>{companyShorthand}</div>
            <NavLink className='NavBar-link' to='/companies'>
              Companies
            </NavLink>
          </li>
          <li>
            <div>{briefcase}</div>
            <NavLink className='NavBar-link' to='/jobs'>
              Jobs
            </NavLink>
          </li>
          <li id='profile'>
            <div>{businessPerson}</div>
            <NavLink className='NavBar-link' to='/user-profile'>
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
