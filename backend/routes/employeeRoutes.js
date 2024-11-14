const express = require('express');
const { viewProfile, recordDailyStatus, viewAttendance } = require('../controllers/employeeController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/profile', auth('Employee'), viewProfile);
router.put('/daily-status', auth('Employee'), recordDailyStatus);
router.get('/attendance', auth('Employee'), viewAttendance);

module.exports = router;
