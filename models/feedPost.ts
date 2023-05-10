
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/mysql';
import Account from './account';

class FeedPost extends Model<InferAttributes<FeedPost>, InferCreationAttributes<FeedPost>> {
    declare id_feed_post: number;
    declare name: string;
    declare description: CreationOptional<string | null>;
    declare location: CreationOptional<string | null>;
    declare creation_date: Date;
    declare likes: number;
    declare username: string;
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
    username: {
        type: DataTypes.STRING,
        references: {
            model: Account,
            key: 'username'
        }
    },
},
{
    tableName: 'feed_posts',
    sequelize: db
});

FeedPost.belongsTo(Account, { foreignKey: 'username' });

export default FeedPost;