import { Photographer } from '../models/Photographer.js';

// Fonction asynchrone pour récupérer les données des photographes depuis un fichier JSON
async function getPhotographers() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();

  return {
    photographers: data.photographers.map(photographerData => new Photographer(photographerData))
  };
}
// Fonction pour afficher les photographes dans la section correspondante
async function displayData(photographers) {
  const photographerCards = photographers.map(photographer => photographer.getUserCardDOM().outerHTML).join("");
  document.querySelector(".photographer_section").innerHTML = photographerCards;
}


// Fonction d'initialisation qui charge les données et les affiche
async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
 
}

 init(); 
