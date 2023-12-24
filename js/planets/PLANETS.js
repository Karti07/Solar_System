// Importing modules and variables
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
import * as THREE from 'three'

// --- declare

// Declaring DOM elements and canvas
const tooltip = document.getElementById("tooltip");
const navbarItems = document.getElementsByClassName("navbar-item");
tooltip.style.visibility = "hidden"; // Initially hide the tooltip but reserve space for it

const canvas = document.querySelector(settings.canvasSelector)
const navbarCanvas = document.querySelector(settings.navbarCanvasSelector)
const startButton = document.getElementById("stop-button");

// --- library

// Function to create a planet mesh
async function createPlanet(radius, texturePath, position, parent) {
	const geometry = new THREE.SphereGeometry(radius, 32, 32);
	const tex = await new Promise((resolve, reject) => {
		loader.load(texturePath, t => {
			resolve(t)
		})
	})
	const material = new THREE.MeshStandardMaterial({ map: tex });
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(...position);
	parent.add(mesh);

	// Update planet_meshes based on the texturePath
	switch (texturePath) {
		case "./textures/mercury_texture.webp": planet_meshes.mercury = mesh; break;
		case "./textures/venus_texture.webp": planet_meshes.venus = mesh; break;
		case "./textures/mars_texture.webp": planet_meshes.mars = mesh; break;
		case "./textures/jupiter_texture.webp": planet_meshes.jupiter = mesh; break;
		case "./textures/saturn_texture.webp": planet_meshes.saturn = mesh; break;
		case "./textures/uranus_texture.webp": planet_meshes.uranus = mesh; break;
		case "./textures/neptune_texture.webp": planet_meshes.neptune = mesh; break;
	}

	return mesh;
}

// Function to reset the simulation using initialPlanetData
function resetSimulation() {
	for (const planet in planet_settings) {
		planet_settings[planet].angle = initialPlanetData[planet].angle;
	}
	render(); // Render the scene to reflect the reset
}

// Function to render the scene
function render() {
	renderer.render(scene, camera);
	navbarRenderer.render(scene, camera);
}

// Function to add an orbit path to the scene
function addOrbitPath(scene, orbitRadius) {
	const orbitPath = createOrbitPath(orbitRadius);
	scene.add(orbitPath);
}

// Function to initialize local meshes
const initLocalMeshes = async () => {
	const sunGeometry = new THREE.SphereGeometry(sunRadius, 32, 32);
	const sunMaterial = new THREE.MeshStandardMaterial({ map: loader.load("./textures/sun_texture.webp") });
	const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
	scene.add(sunMesh);
	local_meshes.sun = sunMesh;

	const earthGeometry = new THREE.SphereGeometry(earthRadius, 32, 32);
	const earthMaterial = new THREE.MeshStandardMaterial({ map: loader.load("./textures/earth_texture.webp") });
	const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
	earthMesh.position.set(sunRadius + 55, 0, 0);
	local_meshes.sun.add(earthMesh);
	local_meshes.earth = earthMesh;

	const moonGeometry = new THREE.SphereGeometry(moonRadius, 32, 32);
	const moonMaterial = new THREE.MeshStandardMaterial({ map: loader.load("./textures/moon_texture.webp"), emissive: 0x171717 });
	const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
	moonMesh.position.set(earthRadius + moonRadius + 2, 0, 0);
	moonMesh.scale.set(1.5, 1.5, 1.5);
	local_meshes.earth.add(moonMesh);
	local_meshes.moon = moonMesh;

	const loads = []

	// Iterate through planet_data array to create planets
for (const data of planet_data) {
    // Destructure data object for easier access
    const {
        id,
        radius,
        texturePath,
        position,
    } = data;

    // Set the parent of the planet to the sun
    data.parent = local_meshes.sun;

    // Create a promise for each planet creation and push it to loads array
    loads.push(createPlanet(radius, texturePath, position, data.parent));
}

// Once all planet creation promises are resolved
Promise.all(loads)
    .then(res => {
        // Initialize GUI components
        GUI.init();

        // Create Saturn's geometry and material
        const saturnGeometry = new THREE.SphereGeometry(saturnRadius, 32, 32);
        const saturnMaterial = new THREE.MeshStandardMaterial({ map: loader.load("./textures/saturn_texture.webp") });

        // Create Saturn's mesh
        const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);

        // Add Saturn's mesh to the sun's local meshes
        local_meshes.sun.add(saturnMesh);

        // Add Saturn's mesh to the planet meshes
        local_meshes.sun.add(planet_meshes.saturn);
    });

	const ringGeometry = new THREE.RingGeometry(10, 15, 64);
	const ringMaterial = new THREE.MeshStandardMaterial({
		map: loader.load("./textures/saturn_ring_texture.webp"),
		side: THREE.DoubleSide,
	});
	const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
	ringMesh.rotation.x = Math.PI / 2;
	if (planet_meshes.saturn) {
		planet_meshes.saturn.add(ringMesh);
	}
}

// Main init function
const init = async () => {
	await initLocalMeshes(); // Initialize local meshes

	// Event listener for the start/stop button
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

	// Function to start the animation loop
	function startCounting() {
		STATE.animationId = requestAnimationFrame(animate);
	}
}

// Event listener for clicks on the document
document.addEventListener("click", (event) => {
	// Check if the clicked element is a navbar item
	let isNavbarItemClick = false;
	for (let i = 0; i < navbarItems.length; i++) {
		if (navbarItems[i].contains(event.target)) {
			isNavbarItemClick = true;
			break;
		}
	}

	// Show or hide the tooltip based on the click location
	if (isNavbarItemClick) {
		tooltip.style.visibility = "visible"; // Show the tooltip when a navbar item is clicked
	} else if (!tooltip.contains(event.target)) {
		tooltip.style.visibility = "hidden"; // Hide the tooltip when a click occurs outside it
	}
});

// Event listener for the reset button
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
	resetSimulation();
	if (!STATE.isSimulationRunning) {
		animate();
	}

	STATE.earthDays = 0;

	// Update the heading element with the Earth Days count
	document.getElementById('heading').textContent = `Earth Days: ${STATE.earthDays}`;
});

// Event listener for the window load event
window.addEventListener("load", resetSimulation);

// Export the 'init' function for external use
export {
	init,
};
