import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/mysql';
import Account from './account';
import Chat from './chat';


class ChatXaccount extends Model<InferAttributes<ChatXaccount>, InferCreationAttributes<ChatXaccount>> {
    declare username: string;
    declare id_chat: number;
}

ChatXaccount.init({
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

ChatXaccount.belongsTo(Account, {foreignKey: 'username'});
ChatXaccount.belongsTo(Chat, {foreignKey: 'id_chat'});


export default ChatXaccount;