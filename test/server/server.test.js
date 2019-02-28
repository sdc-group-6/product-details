const request = require('supertest');
const app = require('../../server/server.js');
require('iconv-lite').encodingExists('foo');

const PORT = process.env.PORT || 3000;
let server;

beforeAll(() => {
  server = app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
});

afterAll((done) => {
  server.close();
  done();
});

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
    .get('/shoes/shoe3')
    .expect( res => {
      expect(res.statusCode).toBe(200);
      expect(Object.keys(JSON.parse(res.text)).length).toBe(11);
    })
    .end(done);
  })

  it('should respond to GET /looks/:id', (done) => {
    request(app)
    .get('/looks/jacket5')
    .expect( res => {
      expect(res.statusCode).toBe(200);
      expect(Object.keys(JSON.parse(res.text)).length).toBeGreaterThan(3)
    })
    .end(done);
  })

  it('should respond to GET /shares/:id', (done) => {
    request(app)
    .get('/shares/shirt20')
    .expect( res => {
      expect(res.statusCode).toBe(200);
      expect(Object.keys(JSON.parse(res.text)).length).toBeGreaterThan(4)
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
