
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/connection';
import Account from './account';
import Chat from './chat';
import State from './state';


class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
    declare id_message: number;
    declare text: string;
    declare date: Date;
    declare id_state: number;
    declare likes: number;
    declare id_chat: number;
    declare username: string;
}

Message.init({
    id_message: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    text: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
    },
    id_state: {
        type: DataTypes.BIGINT,
        references: {
            model: State,
            key: 'id_state'
        },
        defaultValue: 1
    },
    likes: {
        type: DataTypes.INTEGER
    },
    id_chat: {
        type: DataTypes.BIGINT,
        references: {
            model: Chat,
            key: 'id_chat'
        }
    },
    username: {
        type: DataTypes.STRING,
        references: {
            model: Account,
            key: 'username'
        }
    }
}, {
    tableName: 'messages',
    sequelize: db
});

Message.belongsTo(State, { foreignKey: 'id_state' });
Message.belongsTo(Chat, { foreignKey: 'id_chat' });
Message.belongsTo(Account, { foreignKey: 'username' });


export default Message;