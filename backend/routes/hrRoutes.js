const express = require('express');
const { recordAttendance, calculateSalary } = require('../controllers/hrController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/record-attendance', auth('HR'), recordAttendance);
router.post('/calculate-salary', auth('HR'), calculateSalary);

module.exports = router;
