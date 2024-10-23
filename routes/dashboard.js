// /routes/dashboard.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const User = require('../models/User');
const Ticket = require('../models/Ticket');

// @route   GET /api/dashboard
// @desc    Get dashboard statistics (Admin only)
router.get('/', auth, role(['Admin']), async (req, res) => {
  try {
    // Count total customers (only those with "Customer" role)
    const totalCustomers = await User.countDocuments({ role: 'Customer' });

    // Count total tickets
    const totalTickets = await Ticket.countDocuments();

    // Optional: Count tickets by status
    const activeTickets = await Ticket.countDocuments({ status: 'Active' });
    const pendingTickets = await Ticket.countDocuments({ status: 'Pending' });
    const closedTickets = await Ticket.countDocuments({ status: 'Closed' });

    // Send the response with the counts
    res.json({
      totalCustomers,
      totalTickets,
      activeTickets,
      pendingTickets,
      closedTickets
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
