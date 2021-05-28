const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//createschema
const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 2
    },
    author: String,
    description: String,
    category: {
        type: String,
        enum: ["fiction", "non-fiction", "comics", "others"],
        default: "fiction"
    },
    purchaseCount: Number,
    imageUrl: String,
    tags: Array,
    color: String
})


const Book = mongoose.model('book', bookSchema)

module.exports = Book;


