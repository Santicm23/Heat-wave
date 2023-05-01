

export const account_select = (where: any = {}) => {

    where.active = true

    return {
        attributes: ['username', 'name', 'email', 'password', 'image'],
        where
    }
};