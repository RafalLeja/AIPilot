import * as THREE from 'three';

export class Steering{
  constructor(scene, vehicle, camera, speed, rotationSpeed){
    this.scene = scene;
    this.vehicle = vehicle;
    this.camera = camera;
    this.speed = speed;
    this.rotationSpeed = rotationSpeed;
  }

  moveForward(leading){
    const [x, y, z] = this.vehicle.position.toArray();
    this.vehicle.moveForward(this.speed);
    if (leading){
      const [nX, nY, nZ] = this.vehicle.position.toArray();
      const [cX, cY, cZ] = this.camera.position.toArray();
      this.camera.position.set(
        cX + (nX - x),
        cY + (nY - y),
        cZ + (nZ - z));
    }
  }

  rotate([up, down, left, right]){
    if (up){
      this.vehicle.body.rotateX(this.rotationSpeed);
    }
    if (down){
      this.vehicle.body.rotateX(-this.rotationSpeed);
    }
    if (left){
      this.vehicle.body.rotateZ(this.rotationSpeed);
    }
    if (right){
      this.vehicle.body.rotateZ(-this.rotationSpeed);
    }
  }
  
}