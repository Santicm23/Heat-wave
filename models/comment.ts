
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/mysql';
import FeedPost from './feedPost';
import Account from './account';


class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
    declare id_comment: number;
    declare text: string;
    declare date: Date;
    declare likes: number;
    declare username: string;
    declare id_feed_post: number;
}

Comment.init({
    id_comment: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
    },
    likes: {
        type: DataTypes.INTEGER
    },
    username: {
        type: DataTypes.STRING,
        references: {
            model: Account,
            key: 'username'
        }
    },
    id_feed_post: {
        type: DataTypes.BIGINT,
        references: {
            model: FeedPost,
            key: 'id_feed_post'
            }
        }
},
{
    tableName: 'comments',
    sequelize: db
});

Comment.belongsTo(Account, { foreignKey: 'username' });
Comment.belongsTo(FeedPost, { foreignKey: 'id_feed_post' });


export default Comment;