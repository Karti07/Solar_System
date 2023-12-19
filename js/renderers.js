import * as settings from './settings.js'
import camera from './camera.js'
import * as THREE from 'three'



// --- declare

const canvas = document.querySelector( settings.canvasSelector )

const renderer = new THREE.WebGLRenderer({ 
	canvas, 
	alpha: false, 
	antialias: true 
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

function handleWindowResize() {
	// Update camera
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}


// --- init

navbarRenderer.setSize( settings.navbarWidth, settings.navbarHeight );

handleWindowResize()

// Attach the resize function to the 'resize' event
window.addEventListener("resize", handleWindowResize);

export {
	renderer,
	navbarRenderer
}