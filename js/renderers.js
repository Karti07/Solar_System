// Importing settings and camera
import * as settings from './settings.js'
import camera from './camera.js'
import * as THREE from 'three'

// --- declare

// Selecting the canvas element using the specified selector from settings
const canvas = document.querySelector( settings.canvasSelector )

// Creating a WebGLRenderer for the main scene
const renderer = new THREE.WebGLRenderer({ 
	canvas, 
	alpha: false, 
	antialias: true 
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Creating a WebGLRenderer for the navbar
const navbarRenderer = new THREE.WebGLRenderer({ 
	canvas, 
	alpha: true, 
	antialias: true 
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// --- library 

// Function to handle window resize
function handleWindowResize() {
	// Update camera
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// --- init

// Set the initial size for the navbarRenderer
navbarRenderer.setSize( settings.navbarWidth, settings.navbarHeight );

// Call the resize function initially
handleWindowResize();

// Attach the resize function to the 'resize' event
window.addEventListener("resize", handleWindowResize);

// Exporting the renderers
export {
  renderer,
  navbarRenderer
};