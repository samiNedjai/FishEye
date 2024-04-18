document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.querySelector('.contact_button'); // Bouton pour ouvrir le modal
    const closeButton = document.querySelector('.close-button'); // Bouton pour fermer le modal
    const modal = document.getElementById('contact_modal'); // Le modal
    const form = document.querySelector('form'); // Le formulaire

    // les champs du formulaire 
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
        
    const originalModalContent = modal.innerHTML; // Stocker le contenu original

 // Fonction pour afficher le modal de formulaire
 function openModal() {
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
    attachFormEventListeners(); // Attacher de nouveau les écouteurs d'événements au formulaire
}

// Fonction pour attacher des écouteurs d'événements au formulaire
function attachFormEventListeners() {
    modal.querySelector('.close-button').addEventListener('click', closeModal);
    modal.querySelector('form').addEventListener('submit', submitForm);
    attachInputValidationListeners(); // Gestion de la validation en temps réel
}


// Afficher le modal de remerciement
function showModalThankYou() {
    const thanksModalContent = `
    <div class="modal"
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
    // Validation des champs en temps réel
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

     // Attach event handlers
     openButton.addEventListener('click', openModal);
     closeButton.addEventListener('click', closeModal);
 
     form.addEventListener('submit', (event) => {
         event.preventDefault();
         let isValid = true;
 
         // Validate all fields
         isValid &= validateInput(firstName, /^[A-Za-z]{2,}$/, 'Le prénom doit contenir au moins deux lettres.');
         isValid &= validateInput(lastName, /^[A-Za-z]{2,}$/, 'Le prénom doit contenir au moins deux lettres.');
         isValid &= validateInput(email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Email invalide.');
         isValid &= validateInput(message, /.+/, 'Le message ne peut pas être vide.');
 
         if (isValid) {
             showModalThankYou(); // Afficher le modal de remerciement si tout est valide
         }
     });
 
     // Real-time validation
     firstName.addEventListener('input', () => validateInput(firstName, /^[A-Za-z]{2,}$/, 'Le prénom doit contenir au moins deux lettres.'));
     lastName.addEventListener('input', () => validateInput(lastName, /^[A-Za-z]{2,}$/, 'Le prénom doit contenir au moins deux lettres.'));
     email.addEventListener('input', () => validateInput(email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Email invalide.'));
     message.addEventListener('input', () => validateInput(message, /.+/, 'Le message ne peut pas être vide.'));
 });
 attachFormEventListeners(); // Appel initial pour attacher les écouteurs