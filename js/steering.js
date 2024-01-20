import * as THREE from 'three';

export class Steering{
  constructor(scene, spaceship, speed, rotationSpeed){
    this.scene = scene;
    this.spaceship = spaceship;
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
  }
  
}