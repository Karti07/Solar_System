import {
	planet_settings,
	local_meshes,
	planet_meshes,
	navbar_data,
} from './config.js'
import camera from '../camera.js';
import scene from '../scene.js';
import {
	renderer,
	navbarRenderer,
} from '../renderers.js'



// --- declare

// Camera variables
let cameraView = "3D"; // Initial camera view, '3D' by default

const zoomSlider = document.getElementById("zoom-slider");
const zoomValueLabel = document.getElementById("zoom-value");
const interactive = document.getElementById("interactive");
const speedSlider = document.getElementById("speed-slider");
const speedValueLabel = document.getElementById("speed-value");
const speedMultiplier = 0.00075; // sensitivity of the speed slider
const toggleSwitch = document.getElementById("toggle-switch");
const orbitCheckbox = document.getElementById("orbit-checkbox");
const dropdownOptions = document.querySelectorAll(".dropdown-content a");
const selectedOptionText = document.querySelector(".selected-option");
const arrowIcon = document.getElementById("arrow-icon");



// --- library

function resetPlanetScales() {
  local_meshes.earth.scale.set(1, 1, 1);

  planet_meshes.mercury.scale.set(1, 1, 1);
  planet_meshes.venus.scale.set(1, 1, 1);
  planet_meshes.mars.scale.set(1, 1, 1);
  planet_meshes.jupiter.scale.set(1, 1, 1);
  planet_meshes.saturn.scale.set(1, 1, 1);
  planet_meshes.uranus.scale.set(1, 1, 1);
  planet_meshes.neptune.scale.set(1, 1, 1);
}

function showPlanetInfo(planetName, distance, size, speed, image) {
  const tooltip = document.getElementById("tooltip");
  tooltip.classList.toggle("active");
  tooltip.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  const planetNameElem = document.getElementById("planet-name");
  const planetDistanceElem = document.getElementById("planet-distance");
  const planetSizeElem = document.getElementById("planet-size");
  const planetSpeedElem = document.getElementById("planet-speed");
  const planetImageElem = document.getElementById("planet-image");

  planetNameElem.textContent = planetName;
  planetDistanceElem.textContent = `Distance from the Sun: ${distance}`;
  planetSizeElem.textContent = `Size (Radius): ${size}`;
  planetSpeedElem.textContent = `Orbit Speed: ${speed} km/h`;
  planetImageElem.src = image;
}

function handlePlanetClick(planetMesh, name, distance, size, speed, scale, image) {
    resetPlanetScales();
    showPlanetInfo(name, distance, size, speed, image);
    planetMesh.scale.set(scale, scale, scale);
}


function updateSpeedValue() {
	const newSpeed = parseFloat(speedSlider.value).toFixed(1);
	speedValueLabel.textContent = newSpeed;
	// Update the orbitSpeed of each planet in the planet_settings object
	planet_settings.mercury.orbitSpeed = newSpeed * speedMultiplier;
	planet_settings.venus.orbitSpeed = newSpeed * speedMultiplier;
	planet_settings.earth.orbitSpeed = newSpeed * speedMultiplier;
	planet_settings.mars.orbitSpeed = newSpeed * speedMultiplier;
	planet_settings.jupiter.orbitSpeed = newSpeed * speedMultiplier;
	planet_settings.saturn.orbitSpeed = newSpeed * speedMultiplier;
	planet_settings.uranus.orbitSpeed = newSpeed * speedMultiplier;
	planet_settings.neptune.orbitSpeed = newSpeed * speedMultiplier;
}


function updateZoomValue() {
	const zoomValue = parseFloat(zoomSlider.value).toFixed(2);
	zoomValueLabel.textContent = zoomValue;
	camera.zoom = parseFloat(zoomSlider.value);
	camera.updateProjectionMatrix();

	//Render the scene and to apply the new zoom value immediately.
	render();
}

// Function to handle checkbox change event
function handleOrbitCheckboxChange(event) {
  const isChecked = event.target.checked;

  // Toggle the visibility of the orbit paths based on the checkbox state
  for (let i = 0; i < orbitPaths.length; i++) {
    orbitPaths[i].visible = isChecked;

    render();
  }
}

function render(){
	renderer.render(scene, camera);
    navbarRenderer.render(scene, camera);
}











// --- init


// Event listener for toggle switch change
toggleSwitch.addEventListener("change", () => {
	if (toggleSwitch.checked) {
		// Switch is ON, change camera view to 'Top View'
		cameraView = "Top View";

		// Adjust camera position and rotation for 'Top View'
		camera.position.set(0, 300, 0);
		camera.lookAt(scene.position);

		render();
		} else {
		// Switch is OFF, change camera view back to '3D'
		cameraView = "3D";

		// Reset camera position and rotation for '3D' view
		camera.position.set(-5, 150, 350);
		camera.lookAt(scene.position);

		render();
	}
});



dropdownOptions.forEach((option) => {
  option.addEventListener("click", (event) => {

    const selectedValue = option.getAttribute("value");
    const selectedText = option.textContent;

    selectedOptionText.textContent = selectedText;

    // Remove tick from all options except the selected one
    dropdownOptions.forEach((otherOption) => {
      if (otherOption !== option) {
        otherOption.classList.remove("selected");
      }
    });

    // Add tick to the selected option
    option.classList.add("selected");

    // Update camera position based on the selected value
    switch (selectedValue) {
      case "option1": // Default
        camera.position.set(-5, 150, 350);
        camera.rotation.set(-Math.PI / 4, 0, 0);
        camera.zoom = 0.6;
        break;
      case "option2": // The Sun
        camera.position.set(60, 25, 80);
        camera.rotation.set(-Math.PI / 4, 0, 0);
        camera.zoom = 6;
        break;
      case "option3": // Mercury
        camera.position.set(0, 100, 300);
        camera.rotation.set(-Math.PI / 3, 0, 0);
        camera.zoom = 10;
        break;
      case "option4": // Venus
        camera.position.set(0, 90, 200);
        camera.rotation.set(-Math.PI / 4, 0, 0);
        camera.zoom = 4.5;
        break;
      case "option5": // The Earth
        camera.position.set(0, 80, 320);
        camera.rotation.set(-Math.PI / 4, 0, 0);
        camera.zoom = 5;
        break;
      case "option6": // Mars
        camera.position.set(0, 60, 380);
        camera.rotation.set(-Math.PI / 4, 0, 0);
        camera.zoom = 4;
        break;
      case "option7": // Jupiter
        camera.position.set(0, 85, 500);
        camera.rotation.set(-Math.PI / 4, 0, 0);
        camera.zoom = 3;
        break;
      case "option8": // Saturn
        camera.position.set(0, 80, 700);
        camera.rotation.set(-Math.PI / 4, 0, 0);
        camera.zoom = 2.7;
        break;
      case "option9": // Uranus
        camera.position.set(0, 60, 500);
        camera.rotation.set(-Math.PI / 4, 0, 0);
        camera.zoom = 2;
        break;
      case "option10": // Neptune
        camera.position.set(0, 60, 800);
        camera.rotation.set(-Math.PI / 4, 0, 0);
        camera.zoom = 1.5;
        break;
      default:
        break;
    }

    camera.updateProjectionMatrix();
  });
});

interactive.style.display = "block";

arrowIcon.addEventListener("click", () => {
	interactive.classList.toggle("minimized");

	if (interactive.classList.contains("minimized")) {
		arrowIcon.classList.remove("fa-chevron-up");
		arrowIcon.classList.add("fa-chevron-down");
	} else {
		arrowIcon.classList.remove("fa-chevron-down");
		arrowIcon.classList.add("fa-chevron-up");
	}

});





document.addEventListener("DOMContentLoaded", function () {
	zoomSlider.addEventListener("input", updateZoomValue);
	speedSlider.addEventListener("input", updateSpeedValue);
});

// Set the checkbox to be checked by default
orbitCheckbox.checked = true;

orbitCheckbox.addEventListener("input", handleOrbitCheckboxChange);


const init = () => {
	/*
		functions dependent on load order
	*/

	navbar_data.forEach((planet) => {
		const { id, mesh, name, distance, size, speed, scale, image } = planet;
		document.getElementById(id).addEventListener("click", () => {
			if( !mesh ) debugger
			handlePlanetClick(mesh, name, distance, size, speed, scale, image);
		});
	});
}




export {
	init
}
