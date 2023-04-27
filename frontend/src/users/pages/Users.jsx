import React from "react";
import { useQuery } from 'react-query'

import { getUsers } from "../api/users";
import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'

const Users = () => {

  const { isLoading, error, data } = useQuery(
    "usersData",
    getUsers
  );

  if (isLoading) return (
    <div className="center">
      <LoadingSpinner />;
    </div>
  );

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <UsersList items={data} />
    </div>
  )
};

export default Users;