import { checkInvisibleWalls } from './walls.js';
let velocityY = 0;
const gravity = -0.001;
const jumpSpeed = 0.04;
const playerHeight = 1.4;
let inLaptopView = false;
let transitioningToLaptop = false;
let transitionStartTime = 0;
const transitionDuration = 2000;
let savedUserCameraPosition = new THREE.Vector3();
let savedUserCameraQuaternion = new THREE.Quaternion();
const laptopCameraPosition = new THREE.Vector3(1.355, 0.83, 1.74);
const laptopCameraTarget = new THREE.Vector3(1.37, 0.7, 2.74);
let laptopCameraQuaternion = new THREE.Quaternion();
let exitLaptopRequested = false;
let laptopPromptTimeout = null;
function computeLaptopCameraQuaternion() {
  const m = new THREE.Matrix4();
  m.lookAt(laptopCameraPosition, laptopCameraTarget, camera.up);
  const q = new THREE.Quaternion();
  q.setFromRotationMatrix(m);
  return q;
}
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
  if (inLaptopView) {
    controls.enabled = false;
  } else {
    controls.enabled = true;
  }
  if (document.pointerLockElement || inLaptopView || transitioningToLaptop) {
    const player = controls.getObject();
    if (!inLaptopView && !transitioningToLaptop) {
      const prevX = player.position.x;
      const prevZ = player.position.z;
      handleMovement();
      checkInvisibleWalls(player, prevX, prevZ);
      velocityY += gravity;
      player.position.y += velocityY;
      if (player.position.y < playerHeight) {
        player.position.y = playerHeight;
        velocityY = 0;
      }
      if (arrowObject) {
        arrowObject.position.y = 1.2 + Math.sin(Date.now() * 0.002) * 0.1;
      }
      const laptopZone = new THREE.Vector3(0.67, 1.4, 1.06);
      const promptDiv = document.getElementById('laptopPrompt');
      if (player.position.distanceTo(laptopZone) < 0.75) {
        if(laptopPromptTimeout !== null){
          clearTimeout(laptopPromptTimeout);
          laptopPromptTimeout = null;
        }
        promptDiv.innerHTML = "Press T to access laptop";
        promptDiv.classList.add('active');
        if (keys['t']) {
          savedUserCameraPosition.copy(camera.position);
          savedUserCameraQuaternion.copy(camera.quaternion);
          transitioningToLaptop = true;
          transitionStartTime = performance.now();
          window.ignorePauseOverlay = true;
          document.getElementById("pauseOverlay").style.display = "none";
          controls.unlock();
          promptDiv.classList.remove('active');
          setTimeout(() => { promptDiv.innerHTML = ""; }, 1000);
          keys['t'] = false;
        }
      } else {
        promptDiv.classList.remove('active');
        if(laptopPromptTimeout === null){
          laptopPromptTimeout = setTimeout(() => {
            promptDiv.innerHTML = "";
            laptopPromptTimeout = null;
          }, 1000);
        }
      }
    } else if (transitioningToLaptop) {
      let elapsed = performance.now() - transitionStartTime;
      let progress = Math.min(elapsed / transitionDuration, 1);
      camera.position.lerpVectors(savedUserCameraPosition, laptopCameraPosition, progress);
      laptopCameraQuaternion = computeLaptopCameraQuaternion();
      camera.quaternion.slerpQuaternions(savedUserCameraQuaternion, laptopCameraQuaternion, progress);
      if (progress >= 1) {
        transitioningToLaptop = false;
        inLaptopView = true;
        window.ignorePauseOverlay = false;
        document.getElementById('exitLaptopButton').classList.add('active');
      }
    } else if (inLaptopView) {
      document.getElementById('exitLaptopButton').classList.add('active');
      if (keys['t'] || exitLaptopRequested) {
        camera.position.set(0.39, 1.4, 0.95);
        let target = new THREE.Vector3(0.39, 1.4, 0.95).add(new THREE.Vector3(1, 0, 1).normalize());
        camera.lookAt(target);
        inLaptopView = false;
        exitLaptopRequested = false;
        document.getElementById('exitLaptopButton').classList.remove('active');
        controls.lock();
        keys['t'] = false;
      }
    }
  }
  updateCoordinates();
  renderer.render(scene, camera);
}
animate();
document.addEventListener("keydown", (e) => {
  if (inLaptopView && e.key.toLowerCase() === "t") {
    exitLaptopRequested = true;
  }
});
document.getElementById('exitLaptopButton').addEventListener('click', () => {
  exitLaptopRequested = true;
});
