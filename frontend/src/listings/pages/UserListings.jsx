import React, {useContext} from "react";
import { useQuery } from 'react-query'

import { getUserListings } from "../api/listings";
import ListingsList from '../components/ListingsList';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'
import { AuthContext } from "../../shared/context/auth-context";
import "./Listings.css";

const UserListings = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ['userListings', {seller: auth.userId, token: auth.token}],
    queryFn: getUserListings
  });

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

export default UserListings;