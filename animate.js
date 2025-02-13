function handleMovement() {
    if (keys['w']) controls.moveForward(moveSpeed);
    if (keys['s']) controls.moveForward(-moveSpeed);
    if (keys['a']) controls.moveRight(-moveSpeed);
    if (keys['d']) controls.moveRight(moveSpeed);
    if (keys['shift']) controls.getObject().position.y -= moveSpeed;
    if (keys['space']) controls.getObject().position.y += moveSpeed;
  }
  
  function updateCoordinates() {
    const pos = controls.getObject().position;
    document.getElementById('coordinates').innerHTML =
      `Coordinates: (${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)})`;
  }
  
  function animate() {
    requestAnimationFrame(animate);
    handleMovement();
    updateCoordinates();
    renderer.render(scene, camera);
  }
  
  animate();
  