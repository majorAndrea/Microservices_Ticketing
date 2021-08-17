import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@mrl-tickets/common";

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

// 404 Not Found
app.all("*", () => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

export { app };
