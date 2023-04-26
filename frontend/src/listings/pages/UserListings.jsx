import React from "react";
import { useQuery } from 'react-query'

import { getUserListings } from "../api/listings";
import ListingsList from '../components/ListingsList';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'

import "./Listings.css";

const Listings = () => {

  const { isLoading, error, data } = useQuery(
    "listingsData",
    getUserListings
  );

  if (isLoading) return (
    <div className="center">
      <LoadingSpinner />;
    </div>
  );

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <ListingsList items={data}/>
    </div>
  )
};

export default Listings;