import Publicacion from "./publicacion";


class PublicacionFeed extends Publicacion {
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
        console.log("Subiendo publicación");
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
 
    public set setSonido(sonido : string) {
        this.sonido = sonido;
    }

    public get getDescripcion() : string {
        return this.descripcion;
    }
 
    public set setDescripcion(descripcion : string) {
        this.descripcion = descripcion;
    }
}

export default PublicacionFeed;