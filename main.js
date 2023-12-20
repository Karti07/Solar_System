// Importing modules and libraries
import animate from './js/animate.js'
import scene from './js/scene.js'
import camera from './js/camera.js'
import lights from './js/lights.js'
import orbitControls from './js/orbitControls.js'
import * as PLANETS from './js/planets/PLANETS.js'
import {
	loader,
} from './js/planets/config.js'
import {
	canvasSelector,
	navbarCanvasSelector,
	backgroundTextureSlug,
} from './js/settings.js'


// --- declare


// --- library

// Initializing the Three.js scene with asynchronous operations
async function initThreeJsScene() {
	
	// Constructing the URL for the background texture
	const url = './textures/' + backgroundTextureSlug
	
	// Loading the background texture and setting it for the scene
	await new Promise( resolve => {
		loader.load( url, tex => {
			scene.background = tex;
			resolve()
		})		
	})

	// Adding the camera to the scene
	scene.add(camera);

	// Updating the orbit controls for camera manipulation
	orbitControls.update();

	// Adding ambient and point lights to the scene
	scene.add( lights.ambientLight);
	scene.add( lights.pointLight);

}


// --- init

// Initializing the Three.js scene and proceeding when it's done
initThreeJsScene()
.then( res => {

	// Initializing the planetary elements
	PLANETS.init()
	.then( res => {

		// Starting the animation loop once everything is set up
		animate();

	})

})