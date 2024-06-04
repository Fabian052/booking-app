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

test("GET /hotels debe traer todos los hoteles", async () => {
  const res = await request(app)
    .get("/hotels")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /hotels debe crear un hotel", async () => {
  const createHotel = {
    name: "Yolo",
    description: "Está yoleando",
    price: 300,
    address: "cll 145 # 29 - 15",
    lat: 40.4,
    lon: 25.2,
  };
  const res = await request(app)
    .post("/hotels")
    .send(createHotel)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(createHotel.name);
});

test("PUT /hotels/:id debe actualizar una o más propiedades de un hotel", async () => {
  const updateHotel = {
    name: "Resort Express",
  };
  const res = await request(app)
    .put(`/hotels/${id}`)
    .send(updateHotel)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updateHotel.name);
});

test("DELETE /hotels/:id debe eliminar un hotel", async () => {
  const res = await request(app)
    .delete(`/hotels/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
