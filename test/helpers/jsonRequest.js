import request from 'supertest';

function jsonRequest(req) {
  return req.set('Accept', 'application/json').expect('Content-Type', /json/);
}

export function jsonGetRequest(app, url, params) {
  const q = params ? `?${params}` : '';

  const req = request(app).get(`${url}${q}`);

  return jsonRequest(req);
}

export function jsonPostRequest(app, url, params) {
  const req = request(app).post(url).send(params);

  return jsonRequest(req);
}
