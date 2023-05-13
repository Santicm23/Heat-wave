
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/mysql';
import Account from './account';
import Song from './song';

class FeedPost extends Model<InferAttributes<FeedPost>, InferCreationAttributes<FeedPost>> {
    declare id_feed_post: CreationOptional<number>;
    declare description: CreationOptional<string | null>;
    declare location: CreationOptional<string | null>;
    declare likes: CreationOptional<number>;
    declare username: string;
    declare active: CreationOptional<boolean>;
    declare id_song: number;
}

FeedPost.init({
    id_feed_post: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
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
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    username: {
        type: DataTypes.STRING,
        references: {
            model: Account,
            key: 'username'
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    id_song: {
        type: DataTypes.BIGINT,
        references: {
            model: Song,
            key: 'id_song'
        }
    }
},
{
    tableName: 'feed_posts',
    sequelize: db
});

FeedPost.belongsTo(Account, { foreignKey: 'username' });

export default FeedPost;