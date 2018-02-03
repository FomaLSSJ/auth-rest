const Database = require('../modules/database');

class Handlers {
    static index(req, res) {
        return res.json({ success: true });
    }

    static get(req, res) {
        const { id } = req.params;

        if (!_.isEmpty(id)) {
            return Database.get().collection('data')
                .findOne({ _id: Database.castObjectId(id) })
                .then(doc => res.status(200).send(doc))
                .catch(err => {
                    console.log('[ Get Find Id error ]', err);
                    return res.sendStatus(500);
                });
        }

        return Database.get().collection('data').find().toArray()
            .then(docs => res.status(200).send(docs))
            .catch(err => {
                console.log('[ Get Find error ]', err);
                return res.sendStatus(500);
            });
    }

    static post(req, res) {
        const { title, text } = req.body;

        if (!title || !text) return res.sendStatus(500);

        return Database.get().collection('data').insert({ title: title, text: text })
            .then(result => res.sendStatus(200))
            .catch(err => {
                console.log('[ Post Insert error ]', err);
                return res.sendStatus(500);
            });
    }

    static delete(req, res) {
        const { id } = req.params;

        if (_.isEmpty(id)) return res.sendStatus(500);

        return Database.get().collection('data').remove({ _id: Database.castObjectId(id) })
            .then(() => res.sendStatus(200))
            .catch(err => res.sendStatus(500));
    }
}

module.exports = Handlers;