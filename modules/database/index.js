const MongoClient = require('mongodb').MongoClient,
    { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT, MONGO_DBNAME } = process.env,
    URL = `mongodb://${ MONGO_USER }:${ MONGO_PASS }@${ MONGO_HOST }:${ MONGO_PORT }/${ MONGO_DBNAME }`;

let database = null;

class Database {
    constructor() {
        return MongoClient.connect(URL)
            .then(client => {
                console.log('[ Database success ]');
                database = client.db(MONGO_DBNAME);

                return database;
            })
            .catch(err => console.error('[ Database error ]', err));
    }

    static get() {
        return database;
    }
}

module.exports = Database;