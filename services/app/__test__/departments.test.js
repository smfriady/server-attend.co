if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("../app");
const { Department } = require("../models");
const request = require("supertest");

describe("GET /api/v1/web/departments", () => {
  test("GET /api/v1/web/departments - 200 - Departments - Success", async () => {
    const res = await request(app).get("/api/v1/web/departments");

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);

    res.body.forEach((employee) => {
      expect(employee).toMatchSnapshot({ id: expect.any(Number) });
    });
    res.body.forEach((employee) => {
      expect(employee).toMatchSnapshot({ name: expect.any(String) });
    });
  });

  test("handle error when hit findAll", async () => {
    const expectedError = "Error bos";
    jest.spyOn(Department, "findAll").mockRejectedValue(expectedError);

    const res = await request(app).get("/api/v1/web/departments");

    expect(res.status).toBe(500);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("code", 500);
    expect(res.body).toHaveProperty("message", "internal server error");
  });
});
