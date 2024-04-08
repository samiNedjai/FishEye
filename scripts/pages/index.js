// index.js

class Photographer {
  constructor(data) {
      this.name = data.name;
      this.id = data.id;
      this.city = data.city;
      this.country = data.country;
      this.tagline = data.tagline;
      this.price = data.price;
      this.portrait = data.portrait;
  }

  getUserCardDOM() {
      const article = document.createElement('article');
      article.className = "photographer-article";
      article.dataset.id = this.id; // Permet d'ajouter un data-id avec l'ID du photographe
  
      const img = document.createElement('img');
      img.className = "photographer-portrait";
      img.setAttribute("src", `assets/photographers/${this.portrait}`);
      img.setAttribute("alt", `Portrait de ${this.name}`);
  
      const nameElement = document.createElement('h2');
      nameElement.textContent = this.name;
  
      const locationElement = document.createElement('p');
      locationElement.className = "location";
      locationElement.textContent = `${this.city}, ${this.country}`;
  
      const taglineElement = document.createElement('p');
      taglineElement.className = "tagline";
      taglineElement.textContent = this.tagline;
  
      const priceElement = document.createElement('p');
      priceElement.className = "price";
      priceElement.textContent = `${this.price}€/jour`;
  
      // Ajouter les éléments créés au DOM de l'article
      article.appendChild(img);
      article.appendChild(nameElement);
      article.appendChild(locationElement);
      article.appendChild(taglineElement);
      article.appendChild(priceElement);
  
      return article;
  }
  
}

// Utilisez cette fonction pour obtenir les données des photographes et les afficher
async function getPhotographers() {
  const response = await fetch('data/photographers.json');
  const data = await response.json();

  return {
      photographers: data.photographers.map(photographerData => new Photographer(photographerData))
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
      const photographerModel = new Photographer(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init(); // Cette ligne démarre l'initialisation lorsque la page est chargée
