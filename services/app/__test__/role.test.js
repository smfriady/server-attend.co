if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("../app");
const { Role } = require("../models");
const request = require("supertest");

describe("GET /api/v1/web/roles", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("GET /api/v1/web/roles - 200 - Roles - Success", async () => {
    const response = await request(app).get("/api/v1/web/roles");

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
    jest.spyOn(Role, "findAll").mockRejectedValue(expectedError);

    const response = await request(app).get("/api/v1/web/roles");

    expect(response.status).toBe(500);
  });
});
