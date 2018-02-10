const router = require('express').Router(),
    Middleware = require('../middleware'),
    Handlers = require('../../handlers');

class Router {
    constructor() {
        new Middleware(router);

        router.get('/', Handlers.default.index);

        router.get('/item', Handlers.item.get);
        router.get('/item/:id', Handlers.item.get);
        router.put('/item/:id', Handlers.item.put);
        router.delete('/item/:id', Handlers.item.delete);
        router.post('/item', Handlers.item.post);

        router.get('/user', Handlers.user.auth);
        router.post('/user', Handlers.user.reg);

        //12cbf1ce10bfc7635b8599099e323504b1ff9abfd5521d90266a72730033a75a

        return router;
    }
}

module.exports = Router;