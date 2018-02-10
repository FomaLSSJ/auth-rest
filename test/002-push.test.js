const chai = require('chai'),
    chaiHttp = require('chai-http'),
    assert = chai.assert,
    Database = require('../modules/database'),
    App = require('../app'),
    app = new App(),
    USER = { NAME: 'test_user', PASS: 'test_pass' };

chai.use(chaiHttp);

describe('Post method', () => {
    it('Get error not authorize', () => {
        return chai.request(app).post('/item')
            .send({ title: 'Title1', text: 'Text1' })
            .catch(res => assert.equal(res.status, 401));
    });

    it('Get success with token', () => {
        let token = null;

        return chai.request(app).get('/user')
            .query({ name: USER.NAME, pass: USER.PASS })
            .then(({ body }) => {
                assert.isNotEmpty(body.token);
                token = body.token;

                return Promise.all([
                    chai.request(app).post('/item')
                        .set('Cookie', `X-Token=${ token }`)
                        .send({ title: 'Title1', text: 'Text1' }),
                    chai.request(app).post('/item')
                        .set('Cookie', `X-Token=${ token }`)
                        .send({ title: 'Title2', text: 'Text2' }),
                    chai.request(app).post('/item')
                        .set('Cookie', `X-Token=${ token }`)
                        .send({ title: 'Title3', text: 'Text3' })
                ]);
            })
            .then(() => chai.request(app).get('/item').set('Cookie', `X-Token=${ token }`))
            .then(({ body }) => assert.equal(body.length, 3));
    });
});