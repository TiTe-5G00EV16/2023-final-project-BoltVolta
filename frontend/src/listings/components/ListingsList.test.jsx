import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ListingsList from './ListingsList';


const TEST_LISTINGS_DATA = [
  {
    "id": 1,
    "title": "Bike",
    "price": 80,
    "seller":"Admin",
    "categoryid":7,
    "regionid": 3,
    "contact": "0451223682",
    "description":"test",
    "image": "test.jpg"
  },
  {
    "id": 2,
    "title": "Nike Shoes",
    "price": 30,
    "seller":"Admin",
    "categoryid":10,
    "regionid":6,
    "contact":"0452323881",
    "description":"test",
    "image": "test.jpg"
  },
  {
    "id": 3,
    "title": "Microphone",
    "price": "600",
    "seller":"Admin",
    "categoryid":4,
    "regionid":4,
    "contact":"0451235698",
    "description":"test",
    "image": "test.jpg"
}
];

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

describe('The CitiesList', () => {
  test('should show no listings when no listing is available', () => {
    render(<ListingsList items={[]} />)
    expect(screen.getByText('No Listings found.')).toBeInTheDocument();
  });

  test('should show a list of cities', () => {
    render(<ListingsList items={TEST_LISTINGS_DATA} />,{ wrapper });
    expect(screen.queryByText('No Listings found.')).toBeNull();
    expect(screen.getByText('Bike')).toBeInTheDocument();
    expect(screen.getByText('Nike Shoes')).toBeInTheDocument();
    expect(screen.getByText('Microphone')).toBeInTheDocument();
  });
});