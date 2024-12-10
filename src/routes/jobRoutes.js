const express = require('express');
const { createJob, getAllJobs, updateJob, deleteJob } = require('../controllers/jobController');
const authenticate = require('../middlewares/authenticate');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(authenticate); // Ensure all routes are protected
router.post('/', roleMiddleware(['client']), createJob);
router.get('/', getAllJobs);
router.put('/:id', roleMiddleware(['client']), updateJob);
router.delete('/:id', roleMiddleware(['client']), deleteJob);

module.exports = router;
