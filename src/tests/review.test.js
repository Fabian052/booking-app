const request = require("supertest");
const app = require("../app");

let id;
let token;

beforeAll(async () => {
  const credentials = {
    email: "camilo@gmail.com",
    password: "camilo123",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("GET /reviews debe traer todas las opiniones", async () => {
  const res = await request(app)
    .get("/reviews")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /reviews debe crear una opinion", async () => {
  const createReview = {
    rating: 4.4,
    comment: "Me encantó la atención en el hotel",
  };
  const res = await request(app)
    .post("/reviews")
    .send(createReview)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.comment).toBe(createReview.comment);
});

test("PUT /reviews/:id debe actualizar una o más propiedades de una opinion", async () => {
  const updateReview = {
    comment: "Seeee estuvo bien el servicio",
  };
  const res = await request(app)
    .put(`/reviews/${id}`)
    .send(updateReview)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.comment).toBe(updateReview.comment);
});

test("DELETE /reviews/:id debe eliminar una opinion", async () => {
  const res = await request(app)
    .delete(`/reviews/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
