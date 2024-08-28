const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  contract: {
    type: String,
    required: true,
    enum: ['Full Time', 'Part Time'],
  },
  location: {
    type: String,
    required: true,
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

// Add a virtual property to check if a user has applied
jobSchema.virtual('isApplied').get(function() {
  return this.applicants.length > 0;
});

jobSchema.set('toJSON', { virtuals: true });
jobSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Job', jobSchema);

 