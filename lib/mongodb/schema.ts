import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        auto: true
    },

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

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    notes: [NoteSchema]
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Note = mongoose.models.Note || mongoose.model('Note', NoteSchema);
