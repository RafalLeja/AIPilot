import * as THREE from 'three';
import { Sensors } from './sensors';

export class Vehicle{
  constructor(scene, obstacles, numberOfSensors = 5){
    this.obstacles = obstacles.All;

    // Creating a ThreeJS object 
    const spaceshipGeometry = new THREE.ConeGeometry(4, 8, 8);
    this.spaceshipMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

    this.body = new THREE.Mesh(spaceshipGeometry, this.spaceshipMaterial);
    this.body.position.set(0, 0, 0);
    this.body.rotation.set(Math.PI/2, 0, 0);
    this.acitve = true;
    
    this.colider = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.colider.setFromObject(this.body);

    this.crashed = false;
    
    this.light = new THREE.SpotLight(0xffffff, 1000, 100);
    this.target = new THREE.Object3D();
    this.light.position.set(0, 0, 5); 
    this.target.position.set(0, 0, 6);
    this.light.angle = Math.PI/5;
    this.light.target =this.target;

    this.sensors = new Sensors(scene, this.body, this.obstacles, numberOfSensors);

    scene.add(this.body);
    scene.add(this.target);
    scene.add(this.light);
    scene.add(this.light.target);

    this.body.attach(this.target);
    this.body.attach(this.light);
    this.body.attach(this.light.target); 
  }

  moveForward(dist){
    this.body.translateY(dist);
    this.colider.copy( this.body.geometry.boundingBox ).applyMatrix4( this.body.matrixWorld );
    this.sensors.update();
    this.crashed = this.collisionDetection();
    this.sensors.visible(!this.crashed);
  }

  collisionDetection() {
    let colided = false;
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      if (Math.abs( obstacle.body.position.z - this.body.position.z) < 5) {
        if (this.colider.intersectsBox(obstacle.colider)) {
          colided = true;
        }
      }
    }
    return colided;
  }
  
  get position(){
    return this.body.position;
  }
  
  set position(position){
    this.body.position.set(position[0], position[1], position[2]);
    this.colider.copy( this.body.geometry.boundingBox ).applyMatrix4( this.body.matrixWorld );
  }

  get rotation(){
    return this.body.rotation;
  }

  set rotation(rotation){
    this.body.rotation.set(rotation[0], rotation[1], rotation[2]);
  }
}