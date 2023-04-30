
import Account from '../models/accounts';


export const uniqueUsername = async(username: string): Promise<void> => {

    if (!username) return;

    const existAccount = await Account.findByPk(username);

    if (existAccount) {
        throw new Error(`El nombre de usuario '${username}' ya se encuentra en uso`);
    }
}

export const uniqueEmail = async(email: string): Promise<void> => {

    if (!email) return;

    const existAccount = await Account.findOne({
            where: {
                email
            }
        });
    
    if (existAccount) {
        throw new Error(`El correo '${email}' ya se encuentra en uso`);
    }
}

export const usernameExists = async(username: string): Promise<Account | void> => {
    const existAccount = await Account.findByPk(username);

    if (!existAccount) {
        throw new Error(`El nombre de usuario '${username}' no existe`);
    }
    
    return existAccount;
}