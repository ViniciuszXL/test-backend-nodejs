const mongoose = require('mongoose');

/**
 * @name schema - Schema da tabela Category
 */
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

/**
 * @name Category - Model da categoria
 */
const Category = mongoose.model('categories', schema);
module.exports = Category;
