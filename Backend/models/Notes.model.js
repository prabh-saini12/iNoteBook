const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
}
    // , { timestamps: true }
)

export const notes = mongoose.model('notes', NotesSchema)