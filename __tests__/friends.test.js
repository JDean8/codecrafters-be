const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../MVC/views/app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/users/:id/friends", () => {
  test("200: responds with an array of friends of the user with the given id", () => {
    return request(app)
      .get("/api/users/1/friends")
      .expect(200)
      .then(({ body }) => {
        expect(body.friends).toHaveLength(2);
        expect(body.friends[0]).toEqual({
          user_id: '2',
        });
        expect(body.friends[1]).toEqual({
            user_id: '3',
          });
      });
  });
  test("200: responds with an array of friends of the user with the given id", () => {
    return request(app)
      .get("/api/users/2/friends")
      .expect(200)
      .then(({ body }) => {
        expect(body.friends).toHaveLength(2);
        expect(body.friends[0]).toEqual({
          user_id: '1',
        });
        expect(body.friends[1]).toEqual({
            user_id: '3',
          });
      });
  });
  test("404: responds with an error message when given a non-existent user id", () => {
    return request(app)
      .get("/api/users/100/friends")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  })
})

describe("DELETE /api/users/:user_id/friends/:friend_id", () => {
  test("204: responds with no content when given a valid user_id and friend_id", () => {
    return request(app)
      .delete("/api/users/1/friends/2")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
  test("404: responds with an error message when given a non-existent user id", () => {
    return request(app)
      .delete("/api/users/100/friends/2")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });
  test("404: responds with an error message when given a non-existent friend id", () => {
    return request(app)
      .delete("/api/users/1/friends/200")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });
})