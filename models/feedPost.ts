
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/connection';
import Playlist from './playlist';

class FeedPost extends Model<InferAttributes<FeedPost>, InferCreationAttributes<FeedPost>> {
    declare id_feed_post: number;
    declare name: string;
    declare description: CreationOptional<string | null>;
    declare location: CreationOptional<string | null>;
    declare creation_date: Date;
    declare likes: number;
    declare id_playlist: number;
}

FeedPost.init({
    id_feed_post: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    creation_date: {
        type: DataTypes.DATE
    },
    likes: {
        type: DataTypes.INTEGER
    },
    id_playlist: {
        type: DataTypes.BIGINT,
        references: {
            model: Playlist,
            key: 'id_playlist'
        }
    }
},
{
    tableName: 'feed_posts',
    sequelize: db
});

FeedPost.belongsTo(Playlist, { foreignKey: 'id_playlist' });

export default FeedPost;