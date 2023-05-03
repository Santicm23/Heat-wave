import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/connection';

class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
    declare id_chat: number;
    declare name: string;
    declare description: CreationOptional<string>;
    declare num_accounts: number;
    declare image: CreationOptional<string>;
    declare creation_date: Date;

    public getRepr(): object {
        return {
            id_chat: this.id_chat,
            name: this.name,
            description: this.description,
            num_accounts: this.num_accounts,
            image: this.image,
            creation_date: this.creation_date
        }
    }
}

Chat.init({
    id_chat: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    num_accounts: {
        type: DataTypes.INTEGER
    },
    image: {
        type: DataTypes.STRING
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