let camera, scene, renderer, controls;
const moveSpeed = 0.02;
const keys = {};
const rectLightsConfigs = [
  {
    width: 1.3,
    height: 2.3,
    position: new THREE.Vector3(3.3, 2.04, 0.35),
    rotation: new THREE.Euler(0, Math.PI / 2, 0),
    color: 0xffffaa,
    intensity: 1
  },
  {
    width: 1.3,
    height: 2.7,
    position: new THREE.Vector3(3.3, 1.82, 4.9),
    rotation: new THREE.Euler(0, Math.PI / 2, 0),
    color: 0xffffaa,
    intensity: 1
  },
  {
    width: 1.3,
    height: 2.3,
    position: new THREE.Vector3(3.3, 2.04, -4.55),
    rotation: new THREE.Euler(0, Math.PI / 2, 0),
    color: 0xffffaa,
    intensity: 1
  }
];
