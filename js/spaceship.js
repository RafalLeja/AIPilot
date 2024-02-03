import * as THREE from 'three';
import { Vehicle } from './vehicle';
import { Steering } from './steering';
import { Network } from './network';

export class Spaceship{
  constructor(scene, obstacles, camera, speed = 0.1, rotationSpeed = 0.01, numberOfSensors = 5){
    this.vehicle = new Vehicle(scene, obstacles, numberOfSensors);
    this.steering = new Steering(scene, this.vehicle, camera, speed, rotationSpeed);
    this.network = new Network([numberOfSensors*numberOfSensors, 9, 5, 4]);

    this.active = true;
    this.leading = false;
  }

  update(){
    if (!this.active) return;
    this.steering.moveForward(this.leading);
    const sensors = this.vehicle.sensors.values.flat();
    const output = this.network.feedForward(sensors);
    this.steering.rotate(output);
    this.vehicle.sensors.visible(this.leading);
    if (this.leading){
      this.vehicle.spaceshipMaterial.color.set(0x00ff00);
    }else{
      this.vehicle.spaceshipMaterial.color.set(0xaaaaaa);
    }
    this.active = !this.vehicle.crashed;
  }
}