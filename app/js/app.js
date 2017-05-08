// Game configuration for easy access

const ReactDOM = require('react-dom');
const React = require('react');

const Game = require('js/game');
const Overlay = require('js/overlay');
const Renderer = require('js/renderer');

let game = window.Yondermoor = new Game();

// Load the overlay and renderer once the game loads
window.addEventListener('DOMContentLoaded', () => {
  console.log('Loading Overlay and Renderer');
  game.addOverlay(ReactDOM.render(<Overlay game={game}/>, document.getElementById('overlay')));
  game.addRenderer(new Renderer(game));
}, false);
