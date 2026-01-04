class Sprite {
  // A generic sprite class
  constructor(config) {
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };
    //shawdowed line
    this.shadow = new Image();
    this.useShadow = true; // Always use shadow for better visibility
    if (this.useShadow) {
      this.shadow.src = "images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    // Configure Animation & Initial State
    this.animations = config.animations || {
      "idle-down": [[0, 0]],
      "idle-right": [[0, 1]],
      "idle-up": [[0, 2]],
      "idle-left": [[0, 3]],
      "walk-down": [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      "walk-right": [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      "walk-up": [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      "walk-left": [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };
    this.currentAnimation = "walk-down"; // config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0; // Which frame of the animation we are on

    this.animationFrameLimit = config.animationFrameLimit || 4;
    this.animationFrameProgress = this.animationFrameLimit;

    // reference to the game object
    this.gameObject = config.gameObject;
  }
  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }
  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }
  updateAnimationProgress() {
    // Downstick frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }
    //Reset the counter
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;
    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }
  draw(ctx) {
    const x = this.gameObject.x - 8; // x position
    const y = this.gameObject.y - 18; // y position
    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);
    const [frameX, frameY] = this.frame;
    this.isLoaded &&
      ctx.drawImage(this.image, frameX * 32, frameY * 32, 32, 32, x, y, 32, 32);
    this.updateAnimationProgress();
  }
}
