import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Listings from './Listings';

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

describe('The Listings Page', () => {
  test('Should show a loading spinner while waiting', () =>{
    render(
      <Listings />, { wrapper }
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});