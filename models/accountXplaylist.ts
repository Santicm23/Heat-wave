import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/mysql';
import Account from './account';
import Playlist from './playlist';

class AccountXPlaylist extends Model<InferAttributes<AccountXPlaylist>, InferCreationAttributes<AccountXPlaylist>> {
    declare username: string;
    declare id_playlist: number;
}

AccountXPlaylist.init({
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: Account,
            key: 'username'
        }
    },
    id_playlist: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: Playlist,
            key: 'id_playlist'
        }
    },
},
{
    tableName: 'accountXplaylist',
    sequelize: db
});

AccountXPlaylist.belongsTo(Account, {foreignKey: 'username'});
AccountXPlaylist.belongsTo(Playlist, {foreignKey: 'id_playlist'});

export default AccountXPlaylist;