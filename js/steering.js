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
    const [rX, rY, rZ] = this.spaceship.rotation.toArray();
    this.spaceship.position = [
      x + this.speed*Math.sin(-rZ),
      y + this.speed*Math.cos(rX),
      z + this.speed*Math.sin(rX)];

    const [cX, cY, cZ] = this.camera.position.toArray();
    this.camera.position.set(
      cX + this.speed*Math.sin(-rZ),
      cY + this.speed*Math.cos(rX),
      cZ + this.speed*Math.sin(rX));
  }
  
}