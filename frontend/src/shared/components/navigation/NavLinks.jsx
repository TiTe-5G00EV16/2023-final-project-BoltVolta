import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../context/auth-context';

import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return <ul className="nav-links">
    <li>
        <NavLink to="/" exact>All Listings</NavLink>
    </li>
    {auth.isLoggedIn && (
      <li>
        <NavLink to="/user-listings/" exact>My Listings</NavLink>
      </li>
    )}
    {auth.isLoggedIn && (
      <li>
        <NavLink to="/listings/new">New Listing</NavLink>
      </li>
    )}
    {auth.isLoggedIn && (
      <li>
        <NavLink to="/users" exact>All Users</NavLink>
      </li>
    )}
    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/auth">Login</NavLink>
      </li>
    )}
    {auth.isLoggedIn && (
      <li>
        <button onClick={auth.logout}>Logout</button>
      </li>
    )}
  </ul>
};

export default NavLinks;
