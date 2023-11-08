const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../MVC/views/app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/users", () => {
  test("200: responds with an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toHaveLength(6);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              profile_pic: expect.any(String),
              name: expect.any(String),
              created_at: expect.any(String),
            })
          );
        });
      });
  });

  //Error handling
  test("404: responds with a message when passed a non-existent route", () => {
    return request(app)
      .get("/api/user")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("URL not found");
      });
  });
});

describe("GET /api/users/:id", () => {
  test("200: responds with a user object", () => {
    return request(app)
      .get("/api/users/1")
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toEqual(
          expect.objectContaining({
            user_id: expect.any(String),
            username: expect.any(String),
            profile_pic: expect.any(String),
            name: expect.any(String),
            created_at: expect.any(String),
          })
        );
      });
  });

  //Error handling
  test("404: responds with a message when passed a non-existent id", () => {
    return request(app)
      .get("/api/users/123")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User not found");
      });
  });
});

describe("POST /api/users", () => {
  test("201: responds with a user object", () => {
    return request(app)
      .post("/api/users")
      .send({
        user: {
          user_id: '7',
          username: "testuser",
          profile_pic: "https://testuser.com",
          name: "test user",
          created_at: '2022-12-01 00:00:00'
        },
      })
      .expect(201)
      .then(({ body: { user } }) => {
        expect(user).toEqual(
          expect.objectContaining({
            user_id: expect.any(String),
            username: expect.any(String),
            profile_pic: expect.any(String),
            name: expect.any(String),
            created_at: expect.any(String)
          })
        );
      });
  });

  //Error handling
  test("400: responds with a message when passed an invalid user object", () => {
    return request(app)
      .post("/api/users")
      .send({
        user: {
          username: "testuser",
          profile_pic: "https://testuser.com",
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });

  test("400: responds with a message when passed an invalid user object", () => {
    return request(app)
      .post("/api/users")
      .send({
        user: {
          username: "testuser",
          profile_pic: "https://testuser.com",
          name: "test user",
          invalid: "invalid",
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });

  test("400: responds with a message when passed an invalid user object", () => {
    return request(app)
      .post("/api/users")
      .send({
        user: {
          username: "testuser",
          profile_pic: "https://testuser.com",
          name: 123,
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});

describe("PATCH /api/users/:id", () => {
  test("200: responds with a user object", () => {
    return request(app)
      .patch("/api/users/1")
      .send({
        user: {
          username: "testuser",
          profile_pic: "https://testuser.com",
          name: "test user",
        },
      })
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toEqual(
          expect.objectContaining({
            user_id: expect.any(String),
            username: expect.any(String),
            profile_pic: expect.any(String),
            name: expect.any(String),
            created_at: expect.any(String),
          })
        );
      });
  });

  //Error handling
  test("404: responds with a message when passed a non-existent id", () => {
    return request(app)
      .patch("/api/users/123")
      .send({
        user: {
          username: "testuser",
          profile_pic: "https://testuser.com",
          name: "test user",
        },
      })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User not found");
      });
  });

  test("400: responds with a message when passed an invalid user object", () => {
    return request(app)
      .patch("/api/users/1")
      .send({
        user: 1223,
        profile_pic: "https://testuser.com",
        name: "test user",
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });

  test("400: responds with a message when passed an invalid user object", () => {
    return request(app)
      .patch("/api/users/1")
      .send({
        user: {
          username: "testuser",
          profile_pic: "https://testuser.com",
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});

describe("DELETE /api/users/:id", () => {
  test("204: responds with no content", () => {
    return request(app).delete("/api/users/1").expect(204);
  });

  //Error handling
  test("404: responds with a message when passed a non-existent id", () => {
    return request(app)
      .delete("/api/users/123")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User not found");
      });
  });
});
