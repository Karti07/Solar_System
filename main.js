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

async function initThreeJsScene() {
	
	const url = './textures/' + backgroundTextureSlug
	await new Promise( resolve => {
		loader.load( url, tex => {
			scene.background = tex;
			resolve()
		})		
	})

	//Camera
	scene.add(camera);

	// //Orbit Controls
	orbitControls.update();

	// //Lights
	scene.add( lights.ambientLight);
	scene.add( lights.pointLight);

}




// --- init

initThreeJsScene()
.then( res => {

	PLANETS.init()
	.then( res => {

		// Start the animation loop
		animate();

	})

})




