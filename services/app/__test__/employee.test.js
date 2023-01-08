if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const dataEmployee = require("../data/profiles.json");

const app = require("../app");
const request = require("supertest");
const { hashPassword } = require("../middlewares/bycrypt");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

// beforeAll(async () => {
//   await queryInterface.bulkInsert(
//     "Employees",
//     dataEmployee.map((el) => {
//       el.createdAt = el.updatedAt = new Date();
//       el.password = hashPassword(el.password);
//       return el;
//     }),
//     {}
//   );
// });

// afterAll(async () => {
//   await queryInterface.bulkDelete("Employees", null, {
//     restartIdentity: true,
//     truncate: true,
//     cascade: true,
//   });
// });

describe("GET /api/v1/web/employees", () => {
  test("GET /api/v1/web/employees - 200 - Employees - Success", async () => {
    const response = await request(app).get("/api/v1/web/employees");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toHaveProperty("total", expect.any(Number));
    expect(response.body).toHaveProperty("employees", expect.any(Array));
    expect(response.body).toHaveProperty("page", expect.any(Number));
  });

  test("GET /api/v1/web/employees?page=1 - 200 - Employees - Success", async () => {
    const response = await request(app).get("/api/v1/web/employees?page=1");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toHaveProperty("total", expect.any(Number));
    expect(response.body).toHaveProperty("employees", expect.any(Array));
    expect(response.body).toHaveProperty("page", expect.any(Number));
  });

  test("GET /api/v1/web/employees?first_name - 200 - Employees - Success", async () => {
    const response = await request(app).get(
      "/api/v1/web/employees?first_name=claire"
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toHaveProperty("total", expect.any(Number));
    expect(response.body).toHaveProperty("employees", expect.any(Array));
    expect(response.body).toHaveProperty("page", expect.any(Number));
  });

  test("GET /api/v1/web/employees?filter=2 - 200 - Employees - Success", async () => {
    const response = await request(app).get("/api/v1/web/employees?filter=2");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toHaveProperty("total", expect.any(Number));
    expect(response.body).toHaveProperty("employees", expect.any(Array));
    expect(response.body).toHaveProperty("page", expect.any(Number));
  });

  test("GET /api/v1/web/employees/:id - 200 - Employees - Success", async () => {
    const response = await request(app).get("/api/v1/web/employees/1");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("first_name", expect.any(String));
    expect(response.body).toHaveProperty("last_name", expect.any(String));
    expect(response.body).toHaveProperty("nik", expect.any(String));
    expect(response.body).toHaveProperty("education", expect.any(String));
    expect(response.body).toHaveProperty("img_profile", expect.any(String));
    expect(response.body).toHaveProperty("birth_date", expect.any(String));
    expect(response.body).toHaveProperty("email", expect.any(String));
    expect(response.body).toHaveProperty("base_salary", expect.any(Number));
    expect(response.body).toHaveProperty("department_id", expect.any(Number));
    expect(response.body).toHaveProperty("role_id", expect.any(Number));
    // property Departments & Role belum di handle
  });

  test("GET /api/v1/web/employees/:id - 404 - Employees - no data found", async () => {
    const res = await request(app).get("/api/v1/web/employees/1000");

    expect(res.status).toBe(404);
    expect(res.body).toBeInstanceOf(Object);

    expect(res.body).toHaveProperty("code", 404);
    expect(res.body).toHaveProperty("message", "no data found");
  });
});

describe("DELETE /api/v1/web/employees/:id", () => {
  test("DELETE /api/v1/web/emplyees/2 - 200 - OK", async () => {
    const response = await request(app).delete("/api/v1/web/employees/2");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toHaveProperty(
      "message",
      "Employee with email spettman1@telegraph.co.uk deleted successfully"
    );
  });

  test("DELETE /api/v1/web/emplyees/1000 - 404 - NOT_FOUND", async () => {
    const response = await request(app).delete("/api/v1/web/employees/1000");

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toHaveProperty("code", 404);
    expect(response.body).toHaveProperty("message", "no data found");
  });
});

// describe("POST /api/v1/web/employees", () => {
//   test("POST /api/v1/web/employees - 201 - New Employee - Success", async () => {
//     const response = await request(app)
//       .post("/api/v1/web/employees")
//       .field("first_name", "janu")
//       .field("last_name", "hakim")
//       .field("nik", "02546589845645623")
//       .field("education", "sma")
//       .attach("img_profile", "test/profile.jpeg")
//       .field("birth_date", "1997-01-25")
//       .field("email", "admin1@gmail.com")
//       .field("password", "123456")
//       .field("base_salary", 5000000)
//       .field("department_id", 2)
//       .field("role_id", 10);

//     expect(response.status).toBe(201);
//     expect(response.body).toBeInstaceOf(Object);

//     expect(response.body).toHaveProperty(
//       "message",
//       "Employee with email admin2@gmail.com created successfully"
//     );
//   });
// });
