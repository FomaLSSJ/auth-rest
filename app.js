global._ = require('lodash');

const path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = express(),
    Database = require('./modules/database'),
    database = new Database(),
    Router = require('./modules/router'),
    router = new Router();

class App {
    constructor() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(cookieParser());

        app.use('/', router);

        return app;
    }

    static get() {
        return app;
    }

    static isReady() {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                if (!Database.get()) return;
                clearInterval();
                return resolve(true);
            }, 1000);
        });
    }
}

module.exports = App;
