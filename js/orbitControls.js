import camera from './camera.js'
import * as settings from './settings.js'



const canvas = document.querySelector( settings.canvasSelector )

const orbitControls = new THREE.OrbitControls( camera, canvas );
orbitControls.enableDamping = true;
orbitControls.minDistance = 130;
orbitControls.maxDistance = 450;
orbitControls.zoomSpeed = 0.5;


export default orbitControls