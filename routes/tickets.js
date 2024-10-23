// /routes/tickets.js

const express = require('express');
const { 
    getAllTickets, 
    getCustomerTickets, 
    createTicket, 
    updateTicket, 
    addNoteToTicket // Import the new function
} = require('../controllers/ticketController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

// Get all tickets (Agent/Admin only)
router.get('/', auth, role(['Agent', 'Admin']), getAllTickets);

// Get tickets for the logged-in customer
router.get('/customer', auth, role(['Customer']), getCustomerTickets);

// Create a new ticket (Customer only)
router.post('/', auth, role(['Customer']), createTicket);

// Update a ticket (Agent/Admin only)
router.put('/:id', auth, role(['Agent', 'Admin']), updateTicket);

// Add a note to an existing ticket (Agent/Admin only)
// If you want to restrict this to Agents and Admins only, change the roles as needed
router.post('/:ticketId/note', auth, role(['Agent', 'Admin']), addNoteToTicket); // Adjust roles based on your requirements

module.exports = router;
