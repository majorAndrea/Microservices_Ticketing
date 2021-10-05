if (!process.env.JWT_KEY) {
  throw new Error("JWT_KEY must be defined!");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI must be defined!");
}

import { app } from "./app";
import mongoose from "mongoose";

const PORT = 3000;

// Connect to MongoDB and start server.
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log(
      "Successfully connected to the database. Starting Server now..."
    );
    app.listen(PORT, () => {
      console.log(`Server UP, listening on PORT ${PORT}.`);
    });
  })
  .catch(error => {
    console.log("Failed to connect to the database!");
    console.log(error);
    process.exitCode = 1;
  });
