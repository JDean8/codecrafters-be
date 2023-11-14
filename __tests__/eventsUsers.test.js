const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../MVC/views/app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/events-users", () => {
  test("200: responds with an array of events_users objects", () => {
    return request(app)
      .get("/api/events-users")
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

describe("GET /api/users/:user_id/my-events", () => {
  test("200: responds with an array of events_users objects", () => {
    return request(app)
      .get("/api/users/6/attending-events")
      .expect(200)
      .then(({ body: { events } }) => {
        expect(events).toHaveLength(3);
        events.forEach((event) => {
          expect(event).toEqual(
            expect.objectContaining({
              event_id: expect.any(Number),
              user_id: expect.any(String),
              location: expect.any(String),
              date: expect.any(String),
              short_description: expect.any(String),
              description: expect.any(String),
              event_picture: expect.any(String),
              latitude: expect.any(Number),
              longitude: expect.any(Number),
            })
          );
        });
      });
  });

  //Error handling
  test("404: responds with a message when passed a non-existent id", () => {
    return request(app)
      .get("/api/users/100/attending-events")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User not found");
      });
  });
});

describe("POST /api/users/:user_id/my-events/:event_id", () => {
  test("201: responds with the posted events_users object", () => {
    return request(app)
      .post("/api/users/5/attending-events/1")
      .send({})
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
  test("400: responds with a message when passed an invalid event_id", () => {
    return request(app)
      .post("/api/users/5/attending-events/100")
      .send({})
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Event not found");
      });
  });

  test("400: responds with a message when passed an invalid user_id", () => {
    return request(app)
      .post("/api/users/100/attending-events/1")
      .send({})
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User not found");
      });
  });
});

describe("DELETE /api/users/:user_id/my-events/:event_id", () => {
  test("204: responds with no content", () => {
    return request(app).delete("/api/users/6/attending-events/1").expect(204);
  });

  //Error handling
  test("404: responds with a message when passed a non-existent user_id", () => {
    return request(app)
      .delete("/api/users/100/attending-events/1")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User not found");
      });
  });

  test("404: responds with a message when passed a non-existent event_id", () => {
    return request(app)
      .delete("/api/users/6/attending-events/100")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Event not found");
      });
  });
});
