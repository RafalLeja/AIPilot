import * as THREE from 'three';


export class Spaceship{
  constructor(scene){
    const spaceshipGeometry = new THREE.ConeGeometry(4, 8, 8);
    const spaceshipMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    this.spaceship = new THREE.Mesh(spaceshipGeometry, spaceshipMaterial);
    this.spaceship.rotation.set(Math.PI/2, 0, 0);
    scene.add(this.spaceship);

    this.light = new THREE.SpotLight(0xffffff, 1000, 100);
    this.target = new THREE.Object3D();
    this.light.position.set(0, 0, 5); 
    this.target.position.set(0, 0, 6);
    this.light.angle = Math.PI/5;
    this.light.target =this.target;
    scene.add(this.target);
    scene.add(this.light);
    scene.add(this.light.target);
    
    this.spaceship.attach(this.target);
    this.spaceship.attach(this.light);
    this.spaceship.attach(this.light.target); 

    const lightHelper = new THREE.SpotLightHelper(this.light);
    scene.add(lightHelper);
  }

  get position(){
    return this.spaceship.position;
  }

  set position(position){
    this.spaceship.position.set(position[0], position[1], position[2]);
  }

  get rotation(){
    return this.spaceship.rotation;
  }

  set rotation(rotation){
    this.spaceship.rotation.set(rotation[0], rotation[1], rotation[2]);
  }
}