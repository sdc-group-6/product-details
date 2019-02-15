const request = require('supertest');
const app = require('../../server/index.js');
require('iconv-lite').encodingExists('foo');

describe('Express server should route properly', () => {
  it('should respond to GET shoes', (done) => {
    request(app)
    .get('/shoes')
    .expect((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.text.length).toBeGreaterThan(10);
    })
    .end(done);
  })

  it('should respond to GET /shoes/:shoeId', (done) => {
    request(app)
    .get('/shoes/3')
    .expect( res => {
      expect(res.statusCode).toBe(200);
      expect(Object.keys(JSON.parse(res.text)).length).toBe(10);
    })
    .end(done);
  })

  it('should respond to GET /looks/:id', (done) => {
    request(app)
    .get('/looks/5')
    .expect( res => {
      expect(res.statusCode).toBe(200);
      expect(Object.keys(JSON.parse(res.text)).length).toBeGreaterThan(5)
    })
    .end(done);
  })

  it('should respond to GET /shares/:id', (done) => {
    request(app)
    .get('/shares/20')
    .expect( res => {
      expect(res.statusCode).toBe(200);
      expect(Object.keys(JSON.parse(res.text)).length).toBeGreaterThan(5)
    })
    .end(done);
  })

  it('should respond with 404 with invalid GET', (done) => {
    request(app)
    .get('/invalid')
    .expect( res => {
      expect(res.statusCode).toBe(404);
    })
    .end(done);
  })
})
