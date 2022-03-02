const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const db = require("../db/connection");

afterAll(() => db.end());
beforeEach(() => seed(data));

describe("GET /api/topics", () => {
  test("should respond with an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        response.body.topics.forEach((element) => {
          expect(element).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test("status:404, responds with an error message when invalid path given", () => {
    return request(app)
      .get("/api/topicss")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found");
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("should respond with an object based on the id given by the user", () => {
    const ARTICLE_ID = 2;
    return request(app)
      .get(`/api/articles/${ARTICLE_ID}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: ARTICLE_ID,
          title: "Sony Vaio; or, The Laptop",
          topic: "mitch",
          author: "icellusedkars",
          body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
          comment_count: "0",
          created_at: "2020-10-16T06:03:00.000Z",
          votes: 0,
        });
      });
  });
  test("status:404, responds with an error message when invalid ID given", () => {
    return request(app)
      .get(`/api/articles/notAnId`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status:404, responds with an error message when valid ID doesn't exist", () => {
    return request(app)
      .get(`/api/articles/999999`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe(`No article found by this ID`);
      });
  });
});

describe("GET /api/users", () => {
  test("should respond with an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        users.forEach((element) => {
          expect(element).toMatchObject({
            username: expect.any(String),
          });
          expect(element).toEqual(
            expect.not.objectContaining({ body: expect.any(String) })
          );
        });
        expect(users.length).toBe(4);
      });
  });
});

describe("GET /api/articles", () => {
  // test.skip("should respond with an array of article objects", () => {
  //   return request(app)
  //     .get("/api/articles")
  //     .expect(200)
  //     .then(({ body: { articles } }) => {
  //       articles.forEach((article) => {
  //         expect(article).toEqual(
  //           expect.objectContaining({
  //             article_id: expect.any(Number),
  //             title: expect.any(String),
  //             topic: expect.any(String),
  //             author: expect.any(String),
  //             created_at: expect.any(String),
  //             votes: expect.any(Number),
  //           })
  //         );
  //       });
  //       expect(articles.length).toBe(12);
  //     });
  // });
  test("status 404 - responds with path not found for incorrect path", () => {
    return request(app)
      .get("/api/article")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Path not found");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("status: 201 - responds with an incremented vote property", () => {
    const newVote = { inc_votes: 2 };
    return request(app)
      .patch("/api/articles/1")
      .send(newVote)
      .expect(201)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: expect.any(String),
          votes: 102,
        });
      });
  });

  test("status:400, responds with an error message when an empty vote is entered", () => {
    const userVote = {};
    return request(app)
      .patch("/api/articles/3")
      .send(userVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("status 200 - responds with an array of objects", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            })
          );
        });
      });
  });
});

describe("POST api/articles/article_id/comment", () => {
  test("status 201 - responds with comment accepted", () => {
    return request(app)
      .post("/api/articles/7/comments")
      .send({ username: "icellusedkars", body: "Test comment body" })
      .expect(201)
      .then(({ body: { comment } }) => {
        expect(comment).toEqual(
          expect.objectContaining({
            body: expect.any(String),
            votes: 0,
            author: expect.any(String),
            article_id: 7,
            created_at: expect.any(String),
          })
        );
      });
  });
  // test("status 404 - responds with article not ", () => {
  //   return request(app)
  //     .post("/api/articles/9999/comments")
  //     .send({ username: "icellusedkars", body: "Test comment body" })
  //     .expect(404)
  //     .then(({ body: { msg } }) => {
  //       expect(msg).toBe("No Article Found");
  //     });
  // });
  test("status 404 - responds with path not found for incorrect path", () => {
    return request(app)
      .post("/api/articles/7/comment")
      .send({ username: "icellusedkars", body: "Test comment body" })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Path not found");
      });
  });
});

describe("GET api/articles/(queries)", () => {
  test("status 200 - responds with table sorted by query requests", () => {
    return request(app)
      .get("/api/articles?sort_by=title&order=desc&filter=mitch")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("title", {
          descending: true,
        });
      });
  });
  test("status 200 - responds with table sorted by query requests", () => {
    return request(app)
      .get("/api/articles?sort_by=title&order=asc")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("title", {
          descending: false,
        });
      });
  });
});

describe.skip("DELETE api/comments/:comment_id", () => {
  test.only("status 204 - responds with no content", () => {
    return request(app)
      .delete("/api/comments/2")
      .expect(204)
      .then(({ msg }) => {
        expect(msg).toBe("Deleted");
      });
  });
});
