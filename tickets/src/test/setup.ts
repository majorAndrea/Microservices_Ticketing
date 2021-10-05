import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  var signIn: () => string[];
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "ufhusafuas";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  jest.setTimeout(15000);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signIn = () => {
  // Build jwt payload
  const payload = {
    id: "degf5343423434dd",
    email: "test@test.com",
  };

  // Create jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //Buld session object
  const session = {
    jwt: token,
  };

  // Turn session object into Json
  const sessionJson = JSON.stringify(session);

  // Encode session Json into base64
  const sessionBase64 = Buffer.from(sessionJson).toString("base64");

  // Return a cookie-like string
  return [`express:sess=${sessionBase64}`];
};
