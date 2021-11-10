import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

describe("Update tickets endpoint", () => {
  it("returns 404 if the provided id does not exists", async () => {
    const id = new mongoose.Types.ObjectId();

    return request(app)
      .put("/api/tickets/" + id)
      .set("Cookie", global.signIn())
      .send({ title: "Valid title", price: 20 })
      .expect(404);
  });

  it("returns 401 if the user is not authenticated", async () => {
    const id = new mongoose.Types.ObjectId();

    return request(app)
      .put("/api/tickets/" + id)
      .send({ title: "Valid title", price: 20 })
      .expect(401);
  });

  it("returns 401 if the user does not own the ticket", async () => {
    const createTicketResponse = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signIn())
      .send({
        title: "A title",
        price: 20,
      });

    await request(app)
      .put("/api/tickets/" + createTicketResponse.body.id)
      .set("Cookie", global.signIn())
      .send({
        title: "Another title",
        price: 30,
      })
      .expect(401);
  });

  it("returns 400 if the user does not provide a valid title or price", async () => {
    const cookie = global.signIn();

    const createTicketResponse = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title: "A title",
        price: 20,
      });

    await request(app)
      .put("/api/tickets/" + createTicketResponse.body.id)
      .set("Cookie", cookie)
      .send({
        title: "",
        price: 20,
      })
      .expect(400);

    await request(app)
      .put("/api/tickets/" + createTicketResponse.body.id)
      .set("Cookie", cookie)
      .send({
        title: "Valid title",
        price: -20,
      })
      .expect(400);
  });

  it("updates the ticket if valid inputs are provided", async () => {
    const cookie = global.signIn();

    const createTicketResponse = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title: "A title",
        price: 20,
      });

    await request(app)
      .put("/api/tickets/" + createTicketResponse.body.id)
      .set("Cookie", cookie)
      .send({
        title: "Another title",
        price: 40,
      });

    const getTicketResponse = await request(app)
      .get("/api/tickets/" + createTicketResponse.body.id)
      .send();

    expect(getTicketResponse.body.title).toEqual("Another title");
    expect(getTicketResponse.body.price).toEqual(40);
  });
});
