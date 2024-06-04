const sequelize = require("../utils/connection");
const request = require("supertest");
const app = require("../app");

const main = async () => {
  try {
    // Acciones a ejecutar antes de los tests
    sequelize.sync();

    const user = {
      firstName: "Camilo",
      lastName: "Ramirez",
      email: "camilo@gmail.com",
      password: "camilo123",
      gender: "male",
    };

    await request(app).post("/users").send(user);

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
