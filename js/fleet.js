import { Spaceship } from "./spaceship";

export class Fleet {
  constructor(scene, obstacles, camera, controls, numberOfEntities=5) {
    this.controls = controls;
    this.entities = [];
    this.evoltion = 0;
    this.evoltions = [0.8, 0.3, 0.1, 0.05]

    this.leader = 0;
    
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
    this.leader = leadingIdx;
  }

  evaluate(i) {
    return this.entities[i].vehicle.position.z;
  }

  next(){
    if (this.evoltion >= this.evoltions.length) {
      this.evoltion--;
    }
    const model = this.entities[this.leader].network;
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].network = model;
      if (i != this.leader){
        this.entities[i].network.mutate(model, 0.2);
      }// this.entities[i].network.mutate(model, this.evoltions[this.evoltion]);
    }
    this.evoltion++;
    this.reset();
  }

  hardReset(){
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].network.reset();
    }
    this.reset();
  }

  reset(){
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].vehicle.position = [0, 0, 0];
      this.entities[i].vehicle.rotation = [Math.PI/2, 0, 0];
      this.entities[i].active = true;
    }
  }
}