import * as THREE from 'three';

export class Spaceship{
  constructor(scene, obstacles){
    this.obstacles = obstacles.All;

    // Creating a ThreeJS object 
    const spaceshipGeometry = new THREE.ConeGeometry(4, 8, 8);
    const spaceshipMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

    this.spaceship = new THREE.Mesh(spaceshipGeometry, spaceshipMaterial);
    this.spaceship.position.set(0, 0, 0);
    this.spaceship.rotation.set(Math.PI/2, 0, 0);
    
    this.colider = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.colider.setFromObject(this.spaceship);

    this.crashed = false;
    
    this.light = new THREE.SpotLight(0xffffff, 1000, 100);
    this.target = new THREE.Object3D();
    this.light.position.set(0, 0, 5); 
    this.target.position.set(0, 0, 6);
    this.light.angle = Math.PI/5;
    this.light.target =this.target;

    scene.add(this.spaceship);
    scene.add(this.target);
    scene.add(this.light);
    scene.add(this.light.target);

    this.spaceship.attach(this.target);
    this.spaceship.attach(this.light);
    this.spaceship.attach(this.light.target); 

    const lightHelper = new THREE.SpotLightHelper(this.light);
    scene.add(lightHelper);
  }

  moveForward(dist){
    if (this.crashed) return;
    this.spaceship.translateY(dist);
    this.colider.copy( this.spaceship.geometry.boundingBox ).applyMatrix4( this.spaceship.matrixWorld );
    this.crashed = this.collisionDetection();
  }

  collisionDetection() {
    let colided = false;
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      if (Math.abs( obstacle.body.position.z - this.spaceship.position.z) < 5) {
        if (this.colider.intersectsBox(obstacle.colider)) {
          colided = true;
        }
      }
    }
    return colided;
  }
  
  get position(){
    return this.spaceship.position;
  }
  
  set position(position){
    this.spaceship.position.set(position[0], position[1], position[2]);
    this.colider.copy( this.spaceship.geometry.boundingBox ).applyMatrix4( this.spaceship.matrixWorld );
  }

  get rotation(){
    return this.spaceship.rotation;
  }

  set rotation(rotation){
    this.spaceship.rotation.set(rotation[0], rotation[1], rotation[2]);
  }
}