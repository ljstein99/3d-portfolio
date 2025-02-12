import * as THREE from 'three';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/loaders/OBJLoader.js';

export function loadcity(scene, colliders) {
  const objLoader = new OBJLoader();
  const textureLoader = new THREE.TextureLoader();
  const textures = {
    grass: textureLoader.load('assets/city/Grass_AlbedoTransparency.png'),
    palette: textureLoader.load('assets/city/Color_Palette.png')
  };
  textures.grass.encoding = THREE.sRGBEncoding;
  textures.palette.encoding = THREE.sRGBEncoding;
  const models = [
    'model_0.obj','model_1.obj','model_2.obj','model_3.obj','model_4.obj',
    'model_5.obj','model_6.obj','model_7.obj','model_8.obj','model_9.obj',
    'model_10.obj','model_11.obj','model_12.obj','model_13.obj','model_14.obj',
    'model_15.obj','model_16.obj','model_17.obj','model_18.obj','model_19.obj'
  ];
  models.forEach((modelFile) => {
    objLoader.load(`assets/city/${modelFile}`, (object) => {
      object.scale.set(0.01, 0.01, 0.01);
      object.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.name.toLowerCase().includes('grass')) {
            child.material = new THREE.MeshStandardMaterial({
              map: textures.grass,
              metalness: 0,
              roughness: 1
            });
          } else if (child.name.toLowerCase().includes('sidewalk')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x777777,
              metalness: 0,
              roughness: 1
            });
          } else {
            child.material = new THREE.MeshStandardMaterial({
              map: textures.palette,
              color: 0xffffff,
              metalness: 0,
              roughness: 1
            });
          }
        }
      });
      scene.add(object);
      colliders.push(object);
    });
  });
}
