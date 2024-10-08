const express = require('express')
const router = express.Router();
const {getAllProduct,getAllProductStatic} = require('../controllers/products')

router.route('/api/v1/products').get(getAllProduct);
router.route('/api/v1/products/static').get(getAllProductStatic);

module.exports = router;