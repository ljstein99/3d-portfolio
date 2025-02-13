function createRectangularLightWithShadows(config) {
    const rectLight = new THREE.RectAreaLight(
      config.color,
      config.intensity,
      config.width,
      config.height
    );
    rectLight.position.copy(config.position);
    rectLight.rotation.copy(config.rotation);
    
    const geometry = new THREE.PlaneGeometry(config.width, config.height);
    const material = new THREE.MeshStandardMaterial({
      color: config.color,
      emissive: config.color,
      emissiveIntensity: 1,
      side: THREE.FrontSide
    });
    const rectLightMesh = new THREE.Mesh(geometry, material);
    rectLightMesh.position.copy(config.position);
    rectLightMesh.rotation.copy(config.rotation);
    
    const spotLight = new THREE.SpotLight(
      config.color,
      config.intensity,
      15,
      Math.PI / 4,
      0.2,
      1
    );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 4096;
    spotLight.shadow.mapSize.height = 4096;
    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 50;
    spotLight.shadow.bias = -0.001;
    spotLight.position.copy(config.position);
    
    const direction = new THREE.Vector3(0, 0, -1).applyEuler(config.rotation);
    const targetPos = config.position.clone().add(direction);
    spotLight.target.position.copy(targetPos);
    
    return { rectLight, rectLightMesh, spotLight };
  }
  