const Database = require('../../modules/database');

class Handler {
    static get(req, res) {
        const { id } = req.params;

        if (!_.isEmpty(id)) {
            return Database.get().collection('items')
                .findOne({ _id: Database.castObjectId(id) })
                .then(doc => res.status(200).send(doc))
                .catch(err => {
                    console.log('[ Get Find Id error ]', err);
                    return res.sendStatus(500);
                });
        }

        return Database.get().collection('items').find().toArray()
            .then(docs => res.status(200).send(docs))
            .catch(err => {
                console.log('[ Get Find error ]', err);
                return res.sendStatus(500);
            });
    }

    static post(req, res) {
        const { title, text } = req.body;

        if (!title || !text) return res.sendStatus(500);

        return Database.get().collection('items').insertOne({ title: title, text: text })
            .then(result => res.sendStatus(200))
            .catch(err => {
                console.log('[ Post Insert error ]', err);
                return res.sendStatus(500);
            });
    }

    static delete(req, res) {
        const { id } = req.params;

        if (_.isEmpty(id)) return res.sendStatus(500);

        return Database.get().collection('items').remove({ _id: Database.castObjectId(id) })
            .then(() => res.sendStatus(200))
            .catch(err => res.sendStatus(500));
    }

    static put(req, res) {
        const { id } = req.params,
            { body } = req;

        if (_.isEmpty(id)) return res.sendStatus(500);

        return Database.get().collection('items')
            .update({ _id: Database.castObjectId(id) }, { $set: body })
            .then(() => res.sendStatus(200))
            .catch(err => {
                console.error(err);
                return res.sendStatus(500);
            });
    }
}

module.exports = Handler;