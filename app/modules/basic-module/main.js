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
    function createBox(x, y, height, color) {
      if(height <= 0)
        return;

      let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(scale, scale),
        new THREE.MeshStandardMaterial({color: color })
      );

      plane.position.x = x * scale;
      plane.position.y = height;
      plane.position.z = y * scale;
      plane.rotation.x = -Math.PI/2;

      scene.add(plane);
      return plane;
    }

    let config = this.Mod.meta.defaults;
    let diameter = config.DIAMETER;
    let noise = perlin.generatePerlinNoise(diameter, diameter, {
      octaveCount: 5,
      amplitude: 0.1,
      persistence: 0.3,
    });

    let min = Math.min(...noise), max = Math.max(...noise);

    for(let x = 0; x < diameter; x++) {
      for(let y = 0; y < diameter; y++) {
        let height = (noise[x * diameter + y]);
        let color = 0xffffff;

        // distance of point from center of island
        let dist = Math.min(Math.hypot(x - diameter/2, y - diameter/2) / diameter * 1.8, 1);

        // round off island
        height *= Math.pow(Math.cos(dist * Math.PI ) * 0.5 + 0.5, 2);

        // move entire island down so parts we don't want are submerged
        height -= config.WATERLEVEL / config.HEIGHT;

        if(height > 0) {
          // determine whether or not this is a high or a low level
          if(height > (max - min) * config.LEVEL_THRESHOLD) {
            color = 0x55dd44;
            height =  1;
          }
          else {
            color = 0x77ee75;
            height = 0.25;
          }
        } 

        // scale up island the appropriate height
        height *= config.HEIGHT;

        createBox(x - diameter/2, y - diameter/2, height, color);
      }
    }

    let water = new THREE.Mesh(
      new THREE.PlaneGeometry(scale * diameter, scale * diameter),
      new THREE.MeshStandardMaterial({color: 0x052266 })
    );

    water.position.x = diameter / 2;
    water.position.z = diameter / 2;
    water.rotation.x = -Math.PI/2;

    scene.add(water);

    this.log('Generated');
  }
};
