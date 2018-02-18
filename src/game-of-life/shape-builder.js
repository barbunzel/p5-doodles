class ShapeBuilder {
  constructor (offsetX = 0, offsetY = offsetX) {
    this._offsetX = offsetX;
    this._offsetY = offsetY;
  }

  get glider() {
    return this._properValues([
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 4, y: 1 },
      { x: 3, y: 0 },
    ]);
  }

  get smallExploder() {
    return this._properValues([
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 0, y: 2 },
      { x: 2, y: 2 },
      { x: 1, y: 3 },
    ]);
  };

  get exploder() {
    return this._properValues([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
      { x: 0, y: 4 },
      { x: 2, y: 0 },
      { x: 2, y: 4 },
      { x: 4, y: 0 },
      { x: 4, y: 1 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
      { x: 4, y: 4 },
    ]);
  };

  _properValues(arr) {
    return arr.map(v => ({ x: v.x + this._offsetX, y: v.y + this._offsetY }));
  }
}

module.exports = ShapeBuilder;
