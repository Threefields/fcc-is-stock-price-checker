const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  test("content security policies only allow loading of scripts and CSS from my server", function (done) {
    chai
      .request(server)
      .get('/')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(
          res.headers['content-security-policy'],
          "script-src 'self'; style-src 'self'"
        );
        done();
      });
  });
});
