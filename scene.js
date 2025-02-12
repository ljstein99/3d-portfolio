import * as THREE from 'three';
import { EXRLoader } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/loaders/EXRLoader.js';
import { loadcity } from './loadcity.js';

export function initScene() {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  const scene = new THREE.Scene();
  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(50, 50, 50);
  dirLight.castShadow = true;
  scene.add(dirLight);
  const exrLoader = new EXRLoader();
  exrLoader.load('assets/skybox.exr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  });
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.set(-30, 10, -30);
  const colliders = [];
  loadcity(scene, colliders);
  return { scene, camera, renderer, colliders };
}
