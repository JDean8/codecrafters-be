const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../MVC/views/app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/cards", () => {
  test("200: responds with an array of card objects", () => {
    return request(app)
      .get("/api/cards")
      .expect(200)
      .then(({ body: { cards } }) => {
        expect(cards).toHaveLength(4);
        cards.forEach((card) => {
          expect(card).toEqual(
            expect.objectContaining({
              card_id: expect.any(Number),
              country: expect.any(String),
              start_date: expect.any(String),
              end_date: expect.any(String),
              creator: expect.any(String),
              location: expect.any(String),
            })
          );
        });
      });
  });

  test("200: responds with an array of card objects sorted by start_date in ascending order by default", () => {
    return request(app)
      .get("/api/cards")
      .expect(200)
      .then(({ body: { cards } }) => {
        expect(cards).toBeSortedBy("start_date", { ascending: true });
      });
  });

  test("200: responds with an array of card objects sorted by location in descending order when passed a query", () => {
    return request(app)
      .get("/api/cards?sort_by=location&order=desc")
      .expect(200)
      .then(({ body: { cards } }) => {
        expect(cards).toBeSortedBy("location", { descending: true });
      });
  });

  test("200: responds with an array of card objects limited to 2 when passed a query", () => {
    return request(app)
      .get("/api/cards?limit=2")
      .expect(200)
      .then(({ body: { cards } }) => {
        expect(cards).toHaveLength(2);
      });
  });

  test("200: responds with an array of card objects limited to 2 on page 2 when passed a query", () => {
    return request(app)
      .get("/api/cards?limit=2&page=2")
      .expect(200)
      .then(({ body: { cards } }) => {
        expect(cards).toHaveLength(2);
      });
  });


  //Error handling
  test("404: responds with a message when passed a non-existent route", () => {
    return request(app)
      .get("/api/card")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("URL not found");
      });
  });
});

describe("GET /api/cards/:id", () => {
  test("200: responds with a card object", () => {
    return request(app)
      .get("/api/cards/1")
      .expect(200)
      .then(({ body: { card } }) => {
        expect(card).toEqual(
          expect.objectContaining({
            card_id: expect.any(Number),
            country: expect.any(String),
            start_date: expect.any(String),
            end_date: expect.any(String),
            creator: expect.any(String),
            location: expect.any(String),
          })
        );
      });
  });

  //Error handling
  test("404: responds with a message when passed a non-existent id", () => {
    return request(app)
      .get("/api/cards/999")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Card not found");
      });
  });
});

describe("POST /api/cards", () => {
  test("201: responds with the posted card", () => {
    return request(app)
      .post("/api/cards")
      .send({
        card: {
          card_id: 5,
          country: "France",
          start_date: "2021-03-01",
          end_date: "2021-03-10",
          creator: "2",
          location: "Paris",
        },
      })
      .expect(201)
      .then(({ body: { card } }) => {
        expect(card).toEqual(
          expect.objectContaining({
            card_id: expect.any(Number),
            country: expect.any(String),
            start_date: expect.any(String),
            end_date: expect.any(String),
            creator: expect.any(String),
            location: expect.any(String),
          })
        );
      });
  });

  //Error handling
  test("400: responds with a message when passed an invalid body", () => {
    return request(app)
      .post("/api/cards")
      .send({
        card: {
          card_id: 5,
          country: "France",
          start_date: "2021-03-01",
          end_date: "2021-03-10",
          creator: "2",
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});

describe("PATCH /api/cards/:id", () => {
  test("200: responds with the updated card", () => {
    return request(app)
      .patch("/api/cards/1")
      .send({
        card: {
          country: "France",
          start_date: "2021-03-01",
          end_date: "2021-03-10",
          creator: "2",
          location: "Paris",
        },
      })
      .expect(200)
      .then(({ body: { card } }) => {
        expect(card).toEqual(
          expect.objectContaining({
            card_id: expect.any(Number),
            country: expect.any(String),
            start_date: expect.any(String),
            end_date: expect.any(String),
            creator: expect.any(String),
            location: expect.any(String),
          })
        );
      });
  });

  //Error handling
  test("404: responds with a message when passed a non-existent id", () => {
    return request(app)
      .patch("/api/cards/999")
      .send({
        card: {
          country: "France",
          start_date: "2021-03-01",
          end_date: "2021-03-10",
          creator: "2",
          location: "Paris",
        },
      })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Card not found");
      });
  });
});

describe("DELETE /api/cards/:id", () => {
  test("204: responds with no content", () => {
    return request(app).delete("/api/cards/1").expect(204);
  });

  //Error handling
  test("404: responds with a message when passed a non-existent id", () => {
    return request(app)
      .delete("/api/cards/999")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Card not found");
      });
  });
});