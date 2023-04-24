
import Comment from './comment';
import MusicPost from './musicPost';


class FeedPost extends MusicPost {
    private description: string;
    private comments: Array<Comment>;

    constructor(sound: string, image: string = '', description: string = '', date: Date = new Date()) {
        super(sound, image, date);
        this.description = description;
        this.comments = [];
    }

    public upload() {
        console.log("Subiendo publicación");
    }

    public get getDescription() : string {
        return this.description;
    }
 
    public set setDescription(description: string) {
        this.description = description;
    }

    public get getComments() : Array<Comment> {
        return this.comments;
    }
    
    public set setComments(comment: Array<Comment>) {
        this.comments = comment;
    }

    public createComment(text: string) : void {
        this.comments.push(new Comment(text));
    }
}


export default FeedPost;