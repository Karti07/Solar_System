import * as THREE from 'three'


const ambientLight = new THREE.AmbientLight(0xffffff, 2);
ambientLight.position.set(1, 1, 1);

const pointLight = new THREE.PointLight(0xffffff, 0.7);
pointLight.position.set(0, 100, 150);
pointLight.castShadow = true;


export default {
	ambientLight,
	pointLight,
}