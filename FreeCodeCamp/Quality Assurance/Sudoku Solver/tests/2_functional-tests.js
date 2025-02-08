const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const validPuzzle = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
const solvedPuzzle = "473891265851726394926345817568913472342687951197254638734162589685479123219538746";
const invalidPuzzleChars = '.7.89.....5....3.4.2..4..1.5689..472...6....1.7.5.63873.1.2.8.6..47.1..2.9.387.6a';
const shortPuzzle = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6.';
const unsolvablePuzzle = '.7.89.....5....3.4.2..4..1.5189..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';

suite('Functional Tests', () => {
    test('Solve a puzzle with valid puzzle string', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: validPuzzle })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.solution, solvedPuzzle);
                done();
            });
    });

    test('Solve a puzzle with missing puzzle string', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Required field missing');
                done();
            });
    });

    test('Solve a puzzle with invalid characters', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: invalidPuzzleChars })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                done();
            });
    });

    test('Solve a puzzle with incorrect length', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: shortPuzzle })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            });
    });

    test('Solve a puzzle that cannot be solved', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: unsolvablePuzzle })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Puzzle cannot be solved');
                done();
            });
    });

    test('Check a puzzle placement with all fields', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: validPuzzle, coordinate: 'A1', value: '3' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'valid');
                assert.isTrue(res.body.valid);
                done();
            });
    });

    test('Check a puzzle placement with single placement conflict', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: validPuzzle, coordinate: 'A1', value: '9' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isFalse(res.body.valid);
                assert.deepEqual(res.body.conflict, ['row']);
                done();
            });
    });

    test('Check a puzzle placement with multiple placement conflicts', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: validPuzzle, coordinate: 'A3', value: '8' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isFalse(res.body.valid);
                assert.deepEqual(res.body.conflict, ['row', 'column']);
                done();
            });
    });

    test('Check a puzzle placement with all placement conflicts', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: validPuzzle, coordinate: 'A1', value: '7' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isFalse(res.body.valid);
                assert.deepEqual(res.body.conflict, ['row', 'column', 'region']);
                done();
            });
    });

    test('Check a puzzle placement with missing required fields', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Required field(s) missing');
                done();
            });
    });

    test('Check a puzzle placement with invalid characters', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: invalidPuzzleChars, coordinate: 'A1', value: '3' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                done();
            });
    });

    test('Check a puzzle placement with incorrect length', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: shortPuzzle, coordinate: 'A1', value: '3' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            });
    });

    test('Check a puzzle placement with invalid placement coordinate', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: validPuzzle, coordinate: 'Z9', value: '3' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Invalid coordinate');
                done();
            });
    });
    
    test('Check a puzzle placement with invalid placement value', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: validPuzzle, coordinate: 'A1', value: '0' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Invalid value');
                done();
            });
    });    
});
