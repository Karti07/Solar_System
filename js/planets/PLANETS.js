import scene from '../scene.js'
import camera from '../camera.js'
import * as settings from '../settings.js'
import animate from '../animate.js'
import {
	renderer,
	navbarRenderer,
} from '../renderers.js'
import {
	sunRadius,
	earthRadius,
	saturnRadius,
	moonRadius,

	planet_meshes,
	local_meshes,
	planet_data,
	navbar_data,
	initialPlanetData,
	planet_settings,
	loader,
} from './config.js'
import * as GUI from './GUI.js';
import STATE from '../STATE.js'
// import * as THREE from '../../node_modules/three/build/three.module.js'
import * as THREE from 'three'





// --- declare

// DOM eles
const tooltip = document.getElementById("tooltip");
const navbarItems = document.getElementsByClassName("navbar-item");
tooltip.style.visibility = "hidden"; // Initially hide the tooltip but reserve space for it

const canvas = document.querySelector( settings.canvasSelector )
const navbarCanvas = document.querySelector( settings.navbarCanvasSelector )
const startButton = document.getElementById("stop-button");


// --- library

async function createPlanet(radius, texturePath, position, parent) {
	const geometry = new THREE.SphereGeometry(radius, 32, 32);
	const tex = await new Promise((resolve, reject) => {
		loader.load(texturePath, t => {
			resolve( t )
		})
	})
	const material = new THREE.MeshStandardMaterial({ map: tex });
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(...position);
	parent.add(mesh);

	switch (texturePath) {
	case "./textures/mercury_texture.jpg": planet_meshes.mercury = mesh; break;
	case "./textures/venus_texture.jpg": planet_meshes.venus = mesh; break;
	case "./textures/mars_texture.jpg": planet_meshes.mars = mesh; break;
	case "./textures/jupiter_texture.jpg": planet_meshes.jupiter = mesh; break;
	case "./textures/saturn_texture.jpg": planet_meshes.saturn = mesh; break;
	case "./textures/uranus_texture.jpg": planet_meshes.uranus = mesh; break;
	case "./textures/neptune_texture.jpg": planet_meshes.neptune = mesh; break;
	}
	
	return mesh;
}

// Use initialPlanetData to reset the simulation
function resetSimulation() {
  // Reset the positions and rotations of the planets
  planet_settings.mercury.angle = initialPlanetData.mercury.angle;
  planet_settings.venus.angle = initialPlanetData.venus.angle;
  planet_settings.earth.angle = initialPlanetData.earth.angle;
  planet_settings.mars.angle = initialPlanetData.mars.angle;
  planet_settings.jupiter.angle = initialPlanetData.jupiter.angle;
  planet_settings.saturn.angle = initialPlanetData.saturn.angle;
  planet_settings.uranus.angle = initialPlanetData.uranus.angle;
  planet_settings.neptune.angle = initialPlanetData.neptune.angle;

  // Render the scene to reflect the reset
  render();
}

function render(){
	renderer.render(scene, camera);
    navbarRenderer.render(scene, camera);
}

function addOrbitPath(scene, orbitRadius) {
  const orbitPath = createOrbitPath(orbitRadius);
  scene.add(orbitPath);
}


const initLocalMeshes = async() => {

	const sunGeometry = new THREE.SphereGeometry(sunRadius, 32, 32);
	const sunMaterial = new THREE.MeshStandardMaterial({ map: loader.load("./textures/sun_texture.jpg") });
	const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
	scene.add( sunMesh );
	local_meshes.sun = sunMesh

	const earthGeometry = new THREE.SphereGeometry(earthRadius, 32, 32);
	const earthMaterial = new THREE.MeshStandardMaterial({ map: loader.load("./textures/earth_texture.jpg") });
	const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
	earthMesh.position.set(sunRadius + 55, 0, 0)
	local_meshes.sun.add( earthMesh );
	local_meshes.earth = earthMesh

	const moonGeometry = new THREE.SphereGeometry(moonRadius, 32, 32);
	const moonMaterial = new THREE.MeshStandardMaterial({ map: loader.load("./textures/moon_texture.jpg"), emissive: 0x171717 });
	const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
	moonMesh.position.set(earthRadius + moonRadius + 2, 0, 0);
	moonMesh.scale.set(1.5, 1.5, 1.5);
	local_meshes.earth.add(moonMesh);
	local_meshes.moon = moonMesh

	for( const data of planet_data ){
		const {
			id,
			radius,
			texturePath,
			position,
		} = data
		data.parent = local_meshes.sun
		const mesh = await createPlanet( radius, texturePath, position, data.parent );
	}

	const saturnGeometry = new THREE.SphereGeometry(saturnRadius, 32, 32);
	const saturnMaterial = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load("./textures/saturn_texture.jpg") });
	const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);
	local_meshes.sun.add( saturnMesh );
	local_meshes.sun.add( planet_meshes.saturn );

	const ringGeometry = new THREE.RingGeometry(10, 15, 64);
	const ringMaterial = new THREE.MeshStandardMaterial({ 
		map: loader.load("./textures/saturn_ring_texture.png"), 
		side: THREE.DoubleSide,
	});
	const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
	ringMesh.rotation.x = Math.PI / 2;
	if( planet_meshes.saturn ){
		planet_meshes.saturn.add( ringMesh );
	}

}


const init = async() => {

	// Mesh

	await initLocalMeshes()

	startButton.addEventListener("click", () => {
	  STATE.isSimulationRunning = !STATE.isSimulationRunning;
	  if (STATE.isSimulationRunning) {
	    startButton.innerText = "Stop Simulation";
	  } else {
	    startButton.innerText = "Start Simulation";
	  }

	  if (STATE.isSimulationRunning) {
	    animate();
	  } else {
	    cancelAnimationFrame(STATE.animationId);
	  }

	});

	// Call resetSimulation on page load
	resetSimulation();

	STATE.earthDays = 0;

	function startCounting() {
	  STATE.animationId = requestAnimationFrame(animate);
	}

	GUI.init()

} // init

document.addEventListener("click", (event) => {
	// Check if the clicked element is a navbar item
	let isNavbarItemClick = false;
	for (let i = 0; i < navbarItems.length; i++) {
	  if (navbarItems[i].contains(event.target)) {
	    isNavbarItemClick = true;
	    break;
	  }
	}

	if (isNavbarItemClick) {
	  tooltip.style.visibility = "visible"; // Show the tooltip when a navbar item is clicked
	} else if (!tooltip.contains(event.target)) {
	  tooltip.style.visibility = "hidden"; // Hide the tooltip when a click occurs outside it
	}
});

// Add an event listener to the reset button
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  resetSimulation();
  if ( !STATE.isSimulationRunning ) {
    animate();
  }

  STATE.earthDays = 0;

  document.getElementById('heading').textContent = `Earth Days: ${STATE.earthDays}`;
  
});

window.addEventListener("load", resetSimulation);

export {
	init,
}