const Joi = require('joi');
const listings = require('../models/listings');

const getListings = async (req, res) => {
  try {
    const response = await listings.findAll();
    if(response) {
      res.send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const getListingById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await listings.findListingById(id);
    if(response.length === 1) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const createListing = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    price: Joi.number().min(1).required(),
    seller: Joi.number().min(1).required(),
    categoryid: Joi.number().min(1).required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    description: Joi.string().min(4).required(),
    image: Joi.string()
  });
  const { error } = schema.validate(req.body);
  if(error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const listing = {
    title: req.body.title,
    price: req.body.price,
    seller: req.body.seller,
    categoryid: req.body.categoryid,
    phone: req.body.phone,
    description: req.body.description,
    image: req.body.image
  }

  try {
    const response = await listings.create(listing);
    if(response) {
      listing.id = response.insertId;
      res.status(201).send(listing);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

/*const getListingByPrice = async (req, res) => {
  try {
    const price = parseInt(req.params.price);
    const response = await listings.findByPrice(price);
    if(response) {
      res.send(response);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const getListingByCategory = async (req, res) => {
  try {
    const category = parseInt(req.params.categoryid);
    const response = await listings.findByCategory(category);
    if(response) {
      res.send(response);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};*/

const deleteListing = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await listings.deleteById(id);
    if(response) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const getListingBySeller = async (req, res) => {
  try {
    const seller = parseInt(req.params.seller);;
    const response = await listings.findListingBySeller(seller);
    if (response) {
      res.send(response);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const updateListing = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    price: Joi.number().min(1).required(),
    seller: Joi.string().min(4).required(),
    categoryid: Joi.number().min(1).required(),
    email: Joi.string().min(8).required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    description: Joi.string().min(4).required(),
    image: Joi.string()
  });
  const { error } = schema.validate(req.body);
  if(error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const listing = {
    title: req.body.title,
    price: req.body.price,
    seller: req.body.seller,
    categoryid: req.body.categoryid,
    email: req.body.email,
    phone: req.body.phone,
    description: req.body.description,
    image: req.body.image
  }

  try {
    const response = await listings.create(listing);
    if(response) {
      listing.id = response.insertId;
      res.status(201).send(listing);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};


module.exports = {
  createListing,
  getListingById,
  getListingBySeller,
  /*getListingByPrice,
  getListingByCategory,*/
  deleteListing,
  updateListing,
  getListings
};