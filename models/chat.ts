import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/mysql';

class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
    declare id_chat: number;
    declare name: string;
    declare description: CreationOptional<string | null>;
    declare num_accounts: number;
    declare image: CreationOptional<string | null>;
    declare creation_date: Date;
}


Chat.init({
    id_chat: {
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
    num_accounts: {
        type: DataTypes.INTEGER
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    creation_date: {
        type: DataTypes.DATE
    }
},
{
    tableName: 'chats',
    sequelize: db
});

export default Chat;