// Import the necessary three.js modules
import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the spaceship
const spaceshipGeometry = new THREE.ConeGeometry(4, 8, 4);
const spaceshipMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const spaceship = new THREE.Mesh(spaceshipGeometry, spaceshipMaterial);

scene.add(spaceship);

// Create the stars that are light sources
const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
for (let i = 0; i < 100; i++) {
  const star = new THREE.Mesh(starGeometry, starMaterial);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
  if (i % 5 == 0){
    const starLight = new THREE.PointLight(0xffffff, 10, 300);
    starLight.position.set(x, y, z);
    scene.add(starLight);
  }
  }




// Render the scene
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();
