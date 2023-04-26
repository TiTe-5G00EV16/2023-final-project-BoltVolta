import React from "react";
import { useQuery } from 'react-query'

import { getListings } from "../api/listings";
import ListingsList from '../components/ListingsList';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'

import "./Listings.css";

//import { useState } from "react";
//import Dropdown from "../../shared/components/dropdown/Dropdown";

const Listings = () => {
  /*const [ price, setPrice ] = useState(300);

  const handleInput = (e)=>{
    setPrice( e.target.value );
  }

  const categoryOptions = [
    {value: 1, label: "Taiteet ja Käsityöt"},
    {value: 2, label: "Lapset"},
    {value: 3, label: "Kauneus & Henkilökohtainen Hoito"},
    {value: 4, label: "Elektroniikka"},
    {value: 5, label: "Keittiölaitteet"},
    {value: 6, label: "Kodinkoneet"},
    {value: 7, label: "Urheilu"},
    {value: 8, label: "Lapset"},
    {value: 9, label: "Miesten Vaatteet"},
    {value: 10, label: "Naisten Vaatteet"},
    {value: 11, label: "Kengät"},
    {value: 12, label: "Kirjat"},
    {value: 13, label: "Lemmikit"},
    {value: 14, label: "Huonekalut"},
    {value: 15, label: "Puutarhanhoito"}
  ]
  const locationOptions = [
    {value: 1, label: "Ahvenanmaa"},
    {value: 2, label: "Etelä-Karjala"},
    {value: 3, label: "Etelä-Pohjanmaa"},
    {value: 4, label: "Etelä-Savo"},
    {value: 5, label: "Kainuu"},
    {value: 6, label: "Kanta-Häme"},
    {value: 7, label: "Keski-Pohjanmaa"},
    {value: 8, label: "Keski-Suomi"},
    {value: 9, label: "Kymenlaakso"},
    {value: 10, label: "Lappi"},
    {value: 11, label: "Päijät-Häme"},
    {value: 12, label: "Pirkanmaa"},
    {value: 13, label: "Pohjanmaa"},
    {value: 14, label: "Pohjois-Karjala"},
    {value: 15, label: "Pohjois-Pohjanmaa"},
    {value: 16, label: "Pohjois-Savo"},
    {value: 17, label: "Satakunta"},
    {value: 18, label: "Uusimaa"},
    {value: 19, label: "Varsinais-Suomi"},
  ]
  */
  const { isLoading, error, data } = useQuery(
    "listingsData",
    getListings
  );

  if (isLoading) return (
    <div className="center">
      <LoadingSpinner />;
    </div>
  );

  if (error) return "An error has occurred: " + error.message;

    /* WIP
      <div className="listings-page-dropdowns">
        <Dropdown
          isSearchable
          isMulti
          placeHolder="Select..."
          options={categoryOptions}
          onChange={(value) => console.log(value)}
        />
        <Dropdown
          isSearchable
          isMulti
          placeHolder="Select..."
          options={locationOptions}
          onChange={(value) => console.log(value)}
        />
        <input type="range" onInput={handleInput} />
      </div>
      <div className="listings">
        {data.filter((listings) => {
            return listings.price > parseInt(price, 10);
          }).map((listings) => {
            return (
              <p key={listings.price}>

              </p>
            );
          })}
      </div>

    */
  return (
    <div>
      <ListingsList items={data}/>
    </div>
  )
};

export default Listings;