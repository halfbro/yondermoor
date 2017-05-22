const Module = require('js/module');

module.exports = class extends Module.Generator {
  constructor(Class, game) {
    super(Class, game);

    this.priority = {
      generator: Module.Generator.priority.TERRAIN
    };

    Module.log(this, 'Basic Module');
  }

  generate() {
    Module.log(this, 'Generating');
    //this.game.scene.add()
  }
};
