// 
// call for mongoose library
// 
const mongoose = require("mongoose");

// design book schema for mongodb
const bookSchema = new mongoose.Schema({
    libary_id: String,
    title: String,
    writer: String,
    publisher: String,
    ISBN: String,
    pages: Number,
    release: Date,
    img: String,
    count: Number
});

// create book model based on book schema
const bookMdl = mongoose.model("books", bookSchema);

// export book model
module.exports = bookMdl;