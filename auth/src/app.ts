import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/sign-in";
import { signOutRouter } from "./routes/sign-out";
import { signUpRouter } from "./routes/sign-up";
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

// Routers
app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

// 404 Not Found
app.all("*", () => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

export { app };
