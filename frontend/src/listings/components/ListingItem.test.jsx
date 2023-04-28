import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ListingItem from "./ListingItem";

const TEST_LISTING_DATA = {
  "id": 1,
  "title": "Bike",
  "price": "200",
  "image": "https://www.flytap.com/-/media/Flytap/new-tap-pages/destinations/africa/mozambique/maputo/destinations-maputo-banner-mobile-1024x553.jpg"
};

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

describe('The ListingItem', () => {
  test('Should show a listing when given', ()=>{
    render(<ListingItem
      key={TEST_LISTING_DATA.id}
      id={TEST_LISTING_DATA.id}
      title={TEST_LISTING_DATA.title}
      price={TEST_LISTING_DATA.price}
      seller={TEST_LISTING_DATA.seller}
      phone={TEST_LISTING_DATA.phone}
      description={TEST_LISTING_DATA.description}
      image={TEST_LISTING_DATA.image}
    />, { wrapper });

    expect(screen.getByText('Bike')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByAltText('Bike')).toBeInTheDocument();

    expect(screen.getByRole('listitem')).toHaveClass('listing-item');
    expect(screen.getByRole('img')).toHaveAttribute('src', TEST_LISTING_DATA.image);

    screen.debug();
  });
});