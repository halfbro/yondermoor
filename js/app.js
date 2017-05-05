window.THREE = THREE;

// Game configuration for easy access
window.CONFIG = {
  UI: {
    FOV: 90,
  },
};

const Game = require('./game.js');
const Overlay = require('./overlay.js');
const Renderer = require('./renderer.js');

let game = window.Yondermoor = new Game();

// Load the overlay and renderer once the game loads
window.addEventListener('DOMContentLoaded', () => {
  console.log('Loading Overlay and Renderer');
  game.addOverlay(ReactDOM.render(<Overlay game={game}/>, document.getElementById('overlay')));
  game.addRenderer(new Renderer(game));
}, false);
