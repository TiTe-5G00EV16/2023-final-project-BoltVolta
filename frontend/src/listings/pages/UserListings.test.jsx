import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import UserListings from './UserListings';

const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          retry: false,
      },
  },
})

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
      {children}
  </QueryClientProvider>
);

describe('The User Listings Page', () => {
  test('Should show a loading spinner while waiting', () =>{
    render(
      <UserListings />, { wrapper }
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});