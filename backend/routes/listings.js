const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const { createListing, deleteListing, getListings, getListingById } = require('../controllers/listings');

router.get('/', getListings);
router.get('/:id', getListingById);

router.use(verifyToken);

router.post('/', createListing);
router.delete('/:id', deleteListing);


module.exports = router;
