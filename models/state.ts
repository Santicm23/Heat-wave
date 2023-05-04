
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/connection';


class State extends Model<InferAttributes<State>, InferCreationAttributes<State>> {
    declare id_state: number;
    declare state: string;
}

State.init({
    id_state: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    state: {
        type: DataTypes.STRING,
        unique: true
    }
},
{
    tableName: 'states',
    sequelize: db
});


export default State;