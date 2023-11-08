const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../MVC/views/app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/interests", () => {
    test("200: responds with an array of interest objects", () => {
        return request(app)
            .get("/api/interests")
            .expect(200)
            .then(({ body: { interests } }) => {
                expect(interests).toHaveLength(18);
                interests.forEach((interest) => {
                    expect(interest).toEqual(
                        expect.objectContaining({
                            interest_id: expect.any(Number),
                            interest: expect.any(String),
                        })
                    );
                });
            });
    })

      //Error handling
  test("404: responds with a message when passed a non-existent route", () => {
    return request(app)
      .get("/api/interest")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("URL not found");
      });
  });
}) 