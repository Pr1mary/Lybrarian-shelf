require("dotenv").config();
const ENV = process.env;

const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://"+ENV.DB_URI+"/"+ENV.DB_NAME,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
const db = mongoose.connection;

const bookMdl = require("../src/model/book_model.js");

let data = new bookMdl({
    libary_id: "123",
    writer: "Arthur Conan Doyle",
    publisher: "Gutenberg Foundation",
    details:{
        title: "The Adventures of Sherlock Holmes",
        ISBN: "0-4456-5118-0",
        pages: 307,
        release: new Date("October 14, 1892")
    },
    count: 1
});

data.save().then(() => {
    console.log("Seeding succeed!")
    process.exit();
});