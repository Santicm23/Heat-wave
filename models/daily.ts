
import PublicacionMusica from './musicPost';


class Daily extends PublicacionMusica {
    constructor(sound: string, image: string = '', date: Date = new Date()) {
        super(sound, image, date);
    }

    public upload() {
        console.log('subiendo una daily :)');
    }
}


export default Daily;