const request = require("supertest");
const app = require("../app");

let id;
let token;

test("POST /users debe crear un usuario", async () => {
  const createUser = {
    firstName: "Test",
    lastName: "Test",
    email: "test@gmail.com",
    password: "test123",
    gender: "male", // ENUM(['male', 'female', 'other'])
  };
  const res = await request(app).post("/users").send(createUser);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(createUser.firstName);
});

test("POST /users/login debe mostrar el usuario loggeado", async () => {
  const credentials = {
    email: "test@gmail.com",
    password: "test123",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
  expect(res.body.user.email).toBe(credentials.email);
});

test("POST /users/login debe dar error si tiene credenciales incorrectas", async () => {
  const credentials = {
    email: "incorrecto@gmail.com",
    password: "incorrecto123",
  };
  const res = await request(app).post("/users/login").send(credentials);
  expect(res.status).toBe(401);
});

test("GET /users debe traer todos los usuarios", async () => {
  const res = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("PUT /users/:id debe actualizar una o más propiedades de un usuario", async () => {
  const updateUser = {
    firstName: "Update Test",
  };
  const res = await request(app)
    .put(`/users/${id}`)
    .send(updateUser)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updateUser.firstName);
});

test("DELETE /users/:id debe eliminar un usuario", async () => {
  const res = await request(app)
    .delete(`/users/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
