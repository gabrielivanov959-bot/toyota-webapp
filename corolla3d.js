import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById("car3d-container");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  35,
  container.clientWidth / container.clientHeight,
  0.1,
  100
);
camera.position.set(3.5, 1.5, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// светлини
const light1 = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(light1);
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(5, 10, 7);
scene.add(light2);

// зареждане на модела
const loader = new GLTFLoader();
let carModel;

loader.load("Tcorolla/corolla.glb", (gltf) => {
  carModel = gltf.scene;

  // фиксирана позиция
  carModel.position.set(0, 0, 0);
  carModel.scale.set(1, 1, 1);

  scene.add(carModel);
});

// контрол за въртене
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 2;
controls.maxDistance = 6;

// смяна на цвят
document.getElementById("colorPicker").addEventListener("change", (e) => {
  const newColor = new THREE.Color(e.target.value);

  carModel?.traverse((child) => {
    if (child.isMesh) {
      if (child.material) {
        child.material.color = newColor;
        child.material.needsUpdate = true;
      }
    }
  });
});

// рендър цикъл
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
