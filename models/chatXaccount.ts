import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/connection';
import Account from './account';
import Chat from './chat';


class chatXaccount extends Model<InferAttributes<chatXaccount>, InferCreationAttributes<chatXaccount>> {
    declare username: string;
    declare id_chat: number;
}

chatXaccount.init({
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: Account,
            key: 'username'
        }
    },
    id_chat: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: Chat,
            key: 'id_chat'
        }
    }
},
{
    tableName: 'chatXaccount',
    sequelize: db
});

chatXaccount.belongsTo(Account, {foreignKey: 'username'});
chatXaccount.belongsTo(Chat, {foreignKey: 'id_chat'});


export default chatXaccount;