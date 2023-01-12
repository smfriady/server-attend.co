if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("../app");
const request = require("supertest");
const { Employee, Attendance, Location } = require("../models");
const { signJwt } = require("../helpers/jwt");
const token = signJwt({ id: 15 }, process.env.JWT_SECRET_EMPLOYEE);

describe("GET /api/v1/web/salaries", () => {
  test("GET /api/v1/web/salaries/web - 200 - Success", async () => {
    const res = await request(app).get("/api/v1/web/salaries/web");

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test("GET /api/v1/mobile/salaries - 200 - Success", async () => {
    const res = await request(app)
      .get("/api/v1/mobile/salaries")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
