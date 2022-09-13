import host from '../../helpers/chaiHelper';
import app from '../../../src/server';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const routePrefix = `${host.version}`;

describe('GET /:sort/item/:param', () => {
  it('respond with json status 200 for a valid request', (done) => {
    chai
      .request(app)
      .get(`${routePrefix}/engine/item/break?id=123`)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        done();
      });
  });

  it('respond with json status 404 for an invalid path', (done) => {
    chai
      .request(app)
      .get('/invalidpath/break?id=123')
      .end((err, res) => {
        chai.expect(res).to.have.status(404);
        done();
      });
  });
});
