import * as THREE from "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js";
import { PointerLockControls } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/controls/PointerLockControls.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// Floor
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Test Object (Your "info" goal)
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 1, -5);
scene.add(box);

// First-person controls
const controls = new PointerLockControls(camera, document.body);
document.addEventListener("click", () => controls.lock());

const movement = { w: false, a: false, s: false, d: false };
document.addEventListener("keydown", (e) => {
    if (e.key === "w") movement.w = true;
    if (e.key === "a") movement.a = true;
    if (e.key === "s") movement.s = true;
    if (e.key === "d") movement.d = true;
});
document.addEventListener("keyup", (e) => {
    if (e.key === "w") movement.w = false;
    if (e.key === "a") movement.a = false;
    if (e.key === "s") movement.s = false;
    if (e.key === "d") movement.d = false;
});

// Game Loop
function animate() {
    requestAnimationFrame(animate);

    if (movement.w) camera.position.z -= 0.1;
    if (movement.s) camera.position.z += 0.1;
    if (movement.a) camera.position.x -= 0.1;
    if (movement.d) camera.position.x += 0.1;

    renderer.render(scene, camera);
}
animate();
