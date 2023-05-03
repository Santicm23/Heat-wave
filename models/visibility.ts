import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import db from '../db/connection';

class Visibility extends Model<InferAttributes<Visibility>, InferCreationAttributes<Visibility>> {
    declare id_visibility: number;
    declare visibility: string;
}

Visibility.init({
    id_visibility: {
        type: DataTypes.BIGINT,
        primaryKey: true        
    },
    visibility: {
        type: DataTypes.STRING,
        unique: true
    }
},
{
    tableName: 'visibilities',
    sequelize: db
});

export default Visibility;