// Importing the camera and settings
import camera from './camera.js'
import * as settings from './settings.js'

// Importing OrbitControls from Three.js
import {
	OrbitControls,
} from '../node_modules/three/examples/jsm/controls/OrbitControls.js'

// Selecting the canvas element using the specified selector from settings
const canvas = document.querySelector( settings.canvasSelector )

// Creating a new instance of OrbitControls, attaching it to the camera and canvas
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true; // Enables damping for smoother controls
orbitControls.minDistance = 130; // Minimum distance of the camera
orbitControls.maxDistance = 450; // Maximum distance of the camera
orbitControls.zoomSpeed = 0.5; // Zoom speed for the controls

// Exporting the orbitControls as default
export default orbitControls;