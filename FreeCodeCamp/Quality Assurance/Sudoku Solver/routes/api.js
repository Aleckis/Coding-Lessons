'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let puzzle = req.body.puzzle
      let coordinate = req.body.coordinate
      let value = req.body.value
      if (value < 1 || value > 9) {
        return res.json({ error: 'Invalid value' })
      }
      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' })
      }
      if (!solver.validate(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' })
      }
      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' })
      }
      if (coordinate.length !== 2 || !coordinate.match(/[a-iA-I][1-9]/)) {
        return res.json({ error: 'Invalid coordinate'})
      }
      if (!value.match(/[1-9]/)) {
        return res.json({ error: 'Invalid value' })
      }
      let row = coordinate[0].toUpperCase().charCodeAt(0) - 65
      let column = parseInt(coordinate[1]) - 1
      let conflicts = []
      if (!solver.checkRowPlacement(puzzle, row, column, value)) {
        conflicts.push('row')
      }
      if (!solver.checkColPlacement(puzzle, row, column, value)) {
        conflicts.push('column')
      }
      if (!solver.checkRegionPlacement(puzzle, row, column, value)) {
        conflicts.push('region')
      }
      if (conflicts.length > 0) {
        return res.json({ valid: false, conflict: conflicts })
      }
      return res.json({ valid: true })
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle
      if (!puzzle) {
        return res.json({ error: 'Required field missing' })
      }
      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' })
      }
      if (!solver.validate(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' })
      }
      let solution = solver.solve(puzzle)
      if (!solution) {
        return res.json({ error: 'Puzzle cannot be solved' })
      }
      return res.json({ solution }) 
    });
};
