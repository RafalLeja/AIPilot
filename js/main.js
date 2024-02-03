// Import the necessary three.js modules
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { Stars } from './stars.js';
import { Obstacles } from './obstacles.js';
import { Spaceship } from './spaceship.js';
import { UI } from './ui.js';
import { Fleet } from './fleet.js';

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
const obstacles = new Obstacles(scene, 15, 15, 8, 1);

// Create the stars
const stars = new Stars(scene, 200);

// Create the UI
// const ui = new UI(spaceship);

// Create the controls
const controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 2.0;
controls.dynamicDampingFactor = 0.1;
controls.maxDistance = 200;
controls.noPan = true;

// Create the fleet
const fleet = new Fleet(scene, obstacles, camera, controls, 5);

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  
  // move the spaceships
  fleet.update();

  // update the UI
  // ui.update();

  controls.update();
  renderer.render(scene, camera);
}
animate();
