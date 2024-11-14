const express = require('express');
const { addSalesManager, viewLocations } = require('../controllers/adminController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/add-sales-manager', auth('Admin'), addSalesManager);
router.get('/locations', auth('Admin'), viewLocations);

module.exports = router;
