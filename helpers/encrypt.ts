
import bcrypt from 'bcrypt';


export const encrypt_pass = (pass: string) => {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync());
}

export const isPassword = bcrypt.compareSync;