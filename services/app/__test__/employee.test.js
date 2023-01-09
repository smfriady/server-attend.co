if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// const dataEmployee = require("../data/profiles.json");
// const dataDepartment = require("../data/department.json");
// const dataRole = require("../data/roles.json");
const Cloudinary = require("../helpers/cloudinary");

const app = require("../app");
const request = require("supertest");
const cloudinary = require("cloudinary").v2;
// const { hashPassword } = require("../middlewares/bycrypt");
const { Employee } = require("../models");

beforeEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  await Employee.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
});

// beforeAll(async () => {
//   const employees = dataEmployee.map((el) => {
//     el.createdAt = el.updatedAt = new Date();
//     el.password = hashPassword(el.password);
//     return el;
//   });
//   try {
//     await Role.bulkCreate(dataRole);
//     await Department.bulkCreate(dataDepartment);
//     await Employee.bulkCreate(employees);
//   } catch (err) {
//     console.log(err, "<dari test");
//   }
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

  test("GET /api/v1/web/employees?firstName=claire - 200 - Employees - Success", async () => {
    const response = await request(app).get(
      "/api/v1/web/employees?firstName=claire"
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toHaveProperty("total", expect.any(Number));
    expect(response.body).toHaveProperty("employees", expect.any(Array));
    expect(response.body).toHaveProperty("page", expect.any(Number));
  });

  test("GET /api/v1/web/employees?first_name= - 200 - Employees - Success", async () => {
    const response = await request(app).get(
      "/api/v1/web/employees?first_name="
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

  test("GET /api/v1/web/employees - 500 - Employees - Fail", async () => {
    jest.spyOn(Employee, "findAll").mockRejectedValue("Internal server error");

    const res = await request(app).get("/api/v1/web/employees");

    expect(res.status).toBe(500);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("code", 500);
    expect(res.body).toHaveProperty("message", "internal server error");
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

describe("POST /api/v1/web/employees", () => {
  test("POST /api/v1/web/employees - 201 - New Employee - Success", async () => {
    jest
      .spyOn(cloudinary.uploader, "upload")
      .mockImplementationOnce(() =>
        Promise.resolve({ secure_url: "image.jpg" })
      );
    const response = await request(app)
      .post("/api/v1/web/employees")
      .field("first_name", "janu")
      .field("last_name", "hakim")
      .field("nik", "02546589845645623")
      .field("education", "sma")
      .attach("img_profile", "./__test__/test3.png")
      .field("birth_date", "1997-01-25")
      .field("email", "admin1@gmail.com")
      .field("password", "123456")
      .field("base_salary", 5000000)
      .field("department_id", 2)
      .field("role_id", 10);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.any(Object));

    expect(response.body).toHaveProperty(
      "message",
      "Employee with email admin1@gmail.com created successfully"
    );
  });

  test("POST /api/v1/web/employees - 400 - Employee - BAD_REQUEST_IMG_PROFILE", async () => {
    jest
      .spyOn(cloudinary.uploader, "upload")
      .mockImplementationOnce(() =>
        Promise.resolve({ secure_url: "image.jpg" })
      );

    const response = await request(app)
      .post("/api/v1/web/employees")
      .field("first_name", "janu")
      .field("last_name", "hakim")
      .field("nik", "02546589845645623")
      .field("education", "sma")
      .attach("img_profile", null)
      .field("birth_date", "1997-01-25")
      .field("email", "admin1@gmail.com")
      .field("password", "123456")
      .field("base_salary", 5000000)
      .field("department_id", 2)
      .field("role_id", 10);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(expect.any(Object));

    expect(response.body).toHaveProperty(
      "message",
      "image profile is required"
    );
  });

  test("POST /api/v1/web/employees - 400 - Employee - UPLOAD_ERROR", async () => {
    jest
      .spyOn(cloudinary.uploader, "upload")
      .mockImplementationOnce(() => Promise.reject({ name: "UPLOAD_ERROR" }));

    const response = await request(app)
      .post("/api/v1/web/employees")
      .field("first_name", "janu")
      .field("last_name", "hakim")
      .field("nik", "02546589845645623")
      .field("education", "sma")
      .attach("img_profile", "./__test__/test3.png")
      .field("birth_date", "1997-01-25")
      .field("email", "admin1@gmail.com")
      .field("password", "123456")
      .field("base_salary", 5000000)
      .field("department_id", 2)
      .field("role_id", 10);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(expect.any(Object));

    expect(response.body).toHaveProperty("message", "upload error");
  });

  test("POST /api/v1/web/employees - 400 - Employee - SequelizeUniqueConstraintError", async () => {
    jest
      .spyOn(cloudinary.uploader, "upload")
      .mockImplementationOnce(() =>
        Promise.resolve({ secure_url: "image.jpg" })
      );

    const response = await request(app)
      .post("/api/v1/web/employees")
      .field("first_name", "janu")
      .field("last_name", "hakim")
      .field("nik", "02546589845645623")
      .field("education", "sma")
      .attach("img_profile", "./__test__/test3.png")
      .field("birth_date", "1997-01-25")
      .field("email", "spettman1@telegraph.co.uk")
      .field("password", "g4j9YM")
      .field("base_salary", 5000000)
      .field("department_id", 2)
      .field("role_id", 10);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(expect.any(Object));

    expect(response.body).toHaveProperty("message", "email must be unique");
  });

  test("POST /api/v1/web/employees - 400 - Employee - MIMETYPE_NOT_SUPPORT", async () => {
    jest
      .spyOn(cloudinary.uploader, "upload")
      .mockImplementationOnce(() =>
        Promise.resolve({ secure_url: "image.jpg" })
      );

    const response = await request(app)
      .post("/api/v1/web/employees")
      .field("first_name", "janu")
      .field("last_name", "hakim")
      .field("nik", "02546589845645623")
      .field("education", "sma")
      .attach("img_profile", "./__test__/test.pdf")
      .field("birth_date", "1997-01-25")
      .field("email", "mdemichele4@facebook.com")
      .field("password", "ZEaZOT9SBm3U")
      .field("base_salary", 5000000)
      .field("department_id", 2)
      .field("role_id", 10);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(expect.any(Object));

    expect(response.body).toHaveProperty(
      "message",
      "image profile is required"
    );
  });
});

describe("PUT /api/v1/web/employees/:id", () => {
  test("PUT /api/v1/web/employees/:id - 200 - Update Employee - Success", async () => {
    jest
      .spyOn(Cloudinary, "upload")
      .mockResolvedValue({ secure_url: "image.jpg" });
    const response = await request(app)
      .put("/api/v1/web/employees/1")
      .field("first_name", "ghzy")
      .field("last_name", "muklis")
      .field("nik", "02546589845645623")
      .field("education", "sma")
      .attach("img_profile", "./__test__/test3.png")
      .field("birth_date", "1997-01-25")
      .field("email", "admin23@gmail.com")
      .field("base_salary", 5000000)
      .field("department_id", 2)
      .field("role_id", 10);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));

    expect(response.body).toHaveProperty(
      "message",
      "Employee with email admin23@gmail.com updated successfully"
    );
  });

  test("PUT /api/v1/web/employees/:id - 200 - Update Employee - Success", async () => {
    const response = await request(app)
      .put("/api/v1/web/employees/1")
      .field("first_name", "ghzy")
      .field("last_name", "muklis")
      .field("nik", "02546589845645623")
      .field("education", "sma")
      .field("birth_date", "1997-01-25")
      .field("email", "admin80@gmail.com")
      .field("base_salary", 5000000)
      .field("department_id", 2)
      .field("role_id", 10);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));

    expect(response.body).toHaveProperty(
      "message",
      "Employee with email admin80@gmail.com updated successfully"
    );
  });

  test("PUT /api/v1/web/employees/:id - 404 - Employee - NO_DATA_FOUND", async () => {
    jest
      .spyOn(Cloudinary, "upload")
      .mockResolvedValue({ secure_url: "image.jpg" });
    const response = await request(app)
      .put("/api/v1/web/employees/300")
      .field("first_name", "ghzy")
      .field("last_name", "muklis")
      .field("nik", "02546589845645623")
      .field("education", "sma")
      .attach("img_profile", "./__test__/test3.png")
      .field("birth_date", "1997-01-25")
      .field("email", "admin23@gmail.com")
      .field("base_salary", 5000000)
      .field("department_id", 2)
      .field("role_id", 10);

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expect.any(Object));

    expect(response.body).toHaveProperty("message", "no data found");
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
