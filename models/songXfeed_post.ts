import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/mysql';
import FeedPost from './feedPost';
import Song from './song';

class SongXFeedPost extends Model<InferAttributes<SongXFeedPost>, InferCreationAttributes<SongXFeedPost>> {
    declare id_feed_post: number;
    declare id_song: number;
}

SongXFeedPost.init({
    id_feed_post: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: FeedPost,
            key: 'id_feed_post'
        }
    },
    id_song: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: Song,
            key: 'id_song'
        }
    }
},
{
    tableName: 'songXfeed_post',
    sequelize: db
});

SongXFeedPost.belongsTo(FeedPost, {foreignKey: 'id_feed_post'});
SongXFeedPost.belongsTo(Song, {foreignKey: 'id_song'});

export default SongXFeedPost;