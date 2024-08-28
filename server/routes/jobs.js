const express = require('express');
const Job = require('../models/Job');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new job (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { companyName, position, contract, location } = req.body;
    const newJob = new Job({ companyName, position, contract, location });
    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a job (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { companyName, position, contract, location } = req.body;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { companyName, position, contract, location },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a job (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

 // Apply for a job (authenticated users only)
router.post('/:id/apply', protect, async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      // Check if the user has already applied
      if (job.applicants.includes(req.user.id)) {
        return res.status(400).json({ message: 'You have already applied for this job' });
      }
  
      // Add the user to the job's applicants
      job.applicants.push(req.user.id);
      await job.save();
  
      res.json({ message: 'Successfully applied for the job' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;