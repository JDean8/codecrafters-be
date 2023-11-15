const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../MVC/views/app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/:user_id/events-saved ", () => {
  test("200: responds with an array of events objects saved by the user", () => {
    return request(app)
      .get("/api/users/3/events-saved")
      .expect(200)
      .then(({ body: { eventsSaved } }) => {
        expect(eventsSaved).toHaveLength(3);
        eventsSaved.forEach((eventSaved) => {
          expect(eventSaved).toEqual(
            expect.objectContaining({
              event_id: expect.any(Number),
              user_id: expect.any(String),
            })
          );
        });
      });
  });

  test("200: responds with an empty array when passed a user_id that has no events saved", () => {
    return request(app)
      .get("/api/users/7/events-saved")
      .expect(200)
      .then(({ body: { eventsSaved } }) => {
        expect(eventsSaved).toHaveLength(0);
      });
  });

  test("200: responds with an array of events objects saved by the user sorted by location ascending by default", () => {
    return request(app)
      .get("/api/users/3/events-saved")
      .expect(200)
      .then(({ body: { eventsSaved } }) => {
        expect(eventsSaved).toBeSortedBy("location", { ascending: true });
      });
  });

  test("200: responds with an array of events objects saved by the user sorted by date descending when passed a sort_by query", () => {
    return request(app)
      .get("/api/users/3/events-saved?sort_by=date")
      .expect(200)
      .then(({ body: { eventsSaved } }) => {
        expect(eventsSaved).toBeSortedBy("date", {
          descending: true,
          coerce: true,
        });
      });
  });

  test("200: responds with an amount of events objects saved by the user limited by 2 when passed a limit query", () => {
    return request(app)
      .get("/api/users/3/events-saved?limit=2")
      .expect(200)
      .then(({ body: { eventsSaved } }) => {
        expect(eventsSaved).toHaveLength(2);
      });
  });

  test("200: responds with an array of events objects saved by the user limited by 2 when passed a limit query and a page query", () => {
    return request(app)
      .get("/api/users/3/events-saved?limit=2&page=2")
      .expect(200)
      .then(({ body: { eventsSaved } }) => {
        expect(eventsSaved).toHaveLength(1);
      });
  });

  test("404: responds with a message when passed a non-existent route", () => {
    return request(app)
      .get("/api/events_saved")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("URL not found");
      });
  });

  test("404: responds with a message when passed a non-existent user_id", () => {
    return request(app)
      .get("/api/users/100/events-saved")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User not found");
      });
  });
});

describe("GET /api/users/:user_id/events-saved/:event_id", () => {
  test("200: responds with an events object saved by the user", () => {
    return request(app)
      .get("/api/users/3/events-saved/4")
      .expect(200)
      .then(({ body: { eventSaved } }) => {
        expect(eventSaved).toEqual(
          expect.objectContaining({
            event_id: expect.any(Number),
            user_id: expect.any(String),
          })
        );
      });
  });

  test("200: responds with an empty object when passed a user_id that has no events saved", () => {
    return request(app)
      .get("/api/users/7/events-saved/4")
      .expect(200)
      .then(({ body: { eventSaved } }) => {
        expect(eventSaved).toEqual({});
      });
  });

  test("404: responds with a message when passed a non-existent event_id", () => {
    return request(app)
      .get("/api/users/3/events-saved/100")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Event not found");
      });
  });

  test("404: responds with a message when passed a non-existent user_id", () => {
    return request(app)
      .get("/api/users/100/events-saved/4")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User not found");
      });
  });
});

describe("POST /api/users/:user_id/events-saved/:event_id", () => {
  test("201: responds with an events object saved by the user", () => {
    return request(app)
      .post("/api/users/3/events-saved/5")
      .expect(201)
      .then(({ body: { eventSaved } }) => {
        expect(eventSaved).toEqual(
          expect.objectContaining({
            event_id: expect.any(Number),
            user_id: expect.any(String),
          })
        );
      });
  });

  test("404: responds with a message when passed a non-existent event_id", () => {
    return request(app)
      .post("/api/users/3/events-saved/100")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Event not found");
      });
  });

  test("404: responds with a message when passed a non-existent user_id", () => {
    return request(app)
      .post("/api/users/100/events-saved/5")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User not found");
      });
  });
});

describe("DELETE /api/users/:user_id/events-saved/:event_id", () => {
  test("204: responds with no content", () => {
    return request(app).delete("/api/users/3/events-saved/4").expect(204);
  });

  test("404: responds with a message when passed a non-existent event_id", () => {
    return request(app)
      .delete("/api/users/3/events-saved/100")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Event not found");
      });
  });

  test("404: responds with a message when passed a non-existent user_id", () => {
    return request(app)
      .delete("/api/users/100/events-saved/4")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User not found");
      });
  });
});
