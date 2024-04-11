export default class Photo {
    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image;
        this.likes = data.likes;
    }

    getHTML() {
        return `
            <div class="media-card">
                <img src="assets/media/${this.photographerId}/mini/${this.image}" alt="${this.title}">
                <div class="media-card-info">
                <h3>${this.title}</h3>
                <p>${this.likes} likes</p>
                </div>
            </div>
        `;
    }
}
