import * as THREE from 'three';
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

document.addEventListener("keydown", (event) => {
  switch(event.code){
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
      if(state.canJump){ state.velocity.y = state.jumpSpeed; state.canJump = false; }
      break;
  }
}, false);

document.addEventListener("keyup", (event) => {
  switch(event.code){
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
