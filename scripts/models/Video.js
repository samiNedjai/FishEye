export default class Video {
    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.video = data.video;
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
    getHTML() {
        // Ici, vous devrez décider comment vous souhaitez gérer les miniatures pour les vidéos.
        return `
            <div class="media-card">
                <video controls>
                    <source src="assets/media/${this.photographerId}/${this.video}" type="video/mp4" alt="${this.title}" >
                    Votre navigateur ne supporte pas la vidéo.
                    
                </video>
                <div class="media-card-info">
                <h3>Video de ${this.title}</h3>
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
