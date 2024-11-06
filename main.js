// Skapa scenen
const scene = new THREE.Scene();

// Skapa kameran
const camera = new THREE.PerspectiveCamera(
  75, // Synfält
  window.innerWidth / window.innerHeight, // Aspektförhållande
  0.1, // Närgräns
  1000 // Fjärgräns
);
camera.position.z = 50;

// Skapa renderaren
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lägg till ljus (solen som ljuskälla)
const pointLight = new THREE.PointLight(0xffffff, 2, 0);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// Lägg till Ambient Light för mjukare ljus
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// Lägg till OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;

// Funktion för att skapa planeter
function createPlanet(size, texture, position) {
  const geometry = new THREE.SphereGeometry(size, 32, 32);
  const materialOptions = texture
    ? { map: new THREE.TextureLoader().load(texture) }
    : { color: 0xffffff };
  const material = new THREE.MeshStandardMaterial(materialOptions);
  const planet = new THREE.Mesh(geometry, material);
  planet.position.x = position;
  scene.add(planet);
  return planet;
}

// Skapa solen
const sun = createPlanet(5, 'textures/sun.jpg', 0);

// Skapa planeter
const mercury = createPlanet(0.5, 'textures/mercury.jpg', 8);
const venus = createPlanet(1, 'textures/venus.jpg', 11);
const earth = createPlanet(1, 'textures/earth.jpg', 14);
const mars = createPlanet(0.8, 'textures/mars.jpg', 17);
const jupiter = createPlanet(2.5, 'textures/jupiter.jpg', 21);
const saturn = createPlanet(2, 'textures/saturn.jpg', 26);
const uranus = createPlanet(1.5, 'textures/uranus.jpg', 30);
const neptune = createPlanet(1.5, 'textures/neptune.jpg', 34);

// Animeringsloopen
function animate() {
  requestAnimationFrame(animate);

  // Rotera solen och planeterna
  sun.rotation.y += 0.005;
  mercury.rotation.y += 0.004;
  venus.rotation.y += 0.002;
  earth.rotation.y += 0.01;
  mars.rotation.y += 0.008;
  jupiter.rotation.y += 0.006;
  saturn.rotation.y += 0.005;
  uranus.rotation.y += 0.004;
  neptune.rotation.y += 0.003;

  // Uppdatera kontrollerna
  controls.update();

  renderer.render(scene, camera);
}

animate();

// Hantera fönsterstorleksändringar
window.addEventListener('resize', () => {
  // Justera kamerans aspektförhållande
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Justera renderarens storlek
  renderer.setSize(window.innerWidth, window.innerHeight);
});
