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
    libary_id: "456",
    title: "H.P. Lovecraft: The Complete Fiction",
    writer: "Howard Phillips Lovecraft",
    publisher: "Barnes & Noble",
    ISBN: "9781435122963",
    pages: 1112,
    release: new Date("March 18, 2011"),
    img: "https://ms-newsouthbooks-com-au.s3.amazonaws.com/WorkImage/WorkEdition/9781435122963.jpg",
    count: 1
});

data.save().then(() => {
    console.log("Seeding succeed!")
    process.exit();
});