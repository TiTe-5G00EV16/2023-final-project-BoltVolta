const { describe, test, expect, afterAll } = require('@jest/globals');
const supertest = require('supertest');

const connection = require('../db/pool');


const app = require('../app');

describe('GET listings endpoint', ()=> {

  test('should return 200', (done)=> {
    supertest(app)
      .get('/api/listings')
      .expect(200)
      .end(done)
  });

  test('should return json data', async ()=> {

    const response = await supertest(app)
        .get('/api/listings')
        .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          title: 'Bike',
          price: 80,
          seller: 1,
          phone: 451223682,
          description: 'testing',
          image: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81wGn2TQJeL._SX425_.jpg'
        }),
        expect.objectContaining({
          id: 2,
          title: 'Nike Shoes',
          price: 30,
          seller: 2,
          phone:452323881,
          description: 'testing',
          image: 'https://static.nike.com/a/images/t_default/b6e11cbd-509d-483d-b21d-850e2d7924ca/alphafly-2-road-racing-shoes-fvDSdT.png'

        }),
      ])
    )
  });
});
describe('GET listings by id enpoint', () => {

  test('should return 200 if item was found', (done) => {
    supertest(app)
      .get('/api/listings/2')
      .expect(200)
      .end(done);
  });

  test('should return 200 and json if the item was found', async() => {
    const response = await supertest(app)
      .get('/api/listings/2')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 2,
        title: 'Nike Shoes',
        price: 30,
        seller: 2,
        phone:452323881,
        description: 'testing',
        image: 'https://static.nike.com/a/images/t_default/b6e11cbd-509d-483d-b21d-850e2d7924ca/alphafly-2-road-racing-shoes-fvDSdT.png'
      })
    );
  });

});


describe('GET listings by seller enpoint', () => {

  const loggedInUser = {
    id: '',
    email: '',
    token: ''
  }

  beforeAll(async () => {
    connection.query('DELETE FROM users WHERE email=?', ['test10@test.com'])
    const data = {
      name: 'test10',
      email: 'test10@test.com',
      password: 'test10'
    }
    const response = await supertest(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(data)
    loggedInUser.id = response.body.id
    loggedInUser.email = response.body.email
    loggedInUser.token = response.body.token
  })

  test('should return 200 if item was found', (done) => {
    supertest(app)
      .get('/api/listings/user-listings/2')
      .set('Authorization', 'bearer ' + loggedInUser.token)
      .expect(200)
      .end(done);
  });

  test('should return 200 and json if the item was found', async() => {
    const response = await supertest(app)
      .get('/api/listings/user-listings/2')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + loggedInUser.token);

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 2,
        title: 'Nike Shoes',
        price: 30,
        seller: 2,
        phone:452323881,
        description: 'testing',
        image: 'https://static.nike.com/a/images/t_default/b6e11cbd-509d-483d-b21d-850e2d7924ca/alphafly-2-road-racing-shoes-fvDSdT.png'
      })
    );
  });

});
