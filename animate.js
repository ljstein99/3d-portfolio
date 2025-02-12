export function startAnimation(state) {
  let prevTime = state.prevTime;
  function animate() {
    if (state.stats) state.stats.begin();
    requestAnimationFrame(animate);
    const time = performance.now();
    const delta = (time - prevTime) / 1000;

    if (state.velocity) {
      let moveZ = 0;
      let moveX = 0;
      if (state.moveForward)  moveZ += 1;
      if (state.moveBackward) moveZ -= 1;
      if (state.moveLeft)     moveX -= 1;
      if (state.moveRight)    moveX += 1;
      const length = Math.sqrt(moveX * moveX + moveZ * moveZ);
      if (length > 0) {
        moveX /= length;
        moveZ /= length;
      }
      const speed = state.moveSpeed * delta;
      state.controls.moveForward(moveZ * speed);
      state.controls.moveRight(moveX * speed);
      state.velocity.y += state.gravity * delta;
      state.controls.getObject().position.y += state.velocity.y * delta;

      if (state.controls.getObject().position.y < state.playerHeight) {
        state.velocity.y = 0;
        state.controls.getObject().position.y = state.playerHeight;
        state.canJump = true;
      }
    }
    prevTime = time;
    state.renderer.render(state.scene, state.camera);
    if (state.stats) state.stats.end();
  }
  animate();
}
