// 
// express router setup
// 
const express = require("express");
const router = express.Router();

const fetch = require("node-fetch");
const authPath = "http://"+process.env.AUTH_URI+":"+process.env.AUTH_PORT+"/auth";

// 
// call book model
// 
const bookMdl = require("../model/book_model.js");

//
// router methods
// 
// search for books globally, and for adding new book
// 
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
// auth support added
.post(async (req, res, next) => {

    let isApproved = false, authMsg;

    try {
        if(req.body.data == undefined) throw "body 'data' not found";
        
        authMsg = {
            "token": ""+req.body.token
        };

        await fetch(authPath,
            {
                method: "POST",
                body: JSON.stringify(authMsg),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.token == req.body.token) isApproved = true;
            })
            .catch(err => console.log(err));
        
        if(isApproved){
            let data = new bookMdl(req.body.data);
            data.save().then(() => {
                res.send({ status: "OK", msg: "Adding book succeed!"}).status(201);
            });
        }else{
            throw "Auth failed!";
        }
        
    } catch (error) {
        res.send({ status: "ERROR", msg: error}).status(500);
    }
});

// 
// method for searching books by id, also for updating and deleting books by id
// 
router
.route("/book/id/:id")
.get((req, res, next) => {
    
    const bookId = req.params.id;

    bookMdl.findById(bookId, (err, result) => {
        if(err){
            console.log(err);
            res.send({ status: "ERROR", msg: err}).status(500);
         }else{

            if(result == null){
                res.send({ status: "Not Found", msg: "No ID found!"}).status(404);
            }else{
                res.send(result);
            }

         }
    });

})
//  TODO: add auth support here later
.patch(async (req, res, next) => {
    
    const bookId = req.params.id;

    try {

        let isApproved = false;

        let authMsg = {
            "token": ""+req.body.token
        };
    
        await fetch(authPath,
            {
                method: "POST",
                body: JSON.stringify(authMsg),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.token == req.body.token) isApproved = true;
                
            })
            .catch(err => console.log(err));

        if(!isApproved) throw "Auth failed!";
    
    } catch (error) {
        res.status(405).send({ status: "ERROR", msg: error});
        return;
    }

    await bookMdl.findByIdAndUpdate(bookId, req.body.data, (err, result) => {
        if(err){
            res.status(500).send({ status: "ERROR", msg: err});
        }else{

            if(result == null){
                res.status(404).send({ status: "ERROR", msg: "No ID found!"});
            }else{
                res.send({ status: "OK", msg: "Update success!"});
            }

        }
    });

})
// auth support added
.delete(async (req, res, next) => {

    const bookId = req.params.id;

    try {

        let isApproved = false;

        let authMsg = {
            "token": ""+req.body.token
        };
    
        await fetch(authPath,
            {
                method: "POST",
                body: JSON.stringify(authMsg),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.token == req.body.token) isApproved = true;
                
            })
            .catch(err => console.log(err));

        if(!isApproved) throw "Auth failed!";
    
    } catch (error) {
        res.status(405).send({ status: "ERROR", msg: error});
        return;
    }

    bookMdl.findByIdAndDelete(bookId, (err, result) => {
            
        if(err){
            res.status(500).send({ status: "ERROR", msg: err });
        }else{

            if(result == null){
                res.status(404).send({ status: "ERROR", msg: "No ID found!"});
            }else{
                res.send({ status: "OK", msg: "Delete success!"});
            }

        }
    });

});

// 
// to search for specific books by its name
// 
router
.route("/book/search")
.get((req, res, next) => {

    const bookName = req.query.name;

    bookMdl.find({ title: bookName }, (err, result) => {
        if(err){
           console.log(err); 
        }else{
            
            if(result.length == 0){
                res.status(404).send({ status: "Not Found", msg: "Book title not found!"});
            }else{
                res.send(result);
            }
        }
    });

});

// 
// to search for specific writer of the books
// 
router
.route("/writer/search")
.get((req, res, next) => {

    const writerName = req.query.name;

    bookMdl.find({ writer: writerName }, (err, result) => {
        if(err){
           console.log(err); 
        }else{
            if(result.length == 0){
                res.status(404).send({ status: "Not Found", msg: "Writer name not found!"});
            }else{
                res.send(result);
            }
        }
    });
});

// 
// export router
// 
module.exports = router;