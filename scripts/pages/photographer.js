// photographer.js

// Assurez-vous que les chemins sont corrects selon l'organisation de vos fichiers
import { Photographer } from './index.js'; // Importez la classe Photographer si elle est définie dans un autre fichier

async function getPhotographerFromId(id) {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    return data.photographers.find(photographer => photographer.id === parseInt(id, 10));
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
            const photographer = new Photographer(photographerData);
            // Ici, vous pouvez remplir les détails du photographe dans le DOM
            // Par exemple, pour le nom, vous pourriez avoir:
            document.querySelector('.photographer-name').textContent = photographer.name;
            document.querySelector('.photographer-location').textContent = `${photographer.city}, ${photographer.country}`;
            document.querySelector('.photographer-tagline').textContent = photographer.tagline;
            const portraitElement = document.querySelector('.photographer-portrait');
    portraitElement.src = `assets/photographers/${photographer.portrait}`; // Assurez-vous que le chemin est correct
    portraitElement.alt = `Portrait de ${photographer.name}`;

            // Répétez pour les autres propriétés comme city, country, etc
            // ... Plus de code pour modifier le DOM ...
        } else {
            console.error('Photographe non trouvé');
        }
    } else {
        console.error('ID de photographe manquant dans l\'URL');
    }
}

document.addEventListener('DOMContentLoaded', displayPhotographerDetails);
