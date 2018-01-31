const router = require('express').Router(),
    Handlers = require('../../handlers');

class Router {
    constructor() {
        router.get('/', Handlers.index);
        router.get('/get', Handlers.get);
        router.get('/post', Handlers.post);

        return router;
    }
}

module.exports = Router;