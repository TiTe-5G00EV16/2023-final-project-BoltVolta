const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const { createListing, deleteListing, getListings, getListingById, getListingBySeller, updateListing } = require('../controllers/listings');
router.get('/', getListings);
router.get('/:id', getListingById);

router.use(verifyToken);

router.patch('/listings/:id', updateListing);
router.post('/', createListing);
router.delete('/:id', deleteListing);
router.get('/user-listings/:seller', getListingBySeller);

module.exports = router;
