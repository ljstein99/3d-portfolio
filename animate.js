import * as THREE from 'three';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/postprocessing/RenderPass.js';
import { SSAOPass } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/postprocessing/SSAOPass.js';

export function startAnimation(state) {
  let prevTime = state.prevTime;
  const composer = new EffectComposer(state.renderer);
  const renderPass = new RenderPass(state.scene, state.camera);
  composer.addPass(renderPass);
  const ssaoPass = new SSAOPass(state.scene, state.camera, window.innerWidth, window.innerHeight);
  ssaoPass.kernelRadius = 10;
  ssaoPass.minDistance = 0.005;
  ssaoPass.maxDistance = 0.01;
  composer.addPass(ssaoPass);
  
  function animate() {
    requestAnimationFrame(animate);
    const time = performance.now();
    const delta = (time - prevTime) / 1000;
    
    state.cube.rotation.x += delta;
    state.cube.rotation.y += delta;
    
    state.velocity.x -= state.velocity.x * 10.0 * delta;
    state.velocity.z -= state.velocity.z * 10.0 * delta;
    
    state.direction.z = (state.moveForward ? 1 : 0) - (state.moveBackward ? 1 : 0);
    state.direction.x = (state.moveRight ? 1 : 0) - (state.moveLeft ? 1 : 0);
    state.direction.normalize();
    
    if (state.moveForward || state.moveBackward) {
      state.velocity.z -= state.direction.z * state.moveSpeed * delta;
    }
    if (state.moveLeft || state.moveRight) {
      state.velocity.x -= state.direction.x * state.moveSpeed * delta;
    }
    
    state.velocity.y += state.gravity * delta;
    state.controls.moveRight(-state.velocity.x * delta);
    state.controls.moveForward(-state.velocity.z * delta);
    state.controls.getObject().position.y += state.velocity.y * delta;
    if (state.controls.getObject().position.y < state.playerHeight) {
      state.velocity.y = 0;
      state.controls.getObject().position.y = state.playerHeight;
      state.canJump = true;
    }
    
    const lightSpeed = 0.5;
    const lightRadius = state.roomSize / 2 - 10;
    state.pointLight.position.x = lightRadius * Math.cos(time * 0.001 * lightSpeed);
    state.pointLight.position.z = lightRadius * Math.sin(time * 0.001 * lightSpeed);
    state.pointLight.position.y = state.wallHeight - 5;
    
    let pos = state.controls.getObject().position;
    const halfRoom = state.roomSize / 2;
    if (pos.x > halfRoom - state.collisionMargin) pos.x = halfRoom - state.collisionMargin;
    if (pos.x < -halfRoom + state.collisionMargin) pos.x = -halfRoom + state.collisionMargin;
    if (pos.z > halfRoom - state.collisionMargin) pos.z = halfRoom - state.collisionMargin;
    if (pos.z < -halfRoom + state.collisionMargin) pos.z = -halfRoom + state.collisionMargin;
    
    prevTime = time;
    composer.render(delta);
  }
  
  animate();
}
