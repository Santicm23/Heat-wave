
import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';


class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
    
}


export default Comment;