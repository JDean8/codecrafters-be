const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const app = require("../MVC/views/app");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/users/:user_id/my-events", () => {
  test("status:200, responds with an array of events created by the user", () => {
    return request(app)
      .get("/api/users/1/my-events")
      .expect(200)
      .then(({ body }) => {
        expect(body.event).toHaveLength(2);
        body.event.forEach((event) => {
          expect(event).toEqual(
            expect.objectContaining({
              event_id: expect.any(Number),
              creator_id: expect.any(String),
              date: expect.any(String),
              short_description: expect.any(String),
              description: expect.any(String),
              location: expect.any(String),
              latitude: expect.any(Number),
              longitude: expect.any(Number),
              event_picture: expect.any(String),
            })
          );
        });
      });
  });

  // Error handling

  test("status:404, responds with an error message when user_id is not found", () => {
    return request(app)
      .get("/api/users/100/my-events")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });
});

describe("GET /api/users/:user_id/my-events/:event_id", () => {
  test("status:200, responds with an object of the event created by the user", () => {
    return request(app)
      .get("/api/users/1/my-events/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.eventCreated).toEqual(
          expect.objectContaining({
            event_id: expect.any(Number),
            creator_id: expect.any(String),
            date: expect.any(String),

            description: expect.any(String),
            event_picture: expect.any(String),
            latitude: expect.any(Number),
            location: expect.any(String),

            longitude: expect.any(Number),
            short_description: expect.any(String),
          })
        );
      });
  });

  // Error handling

  test("status:404, responds with an error message when user_id is not found", () => {
    return request(app)
      .get("/api/users/100/my-events/1")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });

  test("status:404, responds with an error message when event_id is not found", () => {
    return request(app)
      .get("/api/users/1/my-events/100")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Event not found");
      });
  });
});

describe("DELETE /api/users/:user_id/my-events/:event_id", () => {
  test("status:200, responds with an object of the deleted event created by the user", () => {
    return request(app)
      .delete("/api/users/1/my-events/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.eventCreated).toEqual(
          expect.objectContaining({
            event_id: expect.any(Number),
            creator_id: expect.any(String),
            date: expect.any(String),

            description: expect.any(String),
            event_picture: expect.any(String),
            latitude: expect.any(Number),
            location: expect.any(String),

            longitude: expect.any(Number),
            short_description: expect.any(String),
          })
        );
      });
  });

  // Error handling

  test("status:404, responds with an error message when user_id is not found", () => {
    return request(app)
      .delete("/api/users/100/my-events/1")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });

  test("status:404, responds with an error message when event_id is not found", () => {
    return request(app)
      .delete("/api/users/1/my-events/100")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Event not found");
      });
  });
});
