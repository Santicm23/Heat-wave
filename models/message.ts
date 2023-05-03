import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/connection';
import Account from './accounts';
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

    public getRepr(): object {
        return {
            id_message: this.id_message,
            text: this.text,
            date: this.date,
            id_state: this.id_state,
            likes: this.likes,
            id_chat: this.id_chat,
            username: this.username
        }
    }
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