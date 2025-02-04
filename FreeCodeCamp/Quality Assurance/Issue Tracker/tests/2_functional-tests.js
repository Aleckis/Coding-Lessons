const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Create an issue with every field: POST request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/issues/test')
      .send({
        issue_title: 'Title',
        issue_text: 'text',
        created_by: 'Functional Test - Every field filled in',
        assigned_to: 'Chai and Mocha',
        status_text: 'In QA',
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, 'Title');
        assert.equal(res.body.issue_text, 'text');
        assert.equal(res.body.created_by, 'Functional Test - Every field filled in');
        assert.equal(res.body.assigned_to, 'Chai and Mocha');
        assert.equal(res.body.status_text, 'In QA');
        done();
      });
  });
  test('Create an issue with only required fields: POST request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/issues/test')
      .send({
        issue_title: 'Title',
        issue_text: 'text',
        created_by: 'Functional Test - Only required fields',
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, 'Title');
        assert.equal(res.body.issue_text, 'text');
        assert.equal(res.body.created_by, 'Functional Test - Only required fields');
        assert.equal(res.body.assigned_to, '');
        assert.equal(res.body.status_text, '');
        done();
      });
  });
  test('Create an issue with missing required fields: POST request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/issues/test')
      .send({
        issue_title: 'Title',
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, '{"error":"required field(s) missing"}');
        done();
      });
  });
  test('View issues on a project: GET request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/issues/test')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });
  test('View issues on a project with one filter: GET request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/issues/test?open=true')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });
  test('View issues on a project with multiple filters: GET request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/issues/test?open=true&assigned_to=Chai')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });
  test('Update one field on an issue: PUT request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .post('/api/issues/test')
      .send({
        issue_title: 'Title',
        issue_text: 'text',
        created_by: 'Functional Test - Every field filled in',
        assigned_to: 'Chai and Mocha',
        status_text: 'In QA',
      })
      .end((postErr, postRes) => {
        if (postErr) return done(postErr);
        const issueId = postRes.body._id;
        chai
          .request(server)
          .put('/api/issues/test')
          .send({
            _id: issueId, 
            issue_title: 'Title Updated',
          })
          .end((putErr, putRes) => {
            assert.equal(putRes.status, 200);
            assert.deepEqual(putRes.body, {
              result: 'successfully updated',
              _id: issueId,
            });
            done();
          });
      });
  });
  test('Update multiple fields on an issue: PUT request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .post('/api/issues/test')
      .send({
        issue_title: 'Title',
        issue_text: 'text',
        created_by: 'Functional Test - Every field filled in',
        assigned_to: 'Chai and Mocha',
        status_text: 'In QA',
      })
      .end((postErr, postRes) => {
        if (postErr) return done(postErr);
  
        const issueId = postRes.body._id;
  
        chai
          .request(server)
          .put('/api/issues/test')
          .send({
            _id: issueId, 
            issue_title: 'Title Updated',
            issue_text: 'text Updated',
            created_by: 'Functional Test - Every field filled in Updated',
            assigned_to: 'Chai and Mocha Updated',
            status_text: 'In QA Updated',
          })
          .end((putErr, putRes) => {
            assert.equal(putRes.status, 200);
            assert.deepEqual(putRes.body, {
              result: 'successfully updated',
              _id: issueId,
            });
            done();
          });
        });
    });
  test('Update an issue with missing _id: PUT request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .put('/api/issues/test')
      .send({
        issue_title: 'Title',
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, '{"error":"missing _id"}');
        done();
      });
  });
  test('Update an issue with no fields to update: PUT request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .put('/api/issues/test')
      .send({
        _id: '5f4f7b4c6f1f5e2c6c1e7f0d',
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, '{"error":"no update field(s) sent","_id":"5f4f7b4c6f1f5e2c6c1e7f0d"}');
        done();
      });
  });
  test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .put('/api/issues/test')
      .send({
        _id: '5f4f7b4c6f1f5e2c6c1e7f0d',
        issue_title: 'Title',
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, '{"error":"could not update","_id":"5f4f7b4c6f1f5e2c6c1e7f0d"}');
        done();
      });
  });
  test('Delete an issue: DELETE request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .post('/api/issues/test')
      .send({
        issue_title: 'Title',
        issue_text: 'text',
        created_by: 'Functional Test - Every field filled in',
        assigned_to: 'Chai and Mocha',
        status_text: 'In QA',
      })
      .end((postErr, postRes) => {
        if (postErr) return done(postErr);
        const issueId = postRes.body._id;
        chai
          .request(server)
          .delete('/api/issues/test')
          .send({
            _id: issueId,
          })
          .end((delErr, delRes) => {
            assert.equal(delRes.status, 200);
            assert.deepEqual(delRes.body, {
              result: 'successfully deleted',
              _id: issueId,
            });
            done();
          });
      });
  });
  test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .delete('/api/issues/test')
      .send({
        _id: '5f4f7b4c6f1f5e2c6c1e7f0d',
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, '{"error":"could not delete","_id":"5f4f7b4c6f1f5e2c6c1e7f0d"}');
        done();
      });
  });
  test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .delete('/api/issues/test')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, '{"error":"missing _id"}');
        done();
      });
  });
});
