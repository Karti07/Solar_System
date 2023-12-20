// Importing Three.js
import * as THREE from 'three'

// Creating an Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
ambientLight.position.set(1, 1, 1);

// Creating a Point Light
const pointLight = new THREE.PointLight(0xffffff, 0.7);
pointLight.position.set(0, 100, 150);
pointLight.castShadow = true;

// Exporting the ambientLight and pointLight as default
export default {
  ambientLight,
  pointLight,
};