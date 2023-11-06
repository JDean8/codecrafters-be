const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");

beforeEach(() => {
  return seed(data);
});
afterAll(() => db.end());

describe("First Test", () => {
  test("Did it start?", () => {
    return request(app).get("/").expect(200);
  });
});
