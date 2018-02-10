const Database = require('../database');

class Middleware {
    constructor(router) {
        router.use('/item', (req, res, next) => {
            const { [ 'X-Token' ]:token  } = req.cookies;

            if (!token) return res.sendStatus(401);

            return Database.get().collection('users')
                .findOne({ token: token })
                .then(() => next())
                .catch(err => {
                    console.error(err);
                    return res.sendStatus(401);
                });

        });
    }
}

module.exports = Middleware;