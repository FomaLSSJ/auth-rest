const chai = require('chai'),
    chaiHttp = require('chai-http'),
    assert = chai.assert,
    App = require('../app'),
    app = new App();

chai.use(chaiHttp);

describe('Get method', () => {
    it('Execute', () => {
        return chai.request(app)
            .get('/item')
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
