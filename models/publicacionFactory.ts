
import Daily from './daily';
import Publicacion from './publicacion';
import PublicacionFeed from './publicacionFeed';


class PublicacionMusicaFactory {
    public crearPublicacionMusica(tipo: string, cancion: string) : Publicacion {
        switch (tipo) {
            case 'daily':
                return new Daily(cancion);

            case 'feed':
                return new PublicacionFeed(cancion);
        
            default:
                throw new Error('El tipo de publicacion no es válido (debe ser daily o feed)');
        }
    }
}


export default PublicacionMusicaFactory;