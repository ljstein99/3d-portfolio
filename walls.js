export function checkInvisibleWalls(player, prevX, prevZ) {
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
}
