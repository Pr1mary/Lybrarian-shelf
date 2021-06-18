"use strict"

// import and setup env variables from .env file
require("dotenv").config();

// db connection setup
const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://"+process.env.DB_URI+"/"+process.env.DB_NAME,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

// expressjs setup
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = process.env.API_PORT || 8080;

// app logic routes
const route = require("./routes/book_routes");
app.use(bodyparser.json());
app.use(route);

// start app
app.listen(port, () => {
    console.log("Listening to port "+port);
});