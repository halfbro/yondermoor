const Module = require('./module');

module.exports = class {
  constructor() {
    this.players = [];

    // dictionary of modules the game will interface with
    this.modules = {
      generator: []
    };
  }

  /* Starts the game after all initialization */
  start() {
    // sort generating modules by priority
    this.modules.generator.sort((a,b) =>
      (b.priority.generator || 0) - (a.priority.generator || 0));

    this.modules.generator.forEach(gen => gen.generate());

    this.renderer.render();
  }

  /* Links the overlay to the game */
  addOverlay(overlay) {
    this.overlay = overlay;
  }

  /* Links the renderer to the game */
  addRenderer(renderer) {
    this.renderer = renderer;
  }

  /* Load the modules from the script folders */
  loadModules() {
    Module.load(this);
  }

  /* Add a module to the game */
  addModule(Mod) {
    let mod = new Mod(Mod, this);

    // modType is required
    if(typeof Mod.meta.modType === 'undefined')
      return;

    // convert string modtype to array (to support mods with multiple types)
    if(typeof Mod.meta.modType === 'string') {
      Mod.meta.modType = [Mod.meta.modType];
    }
    
    let game = this;
    if(typeof Mod.meta.modType !== 'undefined') {
      Mod.meta.modType.forEach(type => {
        // check if this type of module exists
        if(typeof game.modules[type] !== 'undefined') {
          game.modules[type].push(mod);
        } else {
          Module.log(Mod, 'Undefined module type "', type, '"');
        }
      });
    } else {
      Module.log(Mod, 'Module type must be string or array');
    }
  }

  /* Gets a list of the added modules */
  getModules() {
    return this.modules.map(m=>m);
  }

  /* Used by the overlay and renderer, gets the host player */
  getCurrentPlayer() {}

};
