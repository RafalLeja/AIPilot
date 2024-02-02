import * as THREE from 'three';

export class Obstacles{
  constructor(scene,  dimX = 5, dimY =5, maxObstacles = 3){
    this.All = [];
    const laneWidth = 7;
    const inf = 1000
    for(let z = 100; z < inf; z += laneWidth*15){
      // generating random veritcal obstacles
      const numberX = Math.floor(Math.random() * maxObstacles) + 1;
      let orderX = []
      for(let i = 0; i < dimX; i++){
        if (i<numberX){
          orderX.push(1);
        }else{
          orderX.push(0);
        }
      }
      orderX = shuffle(orderX);
      for(let i = 0; i < dimX; i++){
        if (orderX[i] == 1){
          const obstacle = new Obstacle(scene,  [i*laneWidth - dimX*laneWidth/2, 0, z]);
          this.All.push(obstacle);
        }
      }

      // generating random horizontal obstacles
      const numberY = Math.floor(Math.random() * maxObstacles) + 1;
      let orderY = []
      for(let i = 0; i < dimY; i++){
        if (i<numberY){
          orderY.push(1);
        }else{
          orderY.push(0);
        }
      }
      orderY = shuffle(orderY);
      for(let i = 0; i < dimY; i++){
        if (orderY[i] == 1){
          const obstacle = new Obstacle(scene,  [0, i*laneWidth - dimY*laneWidth/2, z], [0, 0, Math.PI/2]);
          this.All.push(obstacle);
        }
      }
    }
  }
}

class Obstacle{
  constructor(scene, position = [0, 0, 0], rotation = [0, 0, 0]){
    const laneWidth = 5;
    const inf = 1000
    // ThreeJS object
    const obstacleGeometry = new THREE.CylinderGeometry(5, 5, inf, 5, 11);
    const obstacleMesh = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    this.body = new THREE.Mesh(obstacleGeometry, obstacleMesh);
    this.body.position.set(position[0], position[1], position[2]);
    this.body.rotation.set(rotation[0], rotation[1], rotation[2]);
    
    this.colider = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.colider.setFromObject(this.body);
    this.colider.copy( this.body.geometry.boundingBox ).applyMatrix4( this.body.matrixWorld );
    scene.add(this.body);

    // Cannon object
    // const obstacleShape = new CANNON.Cylinder(5, 5, inf, 5)
    // const obstacleBody = new CANNON.Body({mass: 1})
    // obstacleBody.addShape(obstacleShape)
    // obstacleBody.position = new CANNON.Vec3(position[0], position[1], position[2])
    // obstacleBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), rotation[0]);
    // obstacleBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), rotation[1]);
    // obstacleBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), rotation[2]);
    // addBody(obstacleBody)

  }
}

// from: https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}