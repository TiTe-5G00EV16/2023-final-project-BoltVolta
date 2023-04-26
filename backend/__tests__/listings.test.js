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
          title: 'Microphone',
          price: '600',
          seller: 1,
          phone:"0451235698",
          description:'mic test',
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Shure_mikrofon_55S.jpg'
        }),
        expect.objectContaining({
          id: 2,
          title: 'Bike',
          price: '50',
          seller: 1,
          phone:"0451235698",
          description:'bicycle test',
          image: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81wGn2TQJeL._SX425_.jpg'
        }),
      ])
    )
  });

});

describe('GET listings by id enpoint', () => {

  test('should return 200 if item was found', (done) => {
    supertest(app)
      .get('/api/listings/1')
      .expect(200)
      .end(done);
  });

  test('should return 200 and json if the item was found', async() => {
    const response = await supertest(app)
      .get('/api/listings/1')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        title: 'Microphone',
        price: '600',
        seller: 1,
        phone:"0451235698",
        description:'mic test',
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Shure_mikrofon_55S.jpg'
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
    connection.query('DELETE FROM users WHERE email=?', ['test1@test.com'])
    const data = {
      name: 'test1',
      email: 'test1@test.com',
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
    const deleteQuery = `DELETE FROM listings WHERE title LIKE 'Microphone';`;
    connection.query(deleteQuery, (err, result) => {
      if(err) {
        console.log(err);
      }
    });
  });

  test('should create a new listing', async() => {
    const listing = {
      title: 'Microphone',
      price: '600',
      seller: 1,
      phone:'0451235698',
      description:'mic test',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Shure_mikrofon_55S.jpg'
    }

    const response = await supertest(app)
      .post('/api/listings')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(listing);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.title).toEqual('Microphone');
    expect(response.body.price).toEqual('600');
    expect(response.body.seller).toEqual('1');
    expect(response.body.phone).toEqual('0451235698');
  });

  test('should not create a listing without a title property', async() => {
    const listing = {
      price: 'Test price'
    }

    const response = await supertest(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(listing);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"title" is required');
  });

  test('should not create a listing without a price property', async() => {
    const listing = {
      title: 'Test Listing'
    }

    const response = await supertest(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(listing);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"title" is required');
  });

  test('should not create a listing with an empty title value', async() => {
    const listing = {
      title: "",
      price: 'Test price'
    }

    const response = await supertest(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(listing);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"title" is not allowed to be empty');
  });

  test('should not create a listing with an empty price value', async() => {
    const listing = {
      title: 'Test Listing',
      price: ''
    }

    const response = await supertest(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(listing);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"price" is not allowed to be empty');
  });

  test('should not create a listing title with a too short value', async() => {
    const listing = {
      title: "Rig",
      price: 'Test price'
    }

    const response = await supertest(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(listing);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"title" length must be at least 4 characters long');
  });

  test('should not create a listing price with a too short value', async() => {
    const listing = {
      title: "Test Listing",
      price: 'Ira'
    }

    const response = await supertest(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(listing);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"price" length must be at least 4 characters long');
  });

  test('should not create a duplicate listing', async() => {
    const listing = {
      title: "Oslo",
      price: 'Norway'
    }

    const response = await supertest(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(listing);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('listing is in the database already');
  });

});

describe('DELETE cities endpoint', () => {
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

  test('should delete the listing by id', async () => {
    const listing = {
      title: 'Test Listing Delete',
      price: 'Test price Delete'
    };

    const postResponse = await supertest(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(listing);

    const postId = postResponse.body.id;

    const deleteResponse = await supertest(app)
      .delete(`/api/cities/${postId}`)
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .set('Accept', 'application/json');

    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.text).toContain('listing deleted');

  });
});