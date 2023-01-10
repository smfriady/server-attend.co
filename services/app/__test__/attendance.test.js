if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("../app");
const cloudinary = require("cloudinary").v2;
const request = require("supertest");
const { Attendance } = require("../models");

describe("POST /api/v1/mobile/attendances", () => {
  const dateNow = new Date().toISOString();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjczMjc5ODk1LCJleHAiOjE2NzMzNjYyOTV9.1uwVWVgf_nEggxEiYRAiqhnB6byci_VsRfcTMndt0Cg";
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("POST /api/v1/mobile/attendances - 201 - Success", async () => {
    jest
      .spyOn(cloudinary.uploader, "upload")
      .mockImplementationOnce(() =>
        Promise.resolve({ secure_url: "image.jpg" })
      );

    const res = await request(app)
      .post("/api/v1/mobile/attendances")
      .field("check_in_time", dateNow)
      .field("attendance_type", "absent")
      .field("latitude", parseFloat(-1.123))
      .field("longitude", parseFloat(1.123123))
      .attach("attachment", "./__test__/test3.png")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", expect.any(String));
  });

  test("POST /api/v1/mobile/attendances - 400 - BAD_REQUEST_ATTACHMENT", async () => {
    jest
      .spyOn(cloudinary.uploader, "upload")
      .mockImplementationOnce(() =>
        Promise.resolve({ secure_url: "image.jpg" })
      );

    const res = await request(app)
      .post("/api/v1/mobile/attendances")
      .field("check_in_time", dateNow)
      .field("attendance_type", "absent")
      .field("latitude", parseFloat(-1.123))
      .field("longitude", parseFloat(1.123123))
      .attach("attachment", "")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "attachment is required");
  });

  test("POST /api/v1/mobile/attendances - 400 - BAD_REQUEST_ATTENDANCE_TYPE", async () => {
    jest
      .spyOn(cloudinary.uploader, "upload")
      .mockImplementationOnce(() =>
        Promise.resolve({ secure_url: "image.jpg" })
      );

    const res = await request(app)
      .post("/api/v1/mobile/attendances")
      .field("check_in_time", dateNow)
      .field("attendance_type", "permit")
      .field("latitude", parseFloat(-1.123))
      .field("longitude", parseFloat(1.123123))
      .attach("attachment", "")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "wrong attendance type");
  });

  test("POST /api/v1/mobile/attendances - 401 - UNAUTHORIZED", async () => {
    jest
      .spyOn(cloudinary.uploader, "upload")
      .mockImplementationOnce(() =>
        Promise.resolve({ secure_url: "image.jpg" })
      );

    const res = await request(app).post("/api/v1/mobile/attendances");

    expect(res.status).toBe(401);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "not authorized, no user login");
  });
});

describe("PATCH /api/v1/mobile/attendances", () => {
  const dateNow = new Date().toISOString();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjczMjc5ODk1LCJleHAiOjE2NzMzNjYyOTV9.1uwVWVgf_nEggxEiYRAiqhnB6byci_VsRfcTMndt0Cg";

  test("PATCH /api/v1/mobile/attendances/:id - 201 - Success", async () => {
    const inputAttendance = {
      attendance_type: "attendance",
      check_out_time: dateNow,
    };
    const res = await request(app)
      .patch("/api/v1/mobile/attendances/1")
      .send(inputAttendance)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", expect.any(String));
  });

  test("PATCH /api/v1/mobile/attendances/:id - 201 - Success", async () => {
    const inputPermit = {
      attendance_type: "permit",
      check_out_time: dateNow,
    };
    const res = await request(app)
      .patch("/api/v1/mobile/attendances/1")
      .send(inputPermit)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", expect.any(String));
  });

  test("PATCH /api/v1/mobile/attendances/:id - 404 - NO_DATA_FOUND", async () => {
    const inputAttendance = {
      attendance_type: "attendance",
      check_out_time: dateNow,
    };
    const res = await request(app)
      .patch("/api/v1/mobile/attendances/100")
      .send(inputAttendance)
      .set("Authorization", `Bearer ${token}`);

    console.log(res.body);
    expect(res.status).toBe(404);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("code", 404);
    expect(res.body).toHaveProperty("message", "no data found");
  });

  test("PATCH /api/v1/mobile/attendances/:id - 400 - BAD_REQUEST_ATTENDANCE_TYPE", async () => {
    const input = {
      attendance_type: "absent",
      check_out_time: dateNow,
    };
    const res = await request(app)
      .patch("/api/v1/mobile/attendances/1")
      .send(input)
      .set("Authorization", `Bearer ${token}`);

    console.log(res.body);
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    // expect(res.body).toHaveProperty("code", 400);
    // expect(res.body).toHaveProperty("message", "no data found");
  });
});

describe("GET  /api/v1/mobile/attendances", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjczMjc5ODk1LCJleHAiOjE2NzMzNjYyOTV9.1uwVWVgf_nEggxEiYRAiqhnB6byci_VsRfcTMndt0Cg";
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("GET /api/v1/mobile/attendances - 200 - Attendance - Success", async () => {
    const res = await request(app)
      .get("/api/v1/mobile/attendances")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test("GET  /api/v1/mobile/attendances - 500 - Attendance - Error findAll", async () => {
    jest.spyOn(Attendance, "findAll").mockRejectedValue("Error");

    const res = await request(app)
      .get("/api/v1/mobile/attendances")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(500);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("code", 500);
    expect(res.body).toHaveProperty("message", "internal server error");
  });

  test("GET /api/v1/mobile/attendances/:id - 200 - Attendance - Success", async () => {
    const res = await request(app)
      .get("/api/v1/mobile/attendances/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);

    expect(res.body).toHaveProperty("id", expect.any(Number));
    expect(res.body).toHaveProperty("check_in_time", expect.any(String));
    expect(res.body).toHaveProperty("check_out_time", expect.any(String));
    expect(res.body).toHaveProperty("attendance_type", expect.any(String));
    expect(res.body).toHaveProperty("attachment", expect.any(String));
    expect(res.body).toHaveProperty("employee_id", expect.any(Number));
  });

  test("GET  /api/v1/mobile/attendances/:id - 500 - Attendance - Error findByPK", async () => {
    jest.spyOn(Attendance, "findByPk").mockRejectedValue("Error");

    const res = await request(app)
      .get("/api/v1/mobile/attendances/1000")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(500);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("code", 500);
    expect(res.body).toHaveProperty("message", "internal server error");
  });
});
