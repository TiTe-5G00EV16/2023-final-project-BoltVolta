import React, { useContext, useState, useRef } from "react";
import { useMutation, useQuery } from 'react-query';

import Card from '../../shared/components/card/Card';
import Button from '../../shared/components/button/Button';
import Modal from '../../shared/components/modal/Modal';

import Input from '../../shared/components/input/Input'

import { AuthContext } from '../../shared/context/auth-context';
import { deleteListing, editListing } from "../api/listings";

import './ListingItem.css';

const ListingItem = props => {
  const auth = useContext(AuthContext);

  const titleRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const showEditHandler = () => setShowEditModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);
  const cancelEditHandler = () => setShowEditModal(false);


  const deleteListingMutation = useMutation({
    mutationFn: deleteListing,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const editListingMutation = useMutation({
    mutationFn: editListing,
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

  const listingSubmitHandler = (event) => {
    event.preventDefault();
    editListingMutation.mutate({
      title: titleRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      token: auth.token
    })
    history.replace('/', []);
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

      <Modal
        show={showEditModal}
        header="Edit Listing"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelEditHandler}>Cancel</Button>
            <Button edit onClick={listingSubmitHandler}>Edit</Button>
          </>
        }
      >
          <Input id="title" ref={titleRef} type="text" label="Title" />
          <Input id="price" ref={priceRef} type="number" label="Price" />
          <Input id="description" ref={descriptionRef} type="text" label="Description" />
      </Modal>

      <li className="listing-item">
        <Card className="listing-item__content">
          <div className="listing-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="listing-item__info__left">
            <h2>{props.title}</h2>
            <p>{props.price}&euro;{" "}</p>
          </div>
          <div className="listing-item__info__right">
            <h2></h2>
            <p>{props.contact}</p>
          </div>
          <div className="listing-item__info__description__header">
            <p>Description:</p>
          </div>
          <div className="listing-item__info__description">
            <p>{props.description}</p>
          </div>
          <div className="listing-item_actions">
            {auth.isLoggedIn && (
              <div className="button__edit">
              <Button inverse onClick={showEditHandler}>Edit</Button>
              </div>
            )}
            {auth.isLoggedIn && (
              <div className="button__delete">
              <Button danger onClick={showConfirmationHandler}>Delete</Button>
              </div>
            )}
          </div>
        </Card>
      </li>
    </>
  )
};

export default ListingItem;
