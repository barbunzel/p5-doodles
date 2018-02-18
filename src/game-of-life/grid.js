const _ = require('lodash');
const Cell = require('./cell');

const randomNumber = () => {
  return Math.floor(Math.random() * 2);
};

class Grid {
  constructor(rows, cols, options) {
    this._rows = rows;
    this._cols = cols;
    this._options = options;
    this._resolution = _.get(options, 'resolution', 10);
    this._noBorders = _.get(options, 'noBorders', false);
    this._initialValues = _.get(options, 'initialValues');
    this._initialWeight = _.get(options, 'initialWeight');
    this._draw = _.get(options, 'draw');
    this._generation = this._generateGrid(rows, cols);
    this._numberOfGenrations = 1;
  }

  draw() {
    this._generation.forEach((row) => {
      row.forEach((cell) => {
        cell.draw();
      });
    });
  }

  get generation() {
    return this._generation;
  }

  nextGeneration() {
    const nextGeneration = _.cloneDeep(this._generation);
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < this._cols; j++) {
        const currentCell = this._generation[i][j];
        const liveNeighbors = this._countNeighbors(i, j);
        if (currentCell.state && liveNeighbors < 2) {
          nextGeneration[i][j].state = 0;
        }
        if (currentCell.state && liveNeighbors > 3) {
          nextGeneration[i][j].state = 0;
        }
        if (!currentCell.state && liveNeighbors === 3) {
          nextGeneration[i][j].state = 1;
        }
      }
    }
    this._generation = nextGeneration;
    this._numberOfGenrations++;
  }

  _generateGrid(r, c) {
    const grid = [];
    for (let i = 0; i < r; i++) {
      grid[i] = [];
      for (let j = 0; j < c; j++) {
        grid[i][j] = new Cell(this._properState(i, j), {
          x: i * this._resolution,
          y: j * this._resolution,
          width: this._resolution,
          height: this._resolution,
        }, this._options);
      }
    }
    return grid;
  }

  _properState(x, y) {
    if (this._initialValues) {
      const found = this._initialValues.filter((v) => v.x === x && v.y === y);
      if (found.length) {
        return 1;
      }
      return 0;
    }
    return this._initialWeight ? this._weightedState() : randomNumber();
  }

  _weightedState() {
    const number = Math.floor(Math.random() * 100);
    if (number > 100 - this._initialWeight.alive) {
      return 1;
    }
    return 0;
  }

  _countNeighbors(row, col, state = 1) {
    let total = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        total += this._neighborStateWithProperBoundaries(row + i, col + j) === state;
      }
    }
    total -= this._generation[row][col].state;
    return total;
  }

  _neighborStateWithProperBoundaries(posX, posY) {
    if (this._noBorders) {
      return this._neighborStateWithNoBorders(posX, posY);
    } else {
      return this._neighborStateWithBorders(posX, posY);
    }
  }

  _neighborStateWithBorders(posX, posY) {
    if (posX < 0 || posX >= this._rows) {
      return 0;
    }
    if (posY < 0 || posY >= this._cols) {
      return 0;
    }
    return this._generation[posX][posY].state;
  }

  _neighborStateWithNoBorders(posX, posY) {
    return this._generation[(posX + this._rows) % this._rows][(posY + this._cols) % this._cols].state;
  }
}

module.exports = Grid;
