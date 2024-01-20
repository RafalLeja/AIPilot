// Import the necessary three.js modules
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { Stars } from './stars.js';
import { Obstacles } from './obstacles.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = true;
document.body.appendChild(renderer.domElement);

// Create the spaceship
const spaceshipGeometry = new THREE.ConeGeometry(4, 8, 4);
const spaceshipMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const spaceship = new THREE.Mesh(spaceshipGeometry, spaceshipMaterial);

scene.add(spaceship);

// Create the stars that are light sources
const stars = new Stars(scene, 200);

// Create obstacles
const obstacles = new Obstacles(scene, 10, 10, 5);

// Create the controls
const controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 2.0;
controls.dynamicDampingFactor = 0.1;
controls.maxDistance = 200;
controls.noPan = true;
controls.target = spaceship.position;

// Render the scene
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}
animate();
