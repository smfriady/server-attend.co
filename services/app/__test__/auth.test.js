if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("../app");
const request = require("supertest");
// const { signJwt } = require("../helpers/jwt"); // samakan access_token dulu

describe("POST /api/v1/web/auth", () => {
  const input = {
    email: "mdemichele4@facebook.com",
    password: "ZEaZOT9SBm3U",
  };

  test("POST /api/v1/web/auth/login - 200 - OK", async () => {
    const res = await request(app).post("/api/v1/web/auth/login").send(input);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);

    expect(res.body).toHaveProperty("access_token", expect.any(String));
    expect(res.body).toHaveProperty("email", input.email);
  });

  test("POST /api/v1/web/auth/login - 400 - NO_EMAIL", async () => {
    const data = {
      ...input,
      email: null,
    };
    const res = await request(app).post("/api/v1/web/auth/login").send(data);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);

    expect(res.body).toHaveProperty("code", 400);
    expect(res.body).toHaveProperty("message", "email is required");
  });

  test("POST /api/v1/web/auth/login - 400 - NO_PASSWORD", async () => {
    const data = {
      ...input,
      password: null,
    };
    const res = await request(app).post("/api/v1/web/auth/login").send(data);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);

    expect(res.body).toHaveProperty("code", 400);
    expect(res.body).toHaveProperty("message", "password is required");
  });

  test("POST /api/v1/web/auth/login - 401 - invalid_credentials", async () => {
    const data = {
      ...input,
      email: "kdjhaj@gmail.com",
    };
    const res = await request(app).post("/api/v1/web/auth/login").send(data);

    expect(res.status).toBe(401);
    expect(res.body).toBeInstanceOf(Object);

    expect(res.body).toHaveProperty("code", 401);
    expect(res.body).toHaveProperty("message", "invalid email or password");
  });

  test("POST /api/v1/web/auth/login - 401 - invalid_credentials", async () => {
    const data = {
      ...input,
      password: "763187361",
    };
    const res = await request(app).post("/api/v1/web/auth/login").send(data);

    expect(res.status).toBe(401);
    expect(res.body).toBeInstanceOf(Object);

    expect(res.body).toHaveProperty("code", 401);
    expect(res.body).toHaveProperty("message", "invalid email or password");
  });
});
