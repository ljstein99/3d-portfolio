import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/controls/PointerLockControls.js';

export function initControls(camera, domElement) {
  const controls = new PointerLockControls(camera, domElement);
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");
  instructions.addEventListener("click", () => {
    controls.lock();
  });
  controls.addEventListener("lock", () => {
    blocker.style.display = "none";
  });
  controls.addEventListener("unlock", () => {
    blocker.style.display = "flex";
  });
  return controls;
}
