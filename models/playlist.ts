import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import db from '../db/mysql';
import Account from "./account";

class Playlist extends Model<InferAttributes<Playlist>, InferCreationAttributes<Playlist>> {
    declare id_playlist: number;
    declare name: string;
    declare num_songs: number;
    declare duration: number; //Revisar esto
    declare path: string;
    declare creation_date: Date;
    declare likes: number;
    declare username: string;
}

Playlist.init({
    id_playlist: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    num_songs: {
        type: DataTypes.INTEGER
    },
    duration: {
        type: DataTypes.TIME
    },
    path: {
        type: DataTypes.STRING
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
    }
},
{
    tableName: 'playlists',
    sequelize: db
});

Playlist.belongsTo(Account, { foreignKey: 'username' });

export default Playlist;