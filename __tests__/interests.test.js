const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../MVC/views/app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/interests", () => {
    test("200: responds with an array of interest objects", () => {
        return request(app)
            .get("/api/interests")
            .expect(200)
            .then(({ body: { interests } }) => {
                expect(interests).toHaveLength(18);
                interests.forEach((interest) => {
                    expect(interest).toEqual(
                        expect.objectContaining({
                            interest_id: expect.any(Number),
                            interest: expect.any(String),
                        })
                    );
                });
            });
    })

    //Error handling
    test("404: responds with a message when passed a non-existent route", () => {
        return request(app)
            .get("/api/interest")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("URL not found");
            });
    });
})

describe("GET /api/users/:user_id/interests", () => {
    test("200: responds with an array of user interest objects", () => {
        return request(app)
            .get("/api/users/1/interests")
            .expect(200)
            .then(({ body: { userInterests } }) => {
                expect(userInterests).toHaveLength(3);
            });
    })
    test("404: responds with a message when passed a non-existent user_id", () => {
        return request(app)
            .get("/api/users/100/interests")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("User not found");
            });
    })
    test("200: responds with an array of user interest objects", () => {
        return request(app)
            .get("/api/users/6/interests")
            .expect(200)
            .then(({ body: { userInterests } }) => {
                expect(userInterests).toHaveLength(0);
            });
    })
})

describe("POST /api/users/:user_id/interests", () => {
    test("201: responds with the posted user interest object", () => {
        return request(app)
            .post("/api/users/1/interests")
            .send({ interest_id: 11 })
            .expect(201)
            .then(({ body: { userInterest } }) => {
                expect(userInterest).toEqual(
                    expect.objectContaining({
                        user_id: "1",
                        interest_id: 11,
                    })
                );
            });
    })
    test("404: responds with a message when passed a non-existent user_id", () => {
        return request(app)
            .post("/api/users/100/interests")
            .send({ interest_id: 11 })
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("User not found");
            });
    })
    test("404: responds with a message when passed a non-existent interest_id", () => {
        return request(app)
            .post("/api/users/1/interests")
            .send({ interest_id: 100 })
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Interest not found");
            });
    })
})