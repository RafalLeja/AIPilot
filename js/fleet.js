import { Spaceship } from "./spaceship";

export class Fleet {
  constructor(scene, obstacles, camera, controls, numberOfEntities=5) {
    this.controls = controls;
    this.entities = [];
    
    for (let i = 0; i < numberOfEntities; i++) {
      this.entities.push(new Spaceship(scene, obstacles, camera, 0.5, 0.1, 5));
    }
  }

  update() {
    let leadingIdx = 0;
    let leadingVal = this.evaluate(0);
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
      this.entities[i].leading = false;
      if (this.evaluate(i) > leadingVal) {
        leadingIdx = i;
        leadingVal = this.evaluate(i);
      }
    }
    this.controls.target = this.entities[leadingIdx].vehicle.position;
    this.entities[leadingIdx].leading = true;
  }

  evaluate(i) {
    return this.entities[i].vehicle.position.z;
  }



  
}