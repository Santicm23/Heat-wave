
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import db from '../db/connection';
import Account from "./account";
import Song from "./song";
import Visibility from "./visibility";

class Daily extends Model<InferAttributes<Daily>, InferCreationAttributes<Daily>> {
    declare id_daily: number;
    declare creation_date: Date;
    declare id_visibility: number;
    declare image: CreationOptional<string | null>;
    declare likes: number;
    declare username: string;
    declare id_song: number;
}

Daily.init({
    id_daily: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    creation_date: {
        type: DataTypes.DATE
    },
    id_visibility: {
        type: DataTypes.BIGINT,
        references: {
            model: Visibility,
            key: 'id_visibility'
        },
        defaultValue: 1
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    likes: {
        type: DataTypes.INTEGER,
    },
    username: {
        type: DataTypes.STRING,
        references: {
            model: Account,
            key: 'username'
        }
    },
    id_song: {
        type: DataTypes.BIGINT,
        references: {
            model: Song,
            key: 'id_song'
        }
    }
},
{
    tableName: 'dailys',
    sequelize: db
});

Daily.belongsTo(Visibility, { foreignKey: 'id_visibility' });
Daily.belongsTo(Account, { foreignKey: 'username' });
Daily.belongsTo(Song, { foreignKey: 'id_song' });


export default Daily;