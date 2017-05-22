/* eslint no-unused-vars: off */

const ReactDOM = require('react-dom');
const React = require('react');

const Game = require('./game');
const Overlay = require('./overlay');
const Renderer = require('./renderer');

let game = window.Yondermoor = new Game();

// Load the overlay and renderer once the game loads
window.addEventListener('DOMContentLoaded', () => {
  console.log('Loading Overlay and Renderer');
  game.addOverlay(ReactDOM.render(<Overlay game={game}/>, document.getElementById('overlay')));
  game.addRenderer(new Renderer(game));
  game.loadModules();
  game.start();
}, false);