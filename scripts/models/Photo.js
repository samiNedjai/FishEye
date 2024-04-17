// Classe représentant une photo


export default class Photo {
    constructor(data) {
        // Initialisation des propriétés de la photo à partir des données fournies
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image;
        this.date = data.date;
        this.likes = data.likes;
        this.liked = false; // État initial de 'like' pour la photo
    }

// Méthode pour basculer l'état de 'like' et mettre à jour le compteur de likes
    toggleLike() {
        if (this.liked) {
            this.likes--;  // Diminue le nombre de likes si déjà liké
            this.liked = false;  // Réinitialise l'état de 'liked' 
        } else {
            this.likes++; // Augmente le nombre de likes si pas encore liké
            this.liked = true;  // Marque comme liké
        }
    }


    // Génère le HTML pour afficher la photo
    getHTML() {
        return `
            <div class="media-card">
                <img src="assets/media/${this.photographerId}/mini/${this.image}" alt="${this.title}" >
                <div class="media-card-info">
                <h3>${this.title}</h3>
                <div class="media-likes">
                    <span class="likes-count" data-id="${this.id}">${this.likes}</span>
                    <button class="like-button" data-id="${this.id}">
                        <i class="fa fa-heart${this.liked ? '' : '-o'}" aria-hidden="true"></i>
                    </button>
                </div>
                </div>
            </div>
        `;
    }
    
}
