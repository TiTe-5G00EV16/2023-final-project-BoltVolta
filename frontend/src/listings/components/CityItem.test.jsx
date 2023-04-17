import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import CityItem from "./CityItem";

const TEST_CITY_DATA = {
  "id": 1,
  "capital": "Maputo",
  "country": "Mozambique",
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

describe('The CityItem', () => { 
  test('Should show a city when given', ()=>{
    render(<CityItem 
      key={TEST_CITY_DATA.id}
      id={TEST_CITY_DATA.id}
      capital={TEST_CITY_DATA.capital}
      country={TEST_CITY_DATA.country}
      image={TEST_CITY_DATA.image}
    />, { wrapper });

    expect(screen.getByText('Maputo - Mozambique')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByAltText('Maputo')).toBeInTheDocument();

    expect(screen.getByRole('listitem')).toHaveClass('city-item');
    expect(screen.getByRole('img')).toHaveAttribute('src', TEST_CITY_DATA.image);

    screen.debug();
  });
});