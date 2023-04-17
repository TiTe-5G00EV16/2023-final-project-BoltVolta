import React from "react";

import ListingItem from './ListingItem';

import './ListingsList.css';

const ListingsList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Listings found.</h2>
      </div>
    );
  }

  return <ul className="listings-list">
    {props.items.map(listing =>
      <ListingItem
        key={listing.id}
        id={listing.id}
        title={listing.title}
        price={listing.price}
        seller={listing.seller}
        categoryid={listing.categoryid}
        contact={listing.contact}
        description={listing.description}
        image={listing.image}
      />
    )}
    </ul>
};

export default ListingsList;
