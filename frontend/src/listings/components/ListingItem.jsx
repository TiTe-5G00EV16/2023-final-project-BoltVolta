import React, { useContext, useState } from "react";
import { useMutation } from 'react-query';

import Card from '../../shared/components/card/Card';
import Button from '../../shared/components/button/Button';
import Modal from '../../shared/components/modal/Modal';

import { AuthContext } from '../../shared/context/auth-context';
import { deleteListing } from "../api/listings";

import './ListingItem.css';

const ListingItem = props => {
  const auth = useContext(AuthContext);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const deleteListingMutation = useMutation({
    mutationFn: deleteListing,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const deleteConfirmedHandler = () => {
    setShowConfirmationModal(false);
    console.log("Do we get here?");
    deleteListingMutation.mutate({
      id: props.id,
      token: auth.token
    })
  }

  return (
    <>
      <Modal
        show={showConfirmationModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelConfirmationHandler}>Cancel</Button>
            <Button delete onClick={deleteConfirmedHandler}>Delete</Button>
          </>
        }
      >
        <p>Are you sure? Once it's gone, it's gone!</p>
      </Modal>

      <li className="listing-item">
        <Card className="listing-item__content">
          <div className="listing-item__image">
            <img src={props.image} alt={props.capital} />
          </div>
          <div className="listing-item__info">
            <h3>{props.capital} - {props.country}</h3>
          </div>
          <div className="listing-item_actions">
            {auth.isLoggedIn && (
              <Button danger onClick={showConfirmationHandler}>Delete</Button>
            )}
          </div>
        </Card>
      </li>
    </>
  )
};

export default ListingItem;
