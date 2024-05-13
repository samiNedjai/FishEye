const openButton = document.querySelector('.contact_button'); // Bouton pour ouvrir le modal
const closeButton = document.querySelector('.close-button'); // Bouton pour fermer le modal
const modal = document.getElementById('contact_modal'); // L'élément modal
const form = document.querySelector('form'); // Le formulaire à l'intérieur du modal

// Sélection des champs de formulaire
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const message = document.getElementById('message');

// Sauvegarde du contenu original du modal pour pouvoir le restaurer
const originalModalContent = modal.innerHTML; 

// Tableau des validations pour centraliser la configuration
const validations = [
    { field: firstName, regex: /^[A-Za-z]{2,}$/, errorMessage: 'Le prénom doit contenir au moins deux lettres.' },
    { field: lastName, regex: /^[A-Za-z]{2,}$/, errorMessage: 'Le nom doit contenir au moins deux lettres.' },
    { field: email, regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, errorMessage: 'Email invalide.' },
    { field: message, regex: /.+/, errorMessage: 'Le message ne peut pas être vide.' }
];

// Fonction pour ouvrir le modal avec le nom du photographe
export function openModal(photographerName) {
    document.getElementById('photographerName').textContent = photographerName;
    modal.classList.add('modal-visible');
    modal.classList.remove('modal-hidden');
    document.body.classList.add('noScroll'); // Empêche le défilement du fond
}

// Fonction pour fermer le modal de formulaire
function closeModal() {
    modal.classList.add('modal-hidden');
    modal.classList.remove('modal-visible');
    document.body.classList.remove('noScroll'); // Réactive le défilement
}

// Fonction pour restaurer le contenu original du modal
function restoreOriginalModalContent() {
    modal.innerHTML = originalModalContent;
    attachFormEventListeners(); // Réattacher les écouteurs d'événements aux nouveaux éléments du formulaire
}

// Fonction pour afficher un message de remerciement dans le modal
function showModalThankYou() {
    const thanksModalContent = `
        <div class="modal">
            <div class="thank-you-modal-content">
                <p>Merci pour votre message ! Nous vous contacterons bientôt.</p>
                <button class="close-thank-you">Fermer</button>
            </div>
        </div>
    `;
    modal.innerHTML = thanksModalContent; // Remplace le contenu du modal par le message de remerciement
    document.querySelector('.close-thank-you').addEventListener('click', () => {
        closeModal();
        restoreOriginalModalContent();
    });
}

// Validation des entrées du formulaire avec affichage des messages d'erreur
function validateInput(input, regex, errorText) {
    const errorDiv = input.nextElementSibling;
    if (!regex.test(input.value.trim())) {
        errorDiv.textContent = errorText;
        errorDiv.style.display = 'block';
        input.classList.add('invalid');
        return false;
    } else {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
        input.classList.remove('invalid');
        return true;
    }
}

// Configuration de la validation en temps réel pour chaque champ de formulaire
function setupRealTimeValidation() {
    validations.forEach(({ field, regex, errorMessage }) => {
        field.addEventListener('input', () => validateInput(field, regex, errorMessage));
    });
}

// Attachement des gestionnaires d'événements pour le formulaire
function attachFormEventListeners() {
    openButton.addEventListener('click', () => {
        const photographerName = document.querySelector('.photographer-name').textContent;
        openModal(photographerName);
    });

    closeButton.addEventListener('click', closeModal);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        validations.forEach(validation => {
            isValid &= validateInput(validation.field, validation.regex, validation.errorMessage);
        });

        if (isValid) {
            showModalThankYou(); // Afficher le modal de remerciement si tout est valide
        }
    });

    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Fonction pour gérer la navigation au clavier dans le formulaire
function handleKeyboardNavigation(event) {
    if (!modal.classList.contains('modal-visible')) return;

    const focusableElements = form.querySelectorAll('input, textarea, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const isFocusInForm = Array.from(focusableElements).some(element => element === document.activeElement);

    if (!isFocusInForm) {
        firstElement.focus();
    }

    if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    } else if (event.key === 'Escape') {
        closeModal();
        restoreOriginalModalContent();
    }
}

setupRealTimeValidation();
attachFormEventListeners(); // Initialisation des écouteurs d'événements
