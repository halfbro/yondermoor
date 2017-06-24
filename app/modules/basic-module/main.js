const Module = require('js/module');
const THREE = require('three');
const perlin = require('perlin-noise');

module.exports = class extends Module.Generator {
  constructor(Class, game) {
    super(Class, game);

    this.priority = {
      generator: Module.Generator.priority.TERRAIN
    };

    this.log('Basic Module');
    this.generate = this.generate.bind(this);
  }

  generate() {
    this.log('Generating');
    let scene = this.game.renderer.scene;
    let scale = 20;

    // Box creation helper function lmao sorry
    // starting with boxes because we'll do verticies later
    function createBox(x, y, height) {
      if(height <= 0)
        return;

      let box = new THREE.Mesh(
        new THREE.CubeGeometry(scale, height * scale, scale),
        new THREE.MeshStandardMaterial({color: 0xffffff })
      );

      box.position.x = x * scale;
      box.position.y = height * scale / 2;
      box.position.z = y * scale;

      scene.add(box);
      return box;
    }

    let config = this.Mod.meta.defaults;
    let width = config.WIDTH;
    let noise = perlin.generatePerlinNoise(width, width, {
      octaveCount: 4,
      amplitude: 0.1,
      persistence: 0.3,
    });

    let min = Math.min(...noise), max = Math.max(...noise);

    for(let x = 0; x < width; x++) {
      for(let y = 0; y < width; y++) {
        let depth = (noise[x * width + y]);
        let dist = Math.min(Math.hypot(x - width/2, y - width/2) / width * 1.8, 1);
        //depth *= Math.sqrt(1 - dist);
        depth *= Math.pow(Math.cos(dist * Math.PI ) * 0.5 + 0.5, 1);
        depth -= config.WATERLEVEL / config.HEIGHT;
        if(depth > 0) {
          if(depth > (max - min) * 0.2)
            depth = 1;
          else
            depth = 0.5;
        }
        depth *= config.HEIGHT;

        //depth = Math.round(depth * 2 + 0.45) / 2;
        createBox(x - width/2, y - width/2, depth);
      }
    }

    this.log('Generated');
  }
};
