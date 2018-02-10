const chai = require('chai'),
    chaiHttp = require('chai-http'),
    assert = chai.assert,
    App = require('../app'),
    app = new App(),
    USER = { NAME: 'test_user', PASS: 'test_pass' };

chai.use(chaiHttp);

describe('Get method', () => {
    it('Get error not authorize', () => {
        return chai.request(app).get('/item')
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
            })
            .then(() => chai.request(app).get('/item').set('Cookie', `X-Token=${ token }`))
            .then(({ body }) => {
                const titles = _.map(body, (x, i) => `Title${ i + 1 }`),
                    texts = _.map(body, (x, i) => `Text${ i + 1 }`);

                body.forEach(x => {
                    assert.isTrue(_.includes(titles, x.title));
                    assert.isTrue(_.includes(texts, x.text));
                });
            });
    });
});
