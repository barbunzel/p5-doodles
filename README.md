# p5 doodles

Inspired by [The Coding Train](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw), this is a repo with some p5 "doodles" I'll be working on. By doodles I mean small things/challenges/ideas/whatever done in p5, sort of like a doodle.

It serves an html file for you to work on a doodle on a `src.js` file, matching the name of the route with the doodle folder under the `./src/` folder. For example, if you go to `localhost:5000/game-of-life`, the contents of `./src/game-of-life/src.js` will be loaded with p5.

### Installing

- Make sure you have `node` and `npm` installed (refer to [nodejs.org](https://nodejs.org/en/)), as well as [git](https://git-scm.com/)
- Clone this repo into a folder `git clone https://github.com/dieguito151/p5-doodles.git <desired-directory>`
- `npm install` everything
- Run it with `npm start`

### Using p5 doodles

Create a new folder with the desired doodle name on `./src/` and inside the new folder create a new file called `/src.js`. For example, `./src/example/src.js`. **Important**: I'm using `require`s in this project, `import`s won't work, so keep in mind that you have to `require` everything and set `module.exports` on all modules.

`./src/example/src.js` will receive a `p5` instance:

```javascript
module.exports = (p5) => {
    p5.setup() {
        // setup code
    }
    
    p5.draw() {
        // draw code
    }
}
```

Now go to `localhost:5000/example` and your drawing will be there.
