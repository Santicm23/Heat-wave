
import Account from '../models/accounts';


export const uniqueUsername = async(username: string): Promise<void> => {
    const existUser = await Account.findByPk(username);

    if (existUser) {
        throw new Error(`El nombre de usuario '${username}' ya se encuentra en uso`)
    }
}

export const uniqueEmail = async(email: string): Promise<void> => {

    if (!email) return;

    const existUser = await Account.findOne({
            where: {
                email
            }
        });
    if (existUser) {
        throw new Error(`El correo '${email}' ya se encuentra en uso`)
    }
}