if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("../app");
const { Department } = require("../models");
const request = require("supertest");

describe("GET /api/v1/web/departments", () => {
  test("GET /api/v1/web/departments - 200 - Departments - Success", async () => {
    const response = await request(app).get("/api/v1/web/departments");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    response.body.forEach((employee) => {
      expect(employee).toMatchSnapshot({ id: expect.any(Number) });
    });
    response.body.forEach((employee) => {
      expect(employee).toMatchSnapshot({ name: expect.any(String) });
    });
  });

  test("handle error when hit findAll", async () => {
    const expectedError = "Error bos";
    jest.spyOn(Department, "findAll").mockRejectedValue(expectedError);

    const response = await request(app).get("/api/v1/web/departments");

    expect(response.status).toBe(500);
    // expect(response.body.name).toBe("Error bos"); // harus di handle balikan message errornya
  });
});
