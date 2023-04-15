

abstract class Publicacion {
    private fecha: Date;
    private likes: number;

    constructor(fecha: Date, likes: number) {
        this.fecha = fecha;
        this.likes = likes;
    }

    public abstract subir() : void;

    public get getFecha() : Date {
        return this.fecha;
    }

    
    public set setFecha(fecha: Date) {
        this.fecha = fecha;
    }

    public get getLikes() : number {
        return this.likes;
    }

    
    public set setLikes(likes: number) {
        this.likes = likes;
    }
}


export default Publicacion;