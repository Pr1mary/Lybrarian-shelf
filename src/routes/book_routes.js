// express router setup
const express = require("express");
const router = express.Router();

// call book model
const bookMdl = require("../model/book_model.js");

// router methods
// search for books globally, and for adding new book
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
// TODO: add auth support here later
.post((req, res, next) => {
    
    try {
        let data = new bookMdl(req.body);
        data.save().then(() => {
            res.send({ status: "OK", msg: "Adding book succeed!"});
        });
    } catch (error) {
        res.send({ status: "ERROR", msg: error}).status(500);
    }
});

// method for searching books by id, also for updating and deleting books by id
router
.route("/book/id/:id")
.get((req, res, next) => {
    
    const bookId = req.params.id;

    bookMdl.findById(bookId, (err, result) => {
        if(err){
            console.log(err);
            res.send({ status: "ERROR", msg: err});
         }else{
             res.send(result);
         }
    });

})
//  TODO: add auth support here later
.patch((req, res, next) => {
    
    const bookId = req.params.id;

    bookMdl.findByIdAndUpdate(bookId, req.body, (err, result) => {
        if(err){
            console.log(err);
            res.send({ status: "ERROR", msg: err}).status(500);
        }else{
            res.send({ status: "OK", msg: "Update success!"});
        }
    });

})
// TODO: add auth support here later
.delete((req, res, next) => {

    const bookId = req.params.id;

    bookMdl.findByIdAndDelete(bookId, (err, result) => {
        
        if(err){
            console.log(err);
            res.send({ status: "ERROR", msg: err});
        }else{

            let resultMsg;

            if(result == null){
                resultMsg = "No ID found!"
            }else{
                resultMsg = "Delete success!"
            }

            res.send({ status: "OK", msg: resultMsg});
        }
    });

    // try {
    //     bookMdl.deleteOne({ _id: bookId}).then(() => {
    //         res.send({ status: "OK", msg: "Delete success!"});
    //     });
    // } catch (error) {
    //     console.log(error);
    //     res.send({ status: "ERROR", msg: error});
    // }
});

// to search for specific books by its name
router
.route("/book/search")
.get((req, res, next) => {

    const bookName = req.query.name;

    bookMdl.find({ title: bookName }, (err, result) => {
        if(err){
           console.log(err); 
        }else{
            res.send(result);
        }
    });

});

// to search for specific writer of the books
router
.route("/writer/search")
.get((req, res, next) => {

    const writerName = req.query.name;

    bookMdl.find({ writer: writerName }, (err, result) => {
        if(err){
           console.log(err); 
        }else{
            res.send(result);
        }
    });
});

// export router
module.exports = router;