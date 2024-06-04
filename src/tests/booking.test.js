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

test("GET /bookings debe traer todas las reservas", async () => {
  const res = await request(app)
    .get("/bookings")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /bookings debe crear una reserva", async () => {
  const createBooking = {
    checkIn: "2023-08-24",
    checkOut: "2023-08-26",
  };
  const res = await request(app)
    .post("/bookings")
    .send(createBooking)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.checkIn).toBe(createBooking.checkIn);
});

test("PUT /bookings/:id debe actualizar una o más propiedades de una reserva", async () => {
  const updateBooking = {
    checkIn: "2023-08-25",
    checkOut: "2023-08-28",
  };
  const res = await request(app)
    .put(`/bookings/${id}`)
    .send(updateBooking)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.checkIn).toBe(updateBooking.checkIn);
});

test("DELETE /bookings/:id debe eliminar una reserva", async () => {
  const res = await request(app)
    .delete(`/bookings/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
