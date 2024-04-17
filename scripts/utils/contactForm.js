document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.querySelector('.contact_button'); // Bouton pour ouvrir le modal
    const closeButton = document.querySelector('.close-button'); // Bouton pour fermer le modal
    const modal = document.getElementById('contact_modal'); // Le modal
    const form = document.querySelector('form'); // Le formulaire
  
    openButton.addEventListener('click', () => {
      modal.classList.replace('modal-hidden', 'modal-visible');
    //   document.body.style.overflow = 'hidden'; // Empêche le scroll
    });
  
    closeButton.addEventListener('click', () => {
      modal.classList.replace('modal-visible', 'modal-hidden');
      document.body.style.overflow = 'auto'; // Réactive le scroll
    });
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      console.log("Prénom:", formData.get('firstName'));
      console.log("Email:", formData.get('email'));
      console.log("Message:", formData.get('message'));
      // Ici, envoyez les données à votre serveur si nécessaire
      form.reset(); // Réinitialise le formulaire
      modal.classList.replace('modal-visible', 'modal-hidden');
      document.body.style.overflow = 'auto'; // Réactive le scroll
    });
  });
  