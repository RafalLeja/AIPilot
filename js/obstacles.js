import * as THREE from 'three';

export class Obstacles{
  constructor(scene, dimX = 5, dimY =5, maxObstacles = 3){
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
          const obstacle = new Obstacle(scene, [i*laneWidth, 0, -z]);
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
          const obstacle = new Obstacle(scene, [0, i*laneWidth, -z], [0, 0, Math.PI/2]);
        }
      }
    }
  }
}

class Obstacle{
  constructor(scene, position = [0, 0, 0], rotation = [0, 0, 0]){
    const laneWidth = 5;
    const inf = 1000
    const obstacleGeometry = new THREE.CylinderGeometry(5, 5, inf, 5, 11);
    const obstacleMesh = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMesh);
    // const obstacleEdges = new THREE.EdgesGeometry(obstacleGeometry);
    // const obstacleMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    // const obstacle = new THREE.LineSegments(obstacleEdges, obstacleMaterial);
    obstacle.position.set(position[0], position[1], position[2]);
    obstacle.rotation.set(rotation[0], rotation[1], rotation[2]);
    scene.add(obstacle);
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