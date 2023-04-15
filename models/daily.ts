
import Publicacion from './publicacion';


class Daily extends Publicacion {
    private imagen: string;
    private sonido: string;
    private descripcion: string;

    constructor(fecha: Date, likes: number, imagen: string, sonido: string, descripcion: string) {
        super(fecha, likes);
        this.imagen = imagen;
        this.sonido = sonido;
        this.descripcion = descripcion;
    }

    public subir() {
        console.log('subiendo una daily :)');
    }
    
    public get getImagen() : string {
        return this.imagen;
    }
    
}


export default Daily;