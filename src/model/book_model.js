const mongoose = require("mongoose");

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

const bookMdl = mongoose.model("books", bookSchema);

let dastr = "Help";

module.exports = bookMdl;