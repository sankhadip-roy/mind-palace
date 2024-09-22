import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
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
}, { _id: true }); // This ensures MongoDB generates the _id

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    notes: [NoteSchema]
});

// Remove any existing indexes
UserSchema.index({ 'notes._id': 1 }, { unique: false, sparse: true });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Note = mongoose.models.Note || mongoose.model('Note', NoteSchema);
