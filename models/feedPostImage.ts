import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/connection';
import FeedPost from './feedPost';

class FeedPostImage extends Model<InferAttributes<FeedPostImage>, InferCreationAttributes<FeedPostImage>> {
    declare id_feed_post: number;
    declare image: string;
}

FeedPostImage.init({
    id_feed_post: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: FeedPost,
            key: 'id_feed_post'
        }
    },
    image: {
        type: DataTypes.STRING,
        unique: true
    }
},
{
    tableName: 'feed_post_images',
    sequelize: db
});

FeedPostImage.belongsTo(FeedPost, { foreignKey: 'id_feed_post' });

export default FeedPostImage;