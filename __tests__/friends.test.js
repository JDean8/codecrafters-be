const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../MVC/views/app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/users/:user_id/friends", () => {
  test("200: responds with an array of friends of the user with the given id", () => {
    return request(app)
      .get("/api/users/1/friends")
      .expect(200)
      .then(({ body }) => {
        expect(body.friends).toHaveLength(2);
        expect(body.friends[0]).toEqual({
          user_id: "2",
        });
        expect(body.friends[1]).toEqual({
          user_id: "3",
        });
      });
  });

  test("200: responds with an array of friends of the user with the given id", () => {
    return request(app)
      .get("/api/users/2/friends")
      .expect(200)
      .then(({ body }) => {
        expect(body.friends).toHaveLength(2);
        expect(body.friends[0]).toEqual({
          user_id: "1",
        });
        expect(body.friends[1]).toEqual({
          user_id: "3",
        });
      });
  });

  test("404: responds with an error message when given a non-existent user id", () => {
    return request(app)
      .get("/api/users/100/friends")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });
});

describe("DELETE /api/users/:user_id/friends/:friend_id", () => {
  test("204: responds with no content when given a valid user_id and friend_id", () => {
    return request(app)
      .delete("/api/users/1/friends/2")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });

  test("404: responds with an error message when given a non-existent user id", () => {
    return request(app)
      .delete("/api/users/100/friends/2")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });

  test("404: responds with an error message when given a non-existent friend id", () => {
    return request(app)
      .delete("/api/users/1/friends/200")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });
});

describe("GET /api/users/:user_id/friendsrequests", () => {
  test("200: responds with an array of users who have sent friend requests to the user with the given id", () => {
    return request(app)
      .get("/api/users/1/friendsrequests")
      .expect(200)
      .then(({ body }) => {
        expect(body.friendRequests).toHaveLength(2);
        expect(body.friendRequests[0]).toEqual({
          user_id: "5",
        });
        expect(body.friendRequests[1]).toEqual({
          user_id: "6",
        });
      });
  });

  test("404: responds with an error message when given a non-existent user id", () => {
    return request(app)
      .get("/api/users/100/friendsrequests")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });
});

describe("POST /api/users/:user_id/friendsrequests", () => {
  test("201: responds with the newly created friend request", () => {
    return request(app)
      .post("/api/users/1/friendsrequests")
      .send({ friend_id: "4" })
      .expect(201)
      .then(({ body }) => {
        expect(body.friendRequest).toEqual({
          friend_a: "1",
          friend_b: "4",
        });
      });
  });

  test("400: responds with an error message when given a friend request to already existing friend", () => {
    return request(app)
      .post("/api/users/1/friendsrequests")
      .send({ friend_id: "2" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Friend already exists");
      });
  });

  test("400: responds with an error message when given a friend request that already exists", () => {
    return request(app)
      .post("/api/users/6/friendsrequests")
      .send({ friend_id: "1" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Friend request already exists");
      });
  });

  test("404: responds with an error message when given a non-existent user id", () => {
    return request(app)
      .post("/api/users/100/friendsrequests")
      .send({ friend_id: 2 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });

  test("404: responds with an error message when given a non-existent friend id", () => {
    return request(app)
      .post("/api/users/1/friendsrequests")
      .send({ friend_id: "200" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("GET /api/users/:user_id/matchfriends", () => {
  test("200: accepts the friend request and responds with the newly created friend", () => {
    return request(app)
      .get("/api/users/1/matchfriends")
      .expect(200)
      .then(({ body }) => {
        expect(body.friends).toHaveLength(3);
        expect(body.friends).toEqual([
          { user_id: "2" },
          { user_id: "3" },
          { user_id: "5" },
        ]);
      });
  });

  test("404: responds with an error message when given a non-existent user id", () => {
    return request(app)
      .get("/api/users/100/matchfriends")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });

  test("200: responds with an empty array when given a user with no friends", () => {
    return request(app)
      .get("/api/users/6/matchfriends")
      .expect(200)
      .then(({ body }) => {
        expect(body.friends).toHaveLength(0);
        expect(body.friends).toEqual([]);
      });
  });
  
  test("200: responds with friends array when given a user with no friend requests", () => {
    return request(app)
      .get("/api/users/6/matchfriends")
      .expect(200)
      .then(({ body }) => {
        expect(body.friends).toHaveLength(0);
        expect(body.friends).toEqual([]);
      });
  });
});
