
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import db from "../db/connection";


class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    declare id_role: number;
    declare name: string;
}

Role.init({
    id_role: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    }
},
{
    tableName: 'roles',
    sequelize: db
});


export default Role;