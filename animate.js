let velocityY = 0;
const gravity = -0.001;
const jumpSpeed = 0.04;
const playerHeight = 1.4;
function handleMovement() {
  if (keys['w']) controls.moveForward(moveSpeed);
  if (keys['s']) controls.moveForward(-moveSpeed);
  if (keys['a']) controls.moveRight(-moveSpeed);
  if (keys['d']) controls.moveRight(moveSpeed);
  const player = controls.getObject();
  if (keys['space'] && Math.abs(player.position.y - playerHeight) < 0.01) {
    velocityY = jumpSpeed;
  }
}
function updateCoordinates() {
  if (!controls) return;
  const pos = controls.getObject().position;
  document.getElementById('coordinates').innerHTML = `Coordinates: (${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)})`;
}
function animate() {
  requestAnimationFrame(animate);
  if (document.pointerLockElement) {
    const player = controls.getObject();
    const prevX = player.position.x;
    const prevZ = player.position.z;
    handleMovement();
    if (Math.abs(player.position.x - 2.2) < 0.05 &&
        player.position.y > 1.0 && player.position.y < 10.0 &&
        player.position.z > -6.5 && player.position.z < 7.2) {
      player.position.x = prevX;
    }
    if (player.position.x > -5.8 && player.position.x < 2.30 &&
        player.position.y > 1.0 && player.position.y < 10.0 &&
        Math.abs(player.position.z + 6.20) < 0.05) {
      player.position.z = prevZ;
    }
    if (Math.abs(player.position.x + 5.8) < 0.05 &&
        player.position.y > 1.0 && player.position.y < 10.0 &&
        player.position.z > -6.5 && player.position.z < 1.9) {
      player.position.x = prevX;
    }
    if (player.position.x > -6 && player.position.x < -2.3 &&
        player.position.y > 1.0 && player.position.y < 10.0 &&
        Math.abs(player.position.z - 1.9) < 0.05) {
      player.position.z = prevZ;
    }
    if (Math.abs(player.position.x + 2.3) < 0.05 &&
        player.position.y > 1.0 && player.position.y < 10.0 &&
        player.position.z > 1.9 && player.position.z < 2.8) {
      player.position.x = prevX;
    }
    if (player.position.x > -3.8 && player.position.x < -2.3 &&
        player.position.y > 1.0 && player.position.y < 10.0 &&
        Math.abs(player.position.z - 2.8) < 0.05) {
      player.position.z = prevZ;
    }
    if (Math.abs(player.position.x + 3.8) < 0.05 &&
        player.position.y > 1.0 && player.position.y < 10.0 &&
        player.position.z > 2.8 && player.position.z < 6.9) {
      player.position.x = prevX;
    }
    if (player.position.x > -3.8 && player.position.x < 2.2 &&
        player.position.y > 1.0 && player.position.y < 10.0 &&
        Math.abs(player.position.z - 6.9) < 0.05) {
      player.position.z = prevZ;
    }
    if (player.position.x > -2.3 && player.position.x < -3.8 &&
        player.position.y > 1.0 && player.position.y < 10.0 &&
        Math.abs(player.position.z - 6.9) < 0.05) {
      player.position.x = prevX;
    }
    if (player.position.x > 0 && player.position.x < 2.2 &&
        player.position.y > 1.0 && player.position.y < 10.0 &&
        Math.abs(player.position.z - 1.99) < 0.05) {
      player.position.z = prevZ;
    }
    if (Math.abs(player.position.x) < 0.05 &&
        player.position.y > 1.0 && player.position.y < 10.0 &&
        player.position.z > 1.95 && player.position.z < 2.8) {
      player.position.x = prevX;
    }
    if (player.position.x > 0 && player.position.x < 2.2 &&
        player.position.y > 1.0 && player.position.y < 10.0 &&
        Math.abs(player.position.z - 2.77) < 0.05) {
      player.position.z = prevZ;
    }
    velocityY += gravity;
    player.position.y += velocityY;
    if (player.position.y < playerHeight) {
      player.position.y = playerHeight;
      velocityY = 0;
    }
  }
  updateCoordinates();
  renderer.render(scene, camera);
}
animate();
