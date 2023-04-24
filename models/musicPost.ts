
import Post from "./post";


abstract class MusicPost extends Post {
    private image: string;
    private sound: string;

    constructor(sound: string, image: string = '', date: Date = new Date()) {
        super(date);
        this.image = image;
        this.sound = sound;
    }
    
    public get getImage() : string {
        return this.image;
    }
    
    public set setImage(imagen : string) {
        this.image = imagen;
    }
    
    public get getSound() : string {
        return this.sound;
    }
    
    public set setSound(sondio : string) {
        this.sound = sondio;
    }
}


export default MusicPost;