import _ from 'lodash';
import p5 from 'p5';

const newSketch = () => {
  return new p5(require(`.${window.location.pathname}/src.js`));
}

newSketch();

if (module.hot) {
  module.hot.accept('./index.js', function() {
    newSketch();
  })
}
