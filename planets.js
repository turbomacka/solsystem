// planets.js

// Skalningsfaktorer
export const sizeScale = 0.0005;
export const distanceScale = 0.00000005;
export const moonDistanceScale = distanceScale * 5;

// Lista över interaktiva objekt
export const objects = [];

// Funktion för att skapa planeter och månar
export function createPlanet(size, texturePath, distance, orbitalSpeed, materialType = 'standard', parent, name = '') {
  const geometry = new THREE.SphereGeometry(size, 32, 32);
  let material;
  const textureLoader = new THREE.TextureLoader();

  // Skapa planeten med en grå färg initialt
  const planet = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x888888 }));

  // Ladda texturen
  textureLoader.load(
    texturePath,
    function (texture) {
      // När texturen är laddad, uppdatera materialet
      planet.material.map = texture;
      planet.material.needsUpdate = true;
    },
    undefined,
    function (err) {
      // Om texturen inte kan laddas, använd grå färg (redan inställd)
      console.warn(`Textur för ${name} kunde inte laddas. Använder grå färg istället.`);
    }
  );

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
