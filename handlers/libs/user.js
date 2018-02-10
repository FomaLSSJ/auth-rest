const crypto = require('crypto'),
    Database = require('../../modules/database');

class Handler {
    static reg(req, res) {
        const { name, pass } = req.body;

        if (!name || !pass) return res.sendStatus(500);

        const hash = Handler.generateHash(name, pass);

        return Database.get().collection('users')
            .insert({ name: name, pass: pass, token: hash })
            .then(() => {
                res.cookie('token', hash, { expire: { maxAge: 300, httpOnly: true } });
                return res.json({ date: new Date().toISOString(), token: hash });
            })
            .catch(err => {
                console.error(err);
                return res.sendStatus(500);
            });

        return res.json({ token: hash });
    }

    static auth(req, res) {
        const { name, pass } = req.query;

        if (!name || !pass) return res.sendStatus(500);

        const hash = Handler.generateHash(name, pass);

        return Database.get().collection('users')
            .findAndModify({ name: name }, null, { $set: { token: hash } }, { upsert: true })
            .then(() => {
                res.cookie('token', hash, { expire: { maxAge: 300, httpOnly: true } });
                return res.json({ date: new Date().toISOString(), token: hash });
            })
            .catch(err => {
                console.error(err);
                return res.sendStatus(500);
            });
    }

    static generateHash(name, pass) {
        return crypto
            .createHmac('sha256', process.env.APP_SECRET)
            .update(name + pass + Date.now())
            .digest('hex');
    }
}

module.exports = Handler;