
import Publicacion from "./publicacion";


abstract class PublicacionMusica extends Publicacion {
    private imagen: string;
    private sonido: string;

    constructor(sonido: string, imagen: string = '', fecha: Date = new Date(), likes: number = 0) {
        super(fecha, likes);
        this.imagen = imagen;
        this.sonido = sonido;
    }
    
    public get getImagen() : string {
        return this.imagen;
    }
    
    public set setImagen(imagen : string) {
        this.imagen = imagen;
    }
    
    public get getSonido() : string {
        return this.sonido;
    }
    
    public set setSonido(sondio : string) {
        this.sonido = sondio;
    }
}


export default PublicacionMusica;