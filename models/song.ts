
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/connection';


class Song extends Model<InferAttributes<Song>, InferCreationAttributes<Song>> {
    declare id_song: number;
    declare name: string;
    declare author: string;
    declare album: CreationOptional<string | null>;
    declare duration: number; //Revisar esto (Duration)
    declare sound: string;
    declare image: CreationOptional<string | null>;
}

Song.init({
    id_song: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.STRING
    },
    album: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    duration: {
        type: DataTypes.TIME
    },
    sound: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
},
{
    tableName: 'songs',
    sequelize: db
});

export default Song;