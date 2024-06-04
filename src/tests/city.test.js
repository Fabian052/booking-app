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

test("GET /cities debe traer todas las ciudades", async () => {
  const res = await request(app).get("/cities");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /cities debe crear una ciudad", async () => {
  const createCity = {
    name: "Medellin",
    country: "Colombia",
    countryId: "CO",
  };
  const res = await request(app)
    .post("/cities")
    .send(createCity)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(createCity.name);
});

test("PUT /cities/:id debe actualizar una ciudad", async () => {
  const updateCity = {
    name: "Bogotá",
  };
  const res = await request(app)
    .put(`/cities/${id}`)
    .send(updateCity)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updateCity.name);
});

test("DELETE /cities/:id debe eliminar una ciudad", async () => {
  const res = await request(app)
    .delete(`/cities/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
