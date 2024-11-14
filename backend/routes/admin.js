const express = require('express');
const { addSalesManager, viewLocations, getUserLists } = require('../controllers/adminController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/add-sales-manager', auth('Admin'), addSalesManager);
router.get('/locations', auth('Admin'), viewLocations);
router.get('/user-lists', auth('Admin'), getUserLists);

module.exports = router;
