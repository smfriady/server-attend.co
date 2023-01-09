if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("../app");
const cloudinary = require("cloudinary").v2;
const request = require("supertest");

describe("POST /api/v1/mobile/attendances", () => {
  const dateNow = new Date().toISOString();

  test.only("POST /api/v1/mobile/attendances - 201 - Success", async () => {
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
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsImlhdCI6MTY3MzI2MTMwMSwiZXhwIjoxNjczMzQ3NzAxfQ.lPTllbLG2BO7KAzhc9CF5cDl9TUVb0HQIXLKKp04_as"
      );

    console.log(res.status, res.body);
  });
});
