let Module = {};

Module.log = function() {
  let args = [];
  Array.prototype.push.apply(args, arguments);
  let Mod = args.shift();
  if(Mod.Mod) // maybe the object was passed instead of the class
    Mod = Mod.Mod;
  console.log('[' + Mod.__directory + ']:', ...args);
};

/* Loads all the modules*/
Module.load = function(game) {
  if(this.__loaded || typeof game === 'undefined')
    return;
  this.__loaded = true;

  global.require.list().forEach(path => {
    let match = path.match(/^modules\/(.*?)\/main.js$/);
    if(match) {
      console.log('Loading module', match[1]);
      Module.loadModule(game, path);
    }
  });
};

/* Loads a single module from a path */
Module.loadModule = function(game, path) {
  if(Module[path])
    return;

  let Mod = require(path);
  let folder = path.match(/^modules\/(.*?)\/main.js$/);
  // Get the description.json for metadata
  Mod.meta = require('modules/' + folder[1] + '/description.json');
  Mod.__directory = folder[1];

  if(typeof Mod.meta === 'undefined') {
    Module.log(Mod, 'Could not find description.json');
    return;
  }
  
  // Check for dependencies
  if(typeof Mod.meta.dependencies !== 'undefined') {
    Mod.meta.dependencies.forEach(d =>
      Module.loadModule(game, 'modules/' + d + '/main.js'));
  }

  Module[path] = Mod;
  game.addModule(Mod);
};

/* World generator superclass */
Module.Generator = class {
  constructor(Mod, game) {
    this.game = game;
    this.Mod = Mod;
  }
};

/* World generation priorities */
Module.Generator.priority = {
  TERRAIN: 40,
  DECORATION: 30,
  INTERACTION: 10,
  LIGHTING: 0,
  EFFECT: 0,
  ZONE: 0,
};

module.exports = Module;