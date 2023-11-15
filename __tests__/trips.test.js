const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../MVC/views/app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/users/:user_id/trips", () => {
  test("status:200, responds with an array of trips for the given user_id", () => {
    return request(app)
      .get("/api/users/1/trips")
      .expect(200)
      .then(({ body }) => {
        expect(body.trips).toHaveLength(1);
        expect(body.trips[0]).toEqual(
          expect.objectContaining({
            trip_id: 1,
            creator_id: "1",
            start_date: "2023-12-01T00:00:00.000Z",
            end_date: "2023-12-12T00:00:00.000Z",
            country: "Spain",
            location: "Barcelona",
          })
        );
      });
  });

  test("status:404, responds with an error message when given a non-existent user_id", () => {
    return request(app)
      .get("/api/users/1000/trips")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });

  test("status:400, responds with an error message when given an invalid user_id", () => {
    return request(app)
      .get("/api/users/invalid/trips")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });
});

describe("POST /api/users/:user_id/trips", () => {
  test("status:201, responds with the posted trip", () => {
    return request(app)
      .post("/api/users/1/trips")
      .send({
        trip: {
          creator_id: "1",
          start_date: "2023-12-01 00:00:00",
          end_date: "2023-12-01 00:00:00",
          country: "Poland",
          location: "Warsaw",
          latitude: 52.2297,
          longitude: 21.0122,
        },
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.trip).toEqual(
          expect.objectContaining({
            creator_id: "1",
            start_date: "2023-12-01T00:00:00.000Z",
            end_date: "2023-12-01T00:00:00.000Z",
            country: "Poland",
            location: "Warsaw",
            latitude: 52.2297,
            longitude: 21.0122,
            trip_id: 8,
          })
        );
      });
  });

  test("status:400, responds with an error message when given an invalid trip", () => {
    return request(app)
      .post("/api/users/1/trips")
      .send({
        trip: {
          creator_id: "1",
          country: "Poland",
          location: "Warsaw",
        },
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("status:400, responds with an error message when not given all keys", () => {
    return request(app)
      .post("/api/users/invalid/trips")
      .send({
        trip: {
          creator_id: 678,
          start_date: "2023-12-01 00:00:00",
          end_date: "2023-12-01 00:00:00",
        },
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("DELETE /api/users/:user_id/trips/:trip_id", () => {
  test("status:204, responds with no content", () => {
    return request(app).delete("/api/users/1/trips/1").expect(204);
  });

  test("status:404, responds with an error message when given a non-existent user_id", () => {
    return request(app)
      .delete("/api/users/1000/trips/1")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });
  
  test("status:404, responds with an error message when given a non-existent trip_id", () => {
    return request(app)
      .delete("/api/users/1/trips/1000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Trip not found");
      });
  });
});
