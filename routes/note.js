const express = require('express')

const NoteCtrl = require('../controllers/note')
const { catchError } = require('../controllers/error')

const router = express.Router()

// Retrieves all list of note
router.get('/', catchError(NoteCtrl.getAll))

// Retrieves note by id
router.get('/:id', catchError(NoteCtrl.get))

// Create note 
router.post('/', catchError(NoteCtrl.create))


module.exports = router
