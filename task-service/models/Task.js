const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  // status: {
  //   type: String,
  //   enum: ['pending', 'in-progress', 'completed'],
  //   default: 'pending'
  // },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
