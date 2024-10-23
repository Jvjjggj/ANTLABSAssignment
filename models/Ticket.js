// /models/Ticket.js

const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Active', 'Pending', 'Closed'], default: 'Active' },
  lastUpdatedOn: { type: Date, default: Date.now },
  notes: [
    {
      message: String,
      addedBy: { type: String },  // User ID of the person who added the note
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Ticket', ticketSchema);
