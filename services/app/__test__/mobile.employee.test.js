if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("../app");
const request = require("supertest");
const { signJwt } = require("../helpers/jwt");
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjczMzU5MTUyLCJleHAiOjE2NzM0NDU1NTJ9.YUJssWXhOtemSwoEbKezhIfCbSuQD3xar-ueP6JzWp0";

describe("GET /api/v1/mobile/employees", () => {
  const token = signJwt({ id: 12 }, process.env.JWT_SECRET_EMPLOYEE);
  test("GET /api/v1/mobile/employees - 200 - Success", async () => {
    const res = await request(app)
      .get("/api/v1/mobile/employees")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);

    expect(res.body).toHaveProperty("id", expect.any(Number));
    expect(res.body).toHaveProperty("firstName", expect.any(String));
    expect(res.body).toHaveProperty("lastName", expect.any(String));
    expect(res.body).toHaveProperty("nik", expect.any(String));
    expect(res.body).toHaveProperty("education", expect.any(String));
    expect(res.body).toHaveProperty("imgProfile", expect.any(String));
    expect(res.body).toHaveProperty("birthDate", expect.any(String));
    expect(res.body).toHaveProperty("email", expect.any(String));
    expect(res.body).toHaveProperty("baseSalary", expect.any(Number));
    expect(res.body).toHaveProperty("departmentId", expect.any(Number));
    expect(res.body).toHaveProperty("roleId", expect.any(Number));
    // belum handle departmen & role
  });

  test("GET /api/v1/mobile/employees - 500 - internal server error", async () => {
    const res = await request(app)
      .get("/api/v1/mobile/employees")
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjczMzMwMzUzLCJleHAiOjE2NzMzMzA0MTN9.MWG7F5pBB0vFNlwFYi9-yhwczlbqFF7xAGOD4NjZlp4`
      );

    expect(res.status).toBe(500);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("code", 500);
    expect(res.body).toHaveProperty("message", "internal server error");
  });
});
