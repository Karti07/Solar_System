import camera from './camera.js'
import * as settings from './settings.js'
// import * as THREE from '../node_modules/three/build/three.module.js'
import * as THREE from 'three'
import {
	OrbitControls,
} from '../node_modules/three/examples/jsm/controls/OrbitControls.js'


const canvas = document.querySelector( settings.canvasSelector )

const orbitControls = new OrbitControls( camera, canvas );
orbitControls.enableDamping = true;
orbitControls.minDistance = 130;
orbitControls.maxDistance = 450;
orbitControls.zoomSpeed = 0.5;

export default orbitControls