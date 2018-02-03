const chai = require('chai'),
    chaiHttp = require('chai-http'),
    assert = chai.assert,
    Database = require('../modules/database'),
    App = require('../app'),
    app = new App();

chai.use(chaiHttp);

describe('Post method', () => {
    it('Execute', () => {
        return Promise.all([
            chai.request(app).post('/item').send({ title: 'Title1', text: 'Text1' }),
            chai.request(app).post('/item').send({ title: 'Title2', text: 'Text2' }),
            chai.request(app).post('/item').send({ title: 'Title3', text: 'Text3' })
        ])
        .then(() => Database.get().collection('data').find().toArray())
        .then(docs => assert.equal(docs.length, 3));
    });
});