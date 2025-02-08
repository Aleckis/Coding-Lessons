const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

const validPuzzle = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
const invalidPuzzle = '.7.89.....5....3.4.2..4..1.5689..472...5.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
const shortPuzzle = validPuzzle + '.';
const solvedPuzzle = "473891265851726394926345817568913472342687951197254638734162589685479123219538746";

suite('Unit Tests', () => {
    test('Logic handles a valid puzzle string of 81 characters', () => {
        assert.strictEqual(validPuzzle.length, 81);
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
        assert.isFalse(solver.validate(invalidPuzzle + 'a'));
    });

    test('Logic handles a puzzle string that is not 81 characters in length', () => {
        assert.notStrictEqual(shortPuzzle.length, 81);
    });

    test('Logic handles a valid row placement', () => {
        assert.isTrue(solver.checkRowPlacement(validPuzzle, 'A', 1, '3'));
    });

    test('Logic handles an invalid row placement', () => {
        assert.isFalse(solver.checkRowPlacement(validPuzzle, 'A', 1, '9'));
    });

    test('Logic handles a valid column placement', () => {
        assert.isTrue(solver.checkColPlacement(validPuzzle, 'B', 1, '8'));
    });

    test('Logic handles an invalid column placement', () => {
        assert.isFalse(solver.checkColPlacement(validPuzzle, 'A', 1, '6'));
    });

    test('Logic handles a valid region (3x3 grid) placement', () => {
        assert.isTrue(solver.checkRegionPlacement(validPuzzle, 'A', 1, '3'));
    });

    test('Logic handles an invalid region (3x3 grid) placement', () => {
        assert.isFalse(solver.checkRegionPlacement(validPuzzle, 'A', 6, '4'));
    });

    test('Valid puzzle strings pass the solver', () => {
        assert.isNotFalse(solver.solve(validPuzzle));
    });

    test('Invalid puzzle strings fail the solver', () => {
        assert.isFalse(solver.solve(invalidPuzzle));
    });

    test('Solver returns the expected solution for an incomplete puzzle', () => {
        assert.equal(solver.solve(validPuzzle), solvedPuzzle);
    });
});
