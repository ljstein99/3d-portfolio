// Now "three" will be resolved via the import map defined in index.html.
import * as THREE from 'three';
// Import PointerLockControls directly from the CDN (it internally imports "three")
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/controls/PointerLockControls.js';

let camera, scene, renderer, controls;
let cube;
let moveForward = false,
    moveBackward = false,
    moveLeft = false,
    moveRight = false;
let prevTime = performance.now();
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();

init();
animate();

function init() {
  // Create a perspective camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  // Create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  // Add a directional light
  const light = new THREE.DirectionalLight(0xffffff, 1.0);
  light.position.set(1, 1, 1);
  scene.add(light);

  // Create a red cube and position it slightly ahead
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0.5, -5);
  scene.add(cube);

  // Set up the renderer and add its canvas to the document
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Initialize PointerLockControls using the imported module.
  controls = new PointerLockControls(camera, document.body);
  // Add the controls' object (i.e. the camera container) to the scene.
  scene.add(controls.getObject());

  console.log("PointerLockControls loaded:", controls);

  // Set up the overlay elements.
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");

  // When the user clicks the instructions, try to lock the pointer.
  instructions.addEventListener("click", function () {
    console.log("Instructions clicked, attempting to lock pointer.");
    controls.lock();
  });

  // Listen for pointer lock events.
  controls.addEventListener("lock", function () {
    console.log("Pointer locked.");
    blocker.style.display = "none";
  });
  controls.addEventListener("unlock", function () {
    console.log("Pointer unlocked.");
    blocker.style.display = "flex";
  });

  // Additional event listeners for pointer lock changes and errors.
  document.addEventListener("pointerlockchange", () => {
    console.log("Document pointerlockchange:", document.pointerLockElement);
  });
  document.addEventListener("pointerlockerror", (err) => {
    console.error("Document pointerlockerror:", err);
  });

  // Keyboard event listeners for movement.
  document.addEventListener("keydown", onKeyDown, false);
  document.addEventListener("keyup", onKeyUp, false);

  // Adjust on window resize.
  window.addEventListener("resize", onWindowResize, false);
}

function onKeyDown(event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      moveForward = true;
      break;
    case "ArrowLeft":
    case "KeyA":
      moveLeft = true;
      break;
    case "ArrowDown":
    case "KeyS":
      moveBackward = true;
      break;
    case "ArrowRight":
    case "KeyD":
      moveRight = true;
      break;
  }
}

function onKeyUp(event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      moveForward = false;
      break;
    case "ArrowLeft":
    case "KeyA":
      moveLeft = false;
      break;
    case "ArrowDown":
    case "KeyS":
      moveBackward = false;
      break;
    case "ArrowRight":
    case "KeyD":
      moveRight = false;
      break;
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  const time = performance.now();
  const delta = (time - prevTime) / 1000;

  // Rotate the cube for a simple animation effect.
  cube.rotation.x += delta;
  cube.rotation.y += delta;

  // Update movement velocity based on keyboard input.
  velocity.x -= velocity.x * 10.0 * delta;
  velocity.z -= velocity.z * 10.0 * delta;

  direction.z = Number(moveForward) - Number(moveBackward);
  direction.x = Number(moveRight) - Number(moveLeft);
  direction.normalize();

  if (moveForward || moveBackward) {
    velocity.z -= direction.z * 400.0 * delta;
  }
  if (moveLeft || moveRight) {
    velocity.x -= direction.x * 400.0 * delta;
  }

  // Use the controls to move the camera.
  controls.moveRight(-velocity.x * delta);
  controls.moveForward(-velocity.z * delta);

  prevTime = time;
  renderer.render(scene, camera);
}
