// Import the necessary three.js modules
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { Stars } from './stars.js';
import { Obstacles } from './obstacles.js';
import { Spaceship } from './spaceship.js';
import { Steering } from './steering.js';
import * as CANNON from 'cannon-es';

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

// Create phisics world
const world = new CANNON.World();
world.gravity.set(0, 0, 0);
world.broadphase = new CANNON.NaiveBroadphase();
world.solver.iterations = 10;
// world.allowSleep = true;

// Create the spaceship
const spaceship = new Spaceship(scene, world);

// Create the steering
const steering = new Steering(scene, spaceship, camera, 0.3, 0.1);

// Create the stars
const stars = new Stars(scene, 200);

// Create obstacles
const obstacles = new Obstacles(scene, world, 50, 50, 15);

// Create the controls
const controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 2.0;
controls.dynamicDampingFactor = 0.1;
controls.maxDistance = 200;
controls.noPan = true;
controls.target = spaceship.position;

// Start the clock
const clock = new THREE.Clock()
let delta

// Render the scene
function animate() {
  requestAnimationFrame(animate);

  delta = clock.getDelta()
  delta = Math.min(clock.getDelta(), 0.1)
  world.step(delta)

  // move the spaceship
  steering.moveForward();

  controls.update();
  renderer.render(scene, camera);
}
animate();
