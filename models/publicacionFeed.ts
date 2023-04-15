
import Comentario from './comentario';
import PublicacionMusica from './publicacionMusica';


class PublicacionFeed extends PublicacionMusica {
    private descripcion: string;
    private comentarios: Array<Comentario>;

    constructor(sonido: string, imagen: string = '',  descripcion: string = '', fecha: Date = new Date(), likes: number = 0) {
        super(sonido, imagen, fecha, likes);
        this.descripcion = descripcion;
        this.comentarios = [];
    }

    public subir() {
        console.log("Subiendo publicación");
    }

    public get getDescripcion() : string {
        return this.descripcion;
    }
 
    public set setDescripcion(descripcion: string) {
        this.descripcion = descripcion;
    }

    public get getComentarios() : Array<Comentario> {
        return this.comentarios;
    }
    
    public set setComentarios(comentario: Array<Comentario>) {
        this.comentarios = comentario;
    }

    public crearComentario(texto: string) : void {
        this.comentarios.push(new Comentario(texto));
    }
}


export default PublicacionFeed;