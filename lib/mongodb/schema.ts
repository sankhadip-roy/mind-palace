import mongoose from 'mongoose';

// Define the Note schema
const NoteSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: false,
    //     // unique: true,
    //     trim: true
    // },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: false
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Define the User schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    notes: [NoteSchema]
});

// Create models
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Note = mongoose.models.Note || mongoose.model('Note', NoteSchema);
