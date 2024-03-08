    // Fonction asynchrone pour récupérer les données des photographes depuis le fichier JSON
async function getPhotographers() {
    try {
        // Utilise 'fetch' pour charger les données depuis 'data/photographers.json'
        // Assurez-vous que le chemin est correct par rapport à l'emplacement de votre fichier index.js
        const response = await fetch('data/photographers.json');
        if (!response.ok) {
            // Si la réponse n'est pas OK, lance une erreur
            throw new Error('Network response was not ok');
        }
        // Parse la réponse en JSON
        const data = await response.json();
        // Retourne les données récupérées
        return data;
    } catch (error) {
        // Affiche l'erreur dans la console si la requête échoue
        console.error('Could not fetch the data: ', error);
    }
}
// Fonction pour créer le modèle de carte du photographe

function photographerTemplate(photographer) {
    return `
    <article>
        <img src="assets/photographers/${photographer.portrait}" alt="${photographer.name}" class="photographer-portrait">
        <h2>${photographer.name}</h2>
        <p class ="location">${photographer.city}, ${photographer.country}</p>
        <p class="tagline">${photographer.tagline}</p>
        <p class="price">${photographer.price}€/jour</p>
    </article>
    `;
}
// Fonction pour afficher les données des photographes
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        // Corrigez le chemin pour qu'il corresponde à la structure correcte de votre projet
        
        
        const userCardDOM = photographerTemplate(photographer);
       
        photographersSection.innerHTML += userCardDOM;
    });
    
}

// Fonction d'initialisation qui récupère les données des photographes et les affiche
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

// Appelle la fonction d'initialisation
init();
