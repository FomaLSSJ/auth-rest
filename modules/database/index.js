const mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT, MONGO_DBNAME } = process.env,
    URL = `mongodb://${ MONGO_USER }:${ MONGO_PASS }@${ MONGO_HOST }:${ MONGO_PORT }/${ MONGO_DBNAME }`;

let database = null;

class Database {
    constructor() {
        return MongoClient.connect(URL)
            .then(client => {
                if (process.env.NODE_ENV === 'development')
                    console.log('[ Database success ]');
                database = client.db(MONGO_DBNAME);

                return database;
            })
            .then(() => Database.createCollections())
            .then(() => Database.createIndexes())
            .catch(err => console.error('[ Database error ]', err));
    }

    static get() {
        return database;
    }

    static castObjectId(id) {
        return new mongodb.ObjectId(id);
    }

    static createCollections() {
        return Promise.all([
            database.createCollection('items', {
                validator: {
                    bsonType: 'object',
                    required: ['title', 'text'],
                    properties: {
                        title: {
                            bsonType: 'string'
                        },
                        text: {
                            bsonType: 'string'
                        }
                    }
                },
                validationAction: 'warn',
                validationLevel: 'strict'
            }),
            database.createCollection('users', {
                validator: {
                    bsonType: 'object',
                    required: ['name', 'pass'],
                    properties: {
                        name: {
                            name: {
                                bsonType: 'string'
                            },
                            pass: {
                                bsonType: 'string'
                            },
                            token: {
                                bsonType: 'string'
                            }
                        }
                    }
                },
                validationAction: 'warn',
                validationLevel: 'strict'
            })
        ]);
    }

    static createIndexes() {
        return Promise.all([
            database.collection('users').createIndex({ 'name': 1 }, { unique: true })
        ]);
    }
}

module.exports = Database;