class GameObject {
  // A generic game object
  constructor(config) {
    // config is an object that holds properties
    this.x = config.x || 0; // Position in the overworld grid
    this.y = config.y || 0; // Position in the overworld grid
    this.direction = config.direction || "down"; // Direction the object is facing

    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "images/characters/people/hero.png",
    }); // Placeholder for sprite image
  }
  update() {
    // Placeholder for update logic (e.g., movement, interactions)
  }
}
