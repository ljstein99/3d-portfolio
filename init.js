function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
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
    
    THREE.RectAreaLightUniformsLib.init();
    rectLightsConfigs.forEach((config) => {
      const { rectLight, rectLightMesh, spotLight } = createRectangularLightWithShadows(config);
      scene.add(rectLight);
      scene.add(rectLightMesh);
      scene.add(spotLight);
      scene.add(spotLight.target);
    });
    
    const loader = new THREE.GLTFLoader();
    loader.load(
      'assets/room.glb',
      function (gltf) {
        const model = gltf.scene;
        model.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(model);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
    
    controls = new THREE.PointerLockControls(camera, document.body);
    controls.getObject().position.set(-1.5, 2, 0);
    scene.add(controls.getObject());
    
    window.addEventListener('resize', onWindowResize, false);
  }
  
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  init();
  