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

describe('POST listings endpoint', ()=> {

  const loggedInUser = {
    id: '',
    email: '',
    token: ''
  }

  beforeAll(async () => {
    connection.query('DELETE FROM users WHERE email=?', ['john.wayne@domain.com'])
    const data = {
      name: 'John Wayne',
      email: 'john.wayne@domain.com',
      password: 'password123'
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

  afterAll(async() => {
    const deleteQuery = `DELETE FROM listings WHERE title LIKE 'test' AND price LIKE '600';`;
    connection.query(deleteQuery, (err, result) => {
      if(err) {
        console.log(err);
      }
    });
  });

  test('should create a new listing', async() => {
    const listing = {
      title: 'test',
      price: '600',
      seller: loggedInUser.id,
      phone:'0451235698',
      description:'test',
      image: 'a.jpg'
    }

    const response = await supertest(app)
      .post('/api/listings/')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(listing);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.title).toEqual('test');
    expect(response.body.price).toEqual('600');
  });
});

describe('GET listings by seller enpoint', () => {

  const loggedInUser = {
    id: '',
    email: '',
    token: ''
  }

  beforeAll(async () => {
    const deleteQuery = 'DELETE FROM users WHERE email=?;'
    connection.query(deleteQuery, ['jack.daniels@domain.com'], (err, result) => {
      if(err) {
        console.log(err);
      }
    });
    const data = {
      name: 'Jack Daniels',
      email: 'jack.daniels@domain.com',
      password: 'password123'
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

  afterAll(async() => {
    const deleteQuery = `DELETE FROM listings WHERE title LIKE 'test' AND price LIKE '600';`;
    connection.query(deleteQuery, (err, result) => {
      if(err) {
        console.log(err);
      }
    });
  });

  test('should return 200 if item was found', (done) => {
    supertest(app)
      .get('/api/listings/user-listings/2')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .expect(200)
      .end(done);
  });

  test('should return 200 and json if the item was found', async() => {
    const response = await supertest(app)
      .get('/api/listings/user-listings/2')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token);

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


