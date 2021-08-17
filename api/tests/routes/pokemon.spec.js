/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /pokemons", () => {
    it("should get 200", (done) => agent.get("/pokemons").expect(200, done));
  });
  describe("GET /pokemons?name='name'", () => {
    it("responds with a correct pokemon --> 'Pikachu'", () =>
      agent.get("/pokemons?name=pikachu").then((res) => {
        console.log(res.body);
        expect(res.body[0].name).to.equal("Pikachu");
      })).timeout(5000);
  });
  // it("debe poder buscar correctamente un pokemon por query", () => {
  //   agent
  //     .get("/pokemons?name=bulbasaur")
  //     .expect("Content-Type", /json/)
  //     .expect((res) => expect(res.body.name).toEqual("Bulbasaur"));
  // });
});
