// interactions.js

export function setupInteractions(camera, renderer, objects) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Eventlyssnare för musklick
  window.addEventListener('click', onClick, false);

  function onClick(event) {
    // Justera musens x och y koordinater
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Uppdatera raycaster med kamerans och musens position
    raycaster.setFromCamera(mouse, camera);

    // Beräkna vilka objekt som intersektar med raycaster
    const intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
      // Hämta det första intersekterade objektet
      const object = intersects[0].object;

      // Hämta namn från användardata
      const name = object.userData.name;

      // Visa information
      showInfo(name);
    }
  }

  // Funktion för att visa information
  function showInfo(name) {
    // Hämta referenser till HTML-elementen
    const infoBox = document.getElementById('info-box');
    const infoTitle = document.getElementById('info-title');
    const infoContent = document.getElementById('info-content');

    // Ställ in titeln
    infoTitle.innerText = name;

    // Ställ in innehållet baserat på namnet
    let content = '';
    switch (name) {
      case 'Solen':
        content = 'Solen är stjärnan i centrum av vårt solsystem. Den utgör cirka 99,86% av solsystemets massa.';
        break;
      case 'Mercurius':
        content = 'Mercurius är den innersta planeten i solsystemet och den minsta. Den har ingen atmosfär och dess yta är täckt av kratrar.';
        break;
      case 'Venus':
        content = 'Venus är den andra planeten från solen och liknar jorden i storlek. Den har en tjock atmosfär som orsakar extrem växthuseffekt.';
        break;
      case 'Jorden':
        content = 'Jorden är den tredje planeten från solen och den enda kända planeten som har liv. Den har en måne, kallad Månen.';
        break;
      case 'Mars':
        content = 'Mars är den fjärde planeten från solen och är känd som den röda planeten på grund av dess röda yta orsakad av järnoxid.';
        break;
      case 'Jupiter':
        content = 'Jupiter är den största planeten i solsystemet och är en gasjätte. Den har en stor röd fläck som är en enorm storm.';
        break;
      case 'Saturnus':
        content = 'Saturnus är känd för sina ringar som består av is och sten. Den är den näst största planeten i solsystemet.';
        break;
      case 'Uranus':
        content = 'Uranus är en isjätte och är unik för att den roterar på sin sida. Den har en blågrön färg på grund av metan i atmosfären.';
        break;
      case 'Neptunus':
        content = 'Neptunus är den yttersta planeten i solsystemet och är också en isjätte. Den har starka vindar och stormar.';
        break;
      case 'Månen':
        content = 'Månen är Jordens enda naturliga satellit och är den femte största månen i solsystemet.';
        break;
      case 'Phobos':
        content = 'Phobos är den största av Mars två månar. Den är liten och ojämn i formen och kretsar mycket nära Mars yta.';
        break;
      case 'Deimos':
        content = 'Deimos är den mindre av Mars två månar. Den är också ojämn och har en slätare yta än Phobos.';
        break;
      case 'Io':
        content = 'Io är en av Jupiters Galileiska månar och är den mest vulkaniskt aktiva kroppen i solsystemet.';
        break;
      case 'Europa':
        content = 'Europa är en av Jupiters månar och tros ha en ocean av flytande vatten under sin isiga yta.';
        break;
      case 'Ganymedes':
        content = 'Ganymedes är den största månen i solsystemet och är större än planeten Merkurius.';
        break;
      case 'Callisto':
        content = 'Callisto är en av Jupiters månar och är täckt av kratrar. Den tros ha en underjordisk ocean.';
        break;
      case 'Titan':
        content = 'Titan är Saturnus största måne och den näst största i solsystemet. Den har en tjock atmosfär och sjöar av flytande metan.';
        break;
      case 'Triton':
        content = 'Triton är Neptunus största måne och är unik för sin retrograda bana, vilket innebär att den kretsar i motsatt riktning mot Neptunus rotation.';
        break;
      default:
        content = 'Ingen information tillgänglig.';
    }

    infoContent.innerText = content;

    // Visa informationsrutan
    infoBox.style.display = 'block';
  }

  // Eventlyssnare för att dölja informationsrutan
  window.addEventListener('click', function(event) {
    const infoBox = document.getElementById('info-box');
    if (infoBox.style.display === 'block' && !event.target.closest('#info-box')) {
      infoBox.style.display = 'none';
    }
  });
}
