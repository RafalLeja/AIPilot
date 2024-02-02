import * as THREE from 'three';

export class Steering{
  constructor(scene, spaceship, camera, speed, rotationSpeed){
    this.scene = scene;
    this.spaceship = spaceship;
    this.camera = camera;
    this.speed = speed;
    this.rotationSpeed = rotationSpeed;
  }

  moveForward(){
    const [x, y, z] = this.spaceship.position.toArray();

    this.spaceship.moveForward(this.speed);
    
    const [nX, nY, nZ] = this.spaceship.position.toArray();

    const [cX, cY, cZ] = this.camera.position.toArray();
    this.camera.position.set(
      cX + (nX - x),
      cY + (nY - y),
      cZ + (nZ - z));
  }

  rotate([x,y,z]){
    const [rX, rY, rZ] = this.spaceship.rotation.toArray();
    this.spaceship.rotation.set(
      rX + this.rotationSpeed*x,
      rY + this.rotationSpeed*y,
      rZ + this.rotationSpeed*z);
  }
  
}