/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('Routing tests', function() {

    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
        .keepOpen()
          .post('/api/books')
          .send({title: 'Test Book'})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.property(res.body, 'title');
            assert.property(res.body, '_id');
            assert.equal(res.body.title, 'Test Book');
            done();
          });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
        .keepOpen()
          .post('/api/books')
          .send({})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'missing required field title');
            done();
          });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .keepOpen()
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], 'title');
            assert.property(res.body[0], '_id');
            assert.property(res.body[0], 'commentcount');
            done();
          });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .keepOpen()
          .get('/api/books/123456789012345678901234')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });
      
      test('Test GET /api/books/[id] with valid id in db', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({ title: 'Test Book' })
          .end((err, res) => {
            const id = res.body._id;
            chai.request(server)
              .get(`/api/books/${id}`)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'title');
                assert.property(res.body, '_id');
                assert.property(res.body, 'comments');
                assert.property(res.body, 'commentcount');
                done();
              });
          });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post('/api/books')
          .send({ title: 'Test Book' })
          .end((err, res) => {
            const id = res.body._id;
            chai.request(server)
              .post(`/api/books/${id}`)
              .send({ comment: 'Test comment' })
              .end((_, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'title');
                assert.property(res.body, '_id');
                assert.property(res.body, 'comments');
                assert.property(res.body, 'commentcount');
                assert.equal(res.body.comments[res.body.comments.length - 1], 'Test comment');
                done();
              });
          });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
        .keepOpen()
          .post('/api/books/5f6e3b5e7c6f7e0f8c5f1b7d')
          .send({})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'missing required field comment');
            done();
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
        .keepOpen()
          .post('/api/books/123456789012345678901234')
          .send({comment: 'Test comment'})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
          .post('/api/books')
          .send({ title: 'Test Book' })
          .end((err, res) => {
            const id = res.body._id;
            chai.request(server)
              .delete(`/api/books/${id}`)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'delete successful');
                done();
              });
          });
      });

      test('Test DELETE /api/books/[id] with id not in db', function(done){
        chai.request(server)
        .keepOpen()
          .delete('/api/books/123456789012345678901234')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });

    });

  });

});
