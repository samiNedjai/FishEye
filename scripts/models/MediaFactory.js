import Photo from './Photo.js';
import Video from './Video.js';

export default class MediaFactory {
    static createMedia(data) {
        if (data.image) {
            return new Photo(data);
        } else if (data.video) {
            return new Video(data);
        } else {
            throw new Error('Invalid media type');
        }
    }
}
