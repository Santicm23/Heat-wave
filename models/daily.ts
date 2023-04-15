
import PublicacionMusica from './publicacionMusica';


class Daily extends PublicacionMusica {
    constructor(sonido: string, imagen: string = '', fecha: Date = new Date(), likes: number = 0) {
        super(sonido, imagen, fecha, likes);
    }

    public subir() {
        console.log('subiendo una daily :)');
    }
}


export default Daily;