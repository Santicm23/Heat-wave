

abstract class Post {
    private date: Date;
    private likes: number;

    constructor(date: Date) {
        this.date = date;
        this.likes = 0;
    }

    public abstract upload() : void;

    public get getDate() : Date {
        return this.date;
    }
    
    public set setDate(fecha: Date) {
        this.date = fecha;
    }

    public get getLikes() : number {
        return this.likes;
    }

    
    public set setLikes(likes: number) {
        this.likes = likes;
    }
}


export default Post;