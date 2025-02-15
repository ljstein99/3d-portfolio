var arrowObject;
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
  const objLoader = new THREE.OBJLoader();
  objLoader.load('assets/arrow.obj', function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({ 
          color: 0xff0000,
          emissive: 0xff3333,
          emissiveIntensity: 0.2,
          metalness: 0.3,
          roughness: 0.4
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    object.rotation.x = -(Math.PI / 2);
    object.rotation.z = Math.PI / 2;
    object.scale.set(0.2, 0.2, 0.2);
    object.position.set(1.35, 1.2, 1.9);
    const glowLight = new THREE.PointLight(0xff0000, 2, 5);
    glowLight.position.set(0, 0, 0);
    object.add(glowLight);
    scene.add(object);
    arrowObject = object;
  });
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
