
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/connection';
import { encrypt_pass } from '../helpers/encrypt';
import Role from './role';


class Account extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {
    declare username: string;
    declare name: string;
    declare email: string;
    declare password: string;
    declare active: CreationOptional<boolean>;
    declare google: CreationOptional<boolean>;
    declare image: CreationOptional<string | null>;
    declare id_role: number;

    public getRepr(): object {
        return {
            username: this.username,
            name: this.name,
            email: this.email,
            image: this.image
        }
    }
}

Account.init({
    username: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        set(pass: string) {
            this.setDataValue('password', encrypt_pass(pass));
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    id_role: {
        type: DataTypes.BIGINT,
        references: {
            model: Role,
            key: 'id_role'
        },
        defaultValue: 2
    }
},
{
    tableName: 'accounts',
    sequelize: db
});

Account.belongsTo(Role, { foreignKey: 'id_role' });


export default Account;