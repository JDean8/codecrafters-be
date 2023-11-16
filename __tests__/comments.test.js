const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../MVC/views/app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/events/:event_idParam/comments", () => {
  test("200: responds with an array of comment objects for the given event", () => {
    return request(app)
      .get("/api/events/2/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toHaveLength(2);
        comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              body: expect.any(String),
              user_id: expect.any(String),
              event_id: expect.any(Number),
              created_at: expect.any(String),
            })
          );
        });
      });
  });

  test("200: responds with an empty array when given an event with no comments", () => {
    return request(app)
      .get("/api/events/6/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toEqual([]);
      });
  });

  test("200: responds with an amount of comments equal to the limit query", () => {
    return request(app)
      .get("/api/events/2/comments?limit=1")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toHaveLength(1);
      });
  });

  test("200: responds with an amount of comments equal to the limit query and a page query", () => {
    return request(app)
      .get("/api/events/2/comments?limit=1&page=2")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toHaveLength(1);
        expect(comments[0].comment_id).toBe(4);
      });
  });

  test("200: responds with an array of comment objects sorted by 'created_at' in descending order by default", () => {
    return request(app)
      .get("/api/events/2/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("404: responds with an error message when given a non-existent event_id", () => {
    return request(app)
      .get("/api/events/999/comments")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Event not found");
      });
  });
});

describe("GET /api/events/:event_id/comments/:comment_id", () => {
  test("200: responds with a comment object for the given comment_id and event_id", () => {
    return request(app)
      .get("/api/events/2/comments/1")
      .expect(200)
      .then(({ body: { comment } }) => {
        expect(comment).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            body: expect.any(String),
            user_id: expect.any(String),
            event_id: expect.any(Number),
            created_at: expect.any(String),
          })
        );
      });
  });

  test("404: responds with an error message when given a non-existent comment_id", () => {
    return request(app)
      .get("/api/events/2/comments/999")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Comment not found");
      });
  });

  test("404: responds with an error message when given a non-existent event_id", () => {
    return request(app)
      .get("/api/events/999/comments/1")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Event not found");
      });
  });
});

describe("POST /api/events/:event_id/comments", () => {
  test("201: responds with the posted comment object", () => {
    return request(app)
      .post("/api/events/2/comments")
      .send({
        body: "Test comment",
        user_id: "2",
        event_id: 2,
        created_at: "2022-12-01 00:00:00",
      })
      .expect(201)
      .then(({ body: { comment } }) => {
        expect(comment).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            body: expect.any(String),
            user_id: expect.any(String),
            event_id: expect.any(Number),
            created_at: expect.any(String),
          })
        );
      });
  });

  test("400: responds with an error message when given a missing field", () => {
    return request(app)
      .post("/api/events/2/comments")
      .send({
        body: "Test comment",
        user_id: "2",
        created_at: "2022-12-01 00:00:00",
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });

  test("400: responds with an error message when given an invalid data type", () => {
    return request(app)
      .post("/api/events/2/comments")
      .send({
        body: "Test comment",
        user_id: "2",
        event_id: "two",
        created_at: "2022-12-01 00:00:00",
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });

  test("404: responds with an error message when given a non-existent event_id", () => {
    return request(app)
      .post("/api/events/999/comments")
      .send({
        body: "Test comment",
        user_id: "2",
        event_id: 2,
        created_at: "2022-12-01 00:00:00",
        comment_id: 7,
      })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Event not found");
      });
  });

  test("404: responds with an error message when given a non-existent user_id", () => {
    return request(app)
      .post("/api/events/2/comments")
      .send({
        body: "Test comment",
        user_id: "999",
        event_id: 2,
        created_at: "2022-12-01 00:00:00",
        comment_id: 7,
      })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User not found");
      });
  });
});

describe("DELETE /api/events/:event_id/comments/:comment_id", () => {
  test("204: responds with no content", () => {
    return request(app).delete("/api/events/2/comments/1").expect(204);
  });

  test("404: responds with an error message when given a non-existent comment_id", () => {
    return request(app)
      .delete("/api/events/2/comments/999")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Comment not found");
      });
  });

  test("404: responds with an error message when given a non-existent event_id", () => {
    return request(app)
      .delete("/api/events/999/comments/1")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Event not found");
      });
  });
});
