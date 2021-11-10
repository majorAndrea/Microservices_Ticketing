import request from "supertest";
import { app } from "../../app";

const createTicket = () => {
  return request(app).post("/api/tickets").set("Cookie", global.signIn()).send({
    title: "A title",
    price: 20,
  });
};

describe("Retrive all tickets endpoint", () => {
  it("can fetch a list of tickets", async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const getAllTicketsResponse = await request(app)
      .get("/api/tickets")
      .send()
      .expect(200);

    expect(getAllTicketsResponse.body.length).toEqual(3);
  });
});
