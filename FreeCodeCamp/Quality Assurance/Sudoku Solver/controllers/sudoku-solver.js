class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.match(/[^1-9.]/)) {
      return false;
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    if (typeof row === 'string') {
        row = row.toUpperCase().charCodeAt(0) - 65; 
    }
    let rowStart = row * 9;
    let rowValues = puzzleString.slice(rowStart, rowStart + 9).split("");
    if (puzzleString[rowStart + column] === value.toString()) {
        return true;
    }

    return !rowValues.includes(value.toString());
}


  checkColPlacement(puzzleString, row, column, value) {
    let colValues = [];
    for (let i = column; i < 81; i += 9) {
      colValues.push(puzzleString[i]);
    }

    if (colValues[row] === value.toString()) {
      return true;
    }

    return !colValues.includes(value.toString());
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    if (typeof row === 'string') {
        row = row.toUpperCase().charCodeAt(0) - 65; 
    }

    let regionStart = Math.floor(row / 3) * 27 + Math.floor(column / 3) * 3;
    let regionValues = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        regionValues.push(puzzleString[regionStart + i * 9 + j]);
      }
    }

    if (puzzleString[row * 9 + column] === value.toString()) {
        return true;
    }

    return !regionValues.includes(value.toString());
}


  solve(puzzleString) {
    if (!this.validate(puzzleString)) {
      return false;
    }

    let puzzle = puzzleString.split("");
    let emptySpaces = [];

    for (let i = 0; i < puzzle.length; i++) {
      if (puzzle[i] === ".") {
        emptySpaces.push(i);
      }
    }

    function solveSudoku(index) {
      if (index >= emptySpaces.length) {
        return true;
      }

      let cellIndex = emptySpaces[index];
      let row = Math.floor(cellIndex / 9);
      let column = cellIndex % 9;

      for (let num = 1; num <= 9; num++) {
        if (
          this.checkRowPlacement(puzzle.join(""), row, column, num) &&
          this.checkColPlacement(puzzle.join(""), row, column, num) &&
          this.checkRegionPlacement(puzzle.join(""), row, column, num)
        ) {
          puzzle[cellIndex] = num.toString();

          if (solveSudoku.call(this, index + 1)) {
            return true;
          }

          puzzle[cellIndex] = ".";
        }
      }

      return false;
    }

    if (solveSudoku.call(this, 0)) {
      return puzzle.join("");
    }

    return false;
  }
}

module.exports = SudokuSolver;
