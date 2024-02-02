// Import the necessary three.js modules
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { Stars } from './stars.js';
import { Obstacles } from './obstacles.js';
import { Spaceship } from './spaceship.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = -40;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = true;
document.body.appendChild(renderer.domElement);

// Create obstacles
const obstacles = new Obstacles(scene, 10, 10, 10, 1);

// Create the stars
const stars = new Stars(scene, 200);

// Create the spaceship
const spaceship = new Spaceship(scene, obstacles, camera, 0.5, 0.1, 5);

// Create the controls
const controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 2.0;
controls.dynamicDampingFactor = 0.1;
controls.maxDistance = 200;
controls.noPan = true;
controls.target = spaceship.vehicle.body.position;


// Render the scene
function animate() {
  requestAnimationFrame(animate);
  
  // move the spaceship
  spaceship.update();

  controls.update();
  renderer.render(scene, camera);
}
animate();
