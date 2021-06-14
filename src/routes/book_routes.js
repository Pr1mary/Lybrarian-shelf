// express router setup
const express = require("express");
const router = express.Router();

const bookMdl = require("../model/book_model.js");

// router methods
router
.route("/book/")
.get((req, res, next) => {

    bookMdl.find({}, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
    
    
})
.post((req, res, next) => {

});

router
.route("/book/:id")
.get((req, res, next) => {

});

// export router
module.exports = router;