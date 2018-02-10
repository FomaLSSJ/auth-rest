require('dotenv').config();
process.env.NODE_ENV = 'test';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    assert = chai.assert,
    Database = require('../modules/database'),
    App = require('../app'),
    app = new App();

chai.use(chaiHttp);

before(() => {
    return App.isReady()
        .then(() => true)
        .catch(() => process.exit(1));
});

describe('Init', () => {
    it('Database clear', () => {
        return Promise.all([
            Database.get().collection('items').remove({}),
            Database.get().collection('users').remove({})
        ])
        .then(([{ result: itemsResult }, { result: usersResult }]) => {
            assert.isTrue(!!itemsResult.ok);
            assert.isTrue(!!usersResult.ok);
        })
        .catch(err => console.error(err));
    });
});
