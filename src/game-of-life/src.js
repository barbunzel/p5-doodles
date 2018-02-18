const Grid = require('./grid.js');
const ShapeBuilder = require('./shape-builder.js');

const WIDTH = 800;
const HEIGHT = 800;
const RESOLUTION = 10;
const FRAME_RATE = 15;
const initialWeight = {
  alive: 10,
};

module.exports = (p5) => {
  const drawFun = (x, y, width, height, color) => {
    p5.fill(color);
    p5.rect(x, y, width, height);
  }

  const grid = new Grid(Math.round(WIDTH / RESOLUTION), Math.round(HEIGHT / RESOLUTION), {
    resolution: RESOLUTION,
    // noBorders: true,
    // initialValues: new ShapeBuilder(20).exploder,
    initialWeight,
    draw: drawFun,
  });

  p5.setup = () => {
    p5.createCanvas(WIDTH, HEIGHT);
    p5.frameRate(FRAME_RATE);
  }
  
  p5.draw = () => {
    grid.draw();
    grid.nextGeneration();
  }
}
