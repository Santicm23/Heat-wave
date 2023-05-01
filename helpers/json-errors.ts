

export const username_not_exists = (username: string) => {
    return {
        msg: `La cuenta con nombre de usuario '${username}' no existe`
    };
}

export const email_not_exists = (email: string) => {
    return {
        msg: `La cuenta con el correo '${email}' no existe`
    };
}

export const something_went_wrong = (error: unknown): object => {
    return {
        msg: `Algo salió mal: ${error}`
    };
}