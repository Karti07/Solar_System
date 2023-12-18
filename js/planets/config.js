import scene from "../scene.js";






const moonRadius = 1.5;
const saturnRadius = 9;
const sunRadius = 15;
const earthRadius = 7;

// let mercuryMesh, venusMesh, marsMesh, saturnMesh, jupiterMesh, uranusMesh, neptuneMesh;
const planet_meshes = {
	mercury: false,
	venus: false,
	mars: false,
	saturn: false,
	jupiter: false,
	uranus: false,
	neptune: false,
}

const local_meshes = {
	sun: false,
	earth: false,
	moon: false,
}



function generatePlanetsSettings() { 
	return {
		mercury: { angle: Math.random() * Math.PI * 2, orbitSpeed: 0.001 },
		venus: { angle: Math.random() * Math.PI * 2, orbitSpeed: 0.0008 },
		earth: { angle: Math.random() * Math.PI * 2, orbitSpeed: 0.0006 },
		mars: { angle: Math.random() * Math.PI * 2, orbitSpeed: 0.0005 },
		jupiter: { angle: Math.random() * Math.PI * 2, orbitSpeed: 0.0003 },
		saturn: { angle: Math.random() * Math.PI * 2, orbitSpeed: 0.0002 },
		uranus: { angle: Math.random() * Math.PI * 2, orbitSpeed: 0.00002 },
		neptune: { angle: Math.random() * Math.PI * 2, orbitSpeed: 0.00001 },
	};
} 

// Call the function to get the planet data
const planet_settings = generatePlanetsSettings();


const planet_data = [
	{ id: 'mercury', radius: 4, texturePath: "./textures/mercury_texture.jpg", position: [sunRadius + 4, 0, 0], parent: false },
	{ id: 'venus', radius: 6, texturePath: "./textures/venus_texture.jpg", position: [sunRadius + 6, 0, 0], parent: false },
	{ id: 'mars', radius: 8, texturePath: "./textures/mars_texture.jpg", position: [sunRadius + 8, 0, 0], parent: false },
	{ id: 'jupiter', radius: 11, texturePath: "./textures/jupiter_texture.jpg", position: [sunRadius + 11, 0, 0], parent: false },
	{ id: 'saturn', radius: 9, texturePath: "./textures/saturn_texture.jpg", position: [sunRadius + 9, 0, 0], parent: false },
	{ id: 'uranus', radius: 6, texturePath: "./textures/uranus_texture.jpg", position: [sunRadius + 6, 0, 0], parent: false },
	{ id: 'neptune', radius: 3.75, texturePath: "./textures/neptune_texture.jpg", position: [sunRadius + 3.75, 0, 0], parent: false },	
]



const navbar_data = [
	{ id: "sun", mesh: false, name: "Sun", distance: "0", size: "109.2x larger than Earth", speed: "800,000", scale: 1, image: "./images/sun.jpg" },
	{ id: "mercury", mesh: false, name: "Mercury", distance: "58 million km", size: "2,440 km", speed: "1,692", scale: 3, image: "./images/mercury.jpg" },
	{ id: "venus", mesh: false, name: "Venus", distance: "108 million km", size: "6,050 km", speed: "126,072", scale: 2, image: "./images/venus.jpeg" },
	{ id: "earth", mesh: false, name: "Earth", distance: "150 million km", size: "6,371 km", speed: "107,208", scale: 2.5, image: "./images/earth.jpg" },
	{ id: "mars", mesh: false, name: "Mars", distance: "228 million km", size: "3,390 km", speed: "86,871", scale: 2.5, image: "./images/mars.jpg" },
	{ id: "jupiter", mesh: false, name: "Jupiter", distance: "778 million km", size: "71,492 km", speed: "49,320", scale: 3, image: "./images/jupiter.jpg" },
	{ id: "saturn", mesh: false, name: "Saturn", distance: "1.4 billion km", size: "58,232 km", speed: "34,848", scale: 3, image: "./images/saturn.jpg" },
	{ id: "uranus", mesh: false, name: "Uranus", distance: "2.9 billion km", size: "25,362 km", speed: "24,607", scale: 5, image: "./images/uranus.jpg" },
	{ id: "neptune", mesh: false, name: "Neptune", distance: "4.5 billion km", size: "24,622 km", speed: "19,620", scale: 5, image: "./images/neptune.jpg" },
];

// planet_meshes.sun
// planet_meshes.mercury
// planet_meshes.venus
// planet_meshes.earth
// planet_meshes.mars
// planet_meshes.jupiter
// planet_meshes.saturn
// planet_meshes.uranus
// planet_meshes.neptune

// Store the initial positions of the planets
const initialPlanetData = generatePlanetsSettings()





function createOrbitPath(radius) {
  const segments = 360;
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const points = [];

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    points.push(new THREE.Vector3(x, 0, z));
  }

  geometry.setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  return line;
}




function createPlanetaryOrbits() {
	const orbitRadii = [
	30, // Mercury
	47, // Venus
	75, // Earth
	100, // Mars
	140, // Jupiter
	190, // Saturn
	245, // Uranus
	285, // Neptune
	];

	const orbitPaths = orbitRadii.map((radius) => createOrbitPath(radius));
	orbitPaths.forEach((orbitPath) => scene.add(orbitPath) );

	return orbitPaths;
}

// Call the main function to create planetary orbits
const orbitPaths = createPlanetaryOrbits();



// // for logging:

// window.CONFIG = {
// 	sunRadius,
// 	earthRadius,
// 	saturnRadius,
// 	moonRadius,
// 	planet_meshes,
// 	local_meshes,
// 	planet_data,
// 	navbar_data,
// 	planet_settings,
// 	initialPlanetData,
// 	orbitPaths,
// }


export {
	sunRadius,
	earthRadius,
	saturnRadius,
	moonRadius,
	planet_meshes,
	local_meshes,
	planet_data,
	navbar_data,
	planet_settings,
	initialPlanetData,
	orbitPaths,
}