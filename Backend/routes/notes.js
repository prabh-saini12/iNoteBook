const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes.model.js')
const { body, validationResult } = require('express-validator')

// Route 1: Get all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    // Ensure that req.user is an ObjectId, not an object like { id: '...' }
    const userObjectId = req.user.id || req.user;

    const notes = await Notes.find({ user: userObjectId });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Add new notes using post login required
router.post('/addnotes', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Ensure that req.user is an ObjectId, not an object like { id: '...' }
    const userObjectId = req.user.id || req.user;

    const note = new Notes({
      title,
      description,
      tag,
      user: userObjectId,
    });

    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});



module.exports = router;
