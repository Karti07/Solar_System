// Importing variables and modules
import {
	planet_settings,
	local_meshes,
	planet_meshes,
	navbar_data,
	orbitPaths,
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

// Function to reset the scale of planetary meshes
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

// Function to display information about a planet on the UI tooltip
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

// Function to handle the click event on a planet
function handlePlanetClick( planetMesh, name, distance, size, speed, scale, image) {
    resetPlanetScales();
    showPlanetInfo(name, distance, size, speed, image);
    planetMesh.scale.set(scale, scale, scale);
}

// Function to update the displayed speed value based on the speed slider
function updateSpeedValue() {
	const newSpeed = parseFloat(speedSlider.value).toFixed(1);
	speedValueLabel.textContent = newSpeed;
	// Update the orbitSpeed of each planet in the planet_settings object
	for (const planet of Object.values(planet_settings)) {
		planet.orbitSpeed = newSpeed * speedMultiplier;
	}
}

// Function to update the displayed zoom value based on the zoom slider
function updateZoomValue() {
	const zoomValue = parseFloat(zoomSlider.value).toFixed(2);
	zoomValueLabel.textContent = zoomValue;

  // Update the camera zoom value and render the scene immediately
	camera.zoom = parseFloat(zoomSlider.value);
	camera.updateProjectionMatrix();
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

// Function to render the scene
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

// Event listeners for dropdown options
for (const option of dropdownOptions) {
  option.addEventListener("click", (event) => {

    const selectedValue = option.getAttribute("value");
    const selectedText = option.textContent;

    selectedOptionText.textContent = selectedText;

    // Remove tick from all options except the selected one
    for (const otherOption of dropdownOptions) {
      if (otherOption !== option) {
        otherOption.classList.remove("selected");
      }
    }    

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
}

// Event listener for arrow icon click to minimize or maximize the interactive block
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

// Event listener for checkbox change to show or hide Earth days heading
const checkbox = document.getElementById('earthdays-checkbox')
checkbox.addEventListener('change', e => {
	const headingContainer = document.getElementById("heading-container");
	if (checkbox.checked) {
		headingContainer.style.display = "block";
	} else {
		headingContainer.style.display = "none";
	}
})

// Event listeners for input changes on zoom and speed sliders
document.addEventListener("DOMContentLoaded", function () {
	zoomSlider.addEventListener("input", updateZoomValue);
	speedSlider.addEventListener("input", updateSpeedValue);
});

// Set the checkbox to be checked by default
orbitCheckbox.checked = true;

// Event listener for checkbox change to handle orbit visibility
orbitCheckbox.addEventListener("input", handleOrbitCheckboxChange);

// Function to initialize navbar meshes and set up click event listeners
const init = () => {
	for (const entry of navbar_data) {
		entry.mesh = planet_meshes[entry.id] || local_meshes[entry.id];
		if (!entry.mesh) {
			console.error('failed to init navbar mesh', entry.id)
		}
	}

	for (const planet of navbar_data) {
    const { id, mesh, name, distance, size, speed, scale, image } = planet;
    if (!mesh) console.error(name + ' not assigned yet');
    document.getElementById(id).addEventListener("click", () => {
      handlePlanetClick(mesh, name, distance, size, speed, scale, image);
    });
  }  
}

// Exporting the 'init' function for external use
export {
	init
}