import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@mrl-tickets/common";
import { createTicketRouter } from "./routes/new";

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

// 404 Not Found
app.all("*", () => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

export { app };
