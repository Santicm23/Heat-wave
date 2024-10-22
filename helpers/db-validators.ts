
import Account from '../models/account';
import FeedPost from '../models/feedPost';
import Song from '../models/song';


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

export const songExists = async(id_song: number): Promise<void> => {
    if (!id_song) return;

    const existSong = await Song.findByPk(id_song);
    
    if (!existSong) {
        throw new Error(`La cancion con id '${id_song}' no existe`);
    }
}

export const countPosts = async(username: string): Promise<number> => {
    if (!username) return 0;

    const cant = await FeedPost.count({
        where: {
            username
        }
    });

    return cant;
};