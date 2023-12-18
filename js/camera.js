  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(-5, 150, 350);
  camera.rotation.set(-Math.PI / 4, 0, 0);
  camera.zoom = 0.6;
  camera.updateProjectionMatrix();



  export default camera