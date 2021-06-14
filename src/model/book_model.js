const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    libary_id: String,
    writer: String,
    publisher: String,
    details:{
        title: String,
        ISBN: String,
        pages: Number,
        release: Date
    },
    count: Number
});

const bookMdl = mongoose.model("books", bookSchema);

let dastr = "Help";

module.exports = bookMdl;