// main.js

// Importera moduler
import { sizeScale, distanceScale, moonDistanceScale, objects, createPlanet } from './js/planets.js';
import { setupInteractions } from './js/interactions.js';

// Skapa scenen
const scene = new THREE.Scene();

// Skapa kameran
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 200, 500);

// Skapa renderaren
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Solen som enda ljuskälla
const sunLight = new THREE.PointLight(0xffffff, 3, 5000);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// Lägg till OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;

// Planetdata array för att hålla reda på alla planeter och månar för animering
const planetData = [];

// Skapa solen
const sunData = createPlanet(695700 * sizeScale, 'textures/sun.jpg', 0, 0, 'basic', scene, 'Solen');
planetData.push(sunData);

// Skapa planeter och månar
const mercuryData = createPlanet(
  2440 * sizeScale,
  'textures/mercury.jpg',
  57900000 * distanceScale,
  0.04,
  'standard',
  scene,
  'Mercurius'
);
planetData.push(mercuryData);

const venusData = createPlanet(
  6052 * sizeScale,
  'textures/venus.jpg',
  108200000 * distanceScale,
  0.015,
  'standard',
  scene,
  'Venus'
);
planetData.push(venusData);

const earthData = createPlanet(
  6371 * sizeScale,
  'textures/earth.jpg',
  149600000 * distanceScale,
  0.01,
  'standard',
  scene,
  'Jorden'
);
planetData.push(earthData);

// Månen
const moonData = createPlanet(
  1737 * sizeScale,
  'textures/moon.jpg',
  384400 * moonDistanceScale,
  0.02,
  'standard',
  earthData.planet,
  'Månen'
);
planetData.push(moonData);

// Mars
const marsData = createPlanet(
  3390 * sizeScale,
  'textures/mars.jpg',
  227900000 * distanceScale,
  0.008,
  'standard',
  scene,
  'Mars'
);
planetData.push(marsData);

// Mars månar
const phobosData = createPlanet(
  11 * sizeScale,
  'textures/phobos.jpg',
  9376 * moonDistanceScale,
  0.05,
  'standard',
  marsData.planet,
  'Phobos'
);
planetData.push(phobosData);

const deimosData = createPlanet(
  6 * sizeScale,
  'textures/deimos.jpg',
  23463 * moonDistanceScale,
  0.03,
  'standard',
  marsData.planet,
  'Deimos'
);
planetData.push(deimosData);

// Jupiter
const jupiterData = createPlanet(
  69911 * sizeScale,
  'textures/jupiter.jpg',
  778500000 * distanceScale,
  0.002,
  'standard',
  scene,
  'Jupiter'
);
planetData.push(jupiterData);

// Jupiters månar
const ioData = createPlanet(
  1821 * sizeScale,
  'textures/io.jpg',
  421700 * moonDistanceScale,
  0.04,
  'standard',
  jupiterData.planet,
  'Io'
);
planetData.push(ioData);

const europaData = createPlanet(
  1560 * sizeScale,
  'textures/europa.jpg',
  671100 * moonDistanceScale,
  0.03,
  'standard',
  jupiterData.planet,
  'Europa'
);
planetData.push(europaData);

const ganymedeData = createPlanet(
  2634 * sizeScale,
  'textures/ganymede.jpg',
  1070400 * moonDistanceScale,
  0.02,
  'standard',
  jupiterData.planet,
  'Ganymedes'
);
planetData.push(ganymedeData);

const callistoData = createPlanet(
  2410 * sizeScale,
  'textures/callisto.jpg',
  1882700 * moonDistanceScale,
  0.01,
  'standard',
  jupiterData.planet,
  'Callisto'
);
planetData.push(callistoData);

// Saturnus
const saturnData = createPlanet(
  58232 * sizeScale,
  'textures/saturn.jpg',
  1433500000 * distanceScale,
  0.0009,
  'standard',
  scene,
  'Saturnus'
);
planetData.push(saturnData);

// Saturnus måne Titan
const titanData = createPlanet(
  2575 * sizeScale,
  'textures/titan.jpg',
  1221870 * moonDistanceScale,
  0.01,
  'standard',
  saturnData.planet,
  'Titan'
);
planetData.push(titanData);

// Uranus
const uranusData = createPlanet(
  25362 * sizeScale,
  'textures/uranus.jpg',
  2872500000 * distanceScale,
  0.0004,
  'standard',
  scene,
  'Uranus'
);
planetData.push(uranusData);

// Uranus månar
const titaniaData = createPlanet(
  789 * sizeScale,
  'textures/titania.jpg',
  436300 * moonDistanceScale,
  0.02,
  'standard',
  uranusData.planet,
  'Titania'
);
planetData.push(titaniaData);

const oberonData = createPlanet(
  761 * sizeScale,
  'textures/oberon.jpg',
  583500 * moonDistanceScale,
  0.015,
  'standard',
  uranusData.planet,
  'Oberon'
);
planetData.push(oberonData);

// Neptunus
const neptuneData = createPlanet(
  24622 * sizeScale,
  'textures/neptune.jpg',
  4495100000 * distanceScale,
  0.0002,
  'standard',
  scene,
  'Neptunus'
);
planetData.push(neptuneData);

// Neptunus måne Triton
const tritonData = createPlanet(
  1353 * sizeScale,
  'textures/triton.jpg',
  354800 * moonDistanceScale,
  0.02,
  'standard',
  neptuneData.planet,
  'Triton'
);
planetData.push(tritonData);

// Sätt upp interaktivitet
setupInteractions(camera, renderer, objects);

// Animeringsloopen
function animate() {
  requestAnimationFrame(animate);

  // Rotera planeter och månar
  planetData.forEach(data => {
    data.planet.rotation.y += 0.004;
    data.pivot.rotation.y += data.orbitalSpeed;
  });

  // Uppdatera kontrollerna
  controls.update();

  renderer.render(scene, camera);
}

animate();

// Hantera fönsterstorleksändringar
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});
