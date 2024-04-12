
// Importez la classe Photographer
import { Photographer } from './index.js';
// Importez MediaFactory depuis le dossier models
import MediaFactory from '../models/MediaFactory.js';

async function getPhotographerFromId(id) {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    return data.photographers.find(photographer => photographer.id === parseInt(id, 10));
}

async function getMediaForPhotographer(photographerId) {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    // Filtrer pour obtenir uniquement les médias associés à l'ID du photographe
    return data.media.filter(media => media.photographerId === parseInt(photographerId, 10));
}

function getPhotographerIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

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
            const mediaSection = document.querySelector('.photographer-work'); // Assurez-vous d'avoir un élément avec cette classe dans votre HTML
            mediaData.forEach(media => {
              const mediaObject = MediaFactory.createMedia(media);
              mediaSection.innerHTML += mediaObject.getHTML();
              mediaObjects.push(mediaObject); // Assurez-vous de pousser l'objet dans le tableau

              // total des likes 
              const totalLikes = mediaData.reduce((total, media) => total + media.likes, 0);
              const pricePerDay = photographerData.price;

              // Mise à jour du DOM avec les totaux
              document.querySelector('.total-likes').textContent = `${totalLikes}`;
              document.querySelector('.price-per-day').textContent = `${pricePerDay}€ / jour`;
          });
          
          // Attache les gestionnaires d'événements aux boutons like après que le HTML des médias soit inséré

          document.querySelectorAll('.like-button').forEach(button => {
              button.addEventListener('click', () => {
                  const mediaId = button.getAttribute('data-id');
                  handleLike(mediaId);
              });
            });
        } else {
            console.error('Photographe non trouvé');
        }
    } else {
        console.error('ID de photographe manquant dans l\'URL');
    }
}


// gestion des likes 

// Supposons que vos médias sont stockés dans un tableau accessible globalement
let mediaObjects = []; // Ce tableau sera rempli lors de l'initialisation de vos médias

// Fonction pour gérer les likes
window.handleLike = function(mediaId) {
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


document.addEventListener('DOMContentLoaded', displayPhotographerDetails);





