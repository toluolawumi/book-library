//require schema
const Book = require('../models/book')

exports.createNewBook = (req,res) => {
    //fetch book details from request body
    const book = req.body;
    Book.create({
        ...req.body
    }, (err, newBook) => {
        if (err){
            return res.status(500).json({message: err })
        }else {
            return res.status(200).json({message: "new book created", newBook})
        }
    })
}


exports.fetchBooks = (req,res) => {
    //check request.query for any fiters and use in the model find query
    let conditions = {};
    if (req.query.category){
        conditions.category = req.query.category
    }
    if (req.query.author){
        conditions.author= req.query.author
    }
        //fetch all books model.find and send response to clients
    Book.find(conditions, (err, books) => {
        if (err){
            console.log(err)
            return res.status(500).json({message: err })
        }else {
            return res.status(200).json({message: books})
            }
        })
    
}

exports.fetchSingleBook = (req,res) => {
    Book.findOne({_id: req.params.id}, (err, book) => {
        if (err){
            return res.status(500).json({message: err })
        }else if (!book){
            return res.status(404).json({message: "book not found"})
        }else {
            return res.status(200).json({book})
        }
    })
}

exports.updateSingleBook = (req,res) => {
    Book.findOneAndUpdate(req.params.id,{
        title: req.body.title,
        category: req.body.category
    }, (err, book) => {
        if (err){
            return res.status(500).json({message: err })
        }else if (!book){
            return res.status(404).json({message: "book not found"})
        }else {
            book.save((err, savedBook)=> {
                if (err){
                    return res.status(500).json({message: err })
                }else{
                return res.status(200).json({savedBook})
                }
            })
        }
    })
}

exports.deleteSingleBook = (req,res) => {
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        if (err){
            return res.status(500).json({message: err })
        }else if (!book){
            return res.status(404).json({message: "book not found"})
        }else {
                return res.status(200).json({message: "book deleted successfully"})
            }
    })
}