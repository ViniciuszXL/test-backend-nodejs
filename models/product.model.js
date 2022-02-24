const mongoose = require('mongoose');

/**
 * @name schema - Schema da tabela Produtos
 */
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

/**
 * @name Product - Model do produto
 */
const Product = mongoose.model('products', schema)
module.exports = Product;
