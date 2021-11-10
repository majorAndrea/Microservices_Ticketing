import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@mrl-tickets/common";
import { createTicketRouter } from "./routes/new";
import { showTicketsRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

const app = express();

// App configurations
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketsRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

// 404 Not Found
app.all("*", () => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

export { app };
