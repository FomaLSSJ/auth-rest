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
        return Database.get().collection('data').remove({})
            .then(({ result }) => assert.isTrue(!!result.ok))
            .catch(err => console.error(err));
    });
});
