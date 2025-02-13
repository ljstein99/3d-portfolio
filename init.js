function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
  const floorMaterial = new THREE.MeshBasicMaterial({ visible: false });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  scene.add(floor);
  const wallGeometry = new THREE.BoxGeometry(0.1, 9.0, 13.7);
  const wallMaterial = new THREE.MeshBasicMaterial({ visible: false });
  const wall = new THREE.Mesh(wallGeometry, wallMaterial);
  wall.position.set(2.2, 5.5, 0.35);
  scene.add(wall);
  const wallGeometry2 = new THREE.BoxGeometry(8.15, 9.0, 0.1);
  const wallMaterial2 = new THREE.MeshBasicMaterial({ visible: false });
  const wall2 = new THREE.Mesh(wallGeometry2, wallMaterial2);
  wall2.position.set(-1.775, 5.5, -6.20);
  scene.add(wall2);
  THREE.RectAreaLightUniformsLib.init();
  rectLightsConfigs.forEach((config) => {
    const { rectLight, rectLightMesh, spotLight } = createRectangularLightWithShadows(config);
    scene.add(rectLight);
    scene.add(rectLightMesh);
    scene.add(spotLight);
    scene.add(spotLight.target);
  });
  const loader = new THREE.GLTFLoader();
  loader.load('assets/room.glb', function(gltf) {
    const model = gltf.scene;
    model.traverse(function(child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(model);
  }, undefined, function(error) {
    console.error(error);
  });
  controls = new THREE.PointerLockControls(camera, document.body);
  controls.getObject().position.set(-1.5, 1.4, 0);
  scene.add(controls.getObject());
  window.addEventListener('resize', onWindowResize, false);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
init();
