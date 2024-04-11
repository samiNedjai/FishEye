
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
    const photographerId = getPhotographerIdFromUrl();
    if (photographerId) {
        const photographerData = await getPhotographerFromId(photographerId);
        if (photographerData) {
            // Instance de la classe Photographer
            const photographer = new Photographer(photographerData);
            document.querySelector('.photographer-name').textContent = photographer.name;
            document.querySelector('.photographer-location').textContent = `${photographer.city}, ${photographer.country}`;
            document.querySelector('.photographer-tagline').textContent = photographer.tagline;
            // Affichage du portrait
            const portraitElement = document.querySelector('.photographer-portrait');
            portraitElement.src = `assets/photographers/${photographer.portrait}`;
            portraitElement.alt = `Portrait de ${photographer.name}`;

            // Récupérer et afficher les médias du photographe
            const mediaData = await getMediaForPhotographer(photographerId);
            const mediaSection = document.querySelector('.photographer-work'); // Assurez-vous d'avoir un élément avec cette classe dans votre HTML
            mediaData.forEach(media => {
                const mediaObject = MediaFactory.createMedia(media);
                mediaSection.innerHTML += mediaObject.getHTML();
            });
        } else {
            console.error('Photographe non trouvé');
        }
    } else {
        console.error('ID de photographe manquant dans l\'URL');
    }
}

document.addEventListener('DOMContentLoaded', displayPhotographerDetails);


