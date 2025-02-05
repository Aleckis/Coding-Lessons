/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

module.exports = function (app) {
  require('dotenv').config();
  const { MongoClient } = require('mongodb');
  const MONGO_URI = process.env.DB;
  const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  client.connect(err => {
    if(err) {
      console.log('Database error: ' + err);
    } else {
      console.log('Successful database connection');
    }
  });

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      let collection = client.db('library').collection('books');
      collection.find({}).toArray((err, books) => {
        if(err) {
          console.log('Error: ' + err);
        } else {
          res.json(books);
        }
      });
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title

      if (!title) {
        return res.send('missing required field title');
      }

      let collection = client.db('library').collection('books');
      collection.insertOne({title: title, comments: [], commentcount: 0}, (err, book) => {
        if(err) {
          console.log('Error: ' + err);
        } else {
          res.json(book.ops[0]);
        }
      });
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      let collection = client.db('library').collection('books');
      collection.deleteMany({}, (err, result) => {
        if(err) {
          console.log('Error: ' + err);
        } else {
          res.send('complete delete successful');
        }
      });
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      let collection = client.db('library').collection('books');
      const { ObjectId } = require('mongodb');
      collection
        .findOne({_id: new ObjectId(bookid)}, (err, book) => {
          if(err) {
            console.log('Error: ' + err);
          } else if (!book) {
            res.send('no book exists');
          } else {
            res.json(book);
          }
        });
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      if (!comment) {
        return res.send('missing required field comment');
      }

      const { ObjectId } = require('mongodb');
      let collection = client.db('library').collection('books');
      collection
        .findOneAndUpdate(
          {_id: new ObjectId(bookid)},
          {
            $push: {comments: comment},
            $inc: {commentcount: 1}
          },
          {returnOriginal: false},
          (err, book) => {
            if(err) {
              console.log('Error: ' + err);
            } else if (book.value === null) {
              res.send('no book exists');
            } else {
              res.json(book.value);
            }
          }
        );
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      const { ObjectId } = require('mongodb');
      let collection = client.db('library').collection('books');
      collection.deleteOne({_id: new ObjectId(bookid)}, (err, result) => {
        if(err) {
          console.log('Error: ' + err);
        } else if (result.deletedCount === 0) {
          res.send('no book exists');
        }
         else {
          res.send('delete successful');
        }
      });
    });
  
};
