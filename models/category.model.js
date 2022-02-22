import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
});

export const Category = mongoose.model('categories', schema);
