if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("../app");
const cloudinary = require("cloudinary").v2;
const request = require("supertest");
const { Attendance, Location, Employee } = require("../models");
const { signJwt } = require("../helpers/jwt");
const tokenCheckIn =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjczNDA1MzgyLCJleHAiOjE2NzM0OTE3ODJ9.Zu-T1MpSl9bpjoXhrRlvr4bTUHFdoO6mazEA5RlLjr4";
const tokenFree =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjczNDA1NzYzLCJleHAiOjE2NzM0OTIxNjN9.3nO7LfcFMVdmFEhnN_eobm-bHBjREZA7PEctKK7GHEU";
const tokenCheckOut =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY3MzQ0MjI0MH0.vfsZEdtemFLSRgVYW_J4MsRoxvUcFQc9vqmYy8MUZiQ";

describe("POST /api/v1/mobile/attendances", () => {
  const dateNow = new Date().toISOString();
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
      .field("checkInTime", dateNow)
      .field("attendanceType", "absent")
      .field("latitude", parseFloat(-1.123))
      .field("longitude", parseFloat(1.123123))
      .attach("attachment", "./__test__/test3.png")
      .set("Authorization", `Bearer ${tokenCheckIn}`);

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
      .field("checkInTime", dateNow)
      .field("attendanceType", "absent")
      .field("latitude", parseFloat(-1.123))
      .field("longitude", parseFloat(1.123123))
      .attach("attachment", "")
      .set("Authorization", `Bearer ${tokenFree}`);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "attachment is required");
  });

  test("POST /api/v1/mobile/attendances - 400 - BAD_REQUEST_ATTENDANCE_ TYPE", async () => {
    jest
      .spyOn(cloudinary.uploader, "upload")
      .mockImplementationOnce(() =>
        Promise.resolve({ secure_url: "image.jpg" })
      );

    const res = await request(app)
      .post("/api/v1/mobile/attendances")
      .field("checkInTime", dateNow)
      .field("attendanceType", "permit")
      .field("latitude", parseFloat(-1.123))
      .field("longitude", parseFloat(1.123123))
      .attach("attachment", "")
      .set("Authorization", `Bearer ${tokenFree}`);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "wrong attendance type");
  });

  test("POST /api/v1/mobile/attendances - 400 - BAD_REQUEST_CHECK_IN", async () => {
    jest
      .spyOn(cloudinary.uploader, "upload")
      .mockImplementationOnce(() =>
        Promise.resolve({ secure_url: "image.jpg" })
      );

    const res = await request(app)
      .post("/api/v1/mobile/attendances")
      .field("checkInTime", dateNow)
      .field("attendanceType", "absent")
      .field("latitude", parseFloat(-1.123))
      .field("longitude", parseFloat(1.123123))
      .attach("attachment", "./__test__/test3.png")
      .set("Authorization", `Bearer ${tokenCheckIn}`);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "you already check in");
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

describe("GET  /api/v1/mobile/attendances", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("GET /api/v1/mobile/attendances - 200 - Attendance - Success", async () => {
    const res = await request(app)
      .get("/api/v1/mobile/attendances")
      .set("Authorization", `Bearer ${tokenCheckIn}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test("GET  /api/v1/mobile/attendances - 500 - Attendance - Error findAll", async () => {
    jest.spyOn(Attendance, "findAll").mockRejectedValue("Error");

    const res = await request(app)
      .get("/api/v1/mobile/attendances")
      .set("Authorization", `Bearer ${tokenCheckIn}`);

    expect(res.status).toBe(500);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("code", 500);
    expect(res.body).toHaveProperty("message", "internal server error");
  });

  test("GET /api/v1/mobile/attendances/:id - 200 - Attendance - Success", async () => {
    const res = await request(app)
      .get("/api/v1/mobile/attendances/1")
      .set("Authorization", `Bearer ${tokenCheckIn}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);

    expect(res.body).toHaveProperty("id", expect.any(Number));
    expect(res.body).toHaveProperty("checkInTime", expect.any(String));
    expect(res.body).toHaveProperty("checkOutTime", expect.any(String));
    expect(res.body).toHaveProperty("attendanceType", expect.any(String));
    expect(res.body).toHaveProperty("attachment", expect.any(String));
    expect(res.body).toHaveProperty("employeeId", expect.any(Number));
  });

  test("GET  /api/v1/mobile/attendances/:id - 500 - Attendance - Error findByPK", async () => {
    jest.spyOn(Attendance, "findByPk").mockRejectedValue("Error");

    const res = await request(app)
      .get("/api/v1/mobile/attendances/1000")
      .set("Authorization", `Bearer ${tokenCheckIn}`);

    expect(res.status).toBe(500);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("code", 500);
    expect(res.body).toHaveProperty("message", "internal server error");
  });
});

describe("PUT /api/v1/mobile/attendances", () => {
  const dateNow = new Date().toISOString();
  beforeAll(async () => {
    const employee2 = {
      firstName: "rahmat",
      lastName: "rahmat",
      nik: "67821637812637861",
      education: "S1 - Hukum",
      birthDate: "1997-06-06",
      email: "rahmatrahmat@gmail.com",
      password: "123456",
      baseSalary: 10000000,
      departmentId: 1,
      roleId: 2,
      imgProfile: "image.png",
    };

    const user2 = await Employee.create(employee2);
    const inputAttendance2 = {
      checkInTime: dateNow,
      attachment: "image.jpg",
      attendanceType: "absent",
      employeeId: user2.id,
    };
    const attendance2 = await Attendance.create(inputAttendance2);
    const inputLocation2 = {
      latitude: parseFloat(-1.123),
      longitude: parseFloat(1.123123),
      type: "in",
      attendanceId: attendance2.id,
    };

    const token2 = signJwt(
      { id: attendance2.id },
      process.env.JWT_SECRET_EMPLOYEE
    );
    console.log(token2, "<<<< ke dua");

    const employee1 = {
      firstName: "hidayat",
      lastName: "nurmusa",
      nik: "67821637812637861",
      education: "S1 - Hukum",
      birthDate: "1997-06-06",
      email: "hidayatnurmusa1@gmail.com",
      password: "123456",
      baseSalary: 10000000,
      departmentId: 1,
      roleId: 2,
      imgProfile: "image.png",
    };

    const user1 = await Employee.create(employee1);
    const inputAttendance = {
      checkInTime: dateNow,
      attachment: "image.jpg",
      attendanceType: "absent",
      employeeId: user1.id,
    };
    const attendance = await Attendance.create(inputAttendance);
    const inputLocation = {
      latitude: parseFloat(-1.123),
      longitude: parseFloat(1.123123),
      type: "in",
      attendanceId: attendance.id,
    };
    const createLocation = await Location.create(inputLocation);
    const attendCheckOut = await Attendance.update(
      { checkOutTime: dateNow, attendanceType: "attendance" },
      {
        where: {
          id: attendance.id,
        },
      }
    );
    const LocationCheckOut = await Attendance.update(
      {
        latitude: parseFloat(-1.123),
        longitude: parseFloat(1.123123),
        type: "out",
      },
      {
        where: {
          attendanceId: attendance.id,
        },
      }
    );
    const employee = await Attendance.findOne({ where: { id: attendance.id } });
    const token = signJwt(
      { id: attendance.id },
      process.env.JWT_SECRET_EMPLOYEE
    );
    console.log(token);
  });

  test("PUT /api/v1/mobile/attendances - 200 - Success", async () => {
    const inputAttendance = {
      attendanceType: "attendance",
      checkOutTime: dateNow,
      latitude: parseFloat(-1.123),
      longitude: parseFloat(1.123123),
    };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY3MzQyMjk2MH0.rKIrXzWQ-2iJvVeAU9Q9jkjIBeyFzx2XcCNq17XDMBY";
    const res = await request(app)
      .put("/api/v1/mobile/attendances")
      .send(inputAttendance)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", expect.any(String));
  });

  test("PUT /api/v1/mobile/attendances - 200 - Success", async () => {
    const inputPermit = {
      attendanceType: "permit",
      checkOutTime: dateNow,
      latitude: parseFloat(-1.123),
      longitude: parseFloat(1.123123),
    };

    const res = await request(app)
      .put("/api/v1/mobile/attendances")
      .send(inputPermit)
      .set("Authorization", `Bearer ${tokenCheckIn}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", expect.any(String));
  });

  test("PUT /api/v1/mobile/attendances - 404 - NO_DATA_FOUND_ATTENDANCE", async () => {
    const inputAttendance = {
      attendanceType: "attendance",
      checkOutTime: dateNow,
      latitude: parseFloat(-1.123),
      longitude: parseFloat(1.123123),
    };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjczNDE5OTI5LCJleHAiOjE2NzM1MDYzMjl9.N2DpxReSfDB9mGZIXNvFUIXqmAyUrpXzmkhifW7EEQs";

    const res = await request(app)
      .put("/api/v1/mobile/attendances")
      .send(inputAttendance)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("code", 404);
    expect(res.body).toHaveProperty("message", "no data found");
  });

  test("PUT /api/v1/mobile/attendances - 404 - NO_DATA_FOUND_PERMIT", async () => {
    const inputAttendance = {
      attendanceType: "permit",
      checkOutTime: dateNow,
      latitude: parseFloat(-1.123),
      longitude: parseFloat(1.123123),
    };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjczNDE5OTI5LCJleHAiOjE2NzM1MDYzMjl9.N2DpxReSfDB9mGZIXNvFUIXqmAyUrpXzmkhifW7EEQs";

    const res = await request(app)
      .put("/api/v1/mobile/attendances")
      .send(inputAttendance)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("code", 404);
    expect(res.body).toHaveProperty("message", "no data found");
  });

  test("PUT /api/v1/mobile/attendances - 401 - JWT_ERROR", async () => {
    const inputAttendance = {
      attendanceType: "permit",
      checkOutTime: dateNow,
      latitude: parseFloat(-1.123),
      longitude: parseFloat(1.123123),
    };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjczNDE3MTg2fQ.hjg8HbemL5ldO2Em7JmFd8XphEAc_RU45AbDI6nUjU";

    const res = await request(app)
      .put("/api/v1/mobile/attendances")
      .send(inputAttendance)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(401);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("code", 401);
    expect(res.body).toHaveProperty("message", "invalid signature");
  });

  test("PUT /api/v1/mobile/attendances - 400 - BAD_REQUEST_ATTENDANCETYPE", async () => {
    const input = {
      attendanceType: "absent",
      checkOutTime: dateNow,
      latitude: parseFloat(-1.123),
      longitude: parseFloat(1.123123),
    };

    const res = await request(app)
      .put("/api/v1/mobile/attendances")
      .send(input)
      .set("Authorization", `Bearer ${tokenFree}`);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("code", 400);
    expect(res.body).toHaveProperty("message", "wrong attendance type");
  });

  test("PUT /api/v1/mobile/attendances - 400 - BAD_REQUEST_CHECK_OUT", async () => {
    const input = {
      attendanceType: "attendance",
      checkOutTime: dateNow,
      latitude: parseFloat(-1.123),
      longitude: parseFloat(1.123123),
    };

    const res = await request(app)
      .put("/api/v1/mobile/attendances")
      .send(input)
      .set("Authorization", `Bearer ${tokenCheckOut}`);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("code", 400);
    expect(res.body).toHaveProperty("message", "you already check out");
  });
});
