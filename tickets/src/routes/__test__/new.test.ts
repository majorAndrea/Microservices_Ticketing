import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets/ for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("it can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided ", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      price: 10,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      title: "Valid Title",
      price: -10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      title: "Valid Title",
    })
    .expect(400);
});

it("it creates a ticket if invalid inputs", async () => {});
