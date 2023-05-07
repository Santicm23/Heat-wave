
import { MongoClient, Db, Collection } from 'mongodb';


class MongoConnection {

    private url: string;
    private client: MongoClient;
    private dbName: string;
    private mongodb: Db;
    private collections: {
        songs: Collection,
        images: Collection
    };

    constructor(url: string) {
        this.url = url;
        this.dbName = 'media';
        this.client = new MongoClient(this.url);
        this.mongodb = this.client.db(this.dbName);
        this.collections = {
            songs: this.mongodb.collection('sounds'),
            images: this.mongodb.collection('images')
        };
    }

    public async authenticate() {
        await this.client.connect();
    }

    public get db() : Db {
        return  this.mongodb;
    }

    public get songs() : Collection {
        return  this.collections.songs;
    }

    public get images() : Collection {
        return  this.collections.images;
    }
    
}

const mongo = new MongoConnection(process.env.MONGO_ATLAS || '');


export default mongo;