// js/planets.js

// Importera Three.js
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

// Skalningsfaktorer
export const sizeScale = 0.0005;
export const distanceScale = 0.00000005;
export const moonDistanceScale = distanceScale * 5;

// Lista över interaktiva objekt
export const objects = [];

// Funktion för att skapa planeter och månar
export function createPlanet(
  size,
  textureFileName,
  distance,
  orbitalSpeed,
  materialType = 'standard',
  parent,
  name = ''
) {
  const geometry = new THREE.SphereGeometry(size, 32, 32);
  const textureLoader = new THREE.TextureLoader();

  // Justera sökvägen till texturen
  const texturePath = `../textures/${textureFileName}`;

  // Skapa planeten med en grå färg initialt
  let material = new THREE.MeshStandardMaterial({ color: 0x888888 });

  // Ladda texturen
  textureLoader.load(
    texturePath,
    function (texture) {
      // När texturen är laddad, uppdatera materialet
      material.map = texture;
      material.needsUpdate = true;
    },
    undefined,
    function (err) {
      // Om texturen inte kan laddas, använd grå färg (redan inställd)
      console.warn(`Textur för ${name} kunde inte laddas. Använder grå färg istället.`);
    }
  );

  // Välj materialtyp
  if (materialType === 'basic') {
    material = new THREE.MeshBasicMaterial({ color: 0x888888 });
    textureLoader.load(
      texturePath,
      function (texture) {
        material.map = texture;
        material.needsUpdate = true;
      }
    );
  }

  const planet = new THREE.Mesh(geometry, material);

  // Lagra namnet i planetens användardata
  planet.userData = { name: name };

  // Lägg till planeten till listan över interaktiva objekt
  objects.push(planet);

  // Skapa pivot-grupp
  const pivot = new THREE.Object3D();
  pivot.add(planet);
  planet.position.x = distance;
  parent.add(pivot);

  return { planet, pivot, orbitalSpeed };
}
