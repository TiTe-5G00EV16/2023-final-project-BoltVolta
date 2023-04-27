const { describe, test, expect, afterAll, useFakeTimers } = require('@jest/globals');
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
        },
        {
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

