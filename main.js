import * as THREE from 'three';
import Stats from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/libs/stats.module.js';
import { initScene } from './scene.js';
import { initControls } from './controls.js';
import { startAnimation } from './animate.js';

const state = initScene();
state.moveForward = false;
state.moveBackward = false;
state.moveLeft = false;
state.moveRight = false;
state.velocity = new THREE.Vector3();
state.direction = new THREE.Vector3();
state.canJump = false;
state.controls = initControls(state.camera, state.renderer.domElement);
state.prevTime = performance.now();
state.moveSpeed = 10;
state.jumpSpeed = 10;
state.gravity = -30;
state.playerHeight = 2;

const stats = new Stats();
stats.showPanel(0);
stats.dom.style.position = 'absolute';
stats.dom.style.top = '0px';
stats.dom.style.right = '0px';
document.body.appendChild(stats.dom);
state.stats = stats;

document.addEventListener("keydown", (event) => {
  switch(event.code) {
    case "ArrowUp":
    case "KeyW":
      state.moveForward = true;
      break;
    case "ArrowLeft":
    case "KeyA":
      state.moveLeft = true;
      break;
    case "ArrowDown":
    case "KeyS":
      state.moveBackward = true;
      break;
    case "ArrowRight":
    case "KeyD":
      state.moveRight = true;
      break;
    case "Space":
      if (state.canJump) {
        state.velocity.y = state.jumpSpeed;
        state.canJump = false;
      }
      break;
  }
}, false);

document.addEventListener("keyup", (event) => {
  switch(event.code) {
    case "ArrowUp":
    case "KeyW":
      state.moveForward = false;
      break;
    case "ArrowLeft":
    case "KeyA":
      state.moveLeft = false;
      break;
    case "ArrowDown":
    case "KeyS":
      state.moveBackward = false;
      break;
    case "ArrowRight":
    case "KeyD":
      state.moveRight = false;
      break;
  }
}, false);

startAnimation(state);
