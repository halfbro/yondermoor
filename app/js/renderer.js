const THREE = require('three');
const CONFIG = require('js/config');
const $ = require('jquery');

module.exports = class {
  /* Creates a THREE renderer linked to the provided game */
  constructor(game) {
    this.game = game;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(CONFIG.UI.FOV, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    // TODO Create Geometry
    /*
       - Create a mesh from geometry and material
       - Add mesh to scene
       - potentially create this from 
    */

    // example geometry
    this.boxGeom = new THREE.CubeGeometry( 200, 200, 200);
    this.boxMat = new THREE.MeshStandardMaterial({color: 0xff0000});
    this.boxMesh = new THREE.Mesh(this.boxGeom, this.boxMesh);
    this.scene.add(this.boxMesh);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
 
    $('#three-canvas').append(this.renderer.domElement);
    $(window).resize(this.resize.bind(this));

    this.render = this.render.bind(this);
    this.render();
  }

  /* Callback for window resizing to update camera aspect ratio */
  resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  /* Rapidly called to render each frames on the renderer */
  render() {
    requestAnimationFrame(this.render);

    this.boxMesh.rotation.x += 0.01;
    this.boxMesh.rotation.y += 0.02;

    this.renderer.render(this.scene, this.camera);
  }
};
