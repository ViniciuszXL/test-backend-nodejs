import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
});

export const Product = mongoose.model('products', schema);
