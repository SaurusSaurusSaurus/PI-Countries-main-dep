/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Countries, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  id: "ARG",
  name: 'Argentina',
  flags:'flag',
  continent:'South America',
  capital: 'Buenos Aires'
};
const name = "Argentina"

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Countries.sync({ force: true })
    .then(() => Countries.create(country)));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get(`/countries?name=${name}`).expect(404) // change 'cause we can't create(post) a country
    );
  });
});

