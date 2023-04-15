import Publicacion from './publicacion';

class Comentario extends Publicacion{
    private texto: string;

    constructor(fecha: Date, likes: number, texto: string) {
        super(fecha,likes);
        this.texto = texto;
    }

    public subir(){
        console.log("Comentariooo");
    }

    get getTexto(): string {
        return this.texto;
    }
    
    set setTexto(texto: string) {
        this.texto = texto;
    }
}

export default Comentario;