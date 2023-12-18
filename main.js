import animate from './js/animate.js'
import scene from './js/scene.js'
import camera from './js/camera.js'
import lights from './js/lights.js'
import orbitControls from './js/orbitControls.js'
import * as PLANETS from './js/planets/PLANETS.js'
import {
	renderer,
	navbarRenderer
} from './js/renderers.js'
import {
	canvasSelector,
	navbarCanvasSelector,
	backgroundTextureSlug,
} from './js/settings.js'






// --- declare
const canvas = document.querySelector(canvasSelector);
const navbarCanvas = document.querySelector(navbarCanvasSelector);






// --- library

function initThreeJsScene() {

  // Loader for background texture
	const loader = new THREE.TextureLoader();
	// setTimeout(() => {
	const url = './textures/' + backgroundTextureSlug
	
	console.log('loading bg: ', url )

	loader.load( url, tex => {
		scene.background = tex;
		// render();
		// renderer.render(scene, camera);
		// navbarRenderer.render(scene, camera);
	})

	//Camera
	scene.add(camera);

	//Orbit Controls
	orbitControls.update();

	//Lights
	scene.add( lights.ambientLight);
	scene.add( lights.pointLight);

}




// --- init

initThreeJsScene();

PLANETS.init()

// Start the animation loop
animate();


