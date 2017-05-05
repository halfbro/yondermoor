module.exports = class {
  constructor() {
    this.players = [];
  }

  /* Links the overlay to the game */
  addOverlay(overlay) {
    this.overlay = overlay;
  }

  /* Links the renderer to the game */
  addRenderer(renderer) {
    this.renderer = renderer;
  }

  /* Used by the overlay and renderer, gets the host player */
  getCurrentPlayer() {}

};