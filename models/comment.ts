
import Post from './post';


class Comment extends Post {
    private text: string;

    constructor(text: string, date: Date = new Date()) {
        super(date);
        this.text = text;
    }

    public upload() {
        console.log("Comentariooo");
    }

    get getText(): string {
        return this.text;
    }
    
    set setText(text: string) {
        this.text = text;
    }
}


export default Comment;