import * as THREE from 'three';
import { Sensors } from './sensors';

export class Vehicle{
  constructor(scene, obstacles){
    this.obstacles = obstacles.All;

    // Creating a ThreeJS object 
    const spaceshipGeometry = new THREE.ConeGeometry(4, 8, 8);
    const spaceshipMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

    this.vehicle = new THREE.Mesh(spaceshipGeometry, spaceshipMaterial);
    this.vehicle.position.set(0, 0, 0);
    this.vehicle.rotation.set(Math.PI/2, 0, 0);
    this.acitve = true;
    
    this.colider = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.colider.setFromObject(this.vehicle);

    this.crashed = false;
    
    this.light = new THREE.SpotLight(0xffffff, 1000, 100);
    this.target = new THREE.Object3D();
    this.light.position.set(0, 0, 5); 
    this.target.position.set(0, 0, 6);
    this.light.angle = Math.PI/5;
    this.light.target =this.target;

    this.Sensors = new Sensors(scene, this.vehicle, this.obstacles);

    scene.add(this.vehicle);
    scene.add(this.target);
    scene.add(this.light);
    scene.add(this.light.target);

    this.vehicle.attach(this.target);
    this.vehicle.attach(this.light);
    this.vehicle.attach(this.light.target); 

    const lightHelper = new THREE.SpotLightHelper(this.light);
    scene.add(lightHelper);
  }

  moveForward(dist){
    if (this.crashed) return;
    this.vehicle.translateY(dist);
    this.colider.copy( this.vehicle.geometry.boundingBox ).applyMatrix4( this.vehicle.matrixWorld );
    this.Sensors.update();
    // console.log(this.Sensors.values);
    this.crashed = this.collisionDetection();
    this.Sensors.visible(this.active);
  }

  collisionDetection() {
    let colided = false;
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      if (Math.abs( obstacle.body.position.z - this.vehicle.position.z) < 5) {
        if (this.colider.intersectsBox(obstacle.colider)) {
          colided = true;
        }
      }
    }
    return colided;
  }
  
  get position(){
    return this.vehicle.position;
  }
  
  set position(position){
    this.vehicle.position.set(position[0], position[1], position[2]);
    this.colider.copy( this.vehicle.geometry.boundingBox ).applyMatrix4( this.vehicle.matrixWorld );
  }

  get rotation(){
    return this.vehicle.rotation;
  }

  set rotation(rotation){
    this.vehicle.rotation.set(rotation[0], rotation[1], rotation[2]);
  }
}