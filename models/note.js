const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {type: String},
    content: {type: String},
    created_at: Date,
    updated_at: Date,
});


// Export the model
module.exports = mongoose.model('note', NoteSchema);