const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../MVC/views/app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/events", () => {
  test("200: responds with an array of event objects", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body: { events } }) => {
        expect(events).toHaveLength(9);
        events.forEach((event) => {
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

  test("200: responds with an array of event objects sorted by location in ascending order", () => {
    return request(app)
      .get("/api/events?sort_by=location&order=asc")
      .expect(200)
      .then(({ body: { events } }) => {
        expect(events).toHaveLength(9);
        expect(events).toBeSortedBy("location", {
          ascending: true,
          coerce: true,
        });
      });
  });

  test("200: responds with an array of event objects sorted by location in descending order", () => {
    return request(app)
      .get("/api/events?sort_by=location&order=desc")
      .expect(200)
      .then(({ body: { events } }) => {
        expect(events).toHaveLength(9);
        expect(events).toBeSortedBy("location", {
          descending: true,
          coerce: true,
        });
      });
  });

  test("200: responds with an array of event objects sorted by location in ascending order by default", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body: { events } }) => {
        expect(events).toHaveLength(9);
        expect(events).toBeSortedBy("location", {
          ascending: true,
          coerce: true,
        });
      });
  });

  test("200: responds with an array of event objects sorted by location in ascending order by default when passed an invalid order query", () => {
    return request(app)
      .get("/api/events?order=invalid")
      .expect(200)
      .then(({ body: { events } }) => {
        expect(events).toHaveLength(9);
        expect(events).toBeSortedBy("location", {
          ascending: true,
          coerce: true,
        });
      });
  });

  test("200: responds with an amount of event objects specified by the limit query", () => {
    return request(app)
      .get("/api/events?limit=2")
      .expect(200)
      .then(({ body: { events } }) => {
        expect(events).toHaveLength(2);
      });
  });

  test("200: responds with an array of event objects starting from the offset specified by the page query", () => {
    return request(app)
      .get("/api/events?page=2&limit=2")
      .then(({ body: { events } }) => {
        expect(events).toHaveLength(2);
      });
  });

  //Error handling
  test("404: responds with a message when passed a non-existent route", () => {
    return request(app)
      .get("/api/event")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("URL not found");
      });
  });
});

describe("GET /api/events/:id", () => {
  test("200: responds with an event object", () => {
    return request(app)
      .get("/api/events/1")
      .expect(200)
      .then(({ body: { event } }) => {
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

  //Error handling
  test("404: responds with a message when passed a non-existent id", () => {
    return request(app)
      .get("/api/events/100")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Event not found");
      });
  });
});

describe("POST /api/events", () => {
  test("201: responds with an event object", () => {
    return request(app)
      .post("/api/events")
      .send({
        event: {
          creator_id: '1',
          date: "2021-12-12",
          short_description: "Test event",
          description: "Test event description",
          location: "Test location",
          latitude: 1.834,
          longitude: 41.595,
          event_picture:
            "https://www.google.com/test.png",
        },
      })
      .expect(201)
      .then(({ body: { event } }) => {
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

  //Error handling
  test("400: responds with a message when passed a bad request", () => {
    return request(app)
      .post("/api/events")
      .send({
        event: {
          event_id: 4,
          creator_id: 1,
          date: "2021-12-12",
          short_description: "Test event",
          description: "Test event description",
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});

describe("PATCH /api/events/:id", () => {
  test("200: responds with an event object", () => {
    return request(app)
      .patch("/api/events/1")
      .send({
        event: {
          event_id: 1,
          creator_id: '1',
          date: "2021-12-12",
          short_description: "Test event",
          description: "Test event description",
          location: "Test location",
          latitude: 1.834,
          longitude: 41.595,
          event_picture:
            "https://www.google.com/test.png",
        },
      })
      .expect(200)
      .then(({ body: { event } }) => {
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

  //Error handling
  test("404: responds with a message when passed a non-existent id", () => {
    return request(app)
      .patch("/api/events/100")
      .send({
        event: {
          event_id: 1,
          creator_id: '1',
          date: "2021-12-12",
          short_description: "Test event",
          description: "Test event description",
          location: "Test location",
          latitude: 1.834,
          longitude: 41.595,
          event_picture:
            "https://www.google.com/test.png",
        },
      })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Event not found");
      });
  });

  test("400: responds with a message when passed a bad request", () => {
    return request(app)
      .patch("/api/events/1")
      .send({
        event: {
          event_id: 1,
          creator_id: 1,
          date: "2021-12-12",
          short_description: "Test event",
          description: "Test event description",
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});

describe("DELETE /api/events/:id", () => {
  test("204: responds with no content", () => {
    return request(app).delete("/api/events/1").expect(204);
  });

  //Error handling
  test("404: responds with a message when passed a non-existent id", () => {
    return request(app)
      .delete("/api/events/100")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Event not found");
      });
  });
});
