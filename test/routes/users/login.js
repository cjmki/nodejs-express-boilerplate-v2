import { assert } from 'chai';
import { jsonPostRequest } from '../../helpers/jsonRequest';
import app from '../../../src/server';

import users from '../../../contrib/test-data/sql/users';

function wJsonPostRequest(app, params) {
  return jsonPostRequest(app, '/users/login', params);
}

describe('POST /users/login:', () => {
  it('respond with json status 400 if no data is provided', (done) => {
    wJsonPostRequest(app).expect(400, done);
  });

  it('respond with json status 400 if no password is provided', (done) => {
    wJsonPostRequest(app, { email: 'foo@gmail.com' }).expect(400, done);
  });

  it('respond with json status 400 if no email is provided', (done) => {
    wJsonPostRequest(app, { password: 'foobar' }).expect(400, done);
  });

  it('respond with json status 400 if invalid email (no domain) is provided', (done) => {
    wJsonPostRequest(app, {
      email: 'foo',
      password: 'foobar',
    }).expect(400, done);
  });

  it('respond with json status 400 if invalid email (no tld) is provided', (done) => {
    wJsonPostRequest(app, {
      email: 'foo@google',
      password: 'foobar',
    }).expect(400, done);
  });

  it('respond with json status 401 if invalid credentials are provided', (done) => {
    wJsonPostRequest(app, {
      email: 'foo@google.com',
      password: 'foobar',
    }).expect(401, done);
  });

  it('respond with json status 200 if valid credentials are provided', (done) => {
    wJsonPostRequest(app, {
      email: users.data[0].email,
      password: 'helloworld',
    })
      .expect(200)
      .end((err, res) => {
        assert.notExists(err, 'no errors');
        assert.exists(res.body.data.token, 'has token');
        assert.isString(res.body.data.token, 'token is a string');
        done();
      });
  });
});
