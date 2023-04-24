
import Daily from './daily';
import FeedPost from './feedPost';
import MusicPost from './musicPost';


class MusicPostFactory {
    public createMusicPost(tipo: string, song: string, image: string = '') : MusicPost {
        switch (tipo) {
            case 'daily':
                return new Daily(song, image);

            case 'feed':
                return new FeedPost(song, image);
        
            default:
                throw new Error('El tipo de publicacion no es válido (debe ser daily o feed)');
        }
    }
}


export default MusicPostFactory;