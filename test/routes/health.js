import app from '../../src/server';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('GET /health', () => {
  it('respond with json status 200 for a valid request', (done) => {
    chai
      .request(app)
      .get(`/health`)
      .end((_err, res) => {
        chai.expect(res).to.have.status(200);
        done();
      });
  });
});
