import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import NavLinks from './NavLinks';

describe('The Navigation Links', () => {
  test('Should only show All Listings and Login when not authorized', () =>{
    render(
        <BrowserRouter>
          <NavLinks/>;
        </BrowserRouter>
    );

    expect(screen.getByRole('list')).toHaveClass('nav-links');
    expect(screen.getByText('All Listings')).toBeInTheDocument();
    expect(screen.getByText('All Listings')).toHaveAttribute('href', '/');

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Login')).toHaveAttribute('href', '/auth');

    expect(screen.queryByText('All Users')).toBeNull();
  });

  test('Should show correct buttons when authorized', () =>{
    render(
      <AuthContext.Provider value={{
        isLoggedIn: true,
        token: '1234567890-0987654321',
        userId: 'userId1',
        login: () => {},
        logout: () => {}
      }}
      >
        <BrowserRouter>
          <NavLinks/>;
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByRole('list')).toHaveClass('nav-links');
    expect(screen.getByText('All Listings')).toBeInTheDocument();
    expect(screen.getByText('All Listings')).toHaveAttribute('href', '/');

    expect(screen.queryByText('Login')).toBeNull();

    expect(screen.getByText('All Users')).toBeInTheDocument();
    expect(screen.getByText('All Users')).toHaveAttribute('href', '/users');

    expect(screen.getByText('New Listing')).toBeInTheDocument();
    expect(screen.getByText('New Listing')).toHaveAttribute('href', '/listings/new');

    expect(screen.getByRole('button', { name: 'Logout'})).toBeInTheDocument();
  });
});