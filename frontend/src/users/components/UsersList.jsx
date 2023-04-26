import React from 'react';

import UserItem from './UserItem';

import './UsersList.css';

const UsersList = props => {

  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Users found.</h2>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.items.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          email={user.email}
          image={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg'}
        />
      ))}
    </ul>
  )
}

export default UsersList;
