import orbitControls from './orbitControls.js'
import scene from './scene.js'
import camera from './camera.js'
import { renderer, navbarRenderer } from './renderers.js'
import {
	planet_settings,
	orbitPaths,
	planet_meshes,
	local_meshes,
} from './planets/config.js'
import STATE from './STATE.js'



const settings = planet_settings
const meshes = planet_meshes


function updatePlanetPositions() {
	const planets = [
		{ mesh: meshes.mercury, angle: settings.mercury.angle, orbitSpeed: settings.mercury.orbitSpeed, distance: 30 },
		{ mesh: meshes.venus, angle: settings.venus.angle, orbitSpeed: settings.venus.orbitSpeed, distance: 47 },
		{ mesh: local_meshes.earth, angle: settings.earth.angle, orbitSpeed: settings.earth.orbitSpeed, distance: 75 },
		{ mesh: meshes.mars, angle: settings.mars.angle, orbitSpeed: settings.mars.orbitSpeed, distance: 100 },
		{ mesh: meshes.jupiter, angle: settings.jupiter.angle, orbitSpeed: settings.jupiter.orbitSpeed, distance: 140 },
		{ mesh: meshes.saturn, angle: settings.saturn.angle, orbitSpeed: settings.saturn.orbitSpeed, distance: 190 },
		{ mesh: meshes.uranus, angle: settings.uranus.angle, orbitSpeed: settings.uranus.orbitSpeed, distance: 245 },
		{ mesh: meshes.neptune, angle: settings.neptune.angle, orbitSpeed: settings.neptune.orbitSpeed, distance: 285 },
	];

	for (const planet of planets) {
		const { 
			mesh, 
			angle, 
			orbitSpeed, 
			distance 
		} = planet;

		for (const key in settings) {
			if (key !== "sun") {
				  settings[key].angle += settings[key].orbitSpeed;
			}
			mesh.position.x = Math.cos(angle) * distance;
			mesh.position.z = Math.sin(angle) * distance;
			if( typeof planet === 'string' ) debugger
			planet.angle += orbitSpeed;
		}

		for (let i = 0; i < orbitPaths.length; i++) {
			orbitPaths[i].position.x = local_meshes.sun.position.x;
			orbitPaths[i].position.z = local_meshes.sun.position.z;
		}

	}
  
}


function rotateObjects() {
	  // Rotate the objects
	if( !planet_meshes.sun ) return;

	local_meshes.sun.rotation.y -= 0.005;
	local_meshes.earth.rotation.y += 0.075;
	local_meshes.moon.rotation.y += 0.047;

	planet_meshes.mercury.rotation.y += 0.05;
	planet_meshes.venus.rotation.y += 0.013;
	planet_meshes.mars.rotation.y += 0.069;
	planet_meshes.jupiter.rotation.y += 0.005;
	planet_meshes.saturn.rotation.y += -0.005;
	planet_meshes.uranus.rotation.y += 0.028;
	planet_meshes.neptune.rotation.y += 0.005;
}


function render(){
	renderer.render(scene, camera);
    navbarRenderer.render(scene, camera);
}



function animate() {
  // Update controls
  orbitControls.update();

  // Update planet positions
  updatePlanetPositions();

  // Rotate objects
  rotateObjects();

  // Render Scene
  renderer.render(scene, camera);

  //Running Simulation
  if (!STATE.isSimulationRunning) return;

  //Earth Days Counter
  STATE.earthDays++;
  heading.textContent = `Earth Days: ${STATE.earthDays}`;

  // Call the render function to update and render the scene
  render();

  // Call animate again on the next frame
  window.requestAnimationFrame(animate);
}

export default animate