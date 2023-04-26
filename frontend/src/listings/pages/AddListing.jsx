import { useRef, useContext } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import './AddListing.css';

import Input from '../../shared/components/input/Input'
import Button from '../../shared/components/button/Button';
import { AuthContext } from '../../shared/context/auth-context';

import { createListing } from '../api/listings';

//import Dropdown from "../../shared/components/dropdown/Dropdown";
//import { useState } from 'react';

const AddListing = () => {
  const titleRef = useRef();
  const priceRef = useRef();
  const contactRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();

  const auth = useContext(AuthContext);
  const history = useHistory();

  const createListingMutation = useMutation({
    mutationFn: createListing
  })
  const listingSubmitHandler = (event) => {
    event.preventDefault();
    createListingMutation.mutate({
      title: titleRef.current.value,
      price: priceRef.current.value,
      phone: contactRef.current.value,
      seller: auth.userId,
      description: descriptionRef.current.value,
      image: imageRef.current.value,
      token: auth.token
    })
    history.push('/');
  }
  return (
    <form className='listing-form' onSubmit={listingSubmitHandler}>
      <Input id="title" ref={titleRef} type="text" label="Title" />
      <Input id="price" ref={priceRef} type="text" label="Price" />
      <Input id="phone" ref={contactRef} type="number" label="Phone number" />
      <Input id="description" ref={descriptionRef} type="text" label="Description" />
      <Input id="image" ref={imageRef} type="text" label="Image Link" />
      <Button onSubmit={listingSubmitHandler}>
        Add Listing
      </Button>
    </form>
  )
};

export default AddListing;