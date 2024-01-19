import * as THREE from 'three';

export class Stars{
    constructor(scene, numStars = 100, lightCofficient = 5, lightDistance = 300, lightIntensity = 100, Color = 0xffffff){
        const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
        const starMaterial = new THREE.MeshBasicMaterial({ color: Color });
        for (let i = 0; i < numStars; i++) {
        const star = new THREE.Mesh(starGeometry, starMaterial);
        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));
        star.position.set(x, y, z);
        scene.add(star);
        if (i % lightCofficient == 0){
            const starLight = new THREE.PointLight(Color, lightIntensity, lightDistance);
            starLight.position.set(x, y, z);
            scene.add(starLight);
        }
        }
    }
}