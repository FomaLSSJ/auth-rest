const chai = require('chai'),
    chaiHttp = require('chai-http'),
    assert = chai.assert,
    App = require('../app'),
    app = new App(),
    USER = { NAME: 'test_user', PASS: 'test_pass' };

chai.use(chaiHttp);

describe('User method', () => {
    let token = null;

    it('Register', () => {
        return chai.request(app).post('/user')
            .send({ name: USER.NAME, pass: USER.PASS })
            .then(res => {
                token = res.body.token;
                assert.equal(res.status, 200);
                assert.isNotEmpty(res.body.date);
                assert.isNotEmpty(res.body.token);
            });
    });

    it('Authorize', () => {
        return chai.request(app).get('/user')
            .query({ name: USER.NAME, pass: USER.PASS })
            .then(res => {
                assert.equal(res.status, 200);
                assert.isNotEmpty(res.body.date);
                assert.notEqual(token, res.body.token);
            });
    });
});