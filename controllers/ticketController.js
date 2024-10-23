// /controllers/ticketController.js

const Ticket = require('../models/Ticket');

// Create a new ticket
exports.createTicket = async (req, res) => {
  const { title } = req.body;
  try {
    const ticket = new Ticket({
      title,
      customer: req.user.userId,  // The logged-in user (Customer)
    });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Add a note to an existing ticket
exports.addNoteToTicket = async (req, res) => {
  const { content } = req.body; // Get note content from request body
  const ticketId = req.params.ticketId; // Get ticketId from URL parameters

  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    // Create a new note object
    const newNote = {
      content,
      addedBy: req.user.userId, // User ID of the person adding the note
      timestamp: new Date() // Current timestamp
    };

    // Push the new note to the ticket's notes array
    ticket.notes.push(newNote);
    ticket.lastUpdatedOn = new Date(); // Update lastUpdatedOn

    await ticket.save(); // Save the updated ticket
    res.status(201).json({ msg: 'Note added successfully', note: newNote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get all tickets for Admin/Agent
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('customer', 'name');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get tickets for the logged-in customer
exports.getCustomerTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ customer: req.user.userId });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update ticket status and add notes
exports.updateTicket = async (req, res) => {
  const { status, message } = req.body;
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });

    // Update status and add notes if available
    ticket.status = status || ticket.status;
    if (message) {
      ticket.notes.push({
        message,
        addedBy: req.user.userId,
        timestamp: new Date() // Add timestamp for the message
      });
    }
    ticket.lastUpdatedOn = Date.now();
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
