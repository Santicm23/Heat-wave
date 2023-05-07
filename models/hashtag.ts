import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/mysql';

class Hashtag extends Model<InferAttributes<Hashtag>, InferCreationAttributes<Hashtag>> {
    declare id_hashtag: number;
    declare hashtag: string;
}

Hashtag.init({
    id_hashtag: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true    
    },
    hashtag: {
        type: DataTypes.STRING,
        unique: true
    }
},
{
    tableName: 'hashtags',
    sequelize: db
});

export default Hashtag;