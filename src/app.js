"use strict"

// import and setup env variables from .env file
require("dotenv").config();
const ENV = process.env;

// db connection setup
const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://"+ENV.DB_URI+"/"+ENV.DB_NAME,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

// expressjs setup
const express = require("express");
const app = express();
const port = ENV.API_PORT;

// app logic routes
const route = require("./routes/book_routes");
app.use(route);

// start app
app.listen(port, () => {
    console.log("Listening to port "+port);
});