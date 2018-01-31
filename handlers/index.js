const Database = require('../modules/database');

class Handlers {
    static index(req, res) {
        return new Promise((resolve, reject) => {
            return resolve(res.json({ success: true }));
        });
    }

    static get(req, res) {
        return new Promise((resolve, reject) => {
            return Database.get().collection('data').find().toArray()
                .then(docs => resolve(res.status(200).send(docs)))
                .catch(err => {
                    console.log('[ Get Find error ]', err);
                    return reject(res.sendStatus(500));
                });

            return resolve(res.json({ success: true }));
        });
    }

    static post(req, res) {
        return new Promise((resolve, reject) => {
            const { title, text } = req.query;

            if (!title || !text) return reject(res.sendStatus(500));

            return Database.get().collection('data').insert({ title: title, text: text })
                .then(result => resolve(res.sendStatus(200)))
                .catch(err => {
                    console.log('[ Post Insert error ]', err);
                    return reject(res.sendStatus(500));
                });
        });
    }
}

module.exports = Handlers;