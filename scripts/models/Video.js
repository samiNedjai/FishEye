export default class Video {
    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.video = data.video;
        this.likes = data.likes;
    }

    getHTML() {
        // Ici, vous devrez décider comment vous souhaitez gérer les miniatures pour les vidéos.
        return `
            <div class="media-card">
                <video controls>
                    <source src="assets/media/${this.photographerId}/${this.video}" type="video/mp4">
                    Votre navigateur ne supporte pas la vidéo.
                    
                </video>
                <div class="media-card-info">
                <h3>Video de ${this.title}</h3>
                <p>${this.likes} likes</p>
                </div>
            </div>
        `;
    }
}
