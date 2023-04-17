import React from "react";
import { useQuery } from 'react-query'

import ListingsList from '../components/ListingsList';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'

import Dropdown from "../../shared/components/dropdown/Dropdown";
import { getListings } from "../api/listings";

const Listings = () => {

  const options = [
    {value: "Electronics", label: "Electronics"},
    {value: "Kitchen Appliances", label: "Kitchen Appliances"},
    {value: "House Appliances", label: "House Appliances"},
    {value: "Sports", label: "Sports"},
    {value: "Children", label: "Children"},
    {value: "Clothes", label: "Clothes"},
    {value: "Pets", label: "Pets"},
    {value: "Furniture", label: "Furniture"},
    {value: "Gardening", label: "Gardening"},
  ]

  const { isLoading, error, data } = useQuery(
    "listingsData",
    getListings
  );
    /*
  if (isLoading) return (
    <div className="center">
      <LoadingSpinner />;
    </div>
  );*/

  if (error) return "An error has occurred: " + error.message;
    //<ListingsList items={data} /> !!!RETURN INTO RETURN!!!
  return (
    <div>

      <Dropdown
        isSearchable
        isMulti
        placeHolder="Select..."
        options={options}
        onChange={(value) => console.log(value)}
      />

      <Dropdown
        isSearchable
        isMulti
        placeHolder="Select..."
        options={options}
        onChange={(value) => console.log(value)}
      />
    </div>
  )
};

export default Listings;