import * as THREE from 'three';

export class Sensors{
  constructor(scene, spaceship, obstacles, SensPerAxis = 5, sensorRange = 50, angle = Math.PI/4){
    this.scene = scene;
    this.spaceship = spaceship;
    this.obstacles = obstacles;
    this.sensorRange = sensorRange;
    this.default = 1;

    this.sensors = [...Array(SensPerAxis)].map(() => Array(SensPerAxis));
    this.GreenArrows = [...Array(SensPerAxis)].map(() => Array(SensPerAxis));
    this.RedArrows = [...Array(SensPerAxis)].map(() => Array(SensPerAxis));
    this.values = [...Array(SensPerAxis)].map(() => Array(SensPerAxis));

    const halfSens = Math.floor(SensPerAxis / 2);

    for (let i = 0; i < SensPerAxis; i++) {
      for (let j = 0; j < SensPerAxis; j++) {
        //
        //     b,y
        //   ______
        //   \    |
        //    \   |
        //     \  | sensorRange
        //      \ |
        //       \|
        //      angle
        //
        // calculating veritcal direction
        const b = sensorRange * Math.tan(angle/halfSens * (i - halfSens));
        // calculating horizontal direction
        const y = sensorRange * Math.tan(angle/halfSens * (j - halfSens));
        let dir = new THREE.Vector3(y, b, sensorRange);
        dir.normalize();
        
        this.sensors[i][j] = new THREE.Raycaster(this.spaceship.position, dir, 0, sensorRange);
        this.sensors[i][j].layers.enableAll();
        const RedArrow = new THREE.ArrowHelper(dir, this.spaceship.position, sensorRange, 0xff0000)
        const GreenArrow = new THREE.ArrowHelper(dir, this.spaceship.position, sensorRange, 0x00ff00)
        this.GreenArrows[i][j] = GreenArrow;
        this.RedArrows[i][j] = RedArrow;
        this.scene.add(GreenArrow);
        this.scene.add(RedArrow);
      }
    }
  }

  update(){
    const nearby = this.obstacles.filter(obstacle => Math.abs(obstacle.body.position.z - this.spaceship.position.z) <= this.sensorRange).map(obstacle => obstacle.body);
    for (let i = 0; i < this.sensors.length; i++) {
      for (let j = 0; j < this.sensors[i].length; j++) {
        this.sensors[i][j].set(this.spaceship.position, this.sensors[i][j].ray.direction);
        this.GreenArrows[i][j].position.copy(this.spaceship.position);
        this.RedArrows[i][j].position.copy(this.spaceship.position);
        const intersects = this.sensors[i][j].intersectObjects(nearby);
        if (intersects.length > 0){
          this.values[i][j] = intersects[0].distance/this.sensorRange;
          this.GreenArrows[i][j].setLength(intersects[0].distance);
        }else{
          this.values[i][j] = this.default;
          this.GreenArrows[i][j].setLength(this.sensorRange);
        }
      }
    }
  }
  
  visible(bool){
    for (let i = 0; i < this.sensors.length; i++) {
      for (let j = 0; j < this.sensors[i].length; j++) {
        this.GreenArrows[i][j].visible = bool;
      }
    }
    for (let i = 0; i < this.sensors.length; i++) {
      for (let j = 0; j < this.sensors[i].length; j++) {
        this.RedArrows[i][j].visible = bool;
      }
    }
  }
}