const _ = require('lodash');

class Cell {
  constructor(state, data, options) {
    this._state = state;
    this._x = _.get(data, 'x');
    this._y = _.get(data, 'y');
    this._width = _.get(data, 'width');
    this._height = _.get(data, 'height');
    this._draw = _.get(options, 'draw');
    this._previousState = 0;
  }

  draw() {
    this._draw(this._x, this._y, this._width, this._height, this._normalizedState());
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    this._previousState = this._state;
    this._state = newState;
  }

  _normalizedState() {
    return this._state === 1 ? 255 : 0
  }
}

module.exports = Cell;
