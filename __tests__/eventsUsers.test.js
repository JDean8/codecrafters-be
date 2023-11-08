const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../MVC/views/app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/events_users", () => {
  test("200: responds with an array of events_users objects", () => {
    return request(app)
      .get("/api/events_users")
      .expect(200)
      .then(({ body: { eventsUsers } }) => {
        expect(eventsUsers).toHaveLength(3);
        eventsUsers.forEach((eventsUser) => {
          expect(eventsUser).toEqual(
            expect.objectContaining({
              event_id: expect.any(Number),
              user_id: expect.any(String),
            })
          );
        });
      });
  });

  //Error handling
  test("404: responds with a message when passed a non-existent route", () => {
    return request(app)
      .get("/api/events_user")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("URL not found");
      });
  });
});

describe("GET /api/events_users/:user_id", () => {
  test("200: responds with a events_users object", () => {
    return request(app)
      .get("/api/events_users/6")
      .expect(200)
      .then(({ body: { eventsUsers } }) => {
        expect(eventsUsers).toEqual(
          expect.objectContaining({
            event_id: expect.any(Number),
            user_id: expect.any(String),
          })
        );
      });
  });

  //Error handling
  test("404: responds with a message when passed a non-existent id", () => {
    return request(app)
      .get("/api/events_users/100")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User not found");
      });
  });
});

describe("POST /api/events_users", () => {
  test("201: responds with a events_users object", () => {
    return request(app)
      .post("/api/events_users")
      .send({
        eventsUsers: {
          event_id: 1,
          user_id: "6",
        },
      })
      .expect(201)
      .then(({ body: { eventsUsers } }) => {
        expect(eventsUsers).toEqual(
          expect.objectContaining({
            event_id: expect.any(Number),
            user_id: expect.any(String),
          })
        );
      });
  });

  //Error handling
  test("400: responds with a message when passed an invalid body", () => {
    return request(app)
      .post("/api/events_users")
      .send({
        eventsUsers: {
          event_id: 1,
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});

describe("DELETE /api/events_users/:event_id/:user_id", () => {
  test("204: responds with no content", () => {
    return request(app)
      .delete("/api/events_users/1/6")
      .expect(204);
  });

  //Error handling
  test("404: responds with a message when passed a non-existent id", () => {
    return request(app)
      .delete("/api/events_users/100/6")
      .expect(404)
      .then(({ body: { msg } }) => expect(msg).toBe("Event not found"));
  });
});
