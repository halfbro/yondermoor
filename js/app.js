require('dotenv').config();

const Overlay = require('./overlay.js');

function run() {
  ReactDOM.render(<Overlay/>, document.getElementById('overlay'));
}

const loadedStates = ['complete', 'loaded', 'interactive'];
if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}
