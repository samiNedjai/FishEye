
// Importez la classe Photographer
import { Photographer } from './index.js';
// Importez MediaFactory depuis le dossier models
import MediaFactory from '../models/MediaFactory.js';
// importer fonction
import { openModal } from '../utils/contactForm.js';


 // Ce tableau sera rempli lors de l'initialisation de vos médias
let mediaObjects = [];

// Obtient les détails d'un photographe par son ID
async function getPhotographerFromId(id) {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    return data.photographers.find(photographer => photographer.id === parseInt(id, 10));
}

// Récupère les médias associés à un photographe spécifique
async function getMediaForPhotographer(photographerId) {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    // Filtrer pour obtenir uniquement les médias associés à l'ID du photographe
    return data.media.filter(media => media.photographerId === parseInt(photographerId, 10));
}

// Extrayez l'ID du photographe à partir de l'URL
function getPhotographerIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Gère les likes pour les médias
function handleLike(mediaId) {
  // Trouve l'objet média correspondant dans la liste des médias chargés
  const media = mediaObjects.find(media => media.id === parseInt(mediaId));
  if (media) {
      media.toggleLike();  // Basculer l'état de like
      // Met à jour le compteur de likes dans le DOM
      const likeElement = document.querySelector(`.likes-count[data-id="${mediaId}"]`);
      likeElement.textContent = media.likes;
      // Change l'icône du cœur selon l'état de like
      const button = document.querySelector(`.like-button[data-id="${mediaId}"] i`);
      button.className = media.liked ? "fa fa-heart" : "fa fa-heart-o";
       // Mettre à jour le total des likes dans le footer
       const totalLikesElement = document.querySelector('.total-likes');
       const currentTotalLikes = parseInt(totalLikesElement.textContent);
       const newTotalLikes = media.liked ? currentTotalLikes + 1 : currentTotalLikes - 1;
       totalLikesElement.textContent = `${newTotalLikes}`;
  }
}

// Attache les gestionnaires d'événements aux boutons de like
function attachLikeEventHandlers() {
    document.querySelectorAll('.like-button').forEach(button => {
        button.removeEventListener('click', likeButtonClickHandler); // Retirer d'abord pour éviter les doublons
        button.addEventListener('click', likeButtonClickHandler);
    });
}

function likeButtonClickHandler() {
    const mediaId = this.getAttribute('data-id');
    handleLike(mediaId);
}

// function Tri des médias selon le critère spécifié
function sortMedia(mediaObjects, sortBy) {
  switch (sortBy) {
      case 'popularity':
          mediaObjects.sort((a, b) => b.likes - a.likes);
          break;
      case 'date':
          mediaObjects.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
      case 'title':
          mediaObjects.sort((a, b) => a.title.localeCompare(b.title));
          break;
      default:
          // Tri par défaut si aucune option de tri valide n'est fournie
          break;
  }
  displaySortedMedia(mediaObjects);
}

// Afficher les médias triés en mettant à jour le DOM :
function displaySortedMedia(mediaObjects) {
  const mediaSection = document.querySelector('.photographer-work');
  mediaSection.innerHTML = ''; // Vide la section avant de réafficher les médias triés
  mediaObjects.forEach(media => {
      mediaSection.innerHTML += media.getHTML();
  });
  attachLikeEventHandlers();
}

// Affiche les détails du photographe et ses médias
async function displayPhotographerDetails() {
    const photographerId = getPhotographerIdFromUrl();  // Récupère l'ID du photographe depuis l'URL
    if (photographerId) {
      // Tentative de récupération des détails du photographe depuis l'ID
        const photographerData = await getPhotographerFromId(photographerId);
        if (photographerData) {
           // Si les données du photographe sont trouvées, initialise une instance et met à jour le DOM
            const photographer = new Photographer(photographerData);
            document.querySelector('.photographer-name').textContent = photographer.name;
            document.querySelector('.photographer-location').textContent = `${photographer.city}, ${photographer.country}`;
            document.querySelector('.photographer-tagline').textContent = photographer.tagline;
            // Affichage du portrait
            const portraitElement = document.querySelector('.photographer-portrait');
            portraitElement.src = `assets/photographers/${photographer.portrait}`;
            portraitElement.alt = `Portrait de ${photographer.name}`;

            // Récupère et affiche les médias associés au photographe

            const mediaData = await getMediaForPhotographer(photographerId);
             // Transformation des données en objets Media
              mediaObjects = mediaData.map(media => MediaFactory.createMedia(media));
              // Affichage des médias avant le tri
              displaySortedMedia(mediaObjects);
         

              // Attachez l'écouteur d'événements au menu de tri ici
                document.getElementById('sortSelect').addEventListener('change', (event) => {
                  const sortBy = event.target.value;
                  sortMedia(mediaObjects, sortBy);
                   displaySortedMedia(mediaObjects);
              });
              // total des likes 
              const totalLikes = mediaData.reduce((total, media) => total + media.likes, 0);
              const pricePerDay = photographerData.price;

              // Mise à jour du DOM avec les totaux
              document.querySelector('.total-likes').textContent = `${totalLikes}`;
              document.querySelector('.price-per-day').textContent = `${pricePerDay}€ / jour`;
              attachLikeEventHandlers(); 

              document.querySelector('.contact_button').addEventListener('click', () => {
                openModal(photographer.name); 

              });
          
        } else {
            console.error('Photographe non trouvé');
        }
    } else {
        console.error('ID de photographe manquant dans l\'URL');
    }
}

document.addEventListener('DOMContentLoaded', displayPhotographerDetails);





