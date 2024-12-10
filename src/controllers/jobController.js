const logger = require('../utils/logger');

let jobs = []; // Temporary in-memory storage

// Create a new job
const createJob = (req, res) => {
    const { title, description, location } = req.body;

    logger.info(`Job creation attempt by User ID: ${req.user.id}`);
    if (!title || !description || !location) {
        logger.warn('Job creation failed: Missing fields');
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const job = {
        id: jobs.length + 1,
        title,
        description,
        location,
        status: 'open',
        clientId: req.user.id,
        createdAt: new Date(),
    };
    jobs.push(job);

    logger.info(`Job created successfully: Job ID: ${job.id}`);
    res.status(201).json({ success: true, message: 'Job created successfully.', job });
};

// Get all jobs
const getAllJobs = (req, res) => {
    logger.info(`Get all jobs request by User ID: ${req.user.id}`);
    res.status(200).json({ success: true, jobs });
};

// Update a job
const updateJob = (req, res) => {
    const { id } = req.params;
    const { title, description, location, status } = req.body;

    logger.info(`Job update attempt: Job ID: ${id} by User ID: ${req.user.id}`);
    const job = jobs.find((job) => job.id === parseInt(id));
    if (!job) {
        logger.warn(`Job update failed: Job not found - Job ID: ${id}`);
        return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.location = location || job.location;
    job.status = status || job.status;

    logger.info(`Job updated successfully: Job ID: ${job.id}`);
    res.status(200).json({ success: true, message: 'Job updated successfully.', job });
};

// Delete a job
const deleteJob = (req, res) => {
    const { id } = req.params;

    logger.info(`Job delete attempt: Job ID: ${id} by User ID: ${req.user.id}`);
    const jobIndex = jobs.findIndex((job) => job.id === parseInt(id));
    if (jobIndex === -1) {
        logger.warn(`Job delete failed: Job not found - Job ID: ${id}`);
        return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    const [deletedJob] = jobs.splice(jobIndex, 1);
    logger.info(`Job deleted successfully: Job ID: ${deletedJob.id}`);
    res.status(200).json({ success: true, message: 'Job deleted successfully.', job: deletedJob });
};

module.exports = { createJob, getAllJobs, updateJob, deleteJob };
