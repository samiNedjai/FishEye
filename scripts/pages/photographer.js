
// Importations des modules nécessaires pour la gestion des photographes et des médias
import { Photographer } from '../models/Photographer.js';
import MediaFactory from '../models/MediaFactory.js';
import { openModal } from '../utils/contactForm.js';
import { openLightbox, mediaGallery,attachLightboxControls } from '../utils/lightbox.js';

// tableau  pour stocker les objets média lors de l'initialisation
let mediaObjects = [];

// Fonction pour récupérer les données JSON à partir d'une URL spécifiée
async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

// Récupère les détails d'un photographe par son ID à partir du fichier JSON
async function getPhotographerFromId(id) {
  const data = await fetchData('data/photographers.json');
  return data.photographers.find(photographer => photographer.id === parseInt(id, 10));
}

// Fonction pour récupérer les médias associés à un photographe spécifique
async function getMediaForPhotographer(photographerId) {
  const data = await fetchData('data/photographers.json');
  return data.media.filter(media => media.photographerId === parseInt(photographerId, 10));
}

// Extrait l'ID du photographe à partir de l'URL pour pouvoir récupérer ses informations
function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Fonction pour trier les médias selon un critère spécifié ('popularity', 'date', 'title')
function sortMedia(mediaObjects, sortBy) {
  const sortingStrategies = {
      'popularity': (a, b) => b.likes - a.likes,
      'date': (a, b) => new Date(b.date) - new Date(a.date),
      'title': (a, b) => a.title.localeCompare(b.title)
  };
  mediaObjects.sort(sortingStrategies[sortBy] || sortingStrategies['title']);
  displaySortedMedia(mediaObjects);
}

// Fonction pour gérer les interactions de "like" sur un média et mettre à jour l'affichage
function handleLike(mediaId) {
  const media = mediaObjects.find(media => media.id === parseInt(mediaId));
  if (media) {
      media.toggleLike();
      updateLikesDisplay(mediaId, media);
  }
}

// Fonction pour mettre à jour l'affichage des likes pour un média spécifique et le total des likes
function updateLikesDisplay(mediaId, media) {
  const likeElement = document.querySelector(`.likes-count[data-id="${mediaId}"]`);
  likeElement.textContent = media.likes;

  const button = document.querySelector(`.like-button[data-id="${mediaId}"] i`);
  button.className = media.liked ? "fa fa-heart" : "fa fa-heart-o";

  updateTotalLikes(mediaObjects);
}

// Fonction pour calculer et mettre à jour l'affichage du total des likes pour tous les médias
function updateTotalLikes(mediaObjects) {
  const totalLikes = mediaObjects.reduce((total, media) => total + media.likes, 0);
  document.querySelector('.total-likes').textContent = totalLikes;
}

// Fonction pour afficher les médias triés dans le DOM
function displaySortedMedia(mediaObjects) {
  const mediaSection = document.querySelector('.photographer-work');
  mediaSection.innerHTML = '';

  mediaObjects.forEach((media, index) => {
      const html = media.getHTML();
      mediaSection.innerHTML += html;
      
      mediaGallery[index] = {
          src: `assets/media/${media.photographerId}/large/${media.image || media.video}`,
          alt: media.title,
          type: media.image ? 'image' : 'video'
      };
  });

  attachLikeEventHandlers();
  attachLightboxEventHandlers();
}

// Fonction pour mettre à jour le DOM avec les informations du photographe
function updatePhotographerDOM(photographer) {
  document.querySelector('.photographer-name').textContent = photographer.name;
  document.querySelector('.photographer-location').textContent = `${photographer.city}, ${photographer.country}`;
  document.querySelector('.photographer-tagline').textContent = photographer.tagline;

  const portraitElement = document.querySelector('.photographer-portrait');
  portraitElement.src = `assets/photographers/${photographer.portrait}`;
  portraitElement.alt = `Portrait de ${photographer.name}`;
}

// Attache les gestionnaires pour les événements de like sur les médias
function attachLikeEventHandlers() {
  const buttons = document.querySelectorAll('.like-button');
  buttons.forEach(button => {
      button.addEventListener('click', likeButtonClickHandler);
  });
}

// Gestionnaire d'événement pour un clic sur un bouton de like
function likeButtonClickHandler() {
  const mediaId = this.getAttribute('data-id');
  handleLike(mediaId);
}

// Attache les gestionnaires d'événements pour la lightbox
function attachLightboxEventHandlers() {
  const images = document.querySelectorAll('.photographer-work img');
  images.forEach((img, index) => {
      img.tabIndex = 0;
      img.addEventListener('click', () => openLightbox(index));
      img.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
              openLightbox(index);
          }
      });
  });
}

// Fonction principale pour initialiser et afficher les détails du photographe sur la page
async function displayPhotographerDetails() {
  const photographerId = getPhotographerIdFromUrl();
  if (!photographerId) return;

  const photographerData = await getPhotographerFromId(photographerId);
  if (!photographerData) return;

  const photographer = new Photographer(photographerData);
  updatePhotographerDOM(photographer);

  const mediaData = await getMediaForPhotographer(photographerId);
  mediaObjects = mediaData.map(media => MediaFactory.createMedia(media));
  displaySortedMedia(mediaObjects);
  updateTotalLikes(mediaObjects);
  document.querySelector('.price-per-day').textContent = `${photographer.price}€ / jour`;
  attachSortAndContactListeners();
  attachLikeEventHandlers();
  attachLightboxControls();
  attachLightboxEventHandlers();
}

// Attache les écouteurs d'événements pour les options de tri et le bouton de contact
function attachSortAndContactListeners() {
  document.getElementById('sortSelect').addEventListener('change', event => {
      const sortBy = event.target.value;
      sortMedia(mediaObjects, sortBy);
  });

  document.querySelector('.contact_button').addEventListener('click', function() {
    const photographerName = document.querySelector('.photographer-name').textContent; // Récupération du nom du DOM
    openModal(photographerName);
});
}

// Initialisation à la fin du chargement du contenu de la page
document.addEventListener('DOMContentLoaded', displayPhotographerDetails);