import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/loaders/GLTFLoader.js';

export function initScene() {
  const roomSize = 100;
  const wallHeight = 50;
  const globalBrightness = 0.01;
  const orbIllumination = 1.0;
  const playerHeight = 5;
  const jumpSpeed = 25;
  const gravity = -100;
  const collisionMargin = 2;
  const prevTime = performance.now();
  const moveSpeed = 400;
  
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);
  
  const mainLight = new THREE.DirectionalLight(0xffffff, globalBrightness);
  mainLight.position.set(1, 1, 1);
  scene.add(mainLight);
  
  const textureLoader = new THREE.TextureLoader();
  const floorTexture = textureLoader.load('assets/floor.jpg');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(20, 20);
  
  const floorGeometry = new THREE.PlaneGeometry(roomSize, roomSize);
  const floorMaterial = new THREE.MeshLambertMaterial({ map: floorTexture });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI/2;
  floor.position.y = 0;
  floor.receiveShadow = true;
  scene.add(floor);
  
  const wallTexture = textureLoader.load('assets/walls.jpg');
  wallTexture.wrapS = THREE.RepeatWrapping;
  wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(10, 2);
  
  const wallMaterial = new THREE.MeshLambertMaterial({ map: wallTexture, side: THREE.DoubleSide });
  const wallGeometry = new THREE.PlaneGeometry(roomSize, wallHeight);
  
  const northWall = new THREE.Mesh(wallGeometry, wallMaterial);
  northWall.position.set(0, wallHeight/2, -roomSize/2);
  northWall.receiveShadow = true;
  scene.add(northWall);
  
  const southWall = new THREE.Mesh(wallGeometry, wallMaterial);
  southWall.position.set(0, wallHeight/2, roomSize/2);
  southWall.rotation.y = Math.PI;
  southWall.receiveShadow = true;
  scene.add(southWall);
  
  const eastWall = new THREE.Mesh(wallGeometry, wallMaterial);
  eastWall.position.set(roomSize/2, wallHeight/2, 0);
  eastWall.rotation.y = Math.PI/2;
  eastWall.receiveShadow = true;
  scene.add(eastWall);
  
  const westWall = new THREE.Mesh(wallGeometry, wallMaterial);
  westWall.position.set(-roomSize/2, wallHeight/2, 0);
  westWall.rotation.y = -Math.PI/2;
  westWall.receiveShadow = true;
  scene.add(westWall);
  
  const ceilingTexture = textureLoader.load('assets/ceiling.jpg');
  ceilingTexture.wrapS = THREE.RepeatWrapping;
  ceilingTexture.wrapT = THREE.RepeatWrapping;
  ceilingTexture.repeat.set(10, 10);
  
  const ceilingGeometry = new THREE.PlaneGeometry(roomSize, roomSize);
  const ceilingMaterial = new THREE.MeshLambertMaterial({ map: ceilingTexture, side: THREE.DoubleSide });
  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceiling.rotation.x = Math.PI/2;
  ceiling.position.y = wallHeight;
  ceiling.receiveShadow = true;
  scene.add(ceiling);
  
  const pointLight = new THREE.PointLight(0xffffff, orbIllumination, 200);
  pointLight.castShadow = true;
  pointLight.position.set(0, wallHeight-5, 0);
  scene.add(pointLight);
  
  const bulbGeometry = new THREE.SphereGeometry(2, 16, 8);
  const bulbMaterial = new THREE.MeshBasicMaterial({ color: 0xffffee });
  const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
  pointLight.add(bulb);
  bulb.position.set(0,0,0);
  
  const boxGeometry = new THREE.BoxGeometry(2,2,2);
  const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  const cube = new THREE.Mesh(boxGeometry, boxMaterial);
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.position.set(0,5,0);
  scene.add(cube);
  
  const gltfLoader = new GLTFLoader();
  gltfLoader.load('assets/tree.glb', (gltf) => {
    const tree = gltf.scene;
    tree.scale.set(10,10,10);
    tree.position.set(10,10,10);
    tree.traverse((node)=>{
      if(node.isMesh){
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    scene.add(tree);
  });
  
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.set(0, playerHeight, 100);
  
  return { scene, camera, renderer, cube, pointLight, bulb, prevTime, roomSize, wallHeight, collisionMargin, playerHeight, moveSpeed, gravity, jumpSpeed };
}
