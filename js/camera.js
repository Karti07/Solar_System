// Importing Three.js
import * as THREE from 'three'

// Creating a new Perspective Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Setting camera position, rotation, and zoom
camera.position.set(-5, 150, 350);
camera.rotation.set(-Math.PI / 4, 0, 0);
camera.zoom = 0.6;

// Updating camera projection matrix
camera.updateProjectionMatrix();

// Exporting the camera as default
export default camera;