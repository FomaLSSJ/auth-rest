const router = require('express').Router(),
    Handlers = require('../../handlers');

class Router {
    constructor() {
        router.get('/', Handlers.index);
        router.get('/item', Handlers.get);
        router.get('/item/:id', Handlers.get);
        router.delete('/item/:id', Handlers.delete);
        router.post('/item', Handlers.post);

        return router;
    }
}

module.exports = Router;