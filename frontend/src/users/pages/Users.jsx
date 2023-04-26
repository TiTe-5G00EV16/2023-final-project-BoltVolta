import React from "react";
import { useQuery } from 'react-query'

import { getUsers } from "../api/users";
import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'

const DUMMY_USERS = [
  {
    id: 'asdsad',
    name: 'John Smith',
    email: 'john@smith.com'
  },{
    id: 'fdgfdgfd',
    name: 'John Wick',
    email: 'john@wick.com'
  },{
    id: 'nbvvbnbv',
    name: 'Tony Stark',
    email: 'tony@stark.com'
  },{
    id: 'nbvvaaav',
    name: 'Lony Stark',
    email: 'lony@stark.com'
  },{
    id: 'nbvvbbbv',
    name: 'Hony Stark',
    email: 'hony@stark.com'
  },{
    id: 'nbggbnbv',
    name: 'Bony Stark',
    email: 'bony@stark.com'
  }
];

const Users = () => {

  const { isLoading, error, data } = useQuery(
    "usersData",
    getUsers
  );
  console.log(data);

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