
// Index de l'image actuelle affichée dans la lightbox
export let currentIndex = 0; 

// Tableau contenant les médias du photographe
export const mediaGallery = []; 

// Gestionnaire d'événements pour les touches du clavier
function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowLeft':
            previousImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
        case 'Escape':
            closeLightbox();
            break;
        default:
            break;
    }
}
// Fonction pour ouvrir la lightbox avec une image ou une vidéo spécifique
export function openLightbox(index) {

        // Mettre à jour l'index courant
        currentIndex = index;
        // Sélectionne le conteneur de la lightbox
        const lightboxMediaContainer = document.querySelector('.lightbox-media-container');
        // Récupère le média correspondant à l'index
        const media = mediaGallery[currentIndex];
  
        // Vider le conteneur actuel
        lightboxMediaContainer.innerHTML = '';
  
        // Vérifie si le média est une vidéo ou une image
        if (media.type === 'video') {
        lightboxMediaContainer.innerHTML = `
            <video controls autoplay class="lightbox-video">
            <source src="${media.src}" type="video/mp4" class="lightbox-video">
            Your browser does not support the video tag.
            </video>
            <h3 class="media-name" >${media.alt}</h3>
        `;
        } else { // C'est une image
        lightboxMediaContainer.innerHTML =
        `<img src="${media.src}" alt="${media.alt}" class="lightbox-image" id="lightboxImage">
        <h3 class="media-name" >${media.alt}</h3>`;
        }
      
        // Affiche la lightbox
        document.getElementById('lightbox').style.display = 'flex';

        // Attacher les gestionnaires d'événements pour les touches du clavier
        document.addEventListener('keydown', handleKeyPress);
  }

// Fonction pour naviguer à l'image suivante
function nextImage() {
    for (let i = 0; i < mediaGallery.length; i++) {
        if (currentIndex === mediaGallery.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        openLightbox(currentIndex);
        break; // Sort de la boucle après avoir ouvert la lightbox avec l'image suivante
    }
}

// Fonction pour naviguer à l'image précédente
function previousImage() {
    for (let i = 0; i < mediaGallery.length; i++) {
        if (currentIndex === 0) {
            currentIndex = mediaGallery.length - 1;
        } else {
            currentIndex--;
        }
        openLightbox(currentIndex);
        break; // Sort de la boucle après avoir ouvert la lightbox avec l'image précédente
    }
}

// Fonction pour fermer la lightbox
function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

//  fonction pour attacher ces gestionnaires d'événements
export function attachLightboxControls() {
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-next').addEventListener('click', nextImage);
    document.querySelector('.lightbox-prev').addEventListener('click', previousImage);
  }

