import * as THREE from 'three';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/controls/PointerLockControls.js';

let camera, scene, renderer, controls;
let cube;
let pointLight, bulb;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let prevTime = performance.now();
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
const gravity = -100;
const jumpSpeed = 25;
const playerHeight = 5;
let canJump = false;
const moveSpeed = 400;
const roomSize = 75;
const wallHeight = 20;
const collisionMargin = 2;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);
  const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
  mainLight.position.set(1, 1, 1);
  scene.add(mainLight);
  const textureLoader = new THREE.TextureLoader();
  const floorTexture = textureLoader.load('assets/title.jpg');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(20, 20);
  const floorGeometry = new THREE.PlaneGeometry(roomSize, roomSize);
  const floorMaterial = new THREE.MeshLambertMaterial({ map: floorTexture });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  scene.add(floor);
  const wallTexture = textureLoader.load('assets/walls.jpg');
  wallTexture.wrapS = THREE.RepeatWrapping;
  wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(10, 2);
  const wallMaterial = new THREE.MeshLambertMaterial({ map: wallTexture, side: THREE.DoubleSide });
  const wallGeometry = new THREE.PlaneGeometry(roomSize, wallHeight);
  const northWall = new THREE.Mesh(wallGeometry, wallMaterial);
  northWall.position.set(0, wallHeight / 2, -roomSize / 2);
  scene.add(northWall);
  const southWall = new THREE.Mesh(wallGeometry, wallMaterial);
  southWall.position.set(0, wallHeight / 2, roomSize / 2);
  southWall.rotation.y = Math.PI;
  scene.add(southWall);
  const eastWall = new THREE.Mesh(wallGeometry, wallMaterial);
  eastWall.position.set(roomSize / 2, wallHeight / 2, 0);
  eastWall.rotation.y = Math.PI / 2;
  scene.add(eastWall);
  const westWall = new THREE.Mesh(wallGeometry, wallMaterial);
  westWall.position.set(-roomSize / 2, wallHeight / 2, 0);
  westWall.rotation.y = -Math.PI / 2;
  scene.add(westWall);
  const ceilingTexture = textureLoader.load('assets/ceiling.jpg');
  ceilingTexture.wrapS = THREE.RepeatWrapping;
  ceilingTexture.wrapT = THREE.RepeatWrapping;
  ceilingTexture.repeat.set(10, 10);
  const ceilingGeometry = new THREE.PlaneGeometry(roomSize, roomSize);
  const ceilingMaterial = new THREE.MeshLambertMaterial({ map: ceilingTexture, side: THREE.DoubleSide });
  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = wallHeight;
  scene.add(ceiling);
  pointLight = new THREE.PointLight(0xffffff, 1, 200);
  pointLight.position.set(0, wallHeight - 5, 0);
  scene.add(pointLight);
  const bulbGeometry = new THREE.SphereGeometry(2, 16, 8);
  const bulbMaterial = new THREE.MeshBasicMaterial({ color: 0xffffee });
  bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
  pointLight.add(bulb);
  bulb.position.set(0, 0, 0);
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  cube = new THREE.Mesh(boxGeometry, boxMaterial);
  cube.position.set(0, 3, -5);
  scene.add(cube);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  controls = new PointerLockControls(camera, document.body);
  scene.add(controls.getObject());
  controls.getObject().position.y = playerHeight;
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");
  instructions.addEventListener("click", function () { controls.lock(); });
  controls.addEventListener("lock", function () { blocker.style.display = "none"; });
  controls.addEventListener("unlock", function () { blocker.style.display = "flex"; });
  document.addEventListener("pointerlockchange", () => { console.log("Document pointerlockchange:", document.pointerLockElement); });
  document.addEventListener("pointerlockerror", (err) => { console.error("Document pointerlockerror:", err); });
  document.addEventListener("keydown", onKeyDown, false);
  document.addEventListener("keyup", onKeyUp, false);
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
    case "Space":
      if (canJump) {
        velocity.y = jumpSpeed;
        canJump = false;
      }
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
  cube.rotation.x += delta;
  cube.rotation.y += delta;
  velocity.x -= velocity.x * 10.0 * delta;
  velocity.z -= velocity.z * 10.0 * delta;
  direction.z = Number(moveForward) - Number(moveBackward);
  direction.x = Number(moveRight) - Number(moveLeft);
  direction.normalize();
  if (moveForward || moveBackward) {
    velocity.z -= direction.z * moveSpeed * delta;
  }
  if (moveLeft || moveRight) {
    velocity.x -= direction.x * moveSpeed * delta;
  }
  velocity.y += gravity * delta;
  controls.moveRight(-velocity.x * delta);
  controls.moveForward(-velocity.z * delta);
  controls.getObject().position.y += velocity.y * delta;
  if (controls.getObject().position.y < playerHeight) {
    velocity.y = 0;
    controls.getObject().position.y = playerHeight;
    canJump = true;
  }
  const lightSpeed = 0.5;
  const lightRadius = roomSize / 2 - 10;
  pointLight.position.x = lightRadius * Math.cos(time * 0.001 * lightSpeed);
  pointLight.position.z = lightRadius * Math.sin(time * 0.001 * lightSpeed);
  pointLight.position.y = wallHeight - 5;
  let pos = controls.getObject().position;
  const halfRoom = roomSize / 2;
  if (pos.x > halfRoom - collisionMargin) pos.x = halfRoom - collisionMargin;
  if (pos.x < -halfRoom + collisionMargin) pos.x = -halfRoom + collisionMargin;
  if (pos.z > halfRoom - collisionMargin) pos.z = halfRoom - collisionMargin;
  if (pos.z < -halfRoom + collisionMargin) pos.z = -halfRoom + collisionMargin;
  prevTime = time;
  renderer.render(scene, camera);
}
