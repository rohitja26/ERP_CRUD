const express = require('express');
const { addEmployee, updateEmployee, trackEmployeeTime } = require('../controllers/salesManagerController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/add-employee', auth('Sales Manager'), addEmployee);
router.put('/update-employee/:id', auth('Sales Manager'), updateEmployee);
router.put('/track-time', auth('Sales Manager'), trackEmployeeTime);

module.exports = router;
