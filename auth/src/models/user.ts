import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties
// that are required to create a new User.
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Document has. So to add a new ones.
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  updatedAt?: string;
  createdAt?: string;
}

// An interface that describes the properties
// that a User Model has. So to add new static methods.
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Version Key are most critical for documents with arrays,
    // so turn off just because of json response normalization.
    versionKey: false,
    // JSON Res. normalization, doing it here is a bit in contrast
    // to MVC design, but for now it will work.
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  next();
});

// Use this schema static function to create a new User Models so
// typescript can check if the attributes passed agree to the interface.
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
