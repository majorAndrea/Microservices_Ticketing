if (!process.env.JWT_KEY) {
  throw new Error("JWT_KEY must be defined!");
}

import { app } from "./app";
import mongoose from "mongoose";

const PORT = 3000;

// Connect to MongoDB and start server.
mongoose
  .connect("mongodb://auth-mongo-srv:27017/auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(
      "Successfully connected to the database. Starting Server now..."
    );
    app.listen(PORT, () => {
      console.log(`Server UP, listening on PORT ${PORT}.`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to the database!");
    console.log(error);
    process.exitCode = 1;
  });
