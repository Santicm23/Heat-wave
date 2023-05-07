import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/mysql';
import FeedPost from './feedPost';
import Hashtag from './hashtag';

class feed_postXhashtag extends Model<InferAttributes<feed_postXhashtag>, InferCreationAttributes<feed_postXhashtag>> {
    declare id_feed_post: number;
    declare id_hashtag: number;
}

feed_postXhashtag.init({
    id_feed_post: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: FeedPost,
            key: 'id_feed_post'
        }
    },
    id_hashtag: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: Hashtag,
            key: 'id_hashtag'
        }
    }
},
{
    tableName: 'feed_postXhashtags',
    sequelize: db
});

export default feed_postXhashtag;