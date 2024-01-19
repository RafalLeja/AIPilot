// Import the necessary three.js modules
import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the spaceship
const spaceshipGeometry = new THREE.BoxGeometry(1, 1, 1);
const spaceshipMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const spaceship = new THREE.Mesh(spaceshipGeometry, spaceshipMaterial);

scene.add(spaceship);

// Create the stars
// const starsGeometry = new THREE.Geometry();
// for (let i = 0; i < 10000; i++) {
//   const star = new THREE.Vector3();
//   star.x = THREE.Math.randFloatSpread(2000);
//   star.y = THREE.Math.randFloatSpread(2000);
//   star.z = THREE.Math.randFloatSpread(2000);
//   starsGeometry.vertices.push(star);
// }
// const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
// const stars = new THREE.Points(starsGeometry, starsMaterial);

// scene.add(stars);


// Render the scene
function animate() {
  requestAnimationFrame(animate);

  spaceship.rotation.x += 0.01;

  renderer.render(scene, camera);
}
animate();
