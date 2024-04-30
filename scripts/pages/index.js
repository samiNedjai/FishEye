
// Définition de la classe Photographer pour encapsuler les données et les méthodes liées à un photographe
export class Photographer {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
      
  }
  // Méthode pour générer le DOM d'une carte de photographe
  getUserCardDOM() {
    const link = document.createElement("a");
    link.href = `photographer.html?id=${this.id}`;
    link.setAttribute("aria-label", `Voir le profil de ${this.name}`);
    link.className = "photographer-article-link";

    const article = document.createElement("article");
    article.className = "photographer-article";
    article.dataset.id = this.id; // Permet d'ajouter un data-id avec l'ID du photographe
  
  
    const img = document.createElement("img");
    img.className = "photographer-portrait";
    img.src = `assets/photographers/${this.portrait}`;
    img.alt = `Portrait de ${this.name}`;
  
    const nameElement = document.createElement("h2");
    nameElement.textContent = this.name;
  
    const locationElement = document.createElement("p");
    locationElement.className = "location";
    locationElement.textContent = `${this.city}, ${this.country}`;
  
    const taglineElement = document.createElement("p");
    taglineElement.className = "tagline";
    taglineElement.textContent = this.tagline;
  
    const priceElement = document.createElement("p");
    priceElement.className = "price";
    priceElement.textContent = `${this.price}€/jour`;
  
    // Assemblage des différents éléments de la carte
    article.append(img, nameElement, locationElement, taglineElement, priceElement);

    // Ajouter le lien à l'article
    link.appendChild(article);
  
    return link;
  }
  
}

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


// Assurez-vous que le DOM est complètement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", init); 
